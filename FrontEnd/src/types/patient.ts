
export interface Patient {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  phoneNumber: string;
  bloodType: string;
  medicalConditions: string[];
  medications: string[];
  allergies: string[];
  registrationDate: string;
  lastVisit?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
    expirationDate?: string;
  };
  vitalSigns?: {
    height?: string;
    weight?: string;
    bloodPressure?: string;
    temperature?: string;
    pulseRate?: string;
    respiratoryRate?: string;
    oxygenSaturation?: string;
    recordedDate: string;
  }[];
  treatmentHistory?: {
    date: string;
    diagnosis: string;
    treatment: string;
    doctor: string;
    notes?: string;
  }[];
  notes?: string;
}

export interface PatientFormData {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  phoneNumber?: string;
  bloodType: string;
  medicalConditions?: string;
  medications?: string;
  allergies?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
    expirationDate?: string;
  };
  notes?: string;
}

export interface PatientStats {
  totalPatients: number;
  genderDistribution: {
    male: number;
    female: number;
    other: number;
  };
  ageDistribution: {
    under18: number;
    age18to30: number;
    age31to45: number;
    age46to60: number;
    over60: number;
  };
  bloodTypeDistribution: Record<string, number>;
  commonConditions: { condition: string; count: number }[];
}
