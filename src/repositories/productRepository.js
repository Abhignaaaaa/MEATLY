import { productService } from '../services/productService';
import { shopProductsData, defaultShopProducts } from '../data/shopsData';
import { detailedProductsData, defaultDetailedProduct } from '../data/productsData';
import { popularProductsData } from '../data/homeData';

const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const productRepository = {
  async getProducts(filters = {}) {
    if (useMock) {
      const shopId = typeof filters === 'string' ? filters : filters?.shopId;
      if (shopId && shopProductsData[shopId]) {
        return shopProductsData[shopId];
      }
      return popularProductsData;
    }

    try {
      return await productService.getProducts(filters);
    } catch (error) {
      const shopId = typeof filters === 'string' ? filters : filters?.shopId;
      console.warn(`[productRepository] Real API products failed for shop ${shopId}. Falling back to demo data.`, error.message);
      return shopProductsData[shopId] || defaultShopProducts;
    }
  },

  async getProductById(productId) {
    if (useMock) {
      return detailedProductsData[productId] || {
        ...defaultDetailedProduct,
        id: productId,
      };
    }

    try {
      return await productService.getProductById(productId);
    } catch (error) {
      console.warn(`[productRepository] Real API product details failed for ${productId}. Falling back to demo data.`, error.message);
      return detailedProductsData[productId] || defaultDetailedProduct;
    }
  },

  async searchProducts(query) {
    if (!query) return popularProductsData;

    if (useMock) {
      const q = query.toLowerCase();
      return popularProductsData.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shopName && p.shopName.toLowerCase().includes(q))
      );
    }

    try {
      return await productService.searchProducts(query);
    } catch (error) {
      console.warn(`[productRepository] Real API search failed for "${query}". Falling back to demo data.`, error.message);
      const q = query.toLowerCase();
      return popularProductsData.filter((p) => p.title.toLowerCase().includes(q));
    }
  },
};
