import React from 'react';

/**
 * Reusable MEATLY Input Component
 * Clean white background, soft border, rounded corners, olive focus glow ring.
 */
export default function Input({
  label,
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconClick,
  className = '',
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-[#20231B]">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {LeftIcon && (
          <div className="absolute left-3.5 text-[#6F7268] pointer-events-none flex items-center justify-center">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}
        
        <input
          id={inputId}
          className={`w-full bg-white text-[#20231B] placeholder-[#6F7268] text-sm rounded-[12px] border border-[#E4E4DA] transition-all duration-150 focus:outline-none focus:border-[#667A3E] focus:ring-4 focus:ring-[#667A3E]/15 ${
            LeftIcon ? 'pl-10' : 'pl-3.5'
          } ${RightIcon ? 'pr-10' : 'pr-3.5'} py-2.5 ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : ''
          } ${className}`}
          {...props}
        />

        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className={`absolute right-3.5 text-[#6F7268] hover:text-[#20231B] flex items-center justify-center ${
              onRightIconClick ? 'cursor-pointer' : 'pointer-events-none'
            }`}
          >
            <RightIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-600 font-medium pl-1">
          {error}
        </span>
      )}
    </div>
  );
}
