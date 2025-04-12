
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { Calendar, TestTube, Bell, User, Clipboard, Search, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  const userName = "Juan"; // TODO: Get from auth
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar />
      
      <main className="labcenter-container">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-labcenter-gray-dark mb-1">
            Hola, {userName}
          </h1>
          <p className="text-labcenter-gray">
            Bienvenido a tu portal de LabCenter
          </p>
        </div>
        
        <div className="bg-labcenter-purple rounded-xl p-4 mb-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium mb-1">Agenda tu próxima cita</h2>
              <p className="text-sm opacity-90">Rápido y sencillo</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={() => window.location.href = '/appointments/new'}
            >
              Agendar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          <DashboardCard
            title="Mis citas"
            description="Gestiona tus próximas visitas"
            icon={<Calendar className="h-6 w-6" />}
            path="/appointments"
            color="purple"
          />
          
          <DashboardCard
            title="Resultados de laboratorio"
            description="Accede a tus análisis recientes"
            icon={<TestTube className="h-6 w-6" />}
            path="/test-results"
            color="blue"
          />
          
          <DashboardCard
            title="Notificaciones"
            description="Mantente informado de importantes novedades"
            icon={<Bell className="h-6 w-6" />}
            path="/notifications"
            color="orange"
          />
          
          <DashboardCard
            title="Mi perfil médico"
            description="Gestiona tu información personal"
            icon={<User className="h-6 w-6" />}
            path="/profile"
            color="green"
          />
          
          <DashboardCard
            title="Historial médico"
            description="Revisa tu historial clínico completo"
            icon={<Clipboard className="h-6 w-6" />}
            path="/medical-history"
            color="red"
          />
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-labcenter-gray-dark mb-4">
            Acceso rápido
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 border-labcenter-gray-light hover:bg-labcenter-purple-light"
              onClick={() => window.location.href = '/search'}
            >
              <Search className="h-6 w-6 mb-2 text-labcenter-purple" />
              <span>Buscar servicios</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col h-auto py-4 border-labcenter-gray-light hover:bg-labcenter-purple-light"
              onClick={() => window.location.href = '/health-tracking'}
            >
              <Activity className="h-6 w-6 mb-2 text-labcenter-purple" />
              <span>Seguimiento de salud</span>
            </Button>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
