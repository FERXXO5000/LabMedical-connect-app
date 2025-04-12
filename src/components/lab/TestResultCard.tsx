
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export interface TestResult {
  id: string;
  name: string;
  date: Date;
  status: 'pending' | 'completed';
  type: string;
  fileUrl?: string;
}

interface TestResultCardProps {
  result: TestResult;
}

const TestResultCard: React.FC<TestResultCardProps> = ({ result }) => {
  const navigate = useNavigate();
  
  const statusColors = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
  };
  
  const statusText = {
    pending: 'Pendiente',
    completed: 'Completado',
  };
  
  const handleViewDetails = () => {
    navigate(`/test-results/${result.id}`);
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement actual download functionality
    console.log('Downloading result:', result.id);
  };
  
  return (
    <div className="labcenter-card cursor-pointer mb-4" onClick={handleViewDetails}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-2">
            <FileText className="h-5 w-5 mr-2 text-labcenter-purple" />
            <h3 className="font-medium text-labcenter-gray-dark">{result.name}</h3>
          </div>
          <p className="text-sm text-labcenter-gray mb-1">
            {format(result.date, "d 'de' MMMM, yyyy", { locale: es })}
          </p>
          <p className="text-xs text-labcenter-gray mb-3">Tipo: {result.type}</p>
          <div className={cn(
            "inline-block px-2 py-1 rounded-full text-xs font-medium border",
            statusColors[result.status]
          )}>
            {statusText[result.status]}
          </div>
        </div>
        
        <div>
          {result.status === 'completed' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              className="text-labcenter-purple hover:text-labcenter-purple-dark hover:bg-labcenter-purple-light"
            >
              <Download className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {result.status === 'completed' && (
        <div className="mt-4 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-labcenter-purple hover:bg-labcenter-purple-light"
            onClick={handleViewDetails}
          >
            <span className="mr-1">Ver detalles</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestResultCard;
