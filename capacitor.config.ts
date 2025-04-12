
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.44bcd04b839f473a94611d434f58db89',
  appName: 'labcenter-connect-app',
  webDir: 'dist',
  server: {
    url: 'https://44bcd04b-839f-473a-9461-1d434f58db89.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    // Configuraciones específicas de plugins pueden ir aquí
  }
};

export default config;
