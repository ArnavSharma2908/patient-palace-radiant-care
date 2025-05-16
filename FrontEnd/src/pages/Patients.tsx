import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { usePatients } from '@/context/PatientContext';
import PatientCard from '@/components/common/PatientCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Users } from 'lucide-react';

const Patients = () => {
  const { patients, loading } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.phoneNumber && patient.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (Array.isArray(patient.medicalConditions) ? patient.medicalConditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    ) : false)
  );

  if (loading && patients.length === 0) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 border-4 border-t-medical-600 border-medical-100 rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading patients...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!loading && patients.length === 0) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-medium text-lg">No patients yet</h3>
            <p className="text-muted-foreground">
              Get started by adding your first patient
            </p>
            <Link to="/patients/add">
              <Button className="mt-4">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Your First Patient
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-medical-600 group-focus-within:text-medical-700 transition-colors" />
            <Input
              placeholder="Search patients..."
              className="pl-10 rounded-lg border-medical-200 focus:border-medical-600 focus:ring-2 focus:ring-medical-100 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/patients/add">
            <Button className="bg-medical-600 hover:bg-medical-700 text-white font-semibold shadow-md transition-colors">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </Link>
        </div>

        {filteredPatients.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-medical-50/50 animate-fade-in">
            {searchTerm ? (
              <div>
                <Users className="h-10 w-10 mx-auto text-medical-400 mb-2" />
                <h3 className="font-medium text-lg">No matching patients</h3>
                <p className="text-muted-foreground">
                  Try a different search term or clear your search
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')} 
                  className="mt-4 border-medical-200 hover:border-medical-400"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div>
                <Users className="h-10 w-10 mx-auto text-medical-400 mb-2" />
                <h3 className="font-medium text-lg">No patients yet</h3>
                <p className="text-muted-foreground">
                  Get started by adding your first patient
                </p>
                <Link to="/patients/add">
                  <Button className="mt-4 bg-medical-600 hover:bg-medical-700 text-white font-semibold">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Your First Patient
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Patients;
