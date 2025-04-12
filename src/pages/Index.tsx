
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirigir al inicio de sesión
    navigate('/login');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-labcenter-purple-light">
      <div className="text-center animate-pulse-slow">
        <h1 className="text-4xl font-bold mb-4 text-labcenter-purple">LabCenter</h1>
        <p className="text-xl text-labcenter-gray">Cargando la aplicación...</p>
      </div>
    </div>
  );
};

export default Index;
