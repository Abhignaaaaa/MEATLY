import React from 'react';
import { Star } from 'lucide-react';

/**
 * Reusable MEATLY Rating Component
 * Clean star icon + numeric score & optional review count.
 */
export default function Rating({
  rating = 4.6,
  reviewsCount,
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const sizeConfig = {
    sm: { text: 'text-xs', icon: 'w-3 h-3', review: 'text-[11px]' },
    md: { text: 'text-sm', icon: 'w-4 h-4', review: 'text-xs' },
    lg: { text: 'text-base', icon: 'w-5 h-5', review: 'text-sm' },
  }[size] || { text: 'text-sm', icon: 'w-4 h-4', review: 'text-xs' };

  return (
    <div className={`inline-flex items-center gap-1 font-semibold text-[#20231B] ${className}`}>
      <span className="p-1 rounded-md bg-[#4F7D32]/10 text-[#4F7D32] flex items-center justify-center">
        <Star className={`${sizeConfig.icon} fill-[#4F7D32] text-[#4F7D32]`} />
      </span>
      <span className={`${sizeConfig.text} font-bold text-[#20231B]`}>
        {Number(rating).toFixed(1)}
      </span>
      {reviewsCount && (
        <span className={`text-[#6F7268] font-normal ${sizeConfig.review}`}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}
