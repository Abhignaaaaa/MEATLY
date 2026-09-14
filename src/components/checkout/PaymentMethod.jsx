import React from 'react';
import { Smartphone, CreditCard, Banknote, Lock, Check } from 'lucide-react';

/**
 * PaymentMethod Component
 * Radio selector for UPI, Cards, and Cash on Delivery with security badge.
 */
export default function PaymentMethod({
  methods = [],
  selectedMethodId,
  onSelectMethod
}) {
  const iconMap = {
    Smartphone: Smartphone,
    CreditCard: CreditCard,
    Banknote: Banknote,
  };

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-3.5">
      <div>
        <h3 className="text-base font-bold text-[#20231B]">
          Payment Method
        </h3>
        <p className="text-xs text-[#6F7268]">
          Choose how you would like to pay for your fresh meat order
        </p>
      </div>

      <div className="space-y-2.5">
        {methods.map((method) => {
          const isSelected = selectedMethodId === method.id;
          const Icon = iconMap[method.icon] || Smartphone;

          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod && onSelectMethod(method.id)}
              className={`p-3.5 rounded-[14px] border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#E8EEDB] border-[#667A3E] text-[#46552A] shadow-xs'
                  : 'bg-white border-[#E4E4DA] text-[#20231B] hover:bg-[#FAF8F1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  isSelected ? 'bg-[#667A3E] text-white border-[#667A3E]' : 'bg-[#FAF8F1] text-[#667A3E] border-[#E4E4DA]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm">{method.title}</h4>
                  <p className="text-[11px] text-[#6F7268]">{method.desc}</p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-[#667A3E] border-[#667A3E] text-white' : 'border-[#E4E4DA]'
              }`}>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Message */}
      <div className="flex items-center gap-1.5 text-xs text-[#6F7268] pt-1">
        <Lock className="w-3.5 h-3.5 text-[#667A3E]" />
        <span>Secure encrypted checkout • MEATLY Demo Guarantee</span>
      </div>
    </div>
  );
}
