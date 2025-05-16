# Patient Palace Radiant Care

A comprehensive patient management system designed to streamline healthcare workflows for hospitals and clinics.

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

---

## System Requirements
- **Node.js** (v14 or higher)
- **npm** (or compatible package manager)
- **MySQL Community Server**

---

## Installation

### 1. Clone the Repository
```powershell
git clone <your-repo-url>
cd patient-palace-radiant-care
```

### 2. Backend Installation
```powershell
cd BackEnd
npm install
```

### 3. Frontend Installation
Open a new terminal window:
```powershell
cd FrontEnd
npm install
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

- **Port Conflicts:**
  - If a port is in use, change the `PORT` in `.env` or stop the conflicting process.

- **Dependency Problems:**
  - Run `npm install` in both `BackEnd` and `FrontEnd` if you see module errors.

- **Script Permissions (Linux/Mac):**
  - If `run.sh` fails, run `chmod +x run.sh`.

- **.env Issues:**
  - Ensure `.env` exists and is properly filled out (copy from `.env.example`).

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
- Supabase (for API interaction)

**Backend:**
- Node.js
- Express
- MySQL
- mysql2
- CORS
- dotenv

---

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
