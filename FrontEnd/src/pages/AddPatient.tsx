import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PatientForm from '@/components/common/PatientForm';
import { usePatients } from '@/context/PatientContext';
import { PatientFormData } from '@/types/patient';

const AddPatient = () => {
  const { addPatient, loading } = usePatients();
  const navigate = useNavigate();

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 border-4 border-t-medical-600 border-medical-100 rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = async (data: PatientFormData) => {
    await addPatient(data);
    navigate('/patients', { replace: true });
  };

  return (
    <MainLayout>
      <PatientForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default AddPatient;
