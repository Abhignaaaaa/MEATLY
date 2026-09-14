import React from 'react';
import { Check, Clock, PackageCheck, Bike, Home, Sparkles } from 'lucide-react';

/**
 * OrderTimeline Component
 * Vertical order tracking timeline showing stages from Order Placed to Delivered.
 */
export default function OrderTimeline({ currentStatus = 'preparing' }) {
  const steps = [
    { id: 'placed', title: 'Order Placed', desc: 'Order received by shop', icon: Clock },
    { id: 'confirmed', title: 'Order Confirmed', desc: 'Shop confirmed fresh cut request', icon: Sparkles },
    { id: 'preparing', title: 'Preparing Meat', desc: 'Butcher cutting & cleaning meat to your preference', icon: PackageCheck },
    { id: 'ready', title: 'Ready for Pickup', desc: 'Hygiene package sealed with ice packs', icon: Check },
    { id: 'out_for_delivery', title: 'Out for Delivery', desc: 'Rider dispatched in Karimnagar', icon: Bike },
    { id: 'delivered', title: 'Delivered', desc: 'Arrived at your location', icon: Home },
  ];

  const statusStepIndexMap = {
    placed: 0,
    confirmed: 1,
    preparing: 2,
    ready: 3,
    out_for_delivery: 4,
    delivered: 5,
    cancelled: -1,
  };

  const currentIndex = statusStepIndexMap[currentStatus] ?? 2;

  if (currentStatus === 'cancelled') {
    return (
      <div className="bg-[#FAF8F1] rounded-[16px] border border-[#E4E4DA] p-4 text-center space-y-1 text-xs">
        <span className="font-bold text-red-600 block">Order Cancelled</span>
        <p className="text-[#6F7268]">This order was cancelled and no further tracking is available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-4">
      <h3 className="text-base font-bold text-[#20231B] pb-2 border-b border-[#E4E4DA]">
        Live Order Timeline
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4E4DA]">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex items-start gap-3.5">
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-all z-10 ${
                  isCompleted
                    ? 'bg-[#667A3E] border-[#667A3E] text-white'
                    : isCurrent
                    ? 'bg-[#E8EEDB] border-[#667A3E] text-[#46552A] ring-4 ring-[#667A3E]/15 animate-pulse'
                    : 'bg-white border-[#E4E4DA] text-[#6F7268]'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </div>

              {/* Step Title & Description */}
              <div className="pl-2">
                <h4 className={`text-xs sm:text-sm font-bold leading-none ${
                  isCurrent ? 'text-[#667A3E]' : isCompleted ? 'text-[#20231B]' : 'text-[#6F7268]'
                }`}>
                  {step.title} {isCurrent && <span className="text-[10px] font-normal italic text-[#46552A] ml-1">(In Progress)</span>}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#6F7268] mt-1 font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
