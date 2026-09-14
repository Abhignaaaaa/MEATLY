import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import EmptyState from '../components/states/EmptyState';
import Button from '../components/common/Button';

import CartShopGroup from '../components/cart/CartShopGroup';
import MultiShopNotice from '../components/cart/MultiShopNotice';
import CouponInput from '../components/cart/CouponInput';
import DeliveryCard from '../components/cart/DeliveryCard';
import CartSummary from '../components/cart/CartSummary';
import StickyCheckoutBar from '../components/cart/StickyCheckoutBar';

import { useCart } from '../context/CartContext';

/**
 * MEATLY Customer Cart Page View (STEP 5)
 */
export default function CartView({
  onBack,
  onExploreShops,
  onProceedToCheckout,
  onEditItem
}) {
  const {
    cartItems,
    cartCount,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    subtotal,
    deliveryFee,
    discount,
    total,
    shopGroups,
    isMultiShop,
    clearCart
  } = useCart();

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
    showToast('Item removed from cart');
  };

  const handleUpdateQty = (itemId, newQty) => {
    updateQuantity(itemId, newQty);
    if (newQty <= 0) {
      showToast('Item removed from cart');
    }
  };

  const handleApplyCoupon = (code) => {
    const res = applyCoupon(code);
    if (res.success) {
      showToast(res.message);
    }
    return res;
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    showToast('Coupon removed');
  };

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-32 md:pb-12">
      
      {/* Top Header */}
      <Header
        activeTab="cart"
        cartCount={cartCount}
        locationName="Karimnagar, Telangana"
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack || onExploreShops}
              className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
                Your Cart
              </h1>
              <p className="text-xs sm:text-sm text-[#6F7268]">
                Review your fresh picks before checkout
              </p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                showToast('Cart cleared');
              }}
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Multi-Shop Notice & Shop Groups */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Multi Shop Delivery Informational Banner */}
              {isMultiShop && <MultiShopNotice />}

              {/* Shop Groups */}
              {shopGroups.map((group) => (
                <CartShopGroup
                  key={group.shopId}
                  group={group}
                  onUpdateQuantity={handleUpdateQty}
                  onRemoveItem={handleRemove}
                  onEditItem={onEditItem}
                />
              ))}

            </div>

            {/* Right Column: Delivery Card, Coupon & Order Summary */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Delivery Address Preview */}
              <DeliveryCard
                onChangeAddress={() => showToast('Address selection modal (Demo)')}
              />

              {/* Coupon Input */}
              <CouponInput
                appliedCoupon={appliedCoupon}
                onApply={handleApplyCoupon}
                onRemove={handleRemoveCoupon}
              />

              {/* Order Summary Card */}
              <CartSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                discount={discount}
                total={total}
                onProceedToCheckout={onProceedToCheckout}
              />

            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <EmptyState
            type="cart"
            title="Your cart is waiting for something fresh."
            description="Browse local chicken, fish, and mutton shops in Karimnagar to add your favorite cuts."
            actionLabel="Explore Shops"
            onAction={onExploreShops}
          />
        )}

      </main>

      {/* Mobile Sticky Bottom Checkout Bar */}
      {cartItems.length > 0 && (
        <StickyCheckoutBar
          total={total}
          onProceedToCheckout={onProceedToCheckout}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNavigation
        activeTab="cart"
        cartCount={cartCount}
        onTabChange={(tab) => {
          if (tab === 'home' && onBack) onBack();
          if (tab === 'explore' && onExploreShops) onExploreShops();
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-28 md:bottom-6 right-6 z-50 bg-[#20231B] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg border border-[#E8EEDB]/20 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#667A3E]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
