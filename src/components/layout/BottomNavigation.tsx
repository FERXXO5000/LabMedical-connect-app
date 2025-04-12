
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Flask, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { label: 'Inicio', icon: Home, path: '/dashboard' },
    { label: 'Citas', icon: Calendar, path: '/appointments' },
    { label: 'Resultados', icon: Flask, path: '/test-results' },
    { label: 'Alertas', icon: Bell, path: '/notifications' },
    { label: 'Perfil', icon: User, path: '/profile' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full text-xs',
                isActive 
                  ? 'text-labcenter-purple font-medium' 
                  : 'text-labcenter-gray hover:text-labcenter-purple-dark'
              )}
            >
              <item.icon className={cn('h-5 w-5 mb-1', isActive ? 'text-labcenter-purple' : 'text-labcenter-gray')} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
