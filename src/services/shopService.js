import { apiClient } from './apiClient';

/**
 * Normalizes backend shop response to frontend UI shop model
 */
export function normalizeShop(shop) {
  if (!shop) return null;
  return {
    id: String(shop.id || shop._id || ''),
    name: shop.name || shop.shop_name || 'Partner Meat Shop',
    rating: typeof shop.rating === 'number' ? shop.rating : 4.5,
    reviewsCount: shop.reviewsCount || shop.reviews_count || 50,
    distance: shop.distance || '1.5 km',
    deliveryTime: shop.deliveryTime || shop.delivery_time || '25–35 min',
    isOpen: shop.isOpen !== undefined ? shop.isOpen : (shop.is_open !== undefined ? shop.is_open : true),
    categories: Array.isArray(shop.categories) ? shop.categories : ['Chicken', 'Mutton'],
    imageUrl: shop.imageUrl || shop.image_url || shop.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
    coverImageUrl: shop.coverImageUrl || shop.cover_image_url || shop.imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    description: shop.description || 'Fresh meat partner shop in Karimnagar.',
    address: shop.address || 'Karimnagar, Telangana',
    openingHours: shop.openingHours || shop.opening_hours || '8:00 AM – 9:00 PM',
    minOrder: shop.minOrder || shop.min_order || 199,
    deliveryFee: shop.deliveryFee || shop.delivery_fee || 'Free delivery above ₹499',
    isPopular: shop.isPopular || shop.is_popular || false,
    isTopRated: shop.isTopRated || shop.is_top_rated || false,
    reviews: Array.isArray(shop.reviews) ? shop.reviews : [],
  };
}

export const shopService = {
  async getShops(filters = {}) {
    let endpoint = '/shops';
    const params = new URLSearchParams();
    
    const cat = typeof filters === 'string' ? filters : filters?.category;
    if (cat && cat !== 'All') params.append('category', cat);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.openNow) params.append('openNow', 'true');
    
    const qs = params.toString();
    if (qs) endpoint += `?${qs}`;
    
    const response = await apiClient.get(endpoint, { authRequired: false });
    const items = response?.data || response || [];
    return Array.isArray(items) ? items.map(normalizeShop) : [];
  },

  async getShopById(shopId) {
    const response = await apiClient.get(`/shops/${shopId}`, { authRequired: false });
    const shop = response?.data || response;
    return normalizeShop(shop);
  },

  async searchShops(query) {
    const response = await apiClient.get(`/shops/search?q=${encodeURIComponent(query)}`, { authRequired: false });
    const items = response?.data || response || [];
    return Array.isArray(items) ? items.map(normalizeShop) : [];
  },

  async getNearbyShops(location = 'Karimnagar') {
    const response = await apiClient.get(`/shops/nearby?location=${encodeURIComponent(location)}`, { authRequired: false });
    const items = response?.data || response || [];
    return Array.isArray(items) ? items.map(normalizeShop) : [];
  },
};
