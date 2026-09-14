import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';
import Button from '../common/Button';

export default function AdminGuard({ children, onNavigateToLogin, onNavigateToHome }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-[#E4E4DA] border-t-[#667A3E] rounded-full animate-spin mb-4"></div>
        <p className="text-[#6F7268] text-sm font-medium animate-pulse">Verifying access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    onNavigateToLogin();
    return null;
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#F7F8EF] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-[24px] border border-[#E4E4DA] p-6 max-w-sm w-full text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto text-red-600 mb-2">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#20231B]">Admin Access Denied</h2>
          <p className="text-sm text-[#6F7268]">This area is restricted to administrators only.</p>
          <Button variant="primary" fullWidth onClick={onNavigateToHome}>
            Return to Store
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

