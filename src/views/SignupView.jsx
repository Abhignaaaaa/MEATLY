import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Logo from '../components/common/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

/**
 * MEATLY Signup View (`/signup`)
 */
export default function SignupView({
  onBack,
  onNavigateToLogin,
  onNavigateToVerify
}) {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('Rahul Verma');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('rahul.verma@example.com');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!phone || phone.length < 10) newErrors.phone = 'Please enter a valid 10-digit mobile number.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    signup({ fullName, phone, email });
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

      {/* Main Signup Card */}
      <div className="max-w-md w-full mx-auto my-auto bg-white rounded-[24px] border border-[#E4E4DA] p-6 sm:p-8 space-y-6 shadow-md">
        
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7268]">
            Let's get you started with fresh local meat delivery.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name *"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors({ ...errors, fullName: null });
            }}
            error={errors.fullName}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#20231B]">
              Mobile Number *
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
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                placeholder="Enter 10-digit mobile number"
                className="w-full bg-white text-[#20231B] placeholder-[#6F7268] text-sm rounded-[12px] border border-[#E4E4DA] pl-16 pr-3.5 py-3 transition-all focus:outline-none focus:border-[#667A3E] focus:ring-4 focus:ring-[#667A3E]/15 font-semibold"
              />
            </div>
            {errors.phone && (
              <span className="text-xs text-red-600 font-semibold block pl-1">
                {errors.phone}
              </span>
            )}
          </div>

          <Input
            label="Email Address (Optional)"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="primary"
            size="lg"
            fullWidth
            type="submit"
            disabled={!fullName || phone.length < 10}
          >
            Continue
          </Button>
        </form>

        <div className="text-center text-xs text-[#6F7268] pt-2">
          Already have an account?{' '}
          <button
            onClick={onNavigateToLogin}
            className="text-[#667A3E] font-bold hover:underline cursor-pointer"
          >
            Login
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
