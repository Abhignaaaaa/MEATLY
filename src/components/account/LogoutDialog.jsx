import React from 'react';
import { LogOut } from 'lucide-react';
import Button from '../common/Button';

/**
 * Logout Confirmation Modal Dialog
 */
export default function LogoutDialog({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[22px] border border-[#E4E4DA] p-6 max-w-sm w-full text-center space-y-4 shadow-xl animate-fade-in">
        
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
          <LogOut className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#20231B]">
            Logout from MEATLY?
          </h3>
          <p className="text-xs text-[#6F7268] mt-1">
            Are you sure you want to logout of your account? You will need to verify your number again.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="outline" size="md" fullWidth onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="md" fullWidth onClick={onConfirm} className="!bg-red-600 hover:!bg-red-700">
            Logout
          </Button>
        </div>

      </div>
    </div>
  );
}
