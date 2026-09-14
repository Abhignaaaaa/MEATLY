import React from 'react';
import { Store, ShoppingBag, ShoppingCart, Search } from 'lucide-react';
import Button from '../common/Button';

/**
 * Reusable Empty State Component
 * Visually consistent empty states for No Shops, No Orders, Empty Cart.
 */
export default function EmptyState({
  type = 'shops', // 'shops' | 'orders' | 'cart' | 'search'
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) {
  const defaults = {
    shops: {
      icon: Store,
      title: "No nearby shops found",
      description: "We couldn't find any partner shops matching your criteria in this area of Karimnagar.",
      actionLabel: "Clear Filters",
    },
    orders: {
      icon: ShoppingBag,
      title: "Your orders will appear here.",
      description: "You haven't placed any fresh meat orders yet. Discover partner shops in your neighborhood.",
      actionLabel: "Explore Shops",
    },
    cart: {
      icon: ShoppingCart,
      title: "Your cart is waiting for something fresh.",
      description: "Browse local chicken, fish and mutton shops in Karimnagar to add your favorite cuts.",
      actionLabel: "Browse Categories",
    },
    search: {
      icon: Search,
      title: "No search results found",
      description: "Try typing 'Chicken', 'Boneless', 'Fish', or 'Mutton' to find what you're craving.",
      actionLabel: "Reset Search",
    },
  }[type] || defaults.shops;

  const Icon = defaults.icon;
  const displayTitle = title || defaults.title;
  const displayDesc = description || defaults.description;
  const displayBtn = actionLabel || defaults.actionLabel;

  return (
    <div className={`bg-white rounded-[20px] border border-[#E4E4DA] p-8 md:p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-xs ${className}`}>
      <div className="w-16 h-16 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mb-4 border border-[#d2dcb9]">
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-lg md:text-xl font-bold text-[#20231B] mb-2 leading-snug">
        {displayTitle}
      </h3>

      <p className="text-sm text-[#6F7268] mb-6 leading-relaxed">
        {displayDesc}
      </p>

      {onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {displayBtn}
        </Button>
      )}
    </div>
  );
}
