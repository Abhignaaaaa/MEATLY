import React from 'react';

/**
 * Reusable Skeleton Loaders for MEATLY
 * Subtly animated shimmer placeholders matching card radii and proportions.
 */
export function CardSkeleton({ type = 'shop' }) {
  if (type === 'category') {
    return (
      <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-3 flex flex-col justify-between h-48 animate-pulse">
        <div className="flex justify-between">
          <div className="w-16 h-4 bg-[#E8EEDB] rounded-full skeleton-shimmer"></div>
          <div className="w-12 h-4 bg-[#E8EEDB] rounded-full skeleton-shimmer"></div>
        </div>
        <div className="w-full h-24 bg-[#E8EEDB] rounded-[14px] skeleton-shimmer my-2"></div>
        <div className="space-y-1">
          <div className="w-24 h-5 bg-[#E8EEDB] rounded-md skeleton-shimmer"></div>
          <div className="w-32 h-3 bg-[#E8EEDB] rounded-md skeleton-shimmer"></div>
        </div>
      </div>
    );
  }

  if (type === 'product') {
    return (
      <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-3 flex flex-col justify-between h-64 animate-pulse">
        <div className="w-full h-32 bg-[#E8EEDB] rounded-[14px] skeleton-shimmer mb-2"></div>
        <div className="space-y-1.5">
          <div className="w-3/4 h-5 bg-[#E8EEDB] rounded-md skeleton-shimmer"></div>
          <div className="w-1/2 h-3.5 bg-[#E8EEDB] rounded-md skeleton-shimmer"></div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[#E4E4DA]">
          <div className="w-16 h-6 bg-[#E8EEDB] rounded-md skeleton-shimmer"></div>
          <div className="w-16 h-8 bg-[#E8EEDB] rounded-[10px] skeleton-shimmer"></div>
        </div>
      </div>
    );
  }

  // Shop Skeleton Default
  return (
    <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-4 flex flex-col justify-between h-72 animate-pulse">
      <div className="w-full h-36 bg-[#E8EEDB] rounded-[14px] skeleton-shimmer mb-3"></div>
      <div className="flex justify-between items-center mb-2">
        <div className="w-2/3 h-5 bg-[#E8EEDB] rounded-md skeleton-shimmer"></div>
        <div className="w-12 h-5 bg-[#E8EEDB] rounded-full skeleton-shimmer"></div>
      </div>
      <div className="w-1/3 h-4 bg-[#E8EEDB] rounded-md skeleton-shimmer mb-3"></div>
      <div className="w-full h-9 bg-[#E8EEDB] rounded-[12px] skeleton-shimmer mt-auto"></div>
    </div>
  );
}

export function GridSkeleton({ count = 3, type = 'shop' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} type={type} />
      ))}
    </div>
  );
}
