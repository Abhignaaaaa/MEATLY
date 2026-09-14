import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

// Initial demo items so the cart page is pre-populated for testing
const initialDemoCartItems = [
  {
    id: 'cart-item-1',
    productId: 'prod-1',
    shopId: 'shop-1',
    productName: 'Chicken Curry Cut',
    shopName: 'Fresh Chicken Centre',
    shopRating: 4.6,
    shopDistance: '1.2 km',
    shopIsOpen: true,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500',
    weight: '500 g',
    quantity: 1,
    unitPrice: 180,
    totalPrice: 180,
    cutPreference: 'Curry Cut',
    cleaningPreference: 'Cleaned & Skinless',
    specialInstructions: 'Please make medium-size pieces.',
  },
  {
    id: 'cart-item-2',
    productId: 'prod-3',
    shopId: 'shop-2',
    productName: 'Fish Curry Cut (Rohu)',
    shopName: 'Sri Fish Market',
    shopRating: 4.5,
    shopDistance: '2.1 km',
    shopIsOpen: true,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500',
    weight: '500 g',
    quantity: 1,
    unitPrice: 220,
    totalPrice: 220,
    cutPreference: 'Steaks Cut',
    cleaningPreference: 'Descaled & Gutted',
    specialInstructions: '',
  },
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(initialDemoCartItems);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const addToCart = (configuredItem) => {
    const newItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: configuredItem.product?.id || 'prod-1',
      shopId: configuredItem.product?.shopId || 'shop-1',
      productName: configuredItem.product?.title || 'Fresh Meat Cut',
      shopName: configuredItem.product?.shopName || 'Fresh Chicken Centre',
      shopRating: configuredItem.product?.shopRating || 4.6,
      shopDistance: configuredItem.product?.shopDistance || '1.2 km',
      shopIsOpen: true,
      image: configuredItem.product?.images?.[0] || 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500',
      weight: configuredItem.weight || '500 g',
      quantity: configuredItem.quantity || 1,
      unitPrice: Math.round(configuredItem.totalPrice / (configuredItem.quantity || 1)),
      totalPrice: configuredItem.totalPrice || 180,
      cutPreference: configuredItem.cut || 'Standard Cut',
      cleaningPreference: configuredItem.cleaning || 'Cleaned',
      specialInstructions: configuredItem.instructions || '',
      addons: configuredItem.addons || [],
    };

    setCartItems((prev) => [newItem, ...prev]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: item.unitPrice * newQuantity,
            }
          : item
      )
    );
  };

  const applyCoupon = (code) => {
    if (code.trim().toUpperCase() === 'MEATLY10') {
      setAppliedCoupon({
        code: 'MEATLY10',
        discountAmount: 50,
        description: 'Flat ₹50 OFF on Karimnagar Orders',
      });
      return { success: true, message: 'Coupon MEATLY10 applied! Saved ₹50' };
    }
    return { success: false, message: 'Invalid coupon code. Try "MEATLY10"' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = subtotal > 0 ? (subtotal >= 499 ? 0 : 40) : 0;
  const discount = appliedCoupon ? Math.min(subtotal, appliedCoupon.discountAmount) : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Group cart items by shopId
  const shopGroups = useMemo(() => {
    const groups = {};
    cartItems.forEach((item) => {
      if (!groups[item.shopId]) {
        groups[item.shopId] = {
          shopId: item.shopId,
          shopName: item.shopName,
          shopRating: item.shopRating,
          shopDistance: item.shopDistance,
          shopIsOpen: item.shopIsOpen,
          items: [],
        };
      }
      groups[item.shopId].items.push(item);
    });
    return Object.values(groups);
  }, [cartItems]);

  const isMultiShop = shopGroups.length > 1;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: totalItemsCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        appliedCoupon,
        subtotal,
        deliveryFee,
        discount,
        total,
        shopGroups,
        isMultiShop,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
