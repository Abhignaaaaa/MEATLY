import React from 'react';
import { Check } from 'lucide-react';

/**
 * Reusable PreferenceSelector Component for MEATLY
 * Used for Weight selection, Cutting Preferences, Cleaning Options, and Add-ons.
 */
export default function PreferenceSelector({
  title,
  subtitle,
  options = [],
  selectedId, // string or array (if isMulti)
  onSelect,
  isMulti = false,
  className = ''
}) {
  const isOptionSelected = (id) => {
    if (isMulti && Array.isArray(selectedId)) {
      return selectedId.includes(id);
    }
    return selectedId === id;
  };

  return (
    <div className={`w-full space-y-2.5 ${className}`}>
      {title && (
        <div>
          <h3 className="text-sm md:text-base font-bold text-[#20231B]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#6F7268] mt-0.5">{subtitle}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map((opt) => {
          const selected = isOptionSelected(opt.id);

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect && onSelect(opt.id)}
              className={`flex items-start justify-between p-3 md:p-3.5 rounded-[14px] border text-left transition-all duration-150 cursor-pointer meatly-card-transition ${
                selected
                  ? 'bg-[#E8EEDB] border-[#667A3E] text-[#46552A] shadow-xs'
                  : 'bg-white border-[#E4E4DA] text-[#20231B] hover:bg-[#FAF8F1]'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs md:text-sm font-bold ${selected ? 'text-[#46552A]' : 'text-[#20231B]'}`}>
                    {opt.title}
                  </span>
                  {opt.price > 0 && (
                    <span className="text-[11px] font-extrabold text-[#4F7D32] bg-[#4F7D32]/10 px-1.5 py-0.5 rounded-md">
                      +₹{opt.price}
                    </span>
                  )}
                </div>
                {opt.desc && (
                  <p className={`text-[11px] md:text-xs leading-tight ${selected ? 'text-[#46552A]/80 font-medium' : 'text-[#6F7268]'}`}>
                    {opt.desc}
                  </p>
                )}
              </div>

              {/* Selection Checkmark Indicator */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  selected
                    ? 'bg-[#667A3E] border-[#667A3E] text-white'
                    : 'bg-white border-[#E4E4DA] text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
