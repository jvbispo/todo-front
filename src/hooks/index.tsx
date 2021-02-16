import React from 'react';
import { AuthProvider } from './authContext';
import { ToastProvider } from './toastContext';

// Provider dos Contexts

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
