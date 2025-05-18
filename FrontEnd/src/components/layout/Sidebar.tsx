import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  PlusCircle,
  Heart,
  BarChart,
  Phone,
  Info,
  Github
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Add Patient', href: '/patients/add', icon: PlusCircle },
    { name: 'Stats', href: '/stats', icon: BarChart },
    { name: 'Contact Us', href: '/contact', icon: Phone },
    { name: 'About Us', href: '/about', icon: Info },
  ];

  return (
    <aside className="bg-white border-r border-border w-16 md:w-64 flex flex-col transition-all duration-300 hover:shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
      <div className="p-4 border-b border-border flex items-center gap-2 dark:border-zinc-800">
        <div className="bg-medical-600 text-white p-2 rounded-md hidden md:block transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
          <Heart className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-center md:hidden transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
          <Heart className="h-6 w-6 text-medical-600" />
        </div>
        <h1 className="text-xl font-bold hidden md:block dark:text-zinc-100">Radiant Care</h1>
      </div>
      
      <nav className="mt-6 flex-1">
        <ul>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            
            return (
              <li key={link.name} className="px-2 py-1">
                <Link 
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                    isActive 
                      ? "bg-medical-50 text-medical-700 dark:bg-zinc-800 dark:text-medical-200" 
                      : "text-gray-600 hover:bg-gray-100 hover:translate-x-1 hover:shadow-sm dark:text-zinc-100 dark:hover:bg-zinc-800"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                    isActive ? "" : "group-hover:scale-110"
                  )} />
                  <span className="hidden md:inline group-hover:font-medium">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Persistent Github Button at the bottom */}
      <div className="sticky bottom-0 left-0 w-full z-50 flex flex-col items-start pl-4 pb-4 pt-2 bg-gradient-to-t from-white/95 dark:from-zinc-900/95 via-transparent">
        <a
          href="https://github.com/ArnavSharma2908/patient-palace-radiant-care"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-2 py-2 rounded-lg text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md hover:scale-105 hover:shadow-lg transition-all text-base font-semibold border border-gray-700 dark:border-zinc-700"
          style={{ minWidth: '56%', justifyContent: 'center' }}
        >
          <Github className="h-5 w-5 mr-1" />
          <span className="hidden md:inline">GitHub Repo</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
