import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Logo from '../common/Logo';

/**
 * Minimal Header Component for Checkout Page
 */
export default function CheckoutHeader({ onBack }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E4E4DA] transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Back Button & Logo */}
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-[#FAF8F1] border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <Logo size="sm" />
        </div>

        {/* Center Title */}
        <h1 className="text-base sm:text-lg font-black text-[#20231B] tracking-tight">
          Checkout
        </h1>

        {/* Right Security Tag */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#46552A] bg-[#E8EEDB] px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-[#667A3E]" />
          <span className="hidden sm:inline">100% Secure Checkout</span>
          <span className="sm:hidden">Secure</span>
        </div>

      </div>
    </header>
  );
}
