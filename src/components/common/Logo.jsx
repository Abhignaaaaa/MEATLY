import React from 'react';

/**
 * MEATLY Typographic Wordmark & Logo Component
 * Works across light, white, and dark olive backgrounds.
 */
export default function Logo({ 
  variant = 'default', // 'default' | 'white' | 'dark' | 'pill'
  size = 'md',         // 'sm' | 'md' | 'lg' | 'xl'
  withTagline = false 
}) {
  const sizeClasses = {
    sm: { text: 'text-lg', dot: 'w-2 h-2', tagline: 'text-[10px]' },
    md: { text: 'text-2xl', dot: 'w-2.5 h-2.5', tagline: 'text-xs' },
    lg: { text: 'text-3xl', dot: 'w-3 h-3', tagline: 'text-sm' },
    xl: { text: 'text-4xl', dot: 'w-3.5 h-3.5', tagline: 'text-base' },
  }[size] || { text: 'text-2xl', dot: 'w-2.5 h-2.5', tagline: 'text-xs' };

  if (variant === 'pill') {
    return (
      <div className="inline-flex flex-col items-start">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8EEDB] text-[#46552A] rounded-full font-bold tracking-tight">
          <span className={`${sizeClasses.text} font-black tracking-wider`}>MEATLY</span>
          <span className="w-2 h-2 rounded-full bg-[#667A3E]"></span>
        </div>
        {withTagline && (
          <span className={`mt-1 font-medium text-[#6F7268] ${sizeClasses.tagline}`}>
            Freshly cut. From your local shop.
          </span>
        )}
      </div>
    );
  }

  const textColor = {
    default: 'text-[#20231B]',
    white: 'text-white',
    dark: 'text-[#46552A]',
    olive: 'text-[#667A3E]',
  }[variant] || 'text-[#20231B]';

  const dotColor = variant === 'white' ? 'bg-[#E8EEDB]' : 'bg-[#667A3E]';

  return (
    <div className="inline-flex flex-col items-start select-none">
      <div className={`font-black tracking-tight leading-none flex items-baseline gap-1 ${textColor} ${sizeClasses.text}`}>
        <span>MEATLY</span>
        <span className={`inline-block rounded-full ${dotColor} ${sizeClasses.dot} transform translate-y-[-2px]`}></span>
      </div>
      {withTagline && (
        <span className={`mt-0.5 font-medium text-[#6F7268] ${sizeClasses.tagline}`}>
          Freshly cut. From your local shop.
        </span>
      )}
    </div>
  );
}
