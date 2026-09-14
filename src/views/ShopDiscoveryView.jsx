import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, MapPin, ArrowUpDown, Check } from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import SearchBar from '../components/common/SearchBar';
import ShopCard from '../components/cards/ShopCard';
import EmptyState from '../components/states/EmptyState';
import { GridSkeleton } from '../components/states/SkeletonLoader';
import Button from '../components/common/Button';

import { useShops } from '../hooks/useShops';

/**
 * MEATLY Shop Discovery Page View ("Explore Shops") with API Integration & Debounced Search
 */
export default function ShopDiscoveryView({
  onBackToHome,
  onSelectShop,
  onOpenCart,
  cartCount = 0
}) {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeFilterOption, setActiveFilterOption] = useState(null); // 'open', 'top-rated', 'fast-delivery'
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'rating', 'distance', 'time'
  const [isSortOpen, setIsSortOpen] = useState(false);

  const { shops, loading, error, refetch, searchShops } = useShops(selectedCategory);

  // Debounce search query changes by 300ms to avoid unnecessary API/repository spam
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchShops(debouncedQuery);
    }
  }, [debouncedQuery]);

  const categories = ['All', 'Chicken', 'Fish', 'Mutton'];
  const filterBadges = [
    { id: 'open', label: 'Open Now' },
    { id: 'top-rated', label: 'Top Rated (4.6+)' },
    { id: 'fast-delivery', label: 'Fast Delivery (<30 min)' },
  ];

  // Filter and Sort Logic
  const processedShops = useMemo(() => {
    let result = [...shops];

    // Search query filter (local safety check)
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.categories && s.categories.some(c => c.toLowerCase().includes(q)))
      );
    }

    // Special status filters
    if (activeFilterOption === 'open') {
      result = result.filter(s => s.isOpen);
    } else if (activeFilterOption === 'top-rated') {
      result = result.filter(s => s.rating >= 4.6);
    } else if (activeFilterOption === 'fast-delivery') {
      result = result.filter(s => parseInt(s.deliveryTime) <= 30);
    }

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'distance') {
      result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    } else if (sortBy === 'time') {
      result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    }

    return result;
  }, [shops, debouncedQuery, activeFilterOption, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSelectedCategory('All');
    setActiveFilterOption(null);
    setSortBy('recommended');
    refetch();
  };

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      
      {/* App Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'home' && onBackToHome) onBackToHome();
        }}
        cartCount={cartCount}
        locationName="Karimnagar, Telangana"
        onCartClick={() => onOpenCart && onOpenCart()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Title & Location Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
                Explore Shops
              </h1>
              <p className="text-xs sm:text-sm text-[#6F7268]">
                Fresh meat from trusted local shops in Karimnagar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#E4E4DA] self-start sm:self-auto text-xs font-semibold text-[#20231B]">
            <MapPin className="w-4 h-4 text-[#667A3E]" />
            <span>Karimnagar, Telangana</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full">
          <SearchBar
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Search shops or meat (debounced)..."
          />
        </div>

        {/* Filter Chips & Sort Selector Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-b border-[#E4E4DA] pb-4">
          
          {/* Main Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#667A3E] text-white shadow-xs'
                      : 'bg-white text-[#20231B] border border-[#E4E4DA] hover:bg-[#FAF8F1]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Special Option Badges & Sort Button */}
          <div className="flex items-center gap-2 flex-wrap">
            {filterBadges.map((badge) => {
              const isActive = activeFilterOption === badge.id;
              return (
                <button
                  key={badge.id}
                  onClick={() => setActiveFilterOption(isActive ? null : badge.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#46552A] text-white border-[#46552A]'
                      : 'bg-[#E8EEDB]/60 text-[#46552A] border-[#d2dcb9] hover:bg-[#E8EEDB]'
                  }`}
                >
                  {badge.label}
                </button>
              );
            })}

            {/* Sort Modal/Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="px-3 py-1.5 rounded-full bg-white border border-[#E4E4DA] text-xs font-bold text-[#20231B] hover:border-[#667A3E] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-[#667A3E]" />
                <span>Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
              </button>

              {/* Sort Dropdown Menu */}
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[#E4E4DA] shadow-lg z-30 py-1 text-xs">
                  {[
                    { id: 'recommended', label: 'Recommended' },
                    { id: 'rating', label: 'Top Rating' },
                    { id: 'distance', label: 'Nearest Distance' },
                    { id: 'time', label: 'Fastest Delivery' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSortBy(opt.id);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#FAF8F1] flex items-center justify-between font-medium cursor-pointer"
                    >
                      <span className={sortBy === opt.id ? 'font-bold text-[#667A3E]' : 'text-[#20231B]'}>
                        {opt.label}
                      </span>
                      {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-[#667A3E]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-[18px] flex items-center justify-between gap-4">
            <span className="text-xs font-semibold">{error}</span>
            <Button variant="outline" size="sm" onClick={refetch}>
              Retry
            </Button>
          </div>
        )}

        {/* Shop Listing Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#6F7268]">
          <span>Showing {processedShops.length} shop(s) near Karimnagar</span>
          {(searchQuery || selectedCategory !== 'All' || activeFilterOption) && (
            <button
              onClick={clearAllFilters}
              className="text-[#667A3E] font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Shop Cards Grid / Skeleton / Empty State */}
        {loading ? (
          <GridSkeleton count={4} type="shop" />
        ) : processedShops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {processedShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                name={shop.name}
                rating={shop.rating}
                reviewsCount={shop.reviewsCount}
                distance={shop.distance}
                deliveryTime={shop.deliveryTime}
                isOpen={shop.isOpen}
                categories={shop.categories}
                imageUrl={shop.imageUrl}
                isDemo={shop.isDemo}
                onClick={() => onSelectShop && onSelectShop(shop)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            type="shops"
            title="No shops found"
            description="Try searching for a different shop, category, or clear your selected filters."
            actionLabel="Clear Filters"
            onAction={clearAllFilters}
          />
        )}

      </main>

      {/* Mobile Bottom Nav */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'home' && onBackToHome) onBackToHome();
          if (tab === 'cart' && onOpenCart) onOpenCart();
        }}
        cartCount={cartCount}
      />

    </div>
  );
}
