import React from 'react';
import { User, ShieldAlert } from 'lucide-react';
import Header from '../common/Header';
import BottomNavigation from '../common/BottomNavigation';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

/**
 * Reusable AuthGuard wrapper for protected customer views
 */
export default function AuthGuard({
  children,
  onNavigateToLogin,
  onBackToHome,
  onExploreShops,
  activeTab = 'profile'
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const { cartCount } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#667A3E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
        <Header activeTab={activeTab} cartCount={cartCount} locationName="Karimnagar, Telangana" />
        
        <main className="flex-1 max-w-md w-full mx-auto px-4 py-12 text-center space-y-6 my-auto">
          <div className="w-16 h-16 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
            <ShieldAlert className="w-8 h-8 text-[#667A3E]" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#20231B]">Authentication Required</h2>
            <p className="text-xs sm:text-sm text-[#6F7268] mt-1">
              Please sign in with your mobile number to view orders, account settings, and saved addresses.
            </p>
          </div>
          <div className="space-y-3">
            <Button variant="primary" size="lg" fullWidth onClick={onNavigateToLogin}>
              Login / Signup
            </Button>
            <Button variant="outline" size="md" fullWidth onClick={onBackToHome}>
              Back to Home
            </Button>
          </div>
        </main>

        <BottomNavigation
          activeTab={activeTab}
          cartCount={cartCount}
          onTabChange={(tab) => {
            if (tab === 'home' && onBackToHome) onBackToHome();
            if (tab === 'explore' && onExploreShops) onExploreShops();
          }}
        />
      </div>
    );
  }

  return children;
}
