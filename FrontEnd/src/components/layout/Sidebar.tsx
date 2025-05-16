
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  PlusCircle,
  Heart,
  BarChart,
  Phone,
  Info
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
    <aside className="bg-white border-r border-border w-16 md:w-64 flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <div className="bg-medical-600 text-white p-2 rounded-md hidden md:block transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
          <Heart className="h-5 w-5" />
        </div>
        <div className="flex items-center justify-center md:hidden transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
          <Heart className="h-6 w-6 text-medical-600" />
        </div>
        <h1 className="text-xl font-bold hidden md:block">Radiant Care</h1>
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
                      ? "bg-medical-50 text-medical-700" 
                      : "text-gray-600 hover:bg-gray-100 hover:translate-x-1 hover:shadow-sm"
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
      
      <div className="mt-auto p-4 border-t border-border">
        <Link 
          to="/settings" 
          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 hover:translate-x-1 rounded-md transition-all duration-200 hover:shadow-sm"
        >
          <Settings className="h-5 w-5 transition-transform duration-200 hover:rotate-45" />
          <span className="hidden md:inline">Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
