import React, { useState } from 'react';
import { 
  Plus, Minus, ShoppingCart, Check, Heart, ShieldCheck, 
  ChevronDown, ChevronUp, AlertCircle 
} from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Rating from '../components/common/Rating';
import ProductCard from '../components/cards/ProductCard';
import { CardSkeleton } from '../components/states/SkeletonLoader';

import ImageGallery from '../components/product/ImageGallery';
import PreferenceSelector from '../components/product/PreferenceSelector';
import ShopContextCard from '../components/product/ShopContextCard';

import { 
  defaultDetailedProduct,
  cuttingOptionsByCategory, 
  cleaningOptionsByCategory, 
  addonOptions 
} from '../data/productsData';
import { popularProductsData } from '../data/homeData';

import { useProduct } from '../hooks/useProduct';

/**
 * MEATLY Product Details & Custom Cutting Preferences View with API Integration
 */
export default function ProductDetailsView({
  productData,
  onBack,
  onViewShop,
  onOpenCart,
  cartCount = 0,
  onAddToCartSuccess
}) {
  const productId = productData?.id || 'prod-1';
  const { product: fetchedProduct, loading, error, refetch } = useProduct(productId);

  const product = fetchedProduct || productData || defaultDetailedProduct;
  const categoryKey = (product.category || 'chicken').toLowerCase();

  // Customization State
  const [selectedWeight, setSelectedWeight] = useState(product.defaultWeight || '500 g');
  const [quantityMultiplier, setQuantityMultiplier] = useState(1);
  const [selectedCutId, setSelectedCutId] = useState('curry');
  const [selectedCleaningId, setSelectedCleaningId] = useState('cleaned');
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('about');
  const [toastMessage, setToastMessage] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const cutOptions = cuttingOptionsByCategory[categoryKey] || cuttingOptionsByCategory.chicken;
  const cleaningOptions = cleaningOptionsByCategory[categoryKey] || cleaningOptionsByCategory.chicken;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Price Calculations
  const weightMultiplier = {
    '250 g': 0.55,
    '500 g': 1.0,
    '1 kg': 1.9,
    '1.5 kg': 2.8,
    '2 kg': 3.6,
  }[selectedWeight] || 1.0;

  const baseCalculatedPrice = Math.round((product.price || product.basePrice || 180) * weightMultiplier);
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = addonOptions.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalPrice = (baseCalculatedPrice + addonsTotal) * quantityMultiplier;

  const handleToggleAddon = (addonId) => {
    if (selectedAddonIds.includes(addonId)) {
      setSelectedAddonIds(selectedAddonIds.filter(id => id !== addonId));
    } else {
      setSelectedAddonIds([...selectedAddonIds, addonId]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedCutId) {
      setValidationError('Please select your cutting preference.');
      return;
    }
    setValidationError(null);

    const configuredItem = {
      product: {
        ...product,
        basePrice: product.price || product.basePrice,
      },
      productId: product.id,
      weight: selectedWeight,
      quantity: quantityMultiplier,
      cut: cutOptions.find(c => c.id === selectedCutId)?.title,
      cleaning: cleaningOptions.find(c => c.id === selectedCleaningId)?.title,
      addons: selectedAddonIds,
      instructions: specialInstructions,
      totalPrice,
    };

    if (onAddToCartSuccess) onAddToCartSuccess(configuredItem);
    showToast(`Added ${quantityMultiplier}x ${product.title} (${selectedWeight}) to cart!`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
        <Header activeTab="explore" cartCount={cartCount} locationName="Karimnagar, Telangana" />
        <main className="flex-1 max-w-md w-full mx-auto px-4 py-12 text-center space-y-4 my-auto">
          <h2 className="text-xl font-bold text-[#20231B]">Product Details Unavailable</h2>
          <p className="text-xs text-[#6F7268]">{error}</p>
          <Button variant="outline" size="sm" onClick={onBack}>
            Back to Shop
          </Button>
        </main>
        <BottomNavigation activeTab="explore" cartCount={cartCount} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-32 md:pb-12">
      
      {/* Top Header */}
      <Header
        activeTab="explore"
        cartCount={cartCount}
        locationName="Karimnagar, Telangana"
        onCartClick={() => onOpenCart && onOpenCart()}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {loading ? (
          <div className="max-w-md mx-auto py-12">
            <CardSkeleton type="product" />
          </div>
        ) : (
          /* Main 2-Column Product Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Gallery & Shop Context Card */}
            <div className="lg:col-span-6 space-y-4">
              <ImageGallery
                images={product.images || [product.imageUrl]}
                title={product.title}
                onBack={onBack}
                isFavorite={isFavorite}
                onToggleFavorite={() => {
                  setIsFavorite(!isFavorite);
                  showToast(!isFavorite ? 'Saved product to favorites' : 'Removed product from favorites');
                }}
                onShare={() => showToast('Product link copied to clipboard')}
                tag={product.tag}
              />

              {/* Shop Context Card */}
              <ShopContextCard
                shopName={product.shopName || 'Fresh Partner Shop'}
                shopRating={product.shopRating || 4.6}
                shopDistance={product.shopDistance || '1.5 km'}
                shopIsOpen={true}
                onViewShop={onViewShop}
              />
            </div>

            {/* Right Column: Customization & Preferences */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Title, Rating & Price Header */}
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="olive" size="sm">{(product.category || 'Chicken').toUpperCase()}</Badge>
                      <Badge variant="success" size="sm">AVAILABLE</Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] leading-tight">
                      {product.title}
                    </h1>
                  </div>
                  <Rating rating={product.rating || 4.8} reviewsCount={product.reviewsCount || 85} size="md" />
                </div>

                <p className="text-xs sm:text-sm text-[#6F7268]">
                  {product.description}
                </p>

                {/* Price & Selected Weight Summary */}
                <div className="flex items-baseline justify-between pt-3 border-t border-[#E4E4DA]">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-[#20231B]">
                        ₹{totalPrice}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#6F7268] line-through font-normal">
                          ₹{product.originalPrice * quantityMultiplier}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#6F7268] block mt-0.5">
                      Price shown for selected {selectedWeight} quantity
                    </span>
                  </div>

                  {/* Custom Quantity Multiplier Counter */}
                  <div className="flex items-center gap-2 bg-[#FAF8F1] rounded-[12px] p-1.5 border border-[#E4E4DA]">
                    <button
                      type="button"
                      onClick={() => setQuantityMultiplier(Math.max(1, quantityMultiplier - 1))}
                      className="p-1 rounded-md bg-white text-[#46552A] hover:bg-[#46552A] hover:text-white transition-colors cursor-pointer border border-[#E4E4DA]"
                      aria-label="Decrease multiplier"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-[#46552A] min-w-6 text-center">
                      {quantityMultiplier}x
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantityMultiplier(quantityMultiplier + 1)}
                      className="p-1 rounded-md bg-[#667A3E] text-white hover:bg-[#46552A] transition-colors cursor-pointer"
                      aria-label="Increase multiplier"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 1. Weight / Quantity Selection */}
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-3">
                <h3 className="text-sm md:text-base font-bold text-[#20231B]">
                  Choose Quantity / Weight
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(product.weightOptions || ['250 g', '500 g', '1 kg']).map((weight) => {
                    const isSelected = selectedWeight === weight;
                    return (
                      <button
                        key={weight}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`px-4 py-2 rounded-[12px] text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E8EEDB] border-[#667A3E] text-[#46552A] shadow-xs'
                            : 'bg-white border-[#E4E4DA] text-[#20231B] hover:bg-[#FAF8F1]'
                        }`}
                      >
                        {weight}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Cutting Preference Selector */}
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs">
                <PreferenceSelector
                  title="How would you like it cut?"
                  subtitle="Select your preferred cutting style"
                  options={cutOptions}
                  selectedId={selectedCutId}
                  onSelect={(id) => {
                    setSelectedCutId(id);
                    setValidationError(null);
                  }}
                />
              </div>

              {/* 3. Cleaning Preference Selector */}
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs">
                <PreferenceSelector
                  title="Cleaning Preference"
                  subtitle="Select your hygiene and preparation preference"
                  options={cleaningOptions}
                  selectedId={selectedCleaningId}
                  onSelect={(id) => setSelectedCleaningId(id)}
                />
              </div>

              {/* 4. Optional Add-ons */}
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs">
                <PreferenceSelector
                  title="Optional Preparation Add-ons"
                  subtitle="Enhance your fresh meat preparation"
                  options={addonOptions}
                  selectedId={selectedAddonIds}
                  onSelect={handleToggleAddon}
                  isMulti={true}
                />
              </div>

              {/* 5. Special Instructions Textarea */}
              <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="instructions" className="text-sm font-bold text-[#20231B]">
                    Special Cutting Instructions
                  </label>
                  <span className="text-[11px] text-[#6F7268] font-mono">
                    {specialInstructions.length} / 200
                  </span>
                </div>
                <textarea
                  id="instructions"
                  rows={3}
                  maxLength={200}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="E.g., Please make medium-size curry pieces and remove excess fat."
                  className="w-full bg-white text-[#20231B] placeholder-[#6F7268] text-xs sm:text-sm rounded-[12px] border border-[#E4E4DA] p-3 focus:outline-none focus:border-[#667A3E] focus:ring-4 focus:ring-[#667A3E]/15"
                />
              </div>

              {/* Validation Message */}
              {validationError && (
                <div className="bg-red-50 text-red-700 text-xs font-semibold p-3 rounded-[12px] border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Desktop Add to Cart CTA */}
              <div className="hidden lg:block pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={ShoppingCart}
                  onClick={handleAddToCart}
                >
                  Add to Cart • ₹{totalPrice}
                </Button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Sticky Mobile Add to Cart CTA Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E4DA] p-3 shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-[#6F7268] block">Total Price ({selectedWeight})</span>
          <span className="text-xl font-black text-[#20231B]">₹{totalPrice}</span>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={ShoppingCart}
          onClick={handleAddToCart}
          className="flex-1 max-w-[200px]"
        >
          Add to Cart
        </Button>
      </div>

      {/* Bottom Nav */}
      <BottomNavigation
        activeTab="explore"
        cartCount={cartCount}
        onTabChange={(tab) => {
          if (tab === 'cart' && onOpenCart) onOpenCart();
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
