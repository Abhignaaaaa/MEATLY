import React from 'react';
import { Clock, Zap, Check } from 'lucide-react';

/**
 * DeliveryOptions Component
 * Radio selector for Standard Delivery (25-40 min, ₹40) vs Express Delivery (15-25 min, ₹70).
 */
export default function DeliveryOptions({
  options = [],
  selectedOptionId,
  onSelectOption
}) {
  return (
    <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-3">
      <div>
        <h3 className="text-base font-bold text-[#20231B]">
          Delivery Speed & Options
        </h3>
        <p className="text-xs text-[#6F7268]">
          Select delivery timing for your fresh order in Karimnagar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const Icon = opt.id === 'express' ? Zap : Clock;

          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption && onSelectOption(opt.id)}
              className={`p-3.5 rounded-[14px] border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#E8EEDB] border-[#667A3E] text-[#46552A] shadow-xs'
                  : 'bg-white border-[#E4E4DA] text-[#20231B] hover:bg-[#FAF8F1]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  isSelected ? 'bg-[#667A3E] text-white border-[#667A3E]' : 'bg-[#FAF8F1] text-[#667A3E] border-[#E4E4DA]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm">{opt.title}</span>
                    <span className="text-xs font-black text-[#20231B]">
                      {opt.price === 0 ? 'FREE' : `₹${opt.price}`}
                    </span>
                  </div>
                  <span className="text-xs font-semibold block text-[#667A3E] mt-0.5">
                    ⏱ {opt.time}
                  </span>
                  <p className="text-[11px] text-[#6F7268] mt-0.5 leading-tight">
                    {opt.desc}
                  </p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                isSelected ? 'bg-[#667A3E] border-[#667A3E] text-white' : 'border-[#E4E4DA]'
              }`}>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
