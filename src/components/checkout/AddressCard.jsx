import React from 'react';
import { Home, Briefcase, MapPin, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';

/**
 * AddressCard Component
 * Displays currently selected delivery address with a clear Change button.
 */
export default function AddressCard({
  address,
  onChangeAddress
}) {
  if (!address) return null;

  const Icon = address.type === 'Work' ? Briefcase : Home;

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center shrink-0 border border-[#d2dcb9]">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#20231B]">
                {address.type || 'Home'}
              </h3>
              {address.isDefault && (
                <Badge variant="olive" size="sm">DEFAULT</Badge>
              )}
            </div>
            <span className="text-xs text-[#6F7268] font-semibold block">
              {address.fullName} • {address.phone}
            </span>
          </div>
        </div>

        {onChangeAddress && (
          <button
            type="button"
            onClick={onChangeAddress}
            className="text-xs font-bold text-[#667A3E] hover:text-[#46552A] flex items-center gap-0.5 cursor-pointer"
          >
            <span>Change</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="bg-[#FAF8F1] rounded-[12px] border border-[#E4E4DA] p-3 text-xs text-[#20231B] leading-relaxed">
        <p className="font-medium">{address.house}, {address.street}</p>
        <p className="text-[#6F7268] mt-0.5">{address.city}, {address.state} — <span className="font-mono font-bold text-[#20231B]">{address.pincode}</span></p>
      </div>
    </div>
  );
}
