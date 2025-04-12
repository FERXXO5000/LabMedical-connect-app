
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    isLoading: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
    } else {
      setFormState(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formState.password !== formState.confirmPassword) {
      toast({
        title: "Error en el registro",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }
    
    setFormState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // TODO: Implement actual registration logic
      // For now, we'll just simulate a successful registration
      setTimeout(() => {
        toast({
          title: "Registro exitoso",
          description: "Bienvenido a LabCenter",
        });
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error en el registro",
        description: "No se pudo completar el registro. Intente nuevamente",
        variant: "destructive",
      });
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Tu nombre completo"
          value={formState.name}
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
          placeholder="tucorreo@ejemplo.com"
          value={formState.email}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={formState.showPassword ? "text" : "password"}
            placeholder="Tu contraseña"
            value={formState.password}
            onChange={handleInputChange}
            required
            className="form-input pr-10"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('password')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-labcenter-gray"
          >
            {formState.showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={formState.showConfirmPassword ? "text" : "password"}
            placeholder="Confirma tu contraseña"
            value={formState.confirmPassword}
            onChange={handleInputChange}
            required
            className="form-input pr-10"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirmPassword')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-labcenter-gray"
          >
            {formState.showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit"
        className="w-full labcenter-button-primary"
        disabled={formState.isLoading}
      >
        {formState.isLoading ? "Registrando..." : "Registrarse"}
      </Button>
      
      <div className="text-center">
        <span className="text-sm text-labcenter-gray">¿Ya tienes una cuenta? </span>
        <a 
          href="/login"
          className="text-sm text-labcenter-purple hover:underline"
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          Iniciar sesión
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
