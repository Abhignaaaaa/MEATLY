import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

/**
 * StickyCheckoutBar Component
 * Fixed bottom bar on mobile (<768px) displaying total price and Proceed to Checkout CTA.
 */
export default function StickyCheckoutBar({
  total = 0,
  onProceedToCheckout
}) {
  return (
    <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E4DA] p-3 shadow-[0_-4px_16px_rgba(32,35,27,0.08)] flex items-center justify-between gap-4">
      <div>
        <span className="text-[10px] text-[#6F7268] block font-medium">To Pay</span>
        <span className="text-xl font-black text-[#20231B]">₹{total}</span>
      </div>

      <Button
        variant="primary"
        size="md"
        rightIcon={ArrowRight}
        onClick={onProceedToCheckout}
        className="flex-1 max-w-[220px]"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
