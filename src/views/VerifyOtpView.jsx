import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import OtpInput from '../components/auth/OtpInput';
import AuthSuccessView from './AuthSuccessView';
import { useAuth } from '../context/AuthContext';

/**
 * MEATLY OTP Verification View (`/verify-otp`)
 * Demo accepted OTP: `123456`
 */
export default function VerifyOtpView({
  onBack,
  onSuccess
}) {
  const { verifyOtp, pendingAuthData, user } = useAuth();
  const [timer, setTimer] = useState(30);
  const [otpCode, setOtpCode] = useState('123456');
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const phoneDisplay = pendingAuthData?.phone || user?.phone || '9876543210';
  const userNameDisplay = pendingAuthData?.fullName || user?.fullName || 'Rahul Verma';

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (codeToVerify) => {
    const code = codeToVerify || otpCode;
    setError(null);
    const res = await verifyOtp(code);
    if (res.success) {
      setIsSuccess(true);
    } else {
      setError(res.message || 'Invalid OTP. Please enter 123456 for demo verification.');
    }
  };

  if (isSuccess) {
    return (
      <AuthSuccessView
        userName={userNameDisplay}
        onStartShopping={onSuccess}
      />
    );
  }

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

      {/* Main OTP Card */}
      <div className="max-w-md w-full mx-auto my-auto bg-white rounded-[24px] border border-[#E4E4DA] p-6 sm:p-8 space-y-6 shadow-md text-center">
        
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
            Verify your number
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7268]">
            We sent a 6-digit OTP to <strong className="text-[#20231B]">+91 {phoneDisplay}</strong>
          </p>
        </div>

        {/* Demo OTP Banner Hint */}
        <div className="bg-[#E8EEDB] text-[#46552A] text-xs font-bold p-2.5 rounded-[12px] border border-[#667A3E]/30 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#667A3E]" />
          <span>Demo OTP Code: <u className="font-mono text-sm">123456</u></span>
        </div>

        {/* 6-Box OTP Inputs */}
        <div className="py-2">
          <OtpInput
            length={6}
            onComplete={(code) => {
              setOtpCode(code);
              handleVerify(code);
            }}
          />
        </div>

        {error && (
          <span className="text-xs text-red-600 font-semibold block">
            {error}
          </span>
        )}

        {/* Resend Countdown UI */}
        <div className="text-xs text-[#6F7268]">
          {timer > 0 ? (
            <span>Didn't receive the code? Resend OTP in <strong className="text-[#20231B] font-mono">{timer}s</strong></span>
          ) : (
            <button
              type="button"
              onClick={() => {
                setTimer(30);
                setError(null);
              }}
              className="text-[#667A3E] font-bold hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Resend OTP Code
            </button>
          )}
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => handleVerify(otpCode)}
        >
          Verify & Continue
        </Button>

      </div>

      <div className="max-w-md w-full mx-auto text-center text-[11px] text-[#6F7268]">
        MEATLY Karimnagar • Demo Authentication Verification
      </div>

    </div>
  );
}
