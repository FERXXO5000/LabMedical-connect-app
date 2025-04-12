
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import TestResultCard, { TestResult } from '@/components/lab/TestResultCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const TestResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for test results
  const testResults: TestResult[] = [
    {
      id: 'res1',
      name: 'Hemograma completo',
      date: new Date(2025, 2, 15),
      status: 'completed',
      type: 'Análisis de sangre',
      fileUrl: '#'
    },
    {
      id: 'res2',
      name: 'Prueba de glucosa',
      date: new Date(2025, 2, 10),
      status: 'completed',
      type: 'Análisis de sangre',
      fileUrl: '#'
    },
    {
      id: 'res3',
      name: 'Perfil lipídico',
      date: new Date(2025, 2, 5),
      status: 'completed',
      type: 'Análisis de sangre',
      fileUrl: '#'
    },
    {
      id: 'res4',
      name: 'Tomografía abdominal',
      date: new Date(2025, 3, 20),
      status: 'pending',
      type: 'Imagenología'
    }
  ];
  
  const filteredResults = testResults.filter(result =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar title="Resultados" />
      
      <main className="labcenter-container">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-labcenter-gray-dark mb-4">
            Mis resultados
          </h1>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-labcenter-gray h-4 w-4" />
            <Input
              placeholder="Buscar resultados..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 form-input"
            />
          </div>
          
          {filteredResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-labcenter-gray">No se encontraron resultados</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredResults.map(result => (
                <TestResultCard key={result.id} result={result} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default TestResults;
