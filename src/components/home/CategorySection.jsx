import React from 'react';
import CategoryCard from '../cards/CategoryCard';

/**
 * Category Section Component
 * Displays Chicken, Fish, Mutton categories.
 */
export default function CategorySection({
  categories = [],
  onCategoryClick,
  className = ''
}) {
  return (
    <section className={`w-full ${className}`}>
      
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#20231B] tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-[#6F7268] mt-0.5 font-normal">
            Find what you're craving
          </p>
        </div>
      </div>

      {/* Categories Grid / Horizontal Scroll Container */}
      <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory">
        {categories.map((cat) => (
          <div key={cat.id} className="min-w-[240px] sm:min-w-0 snap-start flex-1">
            <CategoryCard
              title={cat.title}
              subtitle={cat.subtitle}
              itemCount={cat.itemCount}
              badgeText={cat.badgeText}
              imageUrl={cat.imageUrl}
              onClick={() => onCategoryClick && onCategoryClick(cat)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
