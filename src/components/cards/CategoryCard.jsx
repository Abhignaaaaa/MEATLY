import React from 'react';
import BaseCard from './BaseCard';
import Badge from '../common/Badge';

/**
 * Category Card Component (Chicken, Fish, Mutton)
 * Features high-quality realistic food imagery with subtle olive accents.
 */
export default function CategoryCard({
  title = "Chicken",
  subtitle = "Freshly cut daily",
  itemCount = "18+ items",
  imageUrl,
  onClick,
  badgeText = "Popular",
  className = ''
}) {
  return (
    <BaseCard
      onClick={onClick}
      padding="p-3 md:p-4"
      className={`group relative overflow-hidden flex flex-col justify-between ${className}`}
    >
      {/* Subtle Olive Accent Header Pill */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-bold text-[#46552A] bg-[#E8EEDB] px-2.5 py-0.5 rounded-full">
          {itemCount}
        </span>
        {badgeText && (
          <Badge variant="olive" size="sm">
            {badgeText}
          </Badge>
        )}
      </div>

      {/* Food Image Container */}
      <div className="relative w-full aspect-4/3 rounded-[14px] overflow-hidden bg-[#FAF8F1] mb-3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Category Info */}
      <div>
        <h3 className="text-base md:text-lg font-bold text-[#20231B] group-hover:text-[#667A3E] transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-xs text-[#6F7268] mt-0.5 font-normal truncate">
          {subtitle}
        </p>
      </div>
    </BaseCard>
  );
}
