import re
with open("src/App.jsx", "r") as f:
    lines = f.readlines()

new_lines = []
for i in range(len(lines)):
    line = lines[i]
    if "addToCart({" in line and "order.items.forEach" in lines[i-1]:
        new_lines.append(line)
        new_lines.append("""        product: {
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
""")
        break
    else:
        new_lines.append(line)

for j in range(i+1, len(lines)):
    if "if (currentView === 'track-order') {" in lines[j]:
        new_lines.extend(lines[j:])
        break

with open("src/App.jsx", "w") as f:
    f.writelines(new_lines)
