import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import BaseCard from './BaseCard';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import Button from '../common/Button';

/**
 * Demo Shop Card Component
 * Represents local Karimnagar chicken, fish & mutton partner shops.
 */
export default function ShopCard({
  name = "Fresh Chicken Centre",
  rating = 4.6,
  reviewsCount = 128,
  distance = "1.2 km",
  deliveryTime = "25 mins",
  isOpen = true,
  categories = ["Chicken", "Mutton"],
  imageUrl,
  onClick,
  isDemo = true,
  className = ''
}) {
  return (
    <BaseCard
      onClick={onClick}
      padding="p-3 md:p-4"
      className={`group flex flex-col justify-between h-full ${className}`}
    >
      <div>
        {/* Shop Image with Open Badge & Demo Tag */}
        <div className="relative w-full aspect-16/9 rounded-[14px] overflow-hidden bg-[#FAF8F1] mb-3">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600";
            }}
          />
          
          <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
            <Badge variant={isOpen ? 'olive' : 'dark'} size="sm">
              {isOpen ? 'OPEN NOW' : 'CLOSED'}
            </Badge>
            {isDemo && (
              <span className="bg-[#20231B]/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-medium tracking-wide">
                DEMO SHOP
              </span>
            )}
          </div>

          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-[#20231B] flex items-center gap-1 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#667A3E]" />
            <span>{deliveryTime}</span>
          </div>
        </div>

        {/* Shop Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-base md:text-lg font-bold text-[#20231B] group-hover:text-[#667A3E] transition-colors leading-snug line-clamp-1">
            {name}
          </h3>
          <Rating rating={rating} reviewsCount={reviewsCount} size="sm" />
        </div>

        {/* Location & Distance Info */}
        <div className="flex items-center gap-3 text-xs text-[#6F7268] mb-3">
          <span className="inline-flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#667A3E]" />
            {distance} away
          </span>
          <span>•</span>
          <span className="truncate">Karimnagar</span>
        </div>

        {/* Category Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-[#46552A] bg-[#FAF8F1] border border-[#E4E4DA] px-2 py-0.5 rounded-md"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA Button */}
      <Button variant="secondary" size="sm" fullWidth className="mt-auto">
        View Shop
      </Button>
    </BaseCard>
  );
}
