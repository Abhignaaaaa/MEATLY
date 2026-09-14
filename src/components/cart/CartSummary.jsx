import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';

/**
 * CartSummary Component
 * Displays subtotal, delivery fee, coupon savings, and total price with primary Proceed to Checkout CTA.
 */
export default function CartSummary({
  subtotal = 0,
  deliveryFee = 40,
  discount = 0,
  total = 0,
  onProceedToCheckout
}) {
  return (
    <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-4">
      <h3 className="text-base font-bold text-[#20231B] pb-3 border-b border-[#E4E4DA]">
        Order Summary
      </h3>

      {/* Itemized Breakdown */}
      <div className="space-y-2.5 text-xs sm:text-sm text-[#20231B]">
        <div className="flex justify-between">
          <span className="text-[#6F7268]">Items Subtotal</span>
          <span className="font-semibold">₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#6F7268]">Delivery Fee</span>
          {deliveryFee === 0 ? (
            <span className="font-bold text-[#4F7D32]">FREE</span>
          ) : (
            <span className="font-semibold">₹{deliveryFee}</span>
          )}
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[#4F7D32]">
            <span className="font-medium">Coupon Discount (MEATLY10)</span>
            <span className="font-extrabold">-₹{discount}</span>
          </div>
        )}

        <div className="pt-3 border-t border-[#E4E4DA] flex justify-between items-baseline">
          <div>
            <span className="text-base font-black text-[#20231B] block">
              Total Amount
            </span>
            <span className="text-[10px] text-[#6F7268]">Taxes included</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#20231B]">
            ₹{total}
          </span>
        </div>
      </div>

      {/* Savings Highlight Badge */}
      {discount > 0 && (
        <div className="bg-[#E8EEDB] text-[#46552A] text-xs font-bold p-2.5 rounded-[12px] text-center border border-[#667A3E]/30">
          🎉 You are saving ₹{discount} on this fresh meat order!
        </div>
      )}

      {/* Primary Proceed to Checkout CTA */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        rightIcon={ArrowRight}
        onClick={onProceedToCheckout}
      >
        Proceed to Checkout
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6F7268] pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-[#667A3E]" />
        <span>100% Fresh Meat Guarantee • Karimnagar Shops</span>
      </div>
    </div>
  );
}
