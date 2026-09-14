import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, CreditCard, ShoppingBag } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

import { useCart } from '../context/CartContext';

/**
 * Placeholder Checkout Screen (STEP 5 Navigation Target)
 * Visually confirms cart order details before Step 6 implementation.
 */
export default function CheckoutPlaceholderView({
  onBackToCart,
  onBackToHome
}) {
  const { cartItems, total, subtotal, deliveryFee, discount } = useCart();

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      
      <Header
        activeTab="cart"
        cartCount={cartItems.length}
        locationName="Karimnagar, Telangana"
      />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCart}
            className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
            aria-label="Back to Cart"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
                Checkout Preview
              </h1>
              <Badge variant="olive" size="sm">STEP 5 PLACEHOLDER</Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#6F7268]">
              Order preparation for Karimnagar delivery
            </p>
          </div>
        </div>

        {/* Demo Order Ready Banner */}
        <div className="bg-[#FAF8F1] rounded-[20px] border border-[#E4E4DA] p-6 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#20231B]">
              Ready to Order from Local Shops
            </h3>
            <p className="text-xs sm:text-sm text-[#6F7268] max-w-md mx-auto mt-1">
              Your cart items and custom cutting preferences are ready for order dispatch in Karimnagar.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              leftIcon={ShoppingBag}
              onClick={() => alert('Demo Order Submitted! (Step 6 will implement full checkout/order flow)')}
            >
              Confirm Order • ₹{total}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onBackToCart}
            >
              Back to Cart
            </Button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 space-y-4 shadow-xs">
          <h4 className="text-sm font-bold text-[#20231B] pb-2 border-b border-[#E4E4DA]">
            Order Highlights
          </h4>

          <div className="space-y-2 text-xs sm:text-sm text-[#20231B]">
            <div className="flex justify-between">
              <span className="text-[#6F7268]">Total Items</span>
              <span className="font-bold">{cartItems.length} customized item(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7268]">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6F7268]">Delivery Fee</span>
              <span className="font-semibold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#4F7D32]">
                <span>Coupon Savings</span>
                <span className="font-bold">-₹{discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-[#E4E4DA] flex justify-between font-extrabold text-base">
              <span>Final Total</span>
              <span className="text-[#667A3E]">₹{total}</span>
            </div>
          </div>
        </div>

      </main>

      <BottomNavigation
        activeTab="cart"
        cartCount={cartItems.length}
      />

    </div>
  );
}
