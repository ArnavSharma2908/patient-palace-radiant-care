
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Get location from router context
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <header className="mb-6 fade-in">
          <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-muted-foreground mt-1">
            {getPageDescription(location.pathname)}
          </p>
        </header>
        <main className="fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

function getPageTitle(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/patients':
      return 'Patients';
    case '/patients/add':
      return 'Add New Patient';
    case '/stats':
      return 'Statistics';
    case '/contact':
      return 'Contact Us';
    case '/about':
      return 'About Us';
    default:
      if (pathname.startsWith('/patients/')) {
        return 'Patient Details';
      }
      return 'Radiant Care';
  }
}

function getPageDescription(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'Overview of patient management system';
    case '/patients':
      return 'View and manage your patients';
    case '/patients/add':
      return 'Create a new patient record';
    case '/stats':
      return 'Patient statistics and analytics';
    case '/contact':
      return 'Get in touch with Radiant Care Hospital';
    case '/about':
      return 'Learn more about our hospital, mission and team';
    default:
      if (pathname.startsWith('/patients/')) {
        return 'Detailed patient information';
      }
      return 'Patient Management System';
  }
}

export default MainLayout;
