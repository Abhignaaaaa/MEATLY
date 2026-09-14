import React from 'react';
import { ChevronRight } from 'lucide-react';
import ShopCard from '../cards/ShopCard';
import Button from '../common/Button';

/**
 * Popular Near You Section Component
 */
export default function PopularShopsSection({
  shops = [],
  onShopClick,
  onSeeAllClick,
  className = ''
}) {
  return (
    <section className={`w-full ${className}`}>
      
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#20231B] tracking-tight">
            Popular Near You
          </h2>
          <p className="text-xs sm:text-sm text-[#6F7268] mt-0.5 font-normal">
            Trusted shops around Karimnagar
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

      {/* Shop Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop) => (
          <ShopCard
            key={shop.id}
            name={shop.name}
            rating={shop.rating}
            reviewsCount={shop.reviewsCount}
            distance={shop.distance}
            deliveryTime={shop.deliveryTime}
            isOpen={shop.isOpen}
            categories={shop.categories}
            imageUrl={shop.imageUrl}
            isDemo={shop.isDemo}
            onClick={() => onShopClick && onShopClick(shop)}
          />
        ))}
      </div>
    </section>
  );
}
