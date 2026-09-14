import React from 'react';
import { CheckCircle2, Clock, Store, ArrowRight, Home } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

/**
 * Demo Order Success Confirmation Screen (STEP 6 Completion Screen)
 */
export default function OrderSuccessView({
  orderId = '#MEATLY1024',
  shopName = 'Fresh Chicken Centre',
  deliveryTime = '25–40 min',
  totalAmount = 680,
  paymentMethod = 'cod',
  onContinueShopping,
  onViewOrder
}) {
  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col items-center justify-center p-4">
      
      <div className="bg-white rounded-[24px] border border-[#E4E4DA] p-6 sm:p-10 max-w-md w-full text-center space-y-6 shadow-md">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border-2 border-[#d2dcb9] shadow-xs animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <Badge variant="olive" size="md">ORDER CONFIRMED</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight pt-2">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7268]">
            Your freshly cut meat order is being prepped in Karimnagar.
          </p>
        </div>

        {/* Order Details Summary Box */}
        <div className="bg-[#FAF8F1] rounded-[18px] border border-[#E4E4DA] p-4 text-left space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-[#E4E4DA]">
            <span className="text-[#6F7268] font-medium">Order ID</span>
            <span className="font-mono font-extrabold text-[#20231B]">{orderId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#6F7268] flex items-center gap-1.5 font-medium">
              <Store className="w-4 h-4 text-[#667A3E]" /> Partner Shop
            </span>
            <span className="font-bold text-[#20231B]">{shopName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#6F7268] flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-[#667A3E]" /> Est. Delivery
            </span>
            <span className="font-bold text-[#667A3E]">{deliveryTime}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#E4E4DA] text-sm">
            <span className="font-bold text-[#20231B]">{paymentMethod === 'cod' ? 'Total (COD)' : 'Total Paid'}</span>
            <span className="font-black text-[#20231B]">₹{totalAmount}</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="space-y-2.5 pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            rightIcon={ArrowRight}
            onClick={onViewOrder}
          >
            View Order Status
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            leftIcon={Home}
            onClick={onContinueShopping}
          >
            Continue Shopping
          </Button>
        </div>

      </div>
    </div>
  );
}
