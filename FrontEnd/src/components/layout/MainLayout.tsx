import React, { ReactNode, useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserCircle, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface MainLayoutProps {
  children?: ReactNode;
}

const PROFILES = [
  { name: 'Dr. Arnav', id: '4NI23CS027' },
  { name: 'Dr. Aryaman', id: '4NI23CS029' },
  { name: 'Dr. Bhawana', id: '4NI23CS031' },
  { name: 'Dr. Ashitta', id: '4NI23CS038' },
  { name: 'Dr. Chandu Bhavana', id: '4NI23CS041' },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Get location from router context
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showProfileList, setShowProfileList] = useState(false);
  const [operator, setOperator] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('operator');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.name) return parsed;
      } catch {}
    }
    return PROFILES[0];
  });
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);

  // Persist operator to localStorage
  useEffect(() => {
    localStorage.setItem('operator', JSON.stringify(operator));
  }, [operator]);

  // Click-away logic for popup
  useEffect(() => {
    if (!profileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
        setShowProfileList(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileMenuOpen]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 relative">
        {/* Profile Icon Top Right */}
        <div className="absolute right-6 top-6 z-50">
          <button
            className="flex items-center gap-2 rounded-full px-3 py-1 bg-gray-100 dark:bg-zinc-800 dark:text-zinc-100 shadow hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
            onClick={() => setProfileMenuOpen((v) => !v)}
          >
            <UserCircle className="h-7 w-7" />
            <span className="font-semibold text-base">{operator.name.split(' ')[1] || operator.name}</span>
          </button>
          {profileMenuOpen && (
            <div ref={popupRef} className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-border dark:border-zinc-800 p-4 text-sm animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <UserCircle className="h-10 w-10 text-medical-600" />
                <div>
                  <div className="font-bold text-lg dark:text-zinc-100">{operator.name}</div>
                  <div className="text-xs text-muted-foreground dark:text-zinc-300">ID: {operator.id}</div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mb-2 flex items-center justify-center gap-2 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => setShowProfileList((v) => !v)}
              >
                Switch Profile
              </Button>
              {showProfileList && (
                <div className="flex flex-col gap-1 mb-3">
                  {PROFILES.map((profile) => (
                    <button
                      key={profile.id}
                      disabled={profile.id === operator.id}
                      onClick={() => {
                        if (profile.id !== operator.id) {
                          setOperator(profile);
                          setShowProfileList(false);
                          setProfileMenuOpen(false);
                        }
                      }}
                      className={`flex items-center justify-between px-3 py-1 rounded-md transition text-left
                        ${profile.id === operator.id
                          ? 'bg-gray-200 text-gray-400 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed'
                          : 'hover:bg-medical-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-100'}
                      `}
                    >
                      <span>{profile.name}</span>
                      <span className="text-xs">{profile.id}</span>
                      {profile.id === operator.id && (
                        <span className="ml-2 text-xs italic">(You)</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
              <Button
                variant="ghost"
                className="w-full flex items-center justify-center gap-2 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => {
                  setProfileMenuOpen(false);
                  setShowProfileList(false);
                  navigate('/settings');
                }}
              >
                <SettingsIcon className="h-5 w-5" />
                Settings
              </Button>
            </div>
          )}
        </div>
        <header className="mb-6 fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">{pageTitle}</h1>
          <p className="text-muted-foreground mt-1 dark:text-zinc-300">
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
