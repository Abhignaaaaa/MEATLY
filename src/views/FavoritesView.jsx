import React, { useState } from 'react';
import { ArrowLeft, Heart, Store, ShoppingBag, Trash2 } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import ShopCard from '../components/cards/ShopCard';
import ProductCard from '../components/cards/ProductCard';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { allShopsData } from '../data/shopsData';
import { popularProductsData } from '../data/homeData';

/**
 * MEATLY Favorites View (`/account/favorites`)
 */
export default function FavoritesView({
  onBack,
  onBackToHome,
  onSelectShop,
  onSelectProduct,
  onExploreShops
}) {
  const { favoriteShopIds, favoriteProductIds, toggleFavoriteShop, toggleFavoriteProduct } = useAuth();
  const { cartCount } = useCart();
  const [activeTab, setActiveTab] = useState('shops'); // 'shops' | 'products'

  const favShops = allShopsData.filter((s) => favoriteShopIds.includes(s.id));
  const favProducts = popularProductsData.filter((p) => favoriteProductIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      <Header activeTab="profile" cartCount={cartCount} locationName="Karimnagar, Telangana" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
              Your Favorites
            </h1>
            <p className="text-xs sm:text-sm text-[#6F7268]">
              Saved shops and favorite fresh cuts
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#E8EEDB]/60 p-1 rounded-full max-w-xs border border-[#E4E4DA]">
          <button
            onClick={() => setActiveTab('shops')}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'shops'
                ? 'bg-[#667A3E] text-white shadow-xs'
                : 'text-[#46552A] hover:bg-white/50'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Shops ({favShops.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#667A3E] text-white shadow-xs'
                : 'text-[#46552A] hover:bg-white/50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Items ({favProducts.length})</span>
          </button>
        </div>

        {/* Tab 1: Favorited Shops */}
        {activeTab === 'shops' && (
          <div>
            {favShops.length === 0 ? (
              <div className="bg-white rounded-[24px] border border-[#E4E4DA] p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto">
                  <Heart className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#20231B]">No Favorite Shops Yet</h3>
                  <p className="text-xs text-[#6F7268] mt-1">
                    Save your preferred meat, fish, and mutton shops in Karimnagar.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={onExploreShops}
                >
                  Explore Shops
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favShops.map((shop) => (
                  <div key={shop.id} className="relative group">
                    <ShopCard
                      shop={shop}
                      onClick={() => onSelectShop(shop)}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteShop(shop.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-500 hover:bg-white shadow-md transition-all cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Heart className="w-4 h-4 fill-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Favorited Products */}
        {activeTab === 'products' && (
          <div>
            {favProducts.length === 0 ? (
              <div className="bg-white rounded-[24px] border border-[#E4E4DA] p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#20231B]">No Favorite Items Yet</h3>
                  <p className="text-xs text-[#6F7268] mt-1">
                    Bookmark your favorite curry cuts and seafood items for quick re-ordering.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={onBackToHome}
                >
                  Browse Home
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favProducts.map((prod) => (
                  <div key={prod.id} className="relative group">
                    <ProductCard
                      product={prod}
                      onClick={() => onSelectProduct(prod)}
                      onAddToCart={() => onSelectProduct(prod)}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteProduct(prod.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-500 hover:bg-white shadow-md transition-all cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Heart className="w-4 h-4 fill-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      <BottomNavigation
        activeTab="profile"
        cartCount={cartCount}
        onTabChange={(tab) => {
          if (tab === 'home' && onBackToHome) onBackToHome();
          if (tab === 'explore' && onExploreShops) onExploreShops();
        }}
      />
    </div>
  );
}
