import React from 'react';
import { Info } from 'lucide-react';

/**
 * MultiShopNotice Component
 * Displayed when cart contains items from multiple partner shops.
 */
export default function MultiShopNotice() {
  return (
    <div className="bg-[#E8EEDB]/60 rounded-[16px] border border-[#d2dcb9] p-3.5 flex items-start gap-3 text-xs text-[#46552A]">
      <Info className="w-4 h-4 text-[#667A3E] shrink-0 mt-0.5" />
      <div>
        <h5 className="font-bold text-[#46552A] leading-tight">
          Your cart contains items from multiple local shops.
        </h5>
        <p className="mt-0.5 text-[#46552A]/80 font-medium">
          These items may be prepared and delivered in separate fresh packages.
        </p>
      </div>
    </div>
  );
}
