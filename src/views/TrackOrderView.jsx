import React, { useState } from 'react';
import { ArrowLeft, Clock, Store, MapPin, RefreshCw, ChevronRight } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

import OrderStatusBadge from '../components/orders/OrderStatusBadge';
import OrderTimeline from '../components/orders/OrderTimeline';
import TrackingMapPlaceholder from '../components/orders/TrackingMapPlaceholder';
import DeliveryPartnerCard from '../components/orders/DeliveryPartnerCard';

import { useCart } from '../context/CartContext';

/**
 * MEATLY Order Tracking View (`/orders/:orderId/track`)
 * Features vertical order timeline, map placeholder graphics, and status state simulator.
 */
export default function TrackOrderView({
  order,
  onBack,
  onViewOrderDetails,
  onBackToHome
}) {
  const { cartCount } = useCart();
  const [simulatedStatus, setSimulatedStatus] = useState(order?.status || 'preparing');
  const [toastMessage, setToastMessage] = useState(null);

  if (!order) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const statusOptions = [
    { id: 'placed', label: '1. Placed' },
    { id: 'confirmed', label: '2. Confirmed' },
    { id: 'preparing', label: '3. Preparing' },
    { id: 'out_for_delivery', label: '4. Dispatched' },
    { id: 'delivered', label: '5. Delivered' },
    { id: 'cancelled', label: '6. Cancelled' },
  ];

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
              onClick={onBack || onViewOrderDetails}
              className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#20231B] tracking-tight">
                  Track Order {order.id}
                </h1>
                <OrderStatusBadge status={simulatedStatus} />
              </div>
              <p className="text-xs text-[#6F7268]">
                {order.shop.name} • Karimnagar
              </p>
            </div>
          </div>

          <button
            onClick={onViewOrderDetails}
            className="text-xs font-bold text-[#667A3E] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Status Simulator Toolbar */}
        <div className="bg-[#46552A] text-white p-3 rounded-[16px] flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs text-xs">
          <span className="font-bold flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Simulate Order Status:
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {statusOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setSimulatedStatus(opt.id);
                  showToast(`Simulated status: ${opt.label}`);
                }}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-[11px] font-bold ${
                  simulatedStatus === opt.id ? 'bg-[#667A3E] text-white' : 'bg-black/30 text-gray-200 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status ETA Header Banner */}
        <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#6F7268] font-bold uppercase tracking-wider block mb-1">
              Live Delivery Status
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#20231B]">
              {simulatedStatus === 'delivered'
                ? 'Order Delivered!'
                : simulatedStatus === 'cancelled'
                ? 'Order Cancelled'
                : simulatedStatus === 'out_for_delivery'
                ? 'Rider is on the way!'
                : 'Preparing your fresh cut...'}
            </h2>
          </div>

          {['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(simulatedStatus) && (
            <div className="bg-[#FAF8F1] px-4 py-2 rounded-xl border border-[#E4E4DA] flex items-center gap-2 self-start sm:self-auto">
              <Clock className="w-5 h-5 text-[#667A3E]" />
              <div>
                <span className="text-[10px] text-[#6F7268] block">Est. Delivery</span>
                <span className="text-base font-black text-[#20231B]">{order.estimatedDelivery || '25–40 min'}</span>
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-6 space-y-6">
            <OrderTimeline currentStatus={simulatedStatus} />
          </div>

          {/* Right Column: Map Placeholder & Delivery Partner */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Map Placeholder Graphic */}
            <TrackingMapPlaceholder
              shopName={order.shop.name}
              eta={order.estimatedDelivery}
            />

            {/* Rider Info Card (Out for Delivery state) */}
            {simulatedStatus === 'out_for_delivery' && (
              <DeliveryPartnerCard
                riderInfo={order.riderInfo || {
                  name: 'Ramesh K.',
                  phone: '9876500000',
                  vehicle: 'Hero Splendor (TS 02 AB 1234)',
                }}
              />
            )}

            {/* Navigation Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={onViewOrderDetails}
              >
                View Full Bill Details
              </Button>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={onBackToHome}
              >
                Back to Home
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
