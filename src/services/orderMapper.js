/**
 * MEATLY Order Mapper
 * Converts frontend cart & checkout state into a backend REST API payload schema.
 */

export function mapCartToOrderPayload({
  cartItems = [],
  deliveryAddress = null,
  deliveryOption = null,
  paymentMethod = null,
  bill = null,
}) {
  const shopGroupMap = {};
  cartItems.forEach((item) => {
    const shopName = item.product?.shopName || 'Fresh Partner Shop';
    if (!shopGroupMap[shopName]) {
      shopGroupMap[shopName] = [];
    }
    shopGroupMap[shopName].push(item);
  });

  return {
    customer: {
      name: deliveryAddress?.fullName || 'Valued Customer',
      phone: deliveryAddress?.phone || '9876543210',
    },
    deliveryAddress: deliveryAddress ? {
      type: deliveryAddress.type || 'Home',
      house: deliveryAddress.house || '',
      street: deliveryAddress.street || '',
      city: deliveryAddress.city || 'Karimnagar',
      state: deliveryAddress.state || 'Telangana',
      pincode: deliveryAddress.pincode || '505001',
    } : null,
    deliveryOption: deliveryOption ? {
      id: deliveryOption.id,
      title: deliveryOption.title,
      price: deliveryOption.price,
    } : null,
    paymentMethod: paymentMethod ? {
      id: paymentMethod.id,
      title: paymentMethod.title,
    } : null,
    bill: bill || {
      itemTotal: cartItems.reduce((acc, i) => acc + (i.totalPrice || 0), 0),
      deliveryFee: deliveryOption?.price || 40,
      packagingFee: 15,
      tax: 12,
      discount: 0,
      finalTotal: cartItems.reduce((acc, i) => acc + (i.totalPrice || 0), 0) + (deliveryOption?.price || 40) + 15 + 12,
    },
    items: cartItems.map((item) => ({
      productId: item.productId || item.product?.id,
      name: item.product?.title || item.product?.name || 'Fresh Meat Cut',
      image: item.product?.images?.[0] || item.product?.imageUrl || 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=300',
      weight: item.weight || '500 g',
      quantity: item.quantity || 1,
      unitPrice: item.product?.basePrice || item.product?.price || 180,
      totalPrice: item.totalPrice || 180,
      cutPreference: item.cut || 'Curry Cut',
      cleaningPreference: item.cleaning || 'Standard Cleaned',
      specialInstructions: item.instructions || '',
    })),
    createdAt: new Date().toISOString(),
  };
}
