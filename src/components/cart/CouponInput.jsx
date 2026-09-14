import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import Button from '../common/Button';

/**
 * CouponInput Component
 * Supports applying demo coupon MEATLY10 with "You saved ₹50" highlight.
 */
export default function CouponInput({
  appliedCoupon,
  onApply,
  onRemove
}) {
  const [couponCode, setCouponCode] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setErrorMessage(null);

    const res = onApply(couponCode);
    if (res && !res.success) {
      setErrorMessage(res.message);
    } else {
      setCouponCode('');
    }
  };

  return (
    <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-4 shadow-xs space-y-3">
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-[#667A3E]" />
        <h4 className="text-sm font-bold text-[#20231B]">
          Have a coupon code?
        </h4>
      </div>

      {appliedCoupon ? (
        <div className="bg-[#E8EEDB] rounded-[12px] border border-[#667A3E]/30 p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-[#46552A]">
            <span className="w-5 h-5 rounded-full bg-[#667A3E] text-white flex items-center justify-center font-bold shrink-0">
              <Check className="w-3 h-3" />
            </span>
            <div>
              <span className="font-extrabold uppercase tracking-wide">
                {appliedCoupon.code}
              </span>
              <span className="block text-[11px] font-semibold text-[#4F7D32]">
                You saved ₹{appliedCoupon.discountAmount}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="p-1 rounded-full text-[#6F7268] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            aria-label="Remove coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Try MEATLY10"
            className="flex-1 bg-[#FAF8F1] text-[#20231B] uppercase placeholder:normal-case placeholder-[#6F7268] text-xs sm:text-sm rounded-[12px] border border-[#E4E4DA] px-3 py-2 focus:outline-none focus:border-[#667A3E]"
          />
          <Button variant="secondary" size="sm" type="submit">
            Apply
          </Button>
        </form>
      )}

      {errorMessage && (
        <span className="text-xs text-red-600 font-semibold block pl-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
