
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Info } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface LabTest {
  id: string;
  name: string;
  description: string;
  price: number;
  requiresFasting: boolean;
  category: string;
  preparationInstructions?: string;
  sampleType: string;
  processingTime: string;
}

const LaboratoryTests: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [fastingFilter, setFastingFilter] = useState<boolean | null>(null);
  
  // Mock data for laboratory tests
  const labTests: LabTest[] = [
    {
      id: '1',
      name: 'Hemograma completo',
      description: 'Análisis completo de células sanguíneas',
      price: 45,
      requiresFasting: false,
      category: 'Hematología',
      sampleType: 'Sangre',
      processingTime: '24 horas'
    },
    {
      id: '2',
      name: 'Glucosa en sangre',
      description: 'Medición de niveles de glucosa',
      price: 25,
      requiresFasting: true,
      preparationInstructions: 'Ayuno de 8 horas, solo agua permitida',
      category: 'Bioquímica',
      sampleType: 'Sangre',
      processingTime: '24 horas'
    },
    {
      id: '3',
      name: 'Perfil lipídico',
      description: 'Medición de colesterol y triglicéridos',
      price: 80,
      requiresFasting: true,
      preparationInstructions: 'Ayuno de 12 horas, solo agua permitida',
      category: 'Bioquímica',
      sampleType: 'Sangre',
      processingTime: '24 horas'
    },
    {
      id: '4',
      name: 'Análisis de orina',
      description: 'Evaluación de componentes de la orina',
      price: 30,
      requiresFasting: false,
      category: 'Uroanálisis',
      sampleType: 'Orina',
      processingTime: '24 horas'
    },
    {
      id: '5',
      name: 'Prueba de función tiroidea',
      description: 'Evaluación de la función de la glándula tiroides',
      price: 120,
      requiresFasting: false,
      category: 'Endocrinología',
      sampleType: 'Sangre',
      processingTime: '48 horas'
    },
    {
      id: '6',
      name: 'Prueba COVID-19 PCR',
      description: 'Detección de COVID-19 mediante PCR',
      price: 180,
      requiresFasting: false,
      category: 'Microbiología',
      sampleType: 'Hisopado nasofaríngeo',
      processingTime: '24-48 horas'
    }
  ];
  
  const categories = ['all', ...Array.from(new Set(labTests.map(test => test.category)))];
  
  // Filter tests based on search, category, and fasting requirement
  const filteredTests = labTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    const matchesFasting = fastingFilter === null || test.requiresFasting === fastingFilter;
    
    return matchesSearch && matchesCategory && matchesFasting;
  });
  
  const handleTestClick = (testId: string) => {
    // In a real application, navigate to test details or add to cart
    console.log('Test selected:', testId);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar title="Análisis de Laboratorio" />
      
      <main className="labcenter-container">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-labcenter-gray-dark mb-4">
            Catálogo de Análisis
          </h1>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-labcenter-gray h-4 w-4" />
            <Input
              placeholder="Buscar análisis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 form-input"
            />
          </div>
          
          <Tabs defaultValue="filters" className="w-full mb-4">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="filters">Filtros</TabsTrigger>
              <TabsTrigger value="view">Vista</TabsTrigger>
            </TabsList>
            <TabsContent value="filters" className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium mb-2">Categoría</p>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'Todas las categorías' : category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Requisito de ayuno</p>
                  <select 
                    value={fastingFilter === null ? 'all' : fastingFilter ? 'yes' : 'no'}
                    onChange={(e) => {
                      if (e.target.value === 'all') setFastingFilter(null);
                      else if (e.target.value === 'yes') setFastingFilter(true);
                      else setFastingFilter(false);
                    }}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="all">Todos</option>
                    <option value="yes">Requiere ayuno</option>
                    <option value="no">No requiere ayuno</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="view">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  className={`${!searchQuery && selectedCategory === 'all' && fastingFilter === null ? 'bg-labcenter-purple-light text-labcenter-purple' : ''}`}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setFastingFilter(null);
                  }}
                >
                  Ver todos
                </Button>
                <Button
                  variant="outline"
                  className={`${fastingFilter === true ? 'bg-labcenter-purple-light text-labcenter-purple' : ''}`}
                  onClick={() => setFastingFilter(true)}
                >
                  Con ayuno
                </Button>
                <Button
                  variant="outline"
                  className={`${fastingFilter === false ? 'bg-labcenter-purple-light text-labcenter-purple' : ''}`}
                  onClick={() => setFastingFilter(false)}
                >
                  Sin ayuno
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {filteredTests.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-labcenter-gray">No se encontraron análisis con los criterios seleccionados</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredTests.map(test => (
                <AccordionItem key={test.id} value={test.id}>
                  <AccordionTrigger className="hover:no-underline bg-white rounded-t-lg shadow-sm px-4">
                    <div className="flex flex-col items-start text-left">
                      <span className="font-semibold">{test.name}</span>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-labcenter-gray mr-4">
                          S/ {test.price.toFixed(2)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${test.requiresFasting ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                          {test.requiresFasting ? 'Requiere ayuno' : 'Sin ayuno'}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white rounded-b-lg shadow-sm px-4 pb-4 mb-2">
                    <div className="pt-2 space-y-2">
                      <p className="text-sm text-labcenter-gray-dark">{test.description}</p>
                      
                      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                        <p className="text-sm"><span className="font-medium">Categoría:</span> {test.category}</p>
                        <p className="text-sm"><span className="font-medium">Tipo de muestra:</span> {test.sampleType}</p>
                        <p className="text-sm"><span className="font-medium">Tiempo de procesamiento:</span> {test.processingTime}</p>
                        
                        {test.requiresFasting && test.preparationInstructions && (
                          <div className="flex items-start mt-2">
                            <Info className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800">{test.preparationInstructions}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={() => handleTestClick(test.id)}
                          className="bg-labcenter-purple hover:bg-labcenter-purple-dark"
                        >
                          Programar
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default LaboratoryTests;
