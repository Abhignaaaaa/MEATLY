import { productRepository } from '../repositories/product.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { IProduct } from '../models/Product.js';

export class ProductService {
  async getProducts(filters: any = {}): Promise<IProduct[]> {
    return productRepository.findAll(filters);
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await productRepository.findById(id);
    if (!product) {
      throw ApiError.notFound('Product not found');
    }
    return product;
  }

  async searchProducts(query: string): Promise<IProduct[]> {
    if (!query || !query.trim()) {
      return this.getProducts();
    }
    return productRepository.findAll({ search: query.trim() });
  }
}

export const productService = new ProductService();
