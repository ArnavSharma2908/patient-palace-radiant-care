import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { spawn } from 'child_process';
import path from 'path';

// Polyfill __dirname for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper: validate patient input
function validatePatient(data, isUpdate = false) {
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) return 'Name is required';
  if (!['Male', 'Female', 'Other'].includes(data.gender)) return 'Gender is required';
  // Date of birth is required only for new patients (POST)
  if (!isUpdate && !data.dateOfBirth) return 'Date of birth is required';
  return null;
}

// Helper: parse and format date to YYYY-MM-DD
function toSqlDate(date) {
  if (!date) return null;
  try {
    // Attempt to parse as a Date object first
    const d = new Date(date);
    // Check if the date is valid
    if (isNaN(d.getTime())) {
      // If not a valid Date object, try parsing as string formats
      if (typeof date === 'string') {
        if (date.includes('/')) {
          // mm/dd/yyyy
          const [mm, dd, yyyy] = date.split('/');
          return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
        }
        if (date.includes('-')) {
          // yyyy-mm-dd or yyyy-mm-ddTHH:mm:ss.sssZ (ISO string)
          // For ISO strings, just take the date part
          return date.split('T')[0];
        }
      }
      // If still cannot parse, return null
      return null;
    }
    // If it's a valid Date object, format it to YYYY-MM-DD
    return d.toISOString().slice(0, 10);
  } catch (e) {
    console.error('Error parsing date in toSqlDate:', date, e);
    return null; // Return null on any parsing error
  }
}

// Helper: call whatsapp_sender.py with patient data as tuple
function callPyWithPatient(patient, action) {
  const tupleArgs = [
    patient.id,
    patient.name,
    patient.gender,
    patient.dateOfBirth,
    patient.phoneNumber,
    patient.bloodType,
    Array.isArray(patient.medicalConditions) ? patient.medicalConditions.join(', ') : patient.medicalConditions,
    Array.isArray(patient.medications) ? patient.medications.join(', ') : patient.medications,
    Array.isArray(patient.allergies) ? patient.allergies.join(', ') : patient.allergies,
    patient.notes || '',
    patient.registrationDate || '',
    patient.lastVisit || '',
    action
  ];
  try {
    const py = spawn('python', [path.join(__dirname, 'whatsapp_sender.py'), ...tupleArgs.map(String)]);
    py.stdout.on('data', (data) => {
      console.log(`whatsapp_sender.py stdout: ${data}`);
    });
    py.stderr.on('data', (data) => {
      console.error(`whatsapp_sender.py stderr: ${data}`);
    });
    py.on('close', (code) => {
      if (code !== 0) {
        console.error(`whatsapp_sender.py process exited with code ${code}`);
      }
    });
  } catch (err) {
    // Log error but do not interrupt main flow
    console.error('Error calling whatsapp_sender.py:', err);
  }
}

