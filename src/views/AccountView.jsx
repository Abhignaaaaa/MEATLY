import React, { useState } from 'react';
import { 
  ArrowLeft, User, Package, MapPin, Heart, HelpCircle, 
  Settings, LogOut, ChevronRight, Edit3, ShieldCheck 
} from 'lucide-react';

import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import LogoutDialog from '../components/account/LogoutDialog';
import Button from '../components/common/Button';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

/**
 * MEATLY Customer Account / Profile View (`/account`)
 */
export default function AccountView({
  onBackToHome,
  onNavigateToEditProfile,
  onNavigateToAddresses,
  onNavigateToFavorites,
  onNavigateToOrders,
  onNavigateToHelp,
  onNavigateToLogin,
  onExploreShops
}) {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
        <Header activeTab="profile" cartCount={cartCount} locationName="Karimnagar, Telangana" />
        <main className="flex-1 max-w-md w-full mx-auto px-4 py-12 text-center space-y-6 my-auto">
          <div className="w-16 h-16 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#20231B]">Login to MEATLY</h2>
            <p className="text-xs sm:text-sm text-[#6F7268] mt-1">
              Sign in to view your profile, orders, saved addresses and favorites.
            </p>
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={onNavigateToLogin}>
            Login or Signup
          </Button>
        </main>
        <BottomNavigation activeTab="profile" cartCount={cartCount} />
      </div>
    );
  }

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);
    logout();
    if (onBackToHome) onBackToHome();
  };

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      
      {/* Top Header */}
      <Header
        activeTab="profile"
        cartCount={cartCount}
        locationName="Karimnagar, Telangana"
      />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Title Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
              My Account
            </h1>
            <p className="text-xs sm:text-sm text-[#6F7268]">
              Manage your profile, orders, and addresses
            </p>
          </div>
        </div>

        {/* User Profile Header Card */}
        <div className="bg-white rounded-[22px] border border-[#E4E4DA] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#E8EEDB] text-[#46552A] font-bold text-2xl flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
              ) : (
                <span>{user.fullName.charAt(0)}</span>
              )}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#20231B]">
                {user.fullName}
              </h2>
              <p className="text-xs text-[#6F7268] font-medium mt-0.5">
                {user.phone} {user.email ? `• ${user.email}` : ''}
              </p>
              <span className="inline-block mt-1 text-[11px] font-semibold text-[#667A3E] bg-[#E8EEDB] px-2.5 py-0.5 rounded-full">
                MEATLY Member since {user.memberSince || 'Sep 2026'}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={Edit3}
            onClick={onNavigateToEditProfile}
          >
            Edit Profile
          </Button>
        </div>

        {/* "Your MEATLY" Quick Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider px-1">
            Your MEATLY
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={onNavigateToOrders}
              className="bg-white rounded-[18px] border border-[#E4E4DA] p-4 text-center meatly-card-transition hover:-translate-y-1 hover:border-[#667A3E] cursor-pointer shadow-xs space-y-1"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#20231B] block">Orders</span>
            </button>

            <button
              onClick={onNavigateToAddresses}
              className="bg-white rounded-[18px] border border-[#E4E4DA] p-4 text-center meatly-card-transition hover:-translate-y-1 hover:border-[#667A3E] cursor-pointer shadow-xs space-y-1"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#20231B] block">Addresses</span>
            </button>

            <button
              onClick={onNavigateToFavorites}
              className="bg-white rounded-[18px] border border-[#E4E4DA] p-4 text-center meatly-card-transition hover:-translate-y-1 hover:border-[#667A3E] cursor-pointer shadow-xs space-y-1"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#20231B] block">Favorites</span>
            </button>
          </div>
        </div>

        {/* Account Menu Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider px-1">
            Account Settings & Support
          </h3>

          <div className="bg-white rounded-[20px] border border-[#E4E4DA] divide-y divide-[#FAF8F1] shadow-xs overflow-hidden">
            
            <button
              onClick={onNavigateToEditProfile}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAF8F1] transition-colors cursor-pointer text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#667A3E]" />
                <span className="font-semibold text-[#20231B]">Personal Information</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6F7268]" />
            </button>

            <button
              onClick={onNavigateToHelp}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAF8F1] transition-colors cursor-pointer text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#667A3E]" />
                <span className="font-semibold text-[#20231B]">Help & Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6F7268]" />
            </button>

            <button
              onClick={() => alert('Settings (Demo placeholder)')}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-[#FAF8F1] transition-colors cursor-pointer text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-[#667A3E]" />
                <span className="font-semibold text-[#20231B]">Settings & Preferences</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6F7268]" />
            </button>

          </div>
        </div>

        {/* Logout Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsLogoutOpen(true)}
            className="w-full p-4 rounded-[18px] bg-white border border-[#E4E4DA] hover:bg-red-50 hover:border-red-200 text-red-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>

        {/* Security Tag */}
        <div className="text-center text-[11px] text-[#6F7268] flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#667A3E]" />
          <span>MEATLY Karimnagar • Demo Account Session</span>
        </div>

      </main>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
        isOpen={isLogoutOpen}
        onCancel={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />

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
