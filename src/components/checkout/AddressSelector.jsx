import React, { useState } from 'react';
import { Home, Briefcase, Plus, Check } from 'lucide-react';
import AddressForm from './AddressForm';
import Button from '../common/Button';

/**
 * AddressSelector Component
 * Allows user to pick a saved address or trigger adding a new address.
 */
export default function AddressSelector({
  addresses = [],
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSaved = (newAddr) => {
    onAddNewAddress(newAddr);
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <AddressForm
        onSave={handleSaved}
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#E4E4DA]">
        <div>
          <h3 className="text-base font-bold text-[#20231B]">
            Choose Delivery Address
          </h3>
          <p className="text-xs text-[#6F7268]">Select where you want your fresh meat delivered</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={Plus}
          onClick={() => setShowAddForm(true)}
        >
          Add New
        </Button>
      </div>

      <div className="space-y-2.5">
        {addresses.map((addr) => {
          const isSelected = selectedAddressId === addr.id;
          const Icon = addr.type === 'Work' ? Briefcase : Home;

          return (
            <div
              key={addr.id}
              onClick={() => onSelectAddress && onSelectAddress(addr)}
              className={`p-3.5 rounded-[14px] border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#E8EEDB] border-[#667A3E] text-[#46552A] shadow-xs'
                  : 'bg-white border-[#E4E4DA] text-[#20231B] hover:bg-[#FAF8F1]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  isSelected ? 'bg-[#667A3E] text-white border-[#667A3E]' : 'bg-[#FAF8F1] text-[#6F7268] border-[#E4E4DA]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm">{addr.type}</span>
                    <span className="text-xs font-semibold text-[#6F7268]">({addr.fullName})</span>
                  </div>
                  <p className="text-xs mt-0.5 font-medium leading-relaxed">
                    {addr.house}, {addr.street}, {addr.city} — {addr.pincode}
                  </p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                isSelected ? 'bg-[#667A3E] border-[#667A3E] text-white' : 'border-[#E4E4DA]'
              }`}>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
