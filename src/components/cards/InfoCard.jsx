import React from 'react';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';
import BaseCard from './BaseCard';

/**
 * Trust & Quality Information Card
 */
export default function InfoCard({
  icon: Icon = ShieldCheck,
  title = "100% Fresh Guarantee",
  description = "Cut to order from verified local Karimnagar partners right before delivery.",
  variant = "cream",
  className = ''
}) {
  return (
    <BaseCard
      hoverEffect={false}
      padding="p-4 md:p-5"
      className={`border border-[#E4E4DA] ${
        variant === 'cream' ? 'bg-[#FAF8F1]' : 'bg-[#E8EEDB]/40'
      } ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center shrink-0 border border-[#d2dcb9]">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold text-[#20231B] leading-snug">
            {title}
          </h4>
          <p className="text-xs md:text-sm text-[#6F7268] mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </BaseCard>
  );
}
