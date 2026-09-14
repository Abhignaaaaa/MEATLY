import React, { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

/**
 * Large Search Bar Component for MEATLY
 * Features clear button, filter button trigger, and smooth focus glow.
 */
export default function SearchBar({
  placeholder = "Search chicken, fish, mutton...",
  value: externalValue,
  onChange,
  onSearch,
  onFilterClick,
  className = ''
}) {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const handleChange = (e) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    if (onChange) onChange(val);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    if (onChange) onChange('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full relative flex items-center gap-2 ${className}`}>
      <div className="relative flex-1 flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-[#667A3E] pointer-events-none" />
        
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-white text-[#20231B] placeholder-[#6F7268] text-sm md:text-base rounded-[16px] border border-[#E4E4DA] pl-12 pr-10 py-3 md:py-3.5 shadow-sm transition-all duration-200 focus:outline-none focus:border-[#667A3E] focus:ring-4 focus:ring-[#667A3E]/15"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 p-1 rounded-full text-[#6F7268] hover:text-[#20231B] hover:bg-[#E8EEDB] transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          className="p-3 md:p-3.5 bg-white text-[#46552A] rounded-[16px] border border-[#E4E4DA] hover:border-[#667A3E] hover:bg-[#E8EEDB] transition-all cursor-pointer shadow-sm flex items-center justify-center shrink-0"
          title="Filter items"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      )}
    </form>
  );
}
