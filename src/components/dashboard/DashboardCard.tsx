
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  path: string;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'red';
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  path,
  color = 'purple'
}) => {
  const navigate = useNavigate();
  
  const colorVariants = {
    purple: 'bg-labcenter-purple-light text-labcenter-purple',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
  };
  
  return (
    <div 
      onClick={() => navigate(path)}
      className="labcenter-card cursor-pointer"
    >
      <div className="flex items-start">
        <div className={cn(
          "p-3 rounded-lg mr-4",
          colorVariants[color]
        )}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-labcenter-gray-dark mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-labcenter-gray">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
