import React from 'react';
import { ArrowRight, Percent } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

/**
 * MEATLY Promotional Banner Component
 * Soft Light Olive identity background, clean typography, dark olive accents.
 */
export default function PromoBanner({
  badge = "SPECIAL OFFERS",
  title = "Fresh cuts. Better prices.",
  subtitle = "Discover today's offers from local shops in Karimnagar.",
  ctaText = "View Offers",
  onCtaClick,
  className = ''
}) {
  return (
    <div className={`w-full rounded-[22px] bg-[#E8EEDB] border border-[#d2dcb9] p-6 sm:p-8 relative overflow-hidden shadow-xs ${className}`}>
      
      {/* Background Subtle Accent Pattern */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#667A3E]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left Content */}
        <div className="space-y-3 text-left max-w-xl">
          <Badge variant="dark" size="sm" icon={Percent}>
            {badge}
          </Badge>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#46552A] tracking-tight leading-tight">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-[#46552A]/80 font-medium leading-relaxed">
            {subtitle}
          </p>

          <div className="pt-1">
            <Button
              variant="primary"
              size="md"
              rightIcon={ArrowRight}
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          </div>
        </div>

        {/* Right Thumbnail Container */}
        <div className="w-full sm:w-48 lg:w-64 aspect-16/9 sm:aspect-4/3 rounded-[16px] overflow-hidden border-2 border-white shadow-sm shrink-0 bg-white">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
            alt="Promotional Fresh Meat Offers"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

      </div>
    </div>
  );
}
