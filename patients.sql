-- patients.sql
-- SQL script to create the Patients table for Patient Palace Radiant Care

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
