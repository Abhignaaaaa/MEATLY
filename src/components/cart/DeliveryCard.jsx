import React from 'react';
import { MapPin, Clock, ChevronRight } from 'lucide-react';

/**
 * DeliveryCard Component
 * Displays selected delivery address preview & estimated delivery time for Karimnagar.
 */
export default function DeliveryCard({ onChangeAddress }) {
  return (
    <div className="bg-[#FAF8F1] rounded-[18px] border border-[#E4E4DA] p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6F7268] uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-[#667A3E]" />
          <span>Delivering To</span>
        </div>
        {onChangeAddress && (
          <button
            type="button"
            onClick={onChangeAddress}
            className="text-xs font-bold text-[#667A3E] hover:underline cursor-pointer flex items-center gap-0.5"
          >
            <span>Change</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div>
        <h4 className="text-sm sm:text-base font-bold text-[#20231B]">
          Home • Collectorate Road
        </h4>
        <p className="text-xs text-[#6F7268] mt-0.5">
          Karimnagar, Telangana — 505001
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-medium text-[#46552A] bg-white px-3 py-2 rounded-[10px] border border-[#E4E4DA]">
        <Clock className="w-3.5 h-3.5 text-[#667A3E]" />
        <span>Estimated Delivery: <strong>25–40 mins</strong></span>
      </div>
    </div>
  );
}
