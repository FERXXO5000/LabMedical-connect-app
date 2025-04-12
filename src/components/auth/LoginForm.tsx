
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    showPassword: false,
    isLoading: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const togglePasswordVisibility = () => {
    setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // TODO: Implement actual authentication logic
      // For now, we'll just simulate a successful login
      setTimeout(() => {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a LabCenter",
        });
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: "Por favor verifica tus credenciales",
        variant: "destructive",
      });
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            onClick={togglePasswordVisibility}
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
      
      <div className="text-right">
        <a 
          href="#" 
          className="text-sm text-labcenter-purple hover:underline"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Implement forgot password
            toast({
              title: "Función no disponible",
              description: "La recuperación de contraseña estará disponible próximamente",
            });
          }}
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      
      <Button 
        type="submit"
        className="w-full labcenter-button-primary"
        disabled={formState.isLoading}
      >
        {formState.isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
      
      <div className="text-center">
        <span className="text-sm text-labcenter-gray">¿No tienes una cuenta? </span>
        <a 
          href="/register"
          className="text-sm text-labcenter-purple hover:underline"
          onClick={(e) => {
            e.preventDefault();
            navigate('/register');
          }}
        >
          Regístrate
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