// GET all patients
app.get('/patients', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM patients');
    // Convert comma-separated fields to arrays
    const patients = rows.map(row => ({
      ...row,
      medicalConditions: row.medicalConditions ? row.medicalConditions.split(',').map(s => s.trim()) : [],
      medications: row.medications ? row.medications.split(',').map(s => s.trim()) : [],
      allergies: row.allergies ? row.allergies.split(',').map(s => s.trim()) : [],
    }));
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET single patient
app.get('/patients/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
    const row = rows[0];
    row.medicalConditions = row.medicalConditions ? row.medicalConditions.split(',').map(s => s.trim()) : [];
    row.medications = row.medications ? row.medications.split(',').map(s => s.trim()) : [];
    row.allergies = row.allergies ? row.allergies.split(',').map(s => s.trim()) : [];
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST create patient
app.post('/patients', async (req, res) => {
  const error = validatePatient(req.body);
  if (error) return res.status(400).json({ error });
  try {
    const id = req.body.id || Math.random().toString(36).slice(2, 18);
    const {
      name, gender, dateOfBirth, phoneNumber = '', bloodType = '',
      medicalConditions = '', medications = '', allergies = '', notes = '',
      registrationDate = new Date().toISOString().slice(0, 10), lastVisit = null
    } = req.body;
    await pool.query(
      `INSERT INTO patients (id, name, gender, dateOfBirth, phoneNumber, bloodType, medicalConditions, medications, allergies, notes, registrationDate, lastVisit)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, gender, toSqlDate(dateOfBirth), phoneNumber, bloodType,
        Array.isArray(medicalConditions) ? medicalConditions.join(', ') : medicalConditions,
        Array.isArray(medications) ? medications.join(', ') : medications,
        Array.isArray(allergies) ? allergies.join(', ') : allergies,
        notes, toSqlDate(registrationDate), lastVisit ? toSqlDate(lastVisit) : null]
    );
    // Fetch the inserted patient and return in the same format as GET
    const [rows] = await pool.query('SELECT * FROM patients WHERE id = ?', [id]);
    if (!rows.length) return res.status(500).json({ error: 'Failed to fetch new patient' });
    const row = rows[0];
    row.medicalConditions = row.medicalConditions ? row.medicalConditions.split(',').map(s => s.trim()) : [];
    row.medications = row.medications ? row.medications.split(',').map(s => s.trim()) : [];
    row.allergies = row.allergies ? row.allergies.split(',').map(s => s.trim()) : [];
    // Call py file with the new patient data
    callPyWithPatient(row,'created');
    res.status(201).json(row);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT update patient
app.put('/patients/:id', async (req, res) => {
  const error = validatePatient(req.body, true); // Pass true for isUpdate
  if (error) return res.status(400).json({ error });

  try {
    const [existingRows] = await pool.query('SELECT dateOfBirth FROM patients WHERE id = ?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'Patient not found' });
    const existingPatient = existingRows[0];

    const {
      name, gender, dateOfBirth, phoneNumber = '', bloodType = '',
      medicalConditions = '', medications = '', allergies = '', notes = '',
      registrationDate, lastVisit
    } = req.body;

    // Use existing dateOfBirth if not provided in the request body
    // Ensure dateOfBirth from req.body is processed by toSqlDate if it exists
    const finalDateOfBirth = req.body.dateOfBirth ? toSqlDate(req.body.dateOfBirth) : existingPatient.dateOfBirth;

    // Use existing registrationDate and lastVisit if not provided in the request body
    const finalRegistrationDate = req.body.registrationDate ? toSqlDate(req.body.registrationDate) : existingPatient.registrationDate;
    const finalLastVisit = req.body.lastVisit ? toSqlDate(req.body.lastVisit) : existingPatient.lastVisit;

    await pool.query(
      `UPDATE patients SET name=?, gender=?, dateOfBirth=?, phoneNumber=?, bloodType=?, medicalConditions=?, medications=?, allergies=?, notes=?, registrationDate=?, lastVisit=? WHERE id=?`,
      [name, gender, finalDateOfBirth, phoneNumber, bloodType,
        Array.isArray(medicalConditions) ? medicalConditions.join(', ') : medicalConditions,
        Array.isArray(medications) ? medications.join(', ') : medications,
        Array.isArray(allergies) ? allergies.join(', ') : allergies,
        notes, finalRegistrationDate, finalLastVisit, req.params.id]
    );
    
    // Fetch the updated patient to return the correct data
    const [updatedRows] = await pool.query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
    const updatedPatient = updatedRows[0];

    // Convert comma-separated fields back to arrays for the response
    updatedPatient.medicalConditions = updatedPatient.medicalConditions ? updatedPatient.medicalConditions.split(',').map(s => s.trim()) : [];
    updatedPatient.medications = updatedPatient.medications ? updatedPatient.medications.split(',').map(s => s.trim()) : [];
    updatedPatient.allergies = updatedPatient.allergies ? updatedPatient.allergies.split(',').map(s => s.trim()) : [];

    // Call py file with the updated patient data
    callPyWithPatient(updatedPatient,'updated');

    res.json(updatedPatient);
  } catch (err) {
    console.error('Database error during patient update:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE patient
app.delete('/patients/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM patients WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
