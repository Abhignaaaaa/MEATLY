import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  shopId: mongoose.Types.ObjectId | string;
  title: string;
  category: string;
  weight: string;
  price: number;
  originalPrice?: number;
  tag: string;
  imageUrl: string;
  description: string;
  isAvailable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    shopId: { type: Schema.Types.ObjectId, ref: 'Shop', required: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    weight: { type: String, default: '500 g' },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    tag: { type: String, default: 'Fresh Cut' },
    imageUrl: { type: String, required: true },
    description: { type: String, default: '' },
    isAvailable: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
