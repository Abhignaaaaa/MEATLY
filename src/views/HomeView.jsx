import React, { useState } from 'react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import SearchBar from '../components/common/SearchBar';
import InfoCard from '../components/cards/InfoCard';
import { GridSkeleton } from '../components/states/SkeletonLoader';
import Button from '../components/common/Button';

import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import PopularShopsSection from '../components/home/PopularShopsSection';
import PopularProductsSection from '../components/home/PopularProductsSection';
import PromoBanner from '../components/home/PromoBanner';
import NearbyShopsSection from '../components/home/NearbyShopsSection';

import { 
  categoriesData, 
  popularProductsData,
  promoBannerData
} from '../data/homeData';
import { useCart } from '../context/CartContext';
import { useShops } from '../hooks/useShops';

/**
 * MEATLY Customer Home Screen View with API Layer Integration
 */
export default function HomeView({ 
  onOpenDesignSystem, 
  onOpenExplore, 
  onOpenCart, 
  onOpenOrders, 
  onOpenProfile, 
  onSelectShop, 
  onSelectProduct 
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const { cartCount } = useCart();
  const { shops, loading, error, refetch } = useShops();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'explore' && onOpenExplore) {
      onOpenExplore();
    } else if (tab === 'cart' && onOpenCart) {
      onOpenCart();
    } else if (tab === 'orders' && onOpenOrders) {
      onOpenOrders();
    } else if (tab === 'profile' && onOpenProfile) {
      onOpenProfile();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      
      {/* 1. Header Component */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={cartCount}
        locationName="Karimnagar, Telangana"
        onLocationClick={() => showToast('Location set to Karimnagar, Telangana')}
        onCartClick={() => onOpenCart ? onOpenCart() : null}
        onProfileClick={() => onOpenProfile ? onOpenProfile() : null}
      />

      {/* Developer Quick Bar */}
      <div className="bg-[#46552A] text-white px-4 py-1.5 text-xs text-center font-medium flex items-center justify-between">
        <span className="truncate">Karimnagar Launch Market • Step 9 API Foundation ({import.meta.env.VITE_USE_MOCK_DATA === 'true' ? 'Mock Repository Mode' : 'REST API Mode'})</span>
        {onOpenDesignSystem && (
          <button
            onClick={onOpenDesignSystem}
            className="underline text-[#E8EEDB] hover:text-white font-bold cursor-pointer shrink-0 ml-2"
          >
            View Design System Showcase →
          </button>
        )}
      </div>

      {/* Main Home Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 sm:space-y-12">
        
        {/* 2. Search Section */}
        <section className="w-full">
          <SearchBar
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Search chicken, fish, mutton..."
            onFilterClick={() => onOpenExplore && onOpenExplore()}
          />
        </section>

        {/* 3. Hero Banner Section */}
        <HeroBanner
          onExploreClick={() => onOpenExplore ? onOpenExplore() : null}
          onOffersClick={() => {
            const el = document.getElementById('promo-banner-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Quick Categories Section */}
        <CategorySection
          categories={categoriesData}
          onCategoryClick={() => onOpenExplore && onOpenExplore()}
        />

        {/* Error Retry Banner if API load error occurs */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-[18px] flex items-center justify-between gap-4">
            <span className="text-xs font-semibold">{error}</span>
            <Button variant="outline" size="sm" onClick={refetch}>
              Retry
            </Button>
          </div>
        )}

        {/* 5. Popular Near You Section */}
        <div id="popular-shops-section">
          {loading ? (
            <div className="space-y-3">
              <div className="h-6 w-48 bg-[#E8EEDB] rounded-md animate-pulse"></div>
              <GridSkeleton count={3} type="shop" />
            </div>
          ) : (
            <PopularShopsSection
              shops={shops.slice(0, 3)}
              onShopClick={(shop) => onSelectShop ? onSelectShop(shop) : null}
              onSeeAllClick={() => onOpenExplore && onOpenExplore()}
            />
          )}
        </div>

        {/* 6. Popular Today Section */}
        <PopularProductsSection
          products={popularProductsData}
          onAddToCart={(prod) => onSelectProduct ? onSelectProduct(prod) : null}
          onSeeAllClick={() => onOpenExplore && onOpenExplore()}
        />

        {/* 7. Promotional Section */}
        <div id="promo-banner-section">
          <PromoBanner
            badge={promoBannerData.badge}
            title={promoBannerData.title}
            subtitle={promoBannerData.subtitle}
            ctaText={promoBannerData.ctaText}
            onCtaClick={() => onOpenExplore && onOpenExplore()}
          />
        </div>

        {/* 8. Nearby Shops Section */}
        {loading ? (
          <div className="space-y-3">
            <div className="h-6 w-48 bg-[#E8EEDB] rounded-md animate-pulse"></div>
            <GridSkeleton count={2} type="shop" />
          </div>
        ) : (
          <NearbyShopsSection
            shops={shops}
            onShopClick={(shop) => onSelectShop ? onSelectShop(shop) : null}
          />
        )}

        {/* Trust & Quality Info Footer Card */}
        <InfoCard
          title="100% Freshly Cut from Karimnagar Shops"
          description="Every order is cut fresh after you place your request by our verified local partner shops in Karimnagar."
        />

      </main>

      {/* 9. Fixed Mobile Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={cartCount}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#20231B] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg border border-[#E8EEDB]/20 animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#667A3E]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
