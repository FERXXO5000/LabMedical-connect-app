
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

const PatientForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    documentId: '',
    phoneNumber: '',
    email: '',
    address: '',
    bloodType: '',
    isLoading: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // TODO: Implement actual patient registration logic
      // For now, we'll just simulate a successful registration
      setTimeout(() => {
        toast({
          title: "Registro exitoso",
          description: "Paciente registrado correctamente",
        });
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error en el registro",
        description: "No se pudo registrar al paciente",
        variant: "destructive",
      });
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-16">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nombre completo</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formState.fullName}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Fecha de nacimiento</Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formState.dateOfBirth}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gender">Género</Label>
        <Select 
          value={formState.gender} 
          onValueChange={(value) => handleSelectChange('gender', value)}
        >
          <SelectTrigger className="form-input">
            <SelectValue placeholder="Seleccionar género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Masculino</SelectItem>
            <SelectItem value="female">Femenino</SelectItem>
            <SelectItem value="other">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="documentId">Documento de identidad</Label>
        <Input
          id="documentId"
          name="documentId"
          value={formState.documentId}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Teléfono</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formState.phoneNumber}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          name="address"
          value={formState.address}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bloodType">Tipo de sangre</Label>
        <Select 
          value={formState.bloodType} 
          onValueChange={(value) => handleSelectChange('bloodType', value)}
        >
          <SelectTrigger className="form-input">
            <SelectValue placeholder="Seleccionar tipo de sangre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit"
          className="w-full labcenter-button-primary"
          disabled={formState.isLoading}
        >
          {formState.isLoading ? "Registrando..." : "Registrar paciente"}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;
