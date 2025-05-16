import React, { useMemo } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { usePatients } from '@/context/PatientContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  XAxis, YAxis, 
  Tooltip, ResponsiveContainer, 
  CartesianGrid, 
  PieChart, Pie, Cell, 
  Legend
} from 'recharts';

const Stats = () => {
  const { patients, loading } = usePatients();

  const diseaseData = useMemo(() => {
    const conditionCounts = new Map();
    
    patients.forEach(patient => {
      if (patient.medicalConditions && Array.isArray(patient.medicalConditions)) {
        patient.medicalConditions.forEach(condition => {
          if (condition) {
            const count = conditionCounts.get(condition) || 0;
            conditionCounts.set(condition, count + 1);
          }
        });
      }
    });
    
    return Array.from(conditionCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [patients]);

  const bloodTypeData = useMemo(() => {
    const bloodCounts = new Map();
    
    patients.forEach(patient => {
      if (patient.bloodType) {
        const count = bloodCounts.get(patient.bloodType) || 0;
        bloodCounts.set(patient.bloodType, count + 1);
      }
    });
    
    return Array.from(bloodCounts.entries())
      .map(([name, value]) => ({ name, value }));
  }, [patients]);

  const genderData = useMemo(() => {
    const genderCounts = new Map();
    
    patients.forEach(patient => {
      const count = genderCounts.get(patient.gender) || 0;
      genderCounts.set(patient.gender, count + 1);
    });
    
    return Array.from(genderCounts.entries())
      .map(([name, value]) => ({ name, value }));
  }, [patients]);

  const ageGroupData = useMemo(() => {
    const ageGroups = {
      '0-18': 0,
      '19-35': 0,
      '36-50': 0,
      '51-65': 0,
      '65+': 0
    };
    
    patients.forEach(patient => {
      const birthDate = new Date(patient.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      
      if (today.getMonth() < birthDate.getMonth() || 
          (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age <= 18) ageGroups['0-18']++;
      else if (age <= 35) ageGroups['19-35']++;
      else if (age <= 50) ageGroups['36-50']++;
      else if (age <= 65) ageGroups['51-65']++;
      else ageGroups['65+']++;
    });
    
    return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
  }, [patients]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a163f7', '#f763a1'];

  if (loading && patients.length === 0) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 border-4 border-t-medical-600 border-medical-100 rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading statistics...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Patient Statistics</h1>
        <p className="text-muted-foreground">Visualization of patient data across various metrics</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Medical Conditions Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {diseaseData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={diseaseData} margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis 
                      allowDecimals={false} 
                      label={{ value: 'Number of Patients', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                      name="Patients"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No medical conditions data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Blood Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              {bloodTypeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bloodTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {bloodTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No blood type data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Age Group Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageGroupData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                  <Bar dataKey="value" name="Patients" fill="#8884d8">
                    {ageGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Stats;
