# Patient Palace Radiant Care

A comprehensive patient management system designed to streamline healthcare workflows for hospitals and clinics. Now includes automated WhatsApp notifications to patients using Twilio and Python.

---

## Table of Contents
- [Project Overview](#project-overview)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [License](#license)

---

## Project Overview
Patient Palace Radiant Care is a full-stack web application for managing patient records, statistics, and hospital information. It provides a modern, responsive interface for healthcare staff to efficiently manage patient data and visualize key metrics.

**New Feature:**
- Automated WhatsApp notifications: When a patient's data is created or updated, the system sends a WhatsApp message to the patient with their details using Twilio and Python.

---

## System Requirements
- **Node.js** (v14 or higher)
- **npm** (or compatible package manager)
- **MySQL Community Server**
- **Python** (v3.7 or higher, must be in your system PATH)
- **pip** (Python package manager, must be in your system PATH)

---

## Installation

### 1. Clone the Repository
```powershell
git clone https://github.com/ArnavSharma2908/patient-palace-radiant-care.git
cd patient-palace-radiant-care
```

### 2. Backend Installation
```powershell
cd BackEnd
npm install
cd ..
```

#### Install Python Dependencies
Make sure you have Python and pip installed and available in your PATH. Then install the required Python modules:
```powershell
pip install twilio python-dotenv
```

### 3. Frontend Installation
Open a new terminal window:
```powershell
cd FrontEnd
npm install
cd ..
```

---

## Configuration

### Backend Environment Variables
1. Copy the example environment file:
   ```powershell
   copy .env.example .env
   ```
2. Edit `BackEnd/.env` and provide your MySQL database credentials:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`, `PORT`
   - Ensure that the value of `DB_NAME` matches the name of the database you create in the next step.
3. Add Twilio Credentials to `BackEnd/.env`:
   - `TWILIO_ACCOUNT_SID` = Your Twilio Account SID
   - `TWILIO_AUTH_TOKEN` = Your Twilio Auth Token
   - `TWILIO_WHATSAPP_NUMBER` = Your Twilio WhatsApp-enabled number (format: `whatsapp:+14155238886`)

#### WhatsApp Sandbox Initialization (Required for Receiving Messages)
To receive WhatsApp messages from the system, each recipient (patient) must first send a join message to the Twilio sandbox:
- Open this link on the recipient's phone: [https://wa.me/14155238886?text=join%20coat-rubber](https://wa.me/14155238886?text=join%20coat-rubber)
- Send the pre-filled message to join the sandbox.
- Only after this step will the recipient be able to receive WhatsApp notifications from the system.

---

## Database Setup

1. **Create the Database:**
   - Log in to your MySQL server and create a new database:
   ```sql
   CREATE DATABASE your_database_name;
   USE your_database_name;
   ```
   - Make sure `your_database_name` matches the `DB_NAME` value in your `.env` file.

2. **Create the Patients Table:**
   - You can create the `Patients` table by running the following SQL command:
   ```sql
   CREATE TABLE IF NOT EXISTS Patients (
       id VARCHAR(64) NOT NULL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       gender ENUM('Male','Female','Other') NOT NULL,
       dateOfBirth DATE NOT NULL,
       phoneNumber VARCHAR(32),
       bloodType VARCHAR(8),
       medicalConditions TEXT,
       medications TEXT,
       allergies TEXT,
       notes TEXT,
       registrationDate DATE,
       lastVisit DATE
   );
   ```
   - Alternatively, you can use the provided `patients.sql` file to create the table:
   ```sql
   SOURCE patients.sql;
   ```
   - This will create the `Patients` table with the following structure:

```
mysql> DESC Patients;
+-------------------+-------------------------------+------+-----+---------+-------+
| Field             | Type                          | Null | Key | Default | Extra |
+-------------------+-------------------------------+------+-----+---------+-------+
| id                | varchar(64)                   | NO   | PRI | NULL    |       |
| name              | varchar(255)                  | NO   |     | NULL    |       |
| gender            | enum('Male','Female','Other') | NO   |     | NULL    |       |
| dateOfBirth       | date                          | NO   |     | NULL    |       |
| phoneNumber       | varchar(32)                   | YES  |     | NULL    |       |
| bloodType         | varchar(8)                    | YES  |     | NULL    |       |
| medicalConditions | text                          | YES  |     | NULL    |       |
| medications       | text                          | YES  |     | NULL    |       |
| allergies         | text                          | YES  |     | NULL    |       |
| notes             | text                          | YES  |     | NULL    |       |
| registrationDate  | date                          | YES  |     | NULL    |       |
| lastVisit         | date                          | YES  |     | NULL    |       |
+-------------------+-------------------------------+------+-----+---------+-------+
```

---

## Running the Application

You can use the provided scripts to start both the backend and frontend servers easily:

- **On Windows:**
  - Double-click `run.bat` or run in PowerShell:
    ```powershell
    .\run.bat
    ```
- **On Linux/Mac:**
  - Run the shell script:
    ```bash
    ./run.sh
    ```

> These scripts automatically start both the backend (`npm start` in `BackEnd`) and frontend (`npm run dev` in `FrontEnd`) servers for you.

If the scripts do not work on your system, you can start the servers manually:

1. In one terminal:
    ```powershell
    cd BackEnd
    npm start
    ```
2. In another terminal:
    ```powershell
    cd FrontEnd
    npm run dev
    ```

By default, the backend runs on `http://localhost:3001` and the frontend on `http://localhost:8080`.

---

## Troubleshooting

- **MySQL Connection Issues:**
  - Ensure MySQL is installed, running, and accessible.
  - Double-check credentials and `DB_NAME` in `BackEnd/.env`.
  - Confirm the database and `Patients` table exist (see Database Setup).
  - Verify the MySQL port matches your configuration (default: 3306).

- **Python or pip Not Found:**
  - Make sure Python and pip are installed and added to your system PATH.
  - Run `python --version` and `pip --version` in your terminal to verify.

- **Missing Python Modules (`twilio` or `python-dotenv`):**
  - If you see errors about missing modules, run `pip install twilio python-dotenv` in the `BackEnd` directory.

- **.env Issues (Twilio or MySQL):**
  - Ensure `.env` exists and is properly filled out (copy from `.env.example`).
  - Double-check that `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_WHATSAPP_NUMBER` are present and correct.
  - For WhatsApp, make sure the number is in the format `whatsapp:+14155238886`.

- **WhatsApp Messages Not Received:**
  - The recipient must first join the Twilio sandbox by sending the join message as described above.
  - Check that the phone number in the patient record matches the WhatsApp number (with country code, e.g., `+91...`).
  - Ensure your Twilio trial account has sufficient balance and is not restricted.

- **Port Conflicts:**
  - If a port is in use, change the `PORT` in `.env` or stop the conflicting process.

- **Dependency Problems:**
  - Run `npm install` in both `BackEnd` and `FrontEnd` if you see module errors.

- **Script Permissions (Linux/Mac):**
  - If `run.sh` fails, run `chmod +x run.sh`.

- **Frontend/Backend Not Starting:**
  - Check you are in the correct directory and review terminal errors for missing configs or dependencies.

- **Browser Cannot Connect:**
  - Make sure both servers are running and local ports are not blocked by firewall/antivirus.

- **General:**
  - Restart your terminal and try again. Review error messages for guidance. If stuck, consult documentation or open an issue.

---

## Features
- **Dashboard:** Visualizes key hospital statistics, including patient counts, disease and blood type distribution, and recent activity.
- **Patient Management:** Add, edit, view, and delete patient records with detailed information (demographics, medical history, medications, allergies, and visit history).
- **Automated WhatsApp Notifications:** Patients receive WhatsApp messages with their details whenever their record is created or updated (requires Twilio and Python integration).
- **Search & Filter:** Quickly find patients by name, gender, or other criteria.
- **Data Visualization:** Interactive charts for disease and blood type analytics.
- **Responsive UI:** Works seamlessly on desktops, tablets, and mobile devices.
- **Contact & About Us:** Dedicated pages for hospital information and support.
- **Modern Tech Stack:** Built with React, TypeScript, Vite, and Tailwind CSS for performance and maintainability.
- **Secure API:** Backend with Node.js, Express, and MySQL for robust data management.
- **Easy Setup:** Simple scripts for installation and running on Windows, Linux, or Mac.

---

## Technology Stack

**Frontend:**
- React
- TypeScript
- Vite
- shadcn-ui (Radix UI + Tailwind CSS)
- React Router DOM
- TanStack React Query

**Backend:**
- Node.js
- Express
- MySQL
- mysql2
- CORS
- dotenv
- **Python** (for WhatsApp integration)
- **Twilio Python Module** (for WhatsApp messaging)
- **python-dotenv** (for environment variable management in Python)

---

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
