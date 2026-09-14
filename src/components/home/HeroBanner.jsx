import React from 'react';
import { ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

/**
 * MEATLY Hero Banner Component
 * Desktop: 2-column layout (Left content, Right premium food photograph).
 * Mobile: Stacked view with image, badge, heading, supporting text & CTA.
 */
export default function HeroBanner({
  onExploreClick,
  onOffersClick,
  className = ''
}) {
  return (
    <div className={`relative w-full rounded-[22px] bg-[#FAF8F1] border border-[#E4E4DA] p-5 sm:p-8 md:p-10 overflow-hidden shadow-xs ${className}`}>
      
      {/* Background Subtle Accent Shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8EEDB]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
          
          <Badge variant="olive" size="md" icon={ShieldCheck}>
            FRESH • LOCAL • TRUSTED
          </Badge>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#20231B] tracking-tight leading-tight">
            Fresh meat. <br className="hidden sm:inline" />
            <span className="text-[#667A3E]">From shops you trust.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#6F7268] max-w-xl leading-relaxed">
            Order freshly cut chicken, fish and meat from local shops near you in Karimnagar with fast delivery.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              rightIcon={ArrowRight}
              onClick={onExploreClick}
              className="w-full sm:w-auto"
            >
              Explore Shops
            </Button>

            <Button
              variant="ghost"
              size="lg"
              leftIcon={Tag}
              onClick={onOffersClick}
              className="w-full sm:w-auto"
            >
              Today's offers
            </Button>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div className="lg:col-span-5 w-full">
          <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-[20px] overflow-hidden border-2 border-white shadow-md bg-white">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
              alt="Fresh Meat Cuts"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-out"
              loading="eager"
            />
            
            {/* Floating Quality Tag */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E4E4DA] shadow-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F7D32] animate-pulse"></span>
              <span className="text-xs font-bold text-[#20231B]">
                Cut to order in Karimnagar
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
