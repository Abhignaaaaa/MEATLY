import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import EmptyState from '../components/states/EmptyState';
import OrderCard from '../components/orders/OrderCard';
import { CardSkeleton } from '../components/states/SkeletonLoader';
import Button from '../components/common/Button';

import { useCart } from '../context/CartContext';
import { useOrders } from '../hooks/useOrders';

/**
 * MEATLY Customer Orders Page View with API Layer Integration
 */
export default function OrdersView({
  onBackToHome,
  onTrackOrder,
  onViewOrderDetails,
  onReorderOrder,
  onExploreShops
}) {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedFilterTab, setSelectedFilterTab] = useState('All');
  const { cartCount } = useCart();
  const { orders, loading, error, refetch } = useOrders(selectedFilterTab.toLowerCase());

  const filterTabs = ['All', 'Active', 'Completed', 'Cancelled'];

  const filteredOrders = orders.filter((order) => {
    if (selectedFilterTab === 'Active') {
      return ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(order.status);
    }
    if (selectedFilterTab === 'Completed') {
      return order.status === 'delivered';
    }
    if (selectedFilterTab === 'Cancelled') {
      return order.status === 'cancelled';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'home' && onBackToHome) onBackToHome();
          if (tab === 'explore' && onExploreShops) onExploreShops();
        }}
        cartCount={cartCount}
        locationName="Karimnagar, Telangana"
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
              Your Orders
            </h1>
            <p className="text-xs sm:text-sm text-[#6F7268]">
              Track and manage your MEATLY orders in Karimnagar
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E4E4DA] pb-3 overflow-x-auto scrollbar-none">
          {filterTabs.map((tab) => {
            const isSelected = selectedFilterTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedFilterTab(tab)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#667A3E] text-white shadow-xs'
                    : 'bg-white text-[#20231B] border border-[#E4E4DA] hover:bg-[#FAF8F1]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Error Retry Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-[18px] flex items-center justify-between gap-4">
            <span className="text-xs font-semibold">{error}</span>
            <Button variant="outline" size="sm" onClick={refetch}>
              Retry
            </Button>
          </div>
        )}

        {/* Orders List / Skeletons / Empty State */}
        {loading ? (
          <div className="space-y-4">
            <CardSkeleton type="shop" />
            <CardSkeleton type="shop" />
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onTrackOrder={onTrackOrder}
                onViewDetails={onViewOrderDetails}
                onReorder={onReorderOrder}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            type="orders"
            title="No orders found"
            description={`You have no ${selectedFilterTab !== 'All' ? selectedFilterTab.toLowerCase() : ''} orders right now.`}
            actionLabel="Explore Shops"
            onAction={onExploreShops}
          />
        )}

      </main>

      <BottomNavigation
        activeTab="orders"
        cartCount={cartCount}
        onTabChange={(tab) => {
          if (tab === 'home' && onBackToHome) onBackToHome();
          if (tab === 'explore' && onExploreShops) onExploreShops();
        }}
      />

    </div>
  );
}
