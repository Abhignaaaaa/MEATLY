import React from 'react';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../cards/ProductCard';
import Button from '../common/Button';

/**
 * Popular Today Products Section Component
 */
export default function PopularProductsSection({
  products = [],
  onAddToCart,
  onSeeAllClick,
  className = ''
}) {
  return (
    <section className={`w-full ${className}`}>
      
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#20231B] tracking-tight">
            Popular Today
          </h2>
          <p className="text-xs sm:text-sm text-[#6F7268] mt-0.5 font-normal">
            Fresh picks customers love
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          rightIcon={ChevronRight}
          onClick={onSeeAllClick}
        >
          See All
        </Button>
      </div>

      {/* Products Horizontal Scroll / 4-column Grid */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory">
        {products.map((prod) => (
          <div key={prod.id} className="min-w-[210px] sm:min-w-0 snap-start flex-1">
            <ProductCard
              title={prod.title}
              weight={prod.weight}
              price={prod.price}
              originalPrice={prod.originalPrice}
              shopName={prod.shopName}
              imageUrl={prod.imageUrl}
              tag={prod.tag}
              onAddToCart={(qty) => onAddToCart && onAddToCart(prod, qty)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
