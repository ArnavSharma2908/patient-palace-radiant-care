import React from 'react';
import { Patient } from '@/types/patient';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarDays, User, Phone, Heart } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  // Calculate age from DOB
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <Card className="card-hover overflow-hidden">
      <div className="bg-gradient-to-r from-medical-500 to-medical-600 h-2"></div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-medical-50 p-3 rounded-full text-medical-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-lg mb-1 dark:text-zinc-100">{patient.name}</div>
              <p className="text-sm text-gray-500">
                {patient.gender}, {calculateAge(patient.dateOfBirth)} years
              </p>
            </div>
          </div>
          {patient.bloodType && (
            <Badge variant="outline" className="font-bold">
              <Heart className="h-3 w-3 mr-1 text-red-500" />
              {patient.bloodType}
            </Badge>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            {patient.phoneNumber}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
            Last visit: {patient.lastVisit || 'None recorded'}
          </div>
        </div>
        {patient.medicalConditions && patient.medicalConditions.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {patient.medicalConditions.slice(0, 2).map((condition, index) => (
                <Badge key={index} variant="secondary">
                  {condition}
                </Badge>
              ))}
              {patient.medicalConditions.length > 2 && (
                <Badge variant="secondary">+{patient.medicalConditions.length - 2}</Badge>
              )}
            </div>
          </div>
        )}
        <div className="mt-5 flex justify-end">
          <Link to={`/patients/${patient.id}`}>
            <Button variant="default" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
