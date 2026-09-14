import React, { useState } from 'react';

import CheckoutHeader from '../components/checkout/CheckoutHeader';
import AddressCard from '../components/checkout/AddressCard';
import AddressSelector from '../components/checkout/AddressSelector';
import DeliveryOptions from '../components/checkout/DeliveryOptions';
import CheckoutItem from '../components/checkout/CheckoutItem';
import PaymentMethod from '../components/checkout/PaymentMethod';
import StickyPlaceOrder from '../components/checkout/StickyPlaceOrder';

import MultiShopNotice from '../components/cart/MultiShopNotice';
import EmptyState from '../components/states/EmptyState';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

import OrderSuccessView from './OrderSuccessView';

import { useCart } from '../context/CartContext';
import { orderRepository } from '../repositories/orderRepository';
import { paymentRepository } from '../repositories/paymentRepository';
import { loadRazorpay } from '../utils/loadRazorpay';
import { savedAddressesData, deliveryOptionsData, paymentMethodsData } from '../data/checkoutData';

/**
 * MEATLY Customer Checkout View with Order API Repository Integration
 */
export default function CheckoutView({
  onBackToCart,
  onExploreShops,
  onBackToHome
}) {
  const {
    cartItems,
    subtotal,
    deliveryFee: cartDeliveryFee,
    discount,
    shopGroups,
    isMultiShop,
    clearCart
  } = useCart();

  // Address State
  const [addresses, setAddresses] = useState(savedAddressesData);
  const [selectedAddressId, setSelectedAddressId] = useState(savedAddressesData[0].id);
  const [isChangingAddress, setIsChangingAddress] = useState(false);

  // Delivery Option & Payment State
  const [selectedDeliveryId, setSelectedDeliveryId] = useState('standard');
  const [selectedPaymentId, setSelectedPaymentId] = useState('upi');

  // Order Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
  const selectedDelivery = deliveryOptionsData.find(d => d.id === selectedDeliveryId) || deliveryOptionsData[0];
  const selectedPayment = paymentMethodsData.find(p => p.id === selectedPaymentId) || paymentMethodsData[0];

  const deliveryFee = selectedDeliveryId === 'express' ? 70 : cartDeliveryFee;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddNewAddress = (newAddress) => {
    setAddresses([newAddress, ...addresses]);
    setSelectedAddressId(newAddress.id);
    setIsChangingAddress(false);
    showToast('New address saved!');
  };

  const [pendingOrderId, setPendingOrderId] = useState(null);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      showToast('Please select a delivery address');
      return;
    }

    if (isMultiShop) {
      showToast('An order can only contain products from a single shop.');
      return;
    }

    setIsSubmitting(true);
    try {
      let order = createdOrder;
      
      // 1. Create Order if not already created
      if (!pendingOrderId) {
        order = await orderRepository.createOrder({
          cartItems,
          deliveryAddress: selectedAddress,
          deliveryOption: selectedDelivery,
          paymentMethod: selectedPayment,
          bill: {
            itemTotal: subtotal,
            deliveryFee,
            discount,
            finalTotal: total,
          },
        });
        setPendingOrderId(order.id);
      } else {
        order = await orderRepository.getOrderById(pendingOrderId);
      }

      // 2. COD Flow
      if (selectedPayment.id === 'cod') {
        setCreatedOrder(order);
        clearCart();
        setIsSubmitting(false);
        return;
      }

      // 3. Online Payment Flow
      const paymentIntent = await paymentRepository.createPayment(order.id, selectedPayment.id);
      
      if (paymentIntent.provider === 'mock') {
        // Mock payment flow
        const verifyRes = await paymentRepository.verifyPayment(order.id, {
          razorpay_payment_id: paymentIntent.paymentId,
          razorpay_order_id: paymentIntent.providerOrderId,
          razorpay_signature: 'mock_signature'
        });
        
        if (verifyRes.success) {
          setCreatedOrder(order);
          clearCart();
        } else {
          showToast('Payment verification failed');
        }
        setIsSubmitting(false);
        return;
      }

      // 4. Razorpay flow
      const res = await loadRazorpay();
      if (!res) {
        showToast('Razorpay SDK failed to load. Are you online?');
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: paymentIntent.key,
        amount: paymentIntent.amount,
        currency: 'INR',
        name: 'MEATLY',
        description: 'Fresh Meat Order',
        order_id: paymentIntent.providerOrderId,
        handler: async function (response) {
          try {
            const verifyRes = await paymentRepository.verifyPayment(order.id, response);
            if (verifyRes.success) {
              setCreatedOrder(order);
              clearCart();
            } else {
              showToast('Payment verification failed');
            }
          } catch (err) {
            showToast(err.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: selectedAddress.fullName,
          contact: selectedAddress.phone,
        },
        theme: {
          color: '#667A3E',
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            showToast('Payment cancelled');
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      showToast(err.message || 'Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (createdOrder) {
    return (
      <OrderSuccessView
        orderId={createdOrder.orderNumber || createdOrder.id}
        shopName={shopGroups[0]?.shopName || createdOrder.shop?.name || 'Fresh Meat Partner Shop'}
        deliveryTime={selectedDelivery.time}
        totalAmount={createdOrder.bill?.finalTotal || total}
        paymentMethod={selectedPayment.id}
        onContinueShopping={onBackToHome}
        onViewOrder={() => {
          if (onBackToHome) onBackToHome();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-28 md:pb-12">
      
      {/* Checkout Header */}
      <CheckoutHeader onBack={onBackToCart} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title Bar */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7268]">
            Review your delivery details and order summary
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Address, Delivery Options, Items, Payment */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* 1. Delivery Address Section */}
              {isChangingAddress ? (
                <AddressSelector
                  addresses={addresses}
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={(addr) => {
                    setSelectedAddressId(addr.id);
                    setIsChangingAddress(false);
                  }}
                  onAddNewAddress={handleAddNewAddress}
                />
              ) : (
                <AddressCard
                  address={selectedAddress}
                  onChangeAddress={() => setIsChangingAddress(true)}
                />
              )}

              {/* 2. Delivery Options Radio Selector */}
              <DeliveryOptions
                options={deliveryOptionsData}
                selectedOptionId={selectedDeliveryId}
                onSelectOption={(id) => setSelectedDeliveryId(id)}
              />

              {/* 3. Multi-Shop Delivery Notice */}
              {isMultiShop && <MultiShopNotice />}

              {/* 4. Order Items Review Grouped by Shop */}
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4E4DA]">
                  <h3 className="text-base font-bold text-[#20231B]">
                    Order Items ({cartItems.length})
                  </h3>
                  <button
                    onClick={onBackToCart}
                    className="text-xs font-bold text-[#667A3E] hover:underline cursor-pointer"
                  >
                    Edit Cart
                  </button>
                </div>

                {shopGroups.map((group) => (
                  <div key={group.shopId} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="olive" size="sm">{group.shopName}</Badge>
                      <span className="text-xs text-[#6F7268]">({group.items.length} items)</span>
                    </div>

                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <CheckoutItem key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 5. Payment Method Selector */}
              <PaymentMethod
                methods={paymentMethodsData}
                selectedMethodId={selectedPaymentId}
                onSelectMethod={(id) => setSelectedPaymentId(id)}
              />

            </div>

            {/* Right Column: Sticky Order Summary & Place Order CTA */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
              
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#20231B] pb-3 border-b border-[#E4E4DA]">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#20231B]">
                  <div className="flex justify-between">
                    <span className="text-[#6F7268]">Items Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#6F7268]">Delivery ({selectedDelivery.title})</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#4F7D32]">
                      <span className="font-medium">Coupon Savings</span>
                      <span className="font-extrabold">-₹{discount}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#E4E4DA] flex justify-between items-baseline">
                    <div>
                      <span className="text-base font-black text-[#20231B] block">
                        Total Amount
                      </span>
                      <span className="text-[10px] text-[#6F7268]">All taxes included</span>
                    </div>
                    <span className="text-2xl font-black text-[#20231B]">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* Selected Payment Method Pill */}
                <div className="bg-[#FAF8F1] rounded-[12px] p-3 border border-[#E4E4DA] text-xs space-y-1">
                  <span className="text-[#6F7268] block">Paying with:</span>
                  <span className="font-bold text-[#20231B]">{selectedPayment.title}</span>
                </div>

                {/* Desktop Place Order CTA */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                >
                  {isSubmitting ? 'Creating Order...' : `Place Order • ₹${total}`}
                </Button>
              </div>

            </div>

          </div>
        ) : (
          /* Empty Cart State Protection */
          <EmptyState
            type="cart"
            title="Your cart is empty."
            description="Add some fresh meat before checking out."
            actionLabel="Explore Shops"
            onAction={onExploreShops}
          />
        )}

      </main>

      {/* Mobile Sticky Place Order Bar */}
      {cartItems.length > 0 && (
        <StickyPlaceOrder
          total={total}
          disabled={isSubmitting}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#20231B] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg border border-[#E8EEDB]/20 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#667A3E]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
