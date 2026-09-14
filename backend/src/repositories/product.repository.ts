import { Product, IProduct } from '../models/Product.js';

export class ProductRepository {
  async findAll(filters: any = {}): Promise<IProduct[]> {
    const query: any = { isActive: true };
    if (filters.shopId) query.shopId = filters.shopId;
    if (filters.category && filters.category !== 'All') query.category = filters.category;
    if (filters.search) {
      const regex = new RegExp(filters.search, 'i');
      query.$or = [{ title: regex }, { category: regex }, { description: regex }];
    }
    // ensure unavailable products aren't fetched by default unless explicitly asked
    if (filters.isAvailable !== undefined) {
      query.isAvailable = filters.isAvailable === 'true' || filters.isAvailable === true;
    }
    return Product.find(query).populate('shopId', 'name address');
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id).populate('shopId', 'name address phone rating reviewsCount distance deliveryTime isOpen');
  }

  async search(query: string): Promise<IProduct[]> {
    const regex = new RegExp(query, 'i');
    return Product.find({
      isActive: true,
      $or: [{ title: regex }, { category: regex }, { description: regex }],
    }).populate('shopId', 'name address');
  }

  async create(productData: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(productData);
    return product.save();
  }
}

export const productRepository = new ProductRepository();
