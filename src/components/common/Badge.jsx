import React from 'react';

/**
 * Reusable MEATLY Badge Component
 * Soft light-olive background, dark olive text, or success/fresh variations.
 */
export default function Badge({
  children,
  variant = 'olive', // 'olive' | 'success' | 'dark' | 'outline' | 'cream'
  size = 'md',       // 'sm' | 'md'
  icon: Icon,
  className = ''
}) {
  const variantStyles = {
    olive: 'bg-[#E8EEDB] text-[#46552A] border border-[#d2dcb9]',
    success: 'bg-[#4F7D32]/10 text-[#4F7D32] border border-[#4F7D32]/20',
    dark: 'bg-[#46552A] text-white',
    outline: 'bg-white text-[#46552A] border border-[#E4E4DA]',
    cream: 'bg-[#FAF8F1] text-[#20231B] border border-[#E4E4DA]',
  }[variant] || variantStyles.olive;

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-wide uppercase',
    md: 'text-xs px-2.5 py-1 rounded-lg font-semibold tracking-wide uppercase',
  }[size] || sizeStyles.md;

  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap ${variantStyles} ${sizeStyles} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
