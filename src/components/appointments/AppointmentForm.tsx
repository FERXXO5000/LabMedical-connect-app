
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock } from 'lucide-react';

const AppointmentForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    serviceType: '',
    date: '',
    time: '',
    doctorId: '',
    notes: '',
    isLoading: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // TODO: Implement actual appointment scheduling logic
      // For now, we'll just simulate a successful scheduling
      setTimeout(() => {
        toast({
          title: "Cita agendada",
          description: "Tu cita ha sido agendada exitosamente",
        });
        navigate('/appointments');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error al agendar",
        description: "No se pudo agendar la cita. Intente nuevamente",
        variant: "destructive",
      });
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  // Mock data for services
  const serviceTypes = [
    { id: 'blood-test', name: 'Análisis de sangre' },
    { id: 'urine-test', name: 'Análisis de orina' },
    { id: 'covid-test', name: 'Prueba COVID-19' },
    { id: 'general-checkup', name: 'Chequeo general' },
    { id: 'specialized-test', name: 'Pruebas especializadas' },
  ];
  
  // Mock data for doctors
  const doctors = [
    { id: 'doc1', name: 'Dr. Juan Pérez' },
    { id: 'doc2', name: 'Dra. María García' },
    { id: 'doc3', name: 'Dr. Carlos Rodríguez' },
  ];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-16">
      <div className="space-y-2">
        <Label htmlFor="serviceType">Tipo de servicio</Label>
        <Select 
          value={formState.serviceType} 
          onValueChange={(value) => handleSelectChange('serviceType', value)}
          required
        >
          <SelectTrigger className="form-input">
            <SelectValue placeholder="Seleccionar servicio" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypes.map(service => (
              <SelectItem key={service.id} value={service.id}>
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date">Fecha</Label>
        <div className="relative">
          <Input
            id="date"
            name="date"
            type="date"
            value={formState.date}
            onChange={handleInputChange}
            required
            className="form-input pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-labcenter-gray">
            <Calendar className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="time">Hora</Label>
        <div className="relative">
          <Input
            id="time"
            name="time"
            type="time"
            value={formState.time}
            onChange={handleInputChange}
            required
            className="form-input pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-labcenter-gray">
            <Clock className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="doctorId">Doctor</Label>
        <Select 
          value={formState.doctorId} 
          onValueChange={(value) => handleSelectChange('doctorId', value)}
        >
          <SelectTrigger className="form-input">
            <SelectValue placeholder="Seleccionar doctor (opcional)" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map(doctor => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notas adicionales</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Incluya cualquier información adicional relevante"
          value={formState.notes}
          onChange={handleInputChange}
          className="form-input min-h-24"
        />
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit"
          className="w-full labcenter-button-primary"
          disabled={formState.isLoading}
        >
          {formState.isLoading ? "Agendando..." : "Agendar cita"}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
