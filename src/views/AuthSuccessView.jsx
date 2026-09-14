import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';

/**
 * Authentication Success Screen
 */
export default function AuthSuccessView({
  userName = 'Rahul',
  onStartShopping
}) {
  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-[24px] border border-[#E4E4DA] p-8 max-w-md w-full text-center space-y-6 shadow-md animate-fade-in">
        
        <div className="w-20 h-20 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border-2 border-[#d2dcb9] shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
            You're all set!
          </h2>
          <h3 className="text-lg font-bold text-[#667A3E]">
            Welcome to MEATLY, {userName}
          </h3>
          <p className="text-xs sm:text-sm text-[#6F7268] leading-relaxed pt-1">
            Fresh meat from your local Karimnagar shops, just a few taps away.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          rightIcon={ArrowRight}
          onClick={onStartShopping}
        >
          Start Shopping
        </Button>

      </div>
    </div>
  );
}
