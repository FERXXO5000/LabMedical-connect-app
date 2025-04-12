
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { Flask } from 'lucide-react';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50">
      <div className="labcenter-container py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-labcenter-purple rounded-full p-3">
              <Flask className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-labcenter-purple mb-2">LabCenter</h1>
          <p className="text-labcenter-gray">Gestión y resultados de laboratorio</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-labcenter-gray-dark mb-6 text-center">
            Crear cuenta
          </h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
