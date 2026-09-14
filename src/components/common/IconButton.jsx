import React from 'react';

/**
 * Reusable IconButton Component
 * Wrapper for circular/rounded interactive icons with badge badge indicator support.
 */
export default function IconButton({
  icon: Icon,
  onClick,
  badgeCount,
  active = false,
  ariaLabel,
  className = '',
  size = 'md'
}) {
  const sizeStyles = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  }[size] || 'w-10 h-10 p-2';

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size] || 'w-5 h-5';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#667A3E]/30 ${
        active
          ? 'bg-[#667A3E] text-white'
          : 'bg-white text-[#20231B] hover:bg-[#E8EEDB] border border-[#E4E4DA]'
      } ${sizeStyles} ${className}`}
    >
      <Icon className={iconSizes} />
      {badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center bg-[#667A3E] text-white text-[10px] font-bold rounded-full border-2 border-white shadow-xs">
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </button>
  );
}
