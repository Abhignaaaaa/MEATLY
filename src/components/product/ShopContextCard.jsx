import React from 'react';
import { MapPin, Store, ChevronRight } from 'lucide-react';
import Rating from '../common/Rating';
import Badge from '../common/Badge';

/**
 * ShopContextCard Component
 * Displays compact shop info pill on product page so customer knows source.
 */
export default function ShopContextCard({
  shopName = "Fresh Chicken Centre",
  shopRating = 4.6,
  shopDistance = "1.2 km",
  shopIsOpen = true,
  onViewShop,
  className = ''
}) {
  return (
    <div className={`bg-white rounded-[16px] border border-[#E4E4DA] p-3.5 flex items-center justify-between gap-3 shadow-xs ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center shrink-0 border border-[#d2dcb9]">
          <Store className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#20231B] leading-tight">
              {shopName}
            </h4>
            <Badge variant={shopIsOpen ? 'olive' : 'dark'} size="sm">
              {shopIsOpen ? 'OPEN' : 'CLOSED'}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6F7268] mt-0.5 font-medium">
            <Rating rating={shopRating} size="sm" />
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-[#667A3E]" />
              {shopDistance} away
            </span>
          </div>
        </div>
      </div>

      {onViewShop && (
        <button
          type="button"
          onClick={onViewShop}
          className="text-xs font-bold text-[#667A3E] hover:text-[#46552A] flex items-center gap-0.5 cursor-pointer shrink-0"
        >
          <span>View Shop</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
