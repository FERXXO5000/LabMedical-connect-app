
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Plus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/components/ui/use-toast';

interface Appointment {
  id: string;
  serviceType: string;
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
  doctorName?: string;
}

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt1',
      serviceType: 'Análisis de sangre',
      date: new Date(2025, 3, 15, 10, 30),
      status: 'upcoming',
      location: 'Sucursal Central - Consultorio 3',
      doctorName: 'Dr. Juan Pérez'
    },
    {
      id: 'apt2',
      serviceType: 'Chequeo general',
      date: new Date(2025, 3, 20, 9, 0),
      status: 'upcoming',
      location: 'Sucursal Norte - Consultorio 5'
    },
    {
      id: 'apt3',
      serviceType: 'Radiografía',
      date: new Date(2025, 2, 10, 14, 15),
      status: 'completed',
      location: 'Sucursal Central - Sala de rayos X',
      doctorName: 'Dra. María García'
    },
    {
      id: 'apt4',
      serviceType: 'Tomografía',
      date: new Date(2025, 2, 5, 16, 0),
      status: 'cancelled',
      location: 'Sucursal Sur - Piso 2',
    }
  ]);
  
  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    ));
    
    toast({
      title: "Cita cancelada",
      description: "La cita ha sido cancelada exitosamente",
    });
  };
  
  const handleRescheduleAppointment = (id: string) => {
    // TODO: Implement actual rescheduling functionality
    toast({
      title: "Próximamente",
      description: "La reprogramación de citas estará disponible pronto",
    });
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Próxima';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };
  
  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar title="Mis Citas" />
      
      <main className="labcenter-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-labcenter-gray-dark">
            Mis citas
          </h1>
          <Button
            onClick={() => navigate('/appointments/new')}
            className="labcenter-button-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nueva cita
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">
              Próximas ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Historial ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-labcenter-gray mb-4">No tienes citas programadas</p>
                <Button
                  onClick={() => navigate('/appointments/new')}
                  className="labcenter-button-primary"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Agendar una cita
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="labcenter-card">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-labcenter-gray-dark">
                        {appointment.serviceType}
                      </h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusBadgeClass(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">{getStatusText(appointment.status)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-labcenter-gray">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{format(appointment.date, "EEEE d 'de' MMMM, yyyy", { locale: es })}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-labcenter-gray">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{format(appointment.date, "h:mm a")}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-labcenter-gray">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{appointment.location}</span>
                      </div>
                      
                      {appointment.doctorName && (
                        <div className="text-sm text-labcenter-gray">
                          <span className="font-medium">{appointment.doctorName}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-labcenter-purple hover:bg-labcenter-purple-light"
                        onClick={() => handleRescheduleAppointment(appointment.id)}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Reprogramar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastAppointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-labcenter-gray">No tienes historial de citas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastAppointments.map(appointment => (
                  <div key={appointment.id} className="labcenter-card">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-labcenter-gray-dark">
                        {appointment.serviceType}
                      </h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusBadgeClass(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">{getStatusText(appointment.status)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-labcenter-gray">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{format(appointment.date, "EEEE d 'de' MMMM, yyyy", { locale: es })}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-labcenter-gray">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{format(appointment.date, "h:mm a")}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-labcenter-gray">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{appointment.location}</span>
                      </div>
                      
                      {appointment.doctorName && (
                        <div className="text-sm text-labcenter-gray">
                          <span className="font-medium">{appointment.doctorName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Appointments;
