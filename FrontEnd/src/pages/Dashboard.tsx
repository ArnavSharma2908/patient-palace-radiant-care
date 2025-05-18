import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import { usePatients } from '@/context/PatientContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, UserPlus, CalendarDays, UserCheck } from 'lucide-react';

const Dashboard = () => {
  const { patients, loading } = usePatients();
  const today = new Date();
  
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const patientsThisMonth = patients.filter(patient => {
    const regDate = new Date(patient.registrationDate);
    return regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear;
  }).length;

  const lastThirtyDays = new Date(today);
  lastThirtyDays.setDate(today.getDate() - 30);
  
  const recentActive = patients.filter(patient => {
    if (!patient.lastVisit) return false;
    const lastVisit = new Date(patient.lastVisit);
    return lastVisit >= lastThirtyDays;
  }).length;

  if (loading && patients.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="h-16 w-16 mx-auto mb-4 border-4 border-t-medical-600 border-medical-100 rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:gap-8">
      <div className="rounded-xl overflow-hidden relative h-40 md:h-64 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C]/80 to-[#1A1F2C]/40 z-20"></div>
        <div className="absolute inset-0 backdrop-blur-[1.5px] z-10"></div>
        <img 
          src="/images/HealthCare Stock Photo.png" 
          alt="Healthcare professional holding patient's hand" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center z-30 px-6 md:px-8">
          <div className="max-w-md">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Welcome to Radiant Care</h2>
            <p className="text-white/90 text-sm md:text-base">Providing exceptional healthcare with compassion and expertise</p>
          </div>
        </div>
      </div>
      
      <div className="bg-medical-50 rounded-xl p-6 fade-in dark:bg-[#1a2130]">
        <h2 className="text-lg font-medium mb-4 dark:text-zinc-100">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/patients/add">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Patient
            </Button>
          </Link>
          <Link to="/patients">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              View All Patients
            </Button>
          </Link>
          <Link to="/stats">
            <Button variant="outline">
              <UserCheck className="h-4 w-4 mr-2" />
              View Statistics
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Patients"
          value={patients.length}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="New Patients"
          value={patientsThisMonth}
          icon={UserPlus}
          description="This month"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Active Patients"
          value={recentActive}
          icon={UserCheck}
          description="Last 30 days"
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Scheduled Visits"
          value={8}
          icon={CalendarDays}
          description="Next 7 days"
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      <div className="grid md:grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.slice(0, 5).map((patient) => (
                <div key={patient.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center text-medical-600">
                      {patient.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Added: {new Date(patient.registrationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link to={`/patients/${patient.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
