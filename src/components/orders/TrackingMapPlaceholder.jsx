import React from 'react';
import { Store, Bike, Home, MapPin } from 'lucide-react';

/**
 * Visual Map Placeholder Graphic Component
 * Simulates rider progress from shop to customer location in Karimnagar without external map API dependencies.
 */
export default function TrackingMapPlaceholder({
  shopName = "Sri Fish Market",
  eta = "15–20 min"
}) {
  return (
    <div className="bg-[#FAF8F1] rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs relative overflow-hidden space-y-4">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#667A3E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="relative z-10 flex items-center justify-between text-xs font-bold text-[#46552A] border-b border-[#E4E4DA] pb-3">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#667A3E]" />
          Karimnagar Live Delivery Visual
        </span>
        <span className="bg-[#E8EEDB] text-[#46552A] px-2.5 py-0.5 rounded-full font-mono text-[11px]">
          ETA: {eta}
        </span>
      </div>

      {/* Simulated Route Illustration */}
      <div className="relative z-10 py-6 px-4 flex items-center justify-between gap-2">
        {/* Shop Node */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="w-10 h-10 rounded-full bg-white border-2 border-[#667A3E] text-[#667A3E] flex items-center justify-center shadow-xs">
            <Store className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#20231B] max-w-[90px] truncate">{shopName}</span>
          <span className="text-[9px] text-[#6F7268]">Origin</span>
        </div>

        {/* Route Connecting Line & Rider */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="w-full h-1 bg-[#E8EEDB] rounded-full"></div>
          <div className="w-2/3 h-1 bg-[#667A3E] rounded-full absolute left-0"></div>

          {/* Moving Rider Icon */}
          <div className="absolute left-2/3 transform -translate-x-1/2 -translate-y-1 bg-[#667A3E] text-white p-1.5 rounded-full shadow-md animate-pulse">
            <Bike className="w-4 h-4" />
          </div>
        </div>

        {/* Customer Home Node */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="w-10 h-10 rounded-full bg-[#E8EEDB] border-2 border-[#46552A] text-[#46552A] flex items-center justify-center shadow-xs">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-[#20231B]">Your Location</span>
          <span className="text-[9px] text-[#6F7268]">Karimnagar</span>
        </div>
      </div>

      <div className="relative z-10 text-center pt-2 border-t border-[#E4E4DA]">
        <p className="text-[11px] text-[#6F7268] italic">
          Simulated Rider Progress Graphic • Karimnagar Launch Market
        </p>
      </div>
    </div>
  );
}
