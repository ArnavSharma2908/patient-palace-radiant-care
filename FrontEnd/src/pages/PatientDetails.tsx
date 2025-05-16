import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { usePatients } from '@/context/PatientContext';
import { PatientFormData } from '@/types/patient';
import PatientForm from '@/components/common/PatientForm';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User,
  Phone, 
  Calendar, 
  Heart, 
  Stethoscope, 
  AlertTriangle, 
  Pill, 
  Edit, 
  Trash, 
  UserCog
} from 'lucide-react';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getPatient, deletePatient, updatePatient, loading } = usePatients();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const patient = getPatient(id || '');

  // Show loading spinner if patient is not found and context is still loading
  if (!patient && loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 border-4 border-t-medical-600 border-medical-100 rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading patient details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!patient) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h3 className="font-medium text-lg">Patient not found</h3>
          <p className="text-muted-foreground mb-4">
            The patient you are looking for does not exist or has been removed
          </p>
          <Button onClick={() => navigate('/patients')}>Back to Patients</Button>
        </div>
      </MainLayout>
    );
  }

  const handleDelete = async () => {
    await deletePatient(patient.id);
    navigate('/patients');
  };

  const handleUpdate = async (data: PatientFormData) => {
    await updatePatient(patient.id, data);
    setIsEditing(false);
    setTimeout(() => navigate('/patients'), 300);
  };

  // Convert patient data to form data format
  const patientFormData: PatientFormData = {
    name: patient.name,
    gender: patient.gender,
    dateOfBirth: patient.dateOfBirth,
    phoneNumber: patient.phoneNumber,
    bloodType: patient.bloodType,
    medicalConditions: patient.medicalConditions?.join(', '),
    medications: patient.medications?.join(', '),
    allergies: patient.allergies?.join(', '),
    notes: patient.notes,
  };

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

  if (isEditing) {
    return (
      <MainLayout>
        <div className="mb-6 flex justify-between">
          <h1 className="text-2xl font-bold">Edit Patient</h1>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
        <PatientForm 
          defaultValues={patientFormData} 
          onSubmit={handleUpdate}
          isEditing={true}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-medical-100 text-medical-600 rounded-full flex items-center justify-center">
                {patient.name[0].toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              {patient.bloodType && (
                <Badge variant="outline" className="text-red-500 border-red-200">
                  <Heart className="h-3 w-3 mr-1 fill-current" />
                  {patient.bloodType}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              Patient ID: {patient.id.substring(0, 8)}
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button 
              variant="outline" 
              className="flex-1 md:flex-none"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="flex-1 md:flex-none"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete the patient record for {patient.name}.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical">Medical Info</TabsTrigger>
            <TabsTrigger value="visits">Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p>{patient.gender}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p>{new Date(patient.dateOfBirth).toLocaleDateString()} ({calculateAge(patient.dateOfBirth)} years)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{patient.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Stethoscope className="h-5 w-5 text-medical-600" />
                      <h3 className="font-medium">Medical Conditions</h3>
                    </div>
                    {patient.medicalConditions && patient.medicalConditions.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.medicalConditions.map((condition, index) => (
                          <Badge key={index} variant="secondary">{condition}</Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">No medical conditions recorded</p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="h-5 w-5 text-medical-600" />
                      <h3 className="font-medium">Current Medications</h3>
                    </div>
                    {patient.medications && patient.medications.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {patient.medications.map((medication, index) => (
                          <li key={index}>{medication}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground italic">No medications recorded</p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-medical-600" />
                      <h3 className="font-medium">Allergies</h3>
                    </div>
                    {patient.allergies && patient.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {patient.allergies.map((allergy, index) => (
                          <Badge key={index} variant="outline" className="text-red-500 border-red-200">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">No known allergies</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.notes ? (
                  <p className="whitespace-pre-line">{patient.notes}</p>
                ) : (
                  <p className="text-muted-foreground italic">No notes recorded</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visits">
            <Card>
              <CardHeader>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>
                  Record of all patient visits and treatments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <UserCog className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium text-lg">No visit records yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    This feature will be available in the next version of Radiant Care.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PatientDetails;
