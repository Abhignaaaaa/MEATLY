import React, { useState } from 'react';
import HomeView from './views/HomeView';
import ShopDiscoveryView from './views/ShopDiscoveryView';
import ShopDetailsView from './views/ShopDetailsView';
import ProductDetailsView from './views/ProductDetailsView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import OrdersView from './views/OrdersView';
import OrderDetailsView from './views/OrderDetailsView';
import TrackOrderView from './views/TrackOrderView';
import AccountView from './views/AccountView';
import EditProfileView from './views/EditProfileView';
import AddressesView from './views/AddressesView';
import FavoritesView from './views/FavoritesView';
import HelpSupportView from './views/HelpSupportView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import VerifyOtpView from './views/VerifyOtpView';
import AuthSuccessView from './views/AuthSuccessView';
import DesignSystem from './design-system/DesignSystem';
import AuthGuard from './components/auth/AuthGuard';
import OwnerGuard from './components/auth/OwnerGuard';
import OwnerLayout from './layouts/OwnerLayout';
import OwnerDashboardView from './views/owner/OwnerDashboardView';
import OwnerShopView from './views/owner/OwnerShopView';
import OwnerProductsView from './views/owner/OwnerProductsView';
import OwnerOrdersView from './views/owner/OwnerOrdersView';

import AdminGuard from './components/auth/AdminGuard';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardView from './views/admin/AdminDashboardView';
import AdminUsersView from './views/admin/AdminUsersView';
import AdminShopsView from './views/admin/AdminShopsView';
import AdminProductsView from './views/admin/AdminProductsView';
import AdminOrdersView from './views/admin/AdminOrdersView';

import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { allShopsData } from './data/shopsData';
import { detailedProductsData, defaultDetailedProduct } from './data/productsData';
import { demoOrdersData } from './data/ordersData';

