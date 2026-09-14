import React from 'react';

/**
 * Reusable BaseCard Component
 * White background, 16–20px radius, soft shadow, hover elevation.
 */
export default function BaseCard({
  children,
  className = '',
  hoverEffect = true,
  padding = 'p-4 md:p-5',
  onClick,
  ...props
}) {
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[18px] border border-[#E4E4DA] shadow-[0_2px_8px_-2px_rgba(32,35,27,0.06)] ${padding} ${
        hoverEffect ? 'meatly-card-transition hover:-translate-y-1 hover:shadow-[0_8px_24px_-4px_rgba(70,85,42,0.12)] hover:border-[#d2dcb9]' : ''
      } ${isClickable ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
