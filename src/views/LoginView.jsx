import React, { useState } from 'react';
import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react';
import Logo from '../components/common/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

/**
 * MEATLY Login View (`/login`)
 */
export default function LoginView({
  onBack,
  onNavigateToSignup,
  onNavigateToVerify
}) {
  const { login } = useAuth();
  const [phone, setPhone] = useState('9876543210');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError(null);
    login(phone);
    onNavigateToVerify();
  };

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col justify-between p-4 sm:p-6">
      
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <Logo size="md" />
        <div className="w-9 h-9"></div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto bg-white rounded-[24px] border border-[#E4E4DA] p-6 sm:p-8 space-y-6 shadow-md">
        
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
            Welcome back 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7268]">
            Fresh meat from your local Karimnagar shop.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#20231B]">
              Mobile Number
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-xs font-bold text-[#46552A] bg-[#E8EEDB] px-2 py-1 rounded-md pointer-events-none">
                +91
              </div>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''));
                  if (error) setError(null);
                }}
                placeholder="Enter 10-digit mobile number"
                className="w-full bg-white text-[#20231B] placeholder-[#6F7268] text-sm rounded-[12px] border border-[#E4E4DA] pl-16 pr-3.5 py-3 transition-all focus:outline-none focus:border-[#667A3E] focus:ring-4 focus:ring-[#667A3E]/15 font-semibold"
              />
            </div>
            {error && (
              <span className="text-xs text-red-600 font-semibold block pl-1">
                {error}
              </span>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            type="submit"
            disabled={phone.length < 10}
          >
            Continue
          </Button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="w-full border-t border-[#E4E4DA]"></div>
          <span className="bg-white px-3 text-xs text-[#6F7268] font-semibold uppercase absolute">
            OR
          </span>
        </div>

        {/* Continue with Google Placeholder */}
        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={() => {
            login('9876543210');
            onNavigateToVerify();
          }}
          className="!border-[#E4E4DA] hover:!bg-[#FAF8F1]"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continue with Google
        </Button>

        <div className="text-center text-xs text-[#6F7268] pt-2">
          Don't have an account?{' '}
          <button
            onClick={onNavigateToSignup}
            className="text-[#667A3E] font-bold hover:underline cursor-pointer"
          >
            Create account
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="max-w-md w-full mx-auto text-center text-[11px] text-[#6F7268] flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#667A3E]" />
        <span>100% Secure • MEATLY Karimnagar Launch</span>
      </div>

    </div>
  );
}