function AppContent() {
  const [currentView, setCurrentView] = useState('home'); 
  // Views: 'home' | 'explore' | 'shop' | 'product' | 'cart' | 'checkout' | 'orders' | 'order-details' | 'track-order' 
  //        | 'account' | 'account-edit' | 'account-addresses' | 'account-favorites' | 'account-help'
  //        | 'login' | 'signup' | 'verify-otp' | 'auth-success' | 'design-system'

  const [selectedShop, setSelectedShop] = useState(allShopsData[0]);
  const [selectedProduct, setSelectedProduct] = useState(defaultDetailedProduct);
  const [selectedOrder, setSelectedOrder] = useState(demoOrdersData[0]);

  const { cartCount, addToCart } = useCart();
  const { user } = useAuth();

  const navigateTo = (viewName) => {
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);
    navigateTo('shop');
  };

  const handleSelectProduct = (product) => {
    const detailed = detailedProductsData[product.id] || {
      ...defaultDetailedProduct,
      title: product.title || product.name,
      basePrice: product.price || 180,
      shopName: product.shopName || selectedShop?.name || 'Fresh Chicken Centre',
    };
    setSelectedProduct(detailed);
    navigateTo('product');
  };

  const handleAddToCartSuccess = (configuredItem) => {
    addToCart(configuredItem);
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order || demoOrdersData[0]);
    navigateTo('track-order');
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order || demoOrdersData[0]);
    navigateTo('order-details');
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart({
        product: {
          id: item.productId,
          title: item.name,
          shopName: order.shop?.name || 'Fresh Shop',
          images: [item.image],
        },
        weight: item.weight,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        cut: item.cutPreference,
        cleaning: item.cleaningPreference,
        instructions: item.specialInstructions,
      });
    });
    navigateTo('cart');
  };

  if (currentView === 'design-system') {
    return (
      <div className="relative">
        <div className="bg-[#46552A] text-white px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <span className="text-xs font-bold">MEATLY Design System Preview Mode</span>
          <button
            onClick={() => navigateTo('home')}
            className="text-xs bg-[#667A3E] text-white px-3 py-1 rounded-md font-extrabold hover:bg-white hover:text-[#46552A] transition-colors cursor-pointer"
          >
            ? Back to App
          </button>
        </div>
        <DesignSystem />
      </div>
    );
  }

  // PUBLIC BROWSING VIEWS
  if (currentView === 'explore') {
    return (
      <ShopDiscoveryView
        onBackToHome={() => navigateTo('home')}
        onSelectShop={handleSelectShop}
        cartCount={cartCount}
        onOpenCart={() => navigateTo('cart')}
      />
    );
  }

  if (currentView === 'shop') {
    return (
      <ShopDetailsView
        shop={selectedShop}
        onBack={() => navigateTo('explore')}
        cartCount={cartCount}
        onAddToCart={(prod) => handleSelectProduct(prod)}
        onOpenCart={() => navigateTo('cart')}
      />
    );
  }

  if (currentView === 'product') {
    return (
      <ProductDetailsView
        productData={selectedProduct}
        onBack={() => navigateTo('shop')}
        onViewShop={() => navigateTo('shop')}
        cartCount={cartCount}
        onAddToCartSuccess={handleAddToCartSuccess}
        onOpenCart={() => navigateTo('cart')}
      />
    );
  }

  if (currentView === 'cart') {
    return (
      <CartView
        onBack={() => navigateTo('home')}
        onExploreShops={() => navigateTo('explore')}
        onProceedToCheckout={() => navigateTo('checkout')}
        onEditItem={(item) => {
          setSelectedProduct(detailedProductsData[item.productId] || defaultDetailedProduct);
          navigateTo('product');
        }}
      />
    );
  }

  // PROTECTED CUSTOMER VIEWS
  if (currentView === 'checkout') {
    return (
      <AuthGuard onNavigateToLogin={() => navigateTo('login')} onBackToHome={() => navigateTo('home')} onExploreShops={() => navigateTo('explore')} activeTab="cart">
        <CheckoutView
          onBackToCart={() => navigateTo('cart')}
          onExploreShops={() => navigateTo('explore')}
          onBackToHome={() => navigateTo('home')}
        />
      </AuthGuard>
    );
  }

  if (currentView === 'orders') {
    return (
      <AuthGuard onNavigateToLogin={() => navigateTo('login')} onBackToHome={() => navigateTo('home')} onExploreShops={() => navigateTo('explore')} activeTab="orders">
        <OrdersView
          onBackToHome={() => navigateTo('home')}
          onTrackOrder={handleTrackOrder}
          onViewOrderDetails={handleViewOrderDetails}
          onReorderOrder={handleReorder}
          onExploreShops={() => navigateTo('explore')}
        />
      </AuthGuard>
    );
  }

  if (currentView === 'order-details') {
    return (
      <AuthGuard onNavigateToLogin={() => navigateTo('login')} onBackToHome={() => navigateTo('home')} onExploreShops={() => navigateTo('explore')} activeTab="orders">
        <OrderDetailsView
          order={selectedOrder}
          onBack={() => navigateTo('orders')}
          onTrackOrder={handleTrackOrder}
          onViewShop={handleSelectShop}
          onReorder={handleReorder}
        />
      </AuthGuard>
    );
  }
  if (currentView === 'track-order') {
    return (
      <AuthGuard onNavigateToLogin={() => navigateTo('login')} onBackToHome={() => navigateTo('home')} onExploreShops={() => navigateTo('explore')} activeTab="orders">
        <TrackOrderView
          order={selectedOrder}
          onBack={() => navigateTo('order-details')}
          onViewOrderDetails={() => navigateTo('order-details')}
          onBackToHome={() => navigateTo('home')}
        />
      </AuthGuard>
    );
  }

  if (currentView === 'account') {
    return (
      <AuthGuard onNavigateToLogin={() => navigateTo('login')} onBackToHome={() => navigateTo('home')} onExploreShops={() => navigateTo('explore')} activeTab="profile">
        <AccountView
          onBackToHome={() => navigateTo('home')}
          onNavigateToEditProfile={() => navigateTo('account-edit')}
          onNavigateToAddresses={() => navigateTo('account-addresses')}
          onNavigateToFavorites={() => navigateTo('account-favorites')}
          onNavigateToOrders={() => navigateTo('orders')}
          onNavigateToHelp={() => navigateTo('account-help')}
          onNavigateToLogin={() => navigateTo('login')}
          onExploreShops={() => navigateTo('explore')}
        />
      </AuthGuard>
    );
  }

  if (currentView === 'account-edit') {
    return (
      <AuthGuard onNavigateToLogin={() => navigateTo('login')} onBackToHome={() => navigateTo('home')} onExploreShops={() => navigateTo('explore')} activeTab="profile">
        <EditProfileView
          onBack={() => navigateTo('account')}
          onBackToHome={() => navigateTo('home')}
          onExploreShops={() => navigateTo('explore')}
        />
      </AuthGuard>
    );
  }

  if (currentView === 'account-addresses') {
    return (
      <AuthGuard onNavigateToLogin={() => navigateTo('login')} onBackToHome={() => navigateTo('home')} onExploreShops={() => navigateTo('explore')} activeTab="profile">
        <AddressesView
          onBack={() => navigateTo('account')}
          onBackToHome={() => navigateTo('home')}
          onExploreShops={() => navigateTo('explore')}
        />
      </AuthGuard>
    );
  }

  if (currentView === 'account-favorites') {
    return (
      <AuthGuard onNavigateToLogin={() => navigateTo('login')} onBackToHome={() => navigateTo('home')} onExploreShops={() => navigateTo('explore')} activeTab="profile">
        <FavoritesView
          onBack={() => navigateTo('account')}
          onBackToHome={() => navigateTo('home')}
          onSelectShop={handleSelectShop}
          onSelectProduct={handleSelectProduct}
          onExploreShops={() => navigateTo('explore')}
        />
      </AuthGuard>
    );
  }

  if (currentView === 'account-help') {
    return (
      <HelpSupportView
        onBack={() => navigateTo('account')}
        onBackToHome={() => navigateTo('home')}
        onExploreShops={() => navigateTo('explore')}
      />
    );
  }

  // AUTHENTICATION VIEWS
  if (currentView === 'login') {
    return (
      <LoginView
        onBack={() => navigateTo('home')}
        onNavigateToSignup={() => navigateTo('signup')}
        onNavigateToVerify={() => navigateTo('verify-otp')}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignupView
        onBack={() => navigateTo('login')}
        onNavigateToLogin={() => navigateTo('login')}
        onNavigateToVerify={() => navigateTo('verify-otp')}
      />
    );
  }

  if (currentView === 'verify-otp') {
    return (
      <VerifyOtpView
        onBack={() => navigateTo('login')}
        onSuccess={() => navigateTo('auth-success')}
      />
    );
  }

  if (currentView === 'auth-success') {
    return (
      <AuthSuccessView
        userName={user?.fullName || 'There'}
        onStartShopping={() => {
          if (user?.role === 'admin') {
            navigateTo('admin-dashboard');
          } else if (user?.role === 'shop_owner') {
            navigateTo('owner-dashboard');
          } else {
            navigateTo('home');
          }
        }}
      />
    );
  }

  // PROTECTED OWNER VIEWS
  if (currentView.startsWith('owner-')) {
    return (
      <OwnerGuard onNavigateToLogin={() => navigateTo('login')} onNavigateToHome={() => navigateTo('home')}>
        <OwnerLayout currentView={currentView} onNavigate={navigateTo}>
          {currentView === 'owner-dashboard' && <OwnerDashboardView onNavigate={navigateTo} />}
          {currentView === 'owner-shop' && <OwnerShopView onNavigate={navigateTo} />}
          {currentView === 'owner-products' && <OwnerProductsView onNavigate={navigateTo} />}
          {currentView === 'owner-orders' && <OwnerOrdersView onNavigate={navigateTo} />}
        </OwnerLayout>
      </OwnerGuard>
    );
  }

  // PROTECTED ADMIN VIEWS
  if (currentView.startsWith('admin-')) {
    return (
      <AdminGuard onNavigateToLogin={() => navigateTo('login')} onNavigateToHome={() => navigateTo('home')}>
        <AdminLayout currentView={currentView} onNavigate={navigateTo}>
          {currentView === 'admin-dashboard' && <AdminDashboardView onNavigate={navigateTo} />}
          {currentView === 'admin-users' && <AdminUsersView onNavigate={navigateTo} />}
          {currentView === 'admin-shops' && <AdminShopsView onNavigate={navigateTo} />}
          {currentView === 'admin-products' && <AdminProductsView onNavigate={navigateTo} />}
          {currentView === 'admin-orders' && <AdminOrdersView onNavigate={navigateTo} />}
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <HomeView
      onOpenDesignSystem={() => navigateTo('design-system')}
      onOpenExplore={() => navigateTo('explore')}
      onOpenCart={() => navigateTo('cart')}
      onOpenOrders={() => navigateTo('orders')}
      onOpenProfile={() => navigateTo('account')}
      onSelectShop={handleSelectShop}
      onSelectProduct={handleSelectProduct}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
