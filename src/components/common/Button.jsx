import React from 'react';

/**
 * Reusable MEATLY Button Component
 * Supports primary, secondary, outline, ghost variants and loading/disabled states.
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md',         // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[12px] meatly-btn-transition focus:outline-none focus:ring-2 focus:ring-[#667A3E]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none cursor-pointer';

  const variantStyles = {
    primary: 'bg-[#667A3E] text-white hover:bg-[#46552A] active:bg-[#46552A] shadow-sm',
    secondary: 'bg-[#E8EEDB] text-[#46552A] hover:bg-[#d8e2c5] active:bg-[#c9d6b2]',
    outline: 'bg-white border-2 border-[#667A3E] text-[#667A3E] hover:bg-[#F7F8EF] active:bg-[#E8EEDB]',
    ghost: 'bg-transparent text-[#667A3E] hover:bg-[#E8EEDB]/60 active:bg-[#E8EEDB]',
  }[variant] || variantStyles.primary;

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-[10px]',
    md: 'px-4 py-2.5 text-sm gap-2 rounded-[12px]',
    lg: 'px-6 py-3.5 text-base gap-2.5 rounded-[14px]',
  }[size] || sizeStyles.md;

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
