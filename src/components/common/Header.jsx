import React from 'react';
import { MapPin, ShoppingBag, User, Bell, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import IconButton from './IconButton';

/**
 * Reusable App Header Foundation
 * Desktop: Full navigation bar + Karimnagar location selector + cart/profile
 * Mobile: Compact header with MEATLY logo + 📍 Karimnagar + profile
 */
export default function Header({
  activeTab = 'home',
  onTabChange,
  cartCount = 0,
  locationName = 'Karimnagar, Telangana',
  onLocationClick,
  onProfileClick,
  onCartClick,
  className = ''
}) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'orders', label: 'Orders' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E4E4DA] transition-all shadow-xs ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-6">
          <button 
            type="button" 
            onClick={() => onTabChange && onTabChange('home')} 
            className="focus:outline-none text-left cursor-pointer"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange && onTabChange(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#E8EEDB] text-[#46552A]'
                      : 'text-[#6F7268] hover:text-[#20231B] hover:bg-[#F7F8EF]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center / Location Selector */}
        <button
          type="button"
          onClick={onLocationClick}
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#FAF8F1] border border-[#E4E4DA] hover:border-[#667A3E] transition-all text-left max-w-[200px] sm:max-w-[280px] md:max-w-[320px] cursor-pointer group"
        >
          <div className="w-7 h-7 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center shrink-0 group-hover:bg-[#667A3E] group-hover:text-white transition-colors">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex flex-col overflow-hidden leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-xs md:text-sm font-bold text-[#20231B] truncate">
                {locationName}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6F7268] shrink-0" />
            </div>
            <span className="text-[10px] md:text-xs text-[#6F7268] truncate hidden sm:inline">
              Delivering to your location
            </span>
          </div>
        </button>

        {/* Right Side: Actions (Desktop & Mobile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Cart Button */}
          <div className="hidden sm:block">
            <IconButton
              icon={ShoppingBag}
              badgeCount={cartCount}
              onClick={onCartClick}
              ariaLabel="View Cart"
            />
          </div>

          {/* Profile Action */}
          <button
            type="button"
            onClick={onProfileClick}
            className="flex items-center gap-2 p-1 md:pr-3 rounded-full hover:bg-[#E8EEDB]/60 transition-colors cursor-pointer border border-transparent hover:border-[#E4E4DA]"
            aria-label="User Profile"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#E8EEDB] text-[#46552A] font-bold flex items-center justify-center border-2 border-white shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <span className="hidden lg:inline text-sm font-semibold text-[#20231B]">
              Account
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
