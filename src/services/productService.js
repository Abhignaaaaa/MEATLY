import { apiClient } from './apiClient';

/**
 * Normalizes backend product response to frontend UI product model
 */
export function normalizeProduct(prod) {
  if (!prod) return null;
  return {
    id: String(prod.id || prod._id || ''),
    title: prod.title || prod.name || prod.product_name || 'Fresh Meat Cut',
    category: prod.category || 'Chicken',
    weight: prod.weight || '500 g',
    price: typeof prod.price === 'number' ? prod.price : (prod.base_price || 180),
    originalPrice: prod.originalPrice || prod.original_price || (prod.price ? prod.price + 20 : 200),
    tag: prod.tag || prod.badge || 'Fresh Cut',
    imageUrl: prod.imageUrl || prod.image_url || prod.image || 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500',
    description: prod.description || 'Freshly cut and hygienic meat prepared after order.',
    shopName: prod.shopName || prod.shop_name || 'Fresh Partner Shop',
    shopId: String(prod.shopId || prod.shop_id || ''),
  };
}

export const productService = {
  async getProducts(filters = {}) {
    let endpoint = '/products';
    const params = new URLSearchParams();

    const shopId = typeof filters === 'string' ? filters : filters?.shopId;
    if (shopId) params.append('shopId', shopId);
    if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);

    const qs = params.toString();
    if (qs) endpoint += `?${qs}`;

    const response = await apiClient.get(endpoint, { authRequired: false });
    const items = response?.data || response || [];
    return Array.isArray(items) ? items.map(normalizeProduct) : [];
  },

  async getProductById(productId) {
    const response = await apiClient.get(`/products/${productId}`, { authRequired: false });
    const prod = response?.data || response;
    return normalizeProduct(prod);
  },

  async searchProducts(query) {
    const response = await apiClient.get(`/products/search?q=${encodeURIComponent(query)}`, { authRequired: false });
    const items = response?.data || response || [];
    return Array.isArray(items) ? items.map(normalizeProduct) : [];
  },
};
