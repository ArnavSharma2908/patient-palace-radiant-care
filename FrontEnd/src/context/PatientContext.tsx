import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Patient, PatientFormData } from '@/types/patient';
import { toast } from 'sonner';

interface PatientContextType {
  patients: Patient[];
  loading: boolean;
  addPatient: (patient: PatientFormData) => Promise<string>;
  updatePatient: (id: string, patient: PatientFormData) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  getPatient: (id: string) => Patient | undefined;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/patients');
        const data = await res.json();
        if (!ignore) setPatients(data);
      } catch (err) {
        if (!ignore) setPatients([]);
      }
      if (!ignore) setLoading(false);
    };
    fetchPatients();
    return () => { ignore = true; };
  }, []);

  const addPatient = (patientData: PatientFormData) => {
    return fetch('http://localhost:3001/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    })
      .then(res => res.json())
      .then(newPatient => {
        setPatients(prev => [...prev, newPatient]);
        toast.success('Patient added successfully');
        return newPatient.id;
      });
  };

  const updatePatient = async (id: string, patientData: PatientFormData) => {
    // Always send the current DOB (from system) if not changed in the form
    const current = patients.find(p => p.id === id);
    // The backend now handles defaulting dateOfBirth if not provided in the update payload
    const payload: any = {
      ...patientData,
      // dateOfBirth is now optional in the payload for updates
      medicalConditions: Array.isArray(patientData.medicalConditions)
        ? patientData.medicalConditions.join(', ')
        : (patientData.medicalConditions || ''),
      medications: Array.isArray(patientData.medications)
        ? patientData.medications.join(', ')
        : (patientData.medications || ''),
      allergies: Array.isArray(patientData.allergies)
        ? patientData.allergies.join(', ')
        : (patientData.allergies || ''),
    };
    try {
      const res = await fetch(`http://localhost:3001/patients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        let errorMsg = 'Failed to update patient';
        try {
          const error = await res.json();
          if (error && error.error) errorMsg = error.error;
        } catch {}
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
      const updatedPatient = await res.json();
      setPatients(prev => prev.map(p => (p.id === id ? updatedPatient : p)));
      toast.success('Patient updated successfully');
    } catch (err) {
      toast.error('Network or server error while updating patient');
      throw err;
    }
  };

  const deletePatient = (id: string) => {
    return fetch(`http://localhost:3001/patients/${id}`, { method: 'DELETE' })
      .then(() => {
        setPatients(prev => prev.filter(p => p.id !== id));
        toast.success('Patient deleted successfully');
      });
  };

  const getPatient = (id: string) => patients.find(p => p.id === id);

  return (
    <PatientContext.Provider value={{
      patients,
      loading,
      addPatient,
      updatePatient,
      deletePatient,
      getPatient
    }}>
      {children}
    </PatientContext.Provider>
  );
};

export function usePatients() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
}
