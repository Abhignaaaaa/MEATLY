import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, Share2, Phone, MapPin, Clock, 
  ShieldCheck, Star, Info
} from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import Badge from '../components/common/Badge';
import Rating from '../components/common/Rating';
import ProductCard from '../components/cards/ProductCard';
import Button from '../components/common/Button';
import { CardSkeleton, GridSkeleton } from '../components/states/SkeletonLoader';

import { useShop } from '../hooks/useShop';

/**
 * MEATLY Shop Details Page View (`/shop/:shopId`) with API Integration
 */
export default function ShopDetailsView({
  shop: initialShop,
  onBack,
  onOpenCart,
  cartCount = 0,
  onAddToCart
}) {
  const shopId = initialShop?.id || 'shop-1';
  const { shop: fetchedShop, products, loading, error, refetch } = useShop(shopId);

  const shop = fetchedShop || initialShop;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Popular');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const displayedProducts = selectedTab === 'Popular' 
    ? products 
    : products.filter(p => (p.category || '').toLowerCase() === selectedTab.toLowerCase());

  const categoryTabs = ['Popular', 'Chicken', 'Fish', 'Mutton'];

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
        <Header activeTab="explore" cartCount={cartCount} locationName="Karimnagar, Telangana" />
        <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-12 text-center space-y-4 my-auto">
          <h2 className="text-xl font-bold text-[#20231B]">Shop Unavailable</h2>
          <p className="text-xs text-[#6F7268]">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              Back to Shops
            </Button>
            <Button variant="primary" size="sm" onClick={refetch}>
              Retry Loading
            </Button>
          </div>
        </main>
        <BottomNavigation activeTab="explore" cartCount={cartCount} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      
      {/* Top Navigation Header */}
      <Header
        activeTab="explore"
        cartCount={cartCount}
        locationName="Karimnagar, Telangana"
        onCartClick={() => onOpenCart && onOpenCart()}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {loading || !shop ? (
          <div className="space-y-4">
            <div className="w-full aspect-16/9 rounded-[22px] bg-[#E8EEDB] animate-pulse"></div>
            <CardSkeleton type="shop" />
          </div>
        ) : (
          <>
            {/* Cover Image & Actions */}
            <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-[22px] overflow-hidden bg-white border border-[#E4E4DA] shadow-sm">
              <img
                src={shop.coverImageUrl || shop.imageUrl}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <button
                  onClick={onBack}
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#20231B] hover:bg-white transition-all shadow-md cursor-pointer"
                  aria-label="Back to shops"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsFavorite(!isFavorite);
                      showToast(!isFavorite ? 'Saved to Favorites' : 'Removed from Favorites');
                    }}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                      isFavorite 
                        ? 'bg-[#667A3E] text-white' 
                        : 'bg-white/90 text-[#20231B] hover:bg-white'
                    }`}
                    aria-label="Favorite Shop"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                  </button>

                  <button
                    onClick={() => showToast('Shop link copied to clipboard')}
                    className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#20231B] hover:bg-white transition-all shadow-md cursor-pointer"
                    aria-label="Share Shop"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Shop Info Card */}
            <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant={shop.isOpen ? 'olive' : 'dark'} size="sm">
                      {shop.isOpen ? 'OPEN NOW' : 'CLOSED'}
                    </Badge>
                    <span className="text-xs text-[#6F7268] font-medium">{shop.address}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
                    {shop.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#6F7268] mt-1">
                    {shop.description}
                  </p>
                </div>
                <Rating rating={shop.rating} reviewsCount={shop.reviewsCount} size="lg" />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#20231B] pt-2 border-t border-[#E4E4DA]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#667A3E]" />
                  {shop.distance} away
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#667A3E]" />
                  {shop.deliveryTime}
                </span>
                <span>•</span>
                <span className="text-[#4F7D32]">{shop.deliveryFee}</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={Phone}
                  onClick={() => showToast('Calling shop (Demo)...')}
                >
                  Call Shop
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={MapPin}
                  onClick={() => showToast('Opening directions in Karimnagar (Demo)...')}
                >
                  Directions
                </Button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="sticky top-16 md:top-20 z-30 bg-[#F7F8EF]/95 backdrop-blur-md py-2 border-b border-[#E4E4DA]">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                {categoryTabs.map((tab) => {
                  const isSelected = selectedTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#46552A] text-white shadow-xs'
                          : 'bg-white text-[#20231B] border border-[#E4E4DA] hover:bg-[#E8EEDB]'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Products Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#20231B]">
                {selectedTab === 'Popular' ? 'Popular from this shop' : `${selectedTab} Cuts`}
              </h2>

              {loading ? (
                <GridSkeleton count={3} type="product" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedProducts.map((prod) => (
                    <div key={prod.id} onClick={() => onAddToCart && onAddToCart(prod)} className="cursor-pointer">
                      <ProductCard
                        product={prod}
                        title={prod.title}
                        weight={prod.weight}
                        price={prod.price}
                        originalPrice={prod.originalPrice}
                        shopName={shop.name}
                        tag={prod.tag}
                        imageUrl={prod.imageUrl}
                        onAddToCart={() => onAddToCart && onAddToCart(prod)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

      </main>

      <BottomNavigation
        activeTab="explore"
        cartCount={cartCount}
        onTabChange={(tab) => {
          if (tab === 'cart' && onOpenCart) onOpenCart();
        }}
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
