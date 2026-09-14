import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  phone: string;
  email?: string;
  role: 'customer' | 'shop_owner' | 'admin' | 'delivery_partner';
  avatarUrl?: string;
  isActive: boolean;
  memberSince?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, index: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    role: { 
      type: String, 
      enum: ['customer', 'shop_owner', 'admin', 'delivery_partner'], 
      default: 'customer' 
    },
    avatarUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    memberSince: { type: String, default: 'Sep 2026' },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
