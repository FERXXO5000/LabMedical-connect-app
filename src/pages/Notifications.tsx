
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { 
  Calendar, 
  FileText, 
  AlertCircle, 
  Bell, 
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  type: 'appointment' | 'result' | 'reminder' | 'alert';
  read: boolean;
}

const Notifications: React.FC = () => {
  const { toast } = useToast();
  
  // Mock data for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'not1',
      title: 'Cita confirmada',
      message: 'Tu cita para análisis de sangre ha sido confirmada para el 15 de abril.',
      date: new Date(2025, 3, 10, 9, 30),
      type: 'appointment',
      read: false
    },
    {
      id: 'not2',
      title: 'Resultados disponibles',
      message: 'Los resultados de tu hemograma completo ya están disponibles.',
      date: new Date(2025, 3, 8, 14, 15),
      type: 'result',
      read: false
    },
    {
      id: 'not3',
      title: 'Recordatorio de cita',
      message: 'Recuerda tu cita de mañana a las 10:30 AM para chequeo general.',
      date: new Date(2025, 3, 7, 10, 0),
      type: 'reminder',
      read: true
    },
    {
      id: 'not4',
      title: 'Información importante',
      message: 'Hemos actualizado nuestras políticas de privacidad.',
      date: new Date(2025, 3, 5, 16, 45),
      type: 'alert',
      read: true
    }
  ]);
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(not => ({ ...not, read: true })));
    toast({
      title: "Notificaciones leídas",
      description: "Todas las notificaciones han sido marcadas como leídas"
    });
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(not => 
      not.id === id ? { ...not, read: true } : not
    ));
  };
  
  const handleDeleteAll = () => {
    setNotifications([]);
    toast({
      title: "Notificaciones eliminadas",
      description: "Todas las notificaciones han sido eliminadas"
    });
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'result':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'reminder':
        return <Bell className="h-5 w-5 text-amber-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-labcenter-gray" />;
    }
  };
  
  const unreadCount = notifications.filter(not => !not.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar title="Notificaciones" />
      
      <main className="labcenter-container">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-labcenter-gray-dark">
            Notificaciones
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-labcenter-purple rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <div className="flex space-x-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-labcenter-purple hover:bg-labcenter-purple-light"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                <span className="text-xs">Marcar todo como leído</span>
              </Button>
            )}
            {notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleDeleteAll}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span className="text-xs">Eliminar todo</span>
              </Button>
            )}
          </div>
        </div>
        
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-labcenter-gray mx-auto mb-4 opacity-30" />
            <p className="text-labcenter-gray mb-2">No tienes notificaciones</p>
            <p className="text-sm text-labcenter-gray">
              Las nuevas notificaciones aparecerán aquí
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`labcenter-card cursor-pointer transition-colors relative ${
                  !notification.read ? 'border-l-4 border-l-labcenter-purple' : ''
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                {!notification.read && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-labcenter-purple"></div>
                )}
                <div className="flex">
                  <div className="mr-3 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${
                      !notification.read ? 'text-labcenter-gray-dark' : 'text-labcenter-gray'
                    }`}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-labcenter-gray mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-labcenter-gray">
                      {format(notification.date, "d 'de' MMMM 'a las' h:mm a", { locale: es })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Notifications;
