import mongoose, { Schema, Document } from 'mongoose';

export interface IShopReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface IShop extends Document {
  ownerId?: mongoose.Types.ObjectId;
  name: string;
  description: string;
  imageUrl: string;
  coverImageUrl: string;
  phone: string;
  address: string;
  categories: string[];
  rating: number;
  reviewsCount: number;
  distance: string;
  deliveryTime: string;
  openingHours: string;
  minOrder: number;
  deliveryFee: string;
  isOpen: boolean;
  isPopular: boolean;
  isTopRated: boolean;
  isActive: boolean;
  reviews: IShopReview[];
  
  applicationStatus?: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED';
  ownerName?: string;
  email?: string;
  city?: string;
  pincode?: string;
  shopType?: string;
  deliveryRadius?: string;
  rejectionReason?: string;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const ShopReviewSchema = new Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: String, required: true },
});

const ShopSchema: Schema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    coverImageUrl: { type: String, default: '' },
    phone: { type: String, default: '+91 98765 00000' },
    address: { type: String, required: true },
    categories: [{ type: String, index: true }],
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 50 },
    distance: { type: String, default: '1.5 km' },
    deliveryTime: { type: String, default: '25-35 min' },
    openingHours: { type: String, default: '8:00 AM - 9:00 PM' },
    minOrder: { type: Number, default: 199 },
    deliveryFee: { type: String, default: 'Free delivery above ₹1499' },
    isOpen: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    isTopRated: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    reviews: [ShopReviewSchema],

    // Onboarding & Application Fields
    applicationStatus: { type: String, enum: ['NONE', 'PENDING', 'APPROVED', 'REJECTED'], default: 'NONE' },
    ownerName: { type: String },
    email: { type: String },
    city: { type: String },
    pincode: { type: String },
    shopType: { type: String },
    deliveryRadius: { type: String },
    rejectionReason: { type: String },
    submittedAt: { type: Date },
    reviewedAt: { type: Date },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export const Shop = mongoose.model<IShop>('Shop', ShopSchema);
