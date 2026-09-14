import React, { useState } from 'react';
import { 
  ArrowLeft, Store, MapPin, Clock, RefreshCw, 
  ArrowRight, ShieldCheck, HelpCircle, FileText 
} from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { CardSkeleton } from '../components/states/SkeletonLoader';

import OrderStatusBadge from '../components/orders/OrderStatusBadge';
import { useCart } from '../context/CartContext';
import { useOrder } from '../hooks/useOrder';

/**
 * MEATLY Order Details Page View (`/orders/:orderId`) with API Repository Integration
 */
export default function OrderDetailsView({
  order: initialOrder,
  onBack,
  onTrackOrder,
  onViewShop,
  onReorder
}) {
  const orderId = initialOrder?.id || 'MEATLY-1001';
  const { order: fetchedOrder, loading, error, refetch } = useOrder(orderId);
  const order = fetchedOrder || initialOrder;

  const { cartCount } = useCart();
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
        <Header activeTab="orders" cartCount={cartCount} locationName="Karimnagar, Telangana" />
        <main className="flex-1 max-w-md w-full mx-auto px-4 py-12 text-center space-y-4 my-auto">
          <h2 className="text-xl font-bold text-[#20231B]">Order Details Unavailable</h2>
          <p className="text-xs text-[#6F7268]">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              Back to Orders
            </Button>
            <Button variant="primary" size="sm" onClick={refetch}>
              Retry
            </Button>
          </div>
        </main>
        <BottomNavigation activeTab="orders" cartCount={cartCount} />
      </div>
    );
  }

  if (loading || !order) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
        <Header activeTab="orders" cartCount={cartCount} locationName="Karimnagar, Telangana" />
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <CardSkeleton type="shop" />
          <CardSkeleton type="shop" />
        </main>
        <BottomNavigation activeTab="orders" cartCount={cartCount} />
      </div>
    );
  }

  const isActive = ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(order.status);
  const isDelivered = order.status === 'delivered';
  const subtotal = order.bill?.itemTotal || order.subtotal || 400;
  const deliveryFee = order.bill?.deliveryFee !== undefined ? order.bill.deliveryFee : (order.deliveryFee || 40);
  const discount = order.bill?.discount || order.discount || 0;
  const total = order.bill?.finalTotal || order.total || 440;
  const paymentMethod = order.payment?.method || order.paymentMethod || 'UPI';

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      
      <Header
        activeTab="orders"
        cartCount={cartCount}
        locationName="Karimnagar, Telangana"
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#20231B] tracking-tight">
                  Order {order.orderNumber || order.id}
                </h1>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-xs text-[#6F7268]">
                Placed on {order.createdAt || order.date || 'Today'}
              </p>
            </div>
          </div>

          <button
            onClick={() => showToast('Order receipt downloaded (Demo)')}
            className="text-xs font-bold text-[#667A3E] hover:underline flex items-center gap-1 cursor-pointer hidden sm:flex"
          >
            <FileText className="w-4 h-4" />
            <span>Invoice</span>
          </button>
        </div>

        {/* Status Card Banner */}
        <div className={`rounded-[20px] p-5 border shadow-xs space-y-3 ${
          isActive 
            ? 'bg-[#E8EEDB]/60 border-[#667A3E]/40 text-[#46552A]' 
            : isDelivered 
            ? 'bg-[#4F7D32]/10 border-[#4F7D32]/30 text-[#4F7D32]' 
            : 'bg-white border-[#E4E4DA] text-[#20231B]'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">
              {isActive && (order.statusDescription || 'Preparing your fresh meat order...')}
              {isDelivered && 'Delivered successfully!'}
              {order.status === 'cancelled' && 'Order Cancelled'}
            </h3>

            {isActive && onTrackOrder && (
              <Button
                variant="primary"
                size="sm"
                rightIcon={ArrowRight}
                onClick={() => onTrackOrder(order)}
              >
                Track Order
              </Button>
            )}
          </div>

          {isActive && (
            <p className="text-xs font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Estimated Delivery: <strong>25–35 min</strong>
            </p>
          )}
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Items & Customizations */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shop Info Context */}
            <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-4 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center shrink-0 border border-[#d2dcb9]">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#20231B]">{order.shop?.name || 'Fresh Partner Shop'}</h4>
                  <span className="text-xs text-[#6F7268]">{order.shop?.address || 'Karimnagar Launch Market'}</span>
                </div>
              </div>

              {onViewShop && (
                <button
                  onClick={() => onViewShop(order.shop)}
                  className="text-xs font-bold text-[#667A3E] hover:underline cursor-pointer"
                >
                  View Shop
                </button>
              )}
            </div>

            {/* Customized Items List */}
            <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#20231B] pb-3 border-b border-[#E4E4DA]">
                Items in this Order ({order.items.length})
              </h3>

              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={item.id || idx} className="bg-[#FAF8F1] rounded-[16px] border border-[#E4E4DA] p-3.5 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=300'}
                          alt={item.name}
                          className="w-14 h-14 rounded-[12px] object-cover border border-[#E4E4DA] shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-[#20231B]">{item.name}</h4>
                          <span className="text-xs text-[#6F7268]">
                            Weight: <span className="font-semibold text-[#20231B]">{item.weight || '500 g'}</span> • Qty: {item.quantity || 1}
                          </span>
                        </div>
                      </div>

                      <span className="font-black text-sm text-[#20231B]">
                        ₹{item.totalPrice || item.unitPrice || 180}
                      </span>
                    </div>

                    {/* Customization Details */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs border-t border-[#E4E4DA]/60">
                      {item.cutPreference && (
                        <Badge variant="olive" size="sm">Cut: {item.cutPreference}</Badge>
                      )}
                      {item.cleaningPreference && (
                        <Badge variant="cream" size="sm">Clean: {item.cleaningPreference}</Badge>
                      )}
                    </div>

                    {item.specialInstructions && (
                      <p className="text-[11px] text-[#6F7268] italic pt-0.5">
                        Instructions: "{item.specialInstructions}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Bill Details & Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bill Details Summary */}
            <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#20231B] pb-3 border-b border-[#E4E4DA]">
                Bill Details
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#20231B]">
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
                    <span>Discount</span>
                    <span className="font-bold">-₹{discount}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#E4E4DA] flex justify-between text-base font-black">
                  <span>Total Paid</span>
                  <span className="text-[#20231B]">₹{total}</span>
                </div>
              </div>

              <div className="bg-[#FAF8F1] rounded-[10px] p-2.5 border border-[#E4E4DA] text-xs text-[#6F7268] font-medium">
                Payment: <strong className="text-[#20231B]">{paymentMethod}</strong>
              </div>
            </div>

            {/* Delivery Address Card */}
            {order.deliveryAddress && (
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#667A3E]" /> Delivery Address
                </h4>
                <p className="text-xs font-bold text-[#20231B]">{order.deliveryAddress.fullName || order.customer?.name || 'Customer'} ({order.deliveryAddress.phone || '9876543210'})</p>
                <p className="text-xs text-[#6F7268] leading-relaxed">
                  {order.deliveryAddress.house}, {order.deliveryAddress.street}, {order.deliveryAddress.city || 'Karimnagar'} — {order.deliveryAddress.pincode || '505001'}
                </p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-2.5">
              {isDelivered && onReorder && (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={RefreshCw}
                  onClick={() => onReorder(order)}
                >
                  Reorder Item(s)
                </Button>
              )}

              <Button
                variant="outline"
                size="md"
                fullWidth
                leftIcon={HelpCircle}
                onClick={() => showToast('Connecting to MEATLY Karimnagar Support (Demo)...')}
              >
                Need Help with Order?
              </Button>
            </div>

          </div>

        </div>

      </main>

      <BottomNavigation
        activeTab="orders"
        cartCount={cartCount}
      />

      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#20231B] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg border border-[#E8EEDB]/20 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#667A3E]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
