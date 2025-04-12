
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle, Edit, Shield, Key, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Juan Perez",
    email: "juan@ejemplo.com",
    phone: "+591 77123456",
    documentId: "1234567",
    birthDate: "1990-05-15",
    address: "Calle Principal #123, La Paz"
  });
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Perfil actualizado",
      description: "Tu información ha sido actualizada correctamente",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogout = () => {
    // TODO: Implement actual logout functionality
    window.location.href = '/login';
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar title="Mi Perfil" />
      
      <main className="labcenter-container">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-labcenter-purple-light rounded-full p-4 mb-3">
            <UserCircle className="h-20 w-20 text-labcenter-purple" />
          </div>
          <h1 className="text-xl font-bold text-labcenter-gray-dark">
            {userData.name}
          </h1>
          <p className="text-labcenter-gray text-sm">
            {userData.email}
          </p>
          <Badge variant="outline" className="mt-2 bg-labcenter-purple-light text-labcenter-purple">
            Paciente
          </Badge>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Información personal</CardTitle>
              {!isEditing && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditing(true)}
                  className="text-labcenter-gray hover:text-labcenter-purple"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardDescription>
              Tus datos personales en LabCenter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-3 text-sm">
                  <div className="text-labcenter-gray">Documento:</div>
                  <div className="col-span-2 font-medium">{userData.documentId}</div>
                </div>
                
                <div className="grid grid-cols-3 text-sm">
                  <div className="text-labcenter-gray">Teléfono:</div>
                  <div className="col-span-2 font-medium">{userData.phone}</div>
                </div>
                
                <div className="grid grid-cols-3 text-sm">
                  <div className="text-labcenter-gray">Fecha de nac.:</div>
                  <div className="col-span-2 font-medium">{userData.birthDate}</div>
                </div>
                
                <div className="grid grid-cols-3 text-sm">
                  <div className="text-labcenter-gray">Dirección:</div>
                  <div className="col-span-2 font-medium">{userData.address}</div>
                </div>
              </div>
            )}
          </CardContent>
          {isEditing && (
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="labcenter-button-primary"
                onClick={handleSaveProfile}
              >
                Guardar cambios
              </Button>
            </CardFooter>
          )}
        </Card>
        
        <div className="space-y-3 mb-6">
          <Button 
            variant="outline" 
            className="w-full justify-start text-labcenter-gray-dark"
            onClick={() => {
              toast({
                title: "Próximamente",
                description: "Esta función estará disponible pronto"
              });
            }}
          >
            <Key className="mr-2 h-4 w-4" />
            Cambiar contraseña
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-labcenter-gray-dark"
            onClick={() => {
              toast({
                title: "Próximamente",
                description: "Esta función estará disponible pronto"
              });
            }}
          >
            <Shield className="mr-2 h-4 w-4" />
            Privacidad y seguridad
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-500"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
