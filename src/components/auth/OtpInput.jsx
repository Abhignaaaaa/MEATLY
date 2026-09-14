import React, { useRef, useState } from 'react';

/**
 * 6-Box OTP Input Component
 * Auto-focuses next input box, supports paste & backspace.
 */
export default function OtpInput({ length = 6, onComplete }) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next box
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const completedCode = newOtp.join('');
    if (completedCode.length === length && onComplete) {
      onComplete(completedCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pastedData) return;

    const newOtp = Array(length).fill('');
    pastedData.split('').forEach((char, idx) => {
      newOtp[idx] = char;
    });
    setOtp(newOtp);

    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();

    if (pastedData.length === length && onComplete) {
      onComplete(pastedData);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => (inputRefs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          className="w-11 h-12 sm:w-12 sm:h-14 text-center font-bold text-lg sm:text-xl text-[#20231B] bg-white border-2 border-[#E4E4DA] rounded-[14px] focus:outline-none focus:border-[#667A3E] focus:ring-4 focus:ring-[#667A3E]/15 transition-all shadow-xs"
        />
      ))}
    </div>
  );
}
