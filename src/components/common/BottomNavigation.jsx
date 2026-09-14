import React from 'react';
import { Home, Compass, ShoppingBag, ShoppingCart, User } from 'lucide-react';

/**
 * Mobile Bottom Navigation Component
 * Fixed at the bottom on mobile viewports (<768px).
 * Displays 5 tabs: Home, Explore, Orders, Cart, Profile.
 */
export default function BottomNavigation({
  activeTab = 'home',
  onTabChange,
  cartCount = 0,
  className = ''
}) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E4E4DA] shadow-[0_-4px_16px_rgba(32,35,27,0.06)] pb-safe ${className}`}>
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange && onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center flex-1 py-1 group focus:outline-none cursor-pointer"
            >
              <div className="relative">
                <div
                  className={`p-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E8EEDB] text-[#667A3E] scale-105'
                      : 'text-[#6F7268] group-hover:text-[#20231B]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Badge for Cart or Notifications */}
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 flex items-center justify-center bg-[#667A3E] text-white text-[9px] font-bold rounded-full border border-white">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-medium mt-0.5 transition-colors ${
                  isActive ? 'text-[#667A3E] font-bold' : 'text-[#6F7268]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
