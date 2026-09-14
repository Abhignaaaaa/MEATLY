import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import BaseCard from './BaseCard';
import Button from '../common/Button';

/**
 * Demo Product Card Component
 * Food product card for Chicken, Fish, Mutton cuts with demo prices & weight.
 */
export default function ProductCard({
  title = "Chicken Curry Cut",
  weight = "500 g",
  price = 180,
  originalPrice,
  shopName = "Fresh Chicken Centre",
  imageUrl,
  tag = "Fresh Cut",
  initialQuantity = 0,
  onAddToCart,
  className = ''
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleAdd = (e) => {
    e.stopPropagation();
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (onAddToCart) onAddToCart(newQty);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (onAddToCart) onAddToCart(newQty);
    }
  };

  return (
    <BaseCard
      padding="p-3 md:p-4"
      className={`group flex flex-col justify-between h-full ${className}`}
    >
      <div>
        {/* Product Image */}
        <div className="relative w-full aspect-4/3 rounded-[14px] overflow-hidden bg-[#FAF8F1] mb-3">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500";
            }}
          />
          
          {tag && (
            <span className="absolute top-2 left-2 bg-[#E8EEDB] text-[#46552A] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#d2dcb9]">
              {tag}
            </span>
          )}

          <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
            {weight}
          </span>
        </div>

        {/* Product Title & Shop */}
        <h4 className="text-sm md:text-base font-bold text-[#20231B] group-hover:text-[#667A3E] transition-colors leading-tight line-clamp-1">
          {title}
        </h4>
        <p className="text-xs text-[#6F7268] mt-0.5 font-normal truncate">
          {shopName}
        </p>
      </div>

      {/* Price & Add to Cart Controls */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-2 border-t border-[#E4E4DA]">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base md:text-lg font-black text-[#20231B]">
            ₹{price}
          </span>
          {originalPrice && (
            <span className="text-xs text-[#6F7268] line-through font-normal">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {quantity === 0 ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={Plus}
            onClick={handleAdd}
          >
            Add
          </Button>
        ) : (
          <div className="flex items-center gap-1.5 bg-[#E8EEDB] rounded-[10px] p-1 border border-[#667A3E]/30">
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 rounded-md bg-white text-[#46552A] hover:bg-[#46552A] hover:text-white transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-[#46552A] min-w-5 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleAdd}
              className="p-1 rounded-md bg-[#667A3E] text-white hover:bg-[#46552A] transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
