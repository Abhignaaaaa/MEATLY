import mongoose, { Schema, Document } from 'mongoose';

export type OrderStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  weight: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  cutPreference: string;
  cleaningPreference: string;
  specialInstructions?: string;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId | string;
  shopId: mongoose.Types.ObjectId | string;
  orderNumber: string;
  status: OrderStatus;
  statusTitle: string;
  statusDescription: string;
  shop: {
    name: string;
    address: string;
    phone: string;
  };
  items: IOrderItem[];
  deliveryAddress: {
    type?: string;
    fullName?: string;
    phone?: string;
    house?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  bill: {
    itemTotal: number;
    deliveryFee: number;
    packagingFee: number;
    tax: number;
    discount: number;
    finalTotal: number;
  };
  payment: {
    method: string;
    status: string;
  };
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  weight: { type: String, default: '500 g' },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  cutPreference: { type: String, default: 'Curry Cut' },
  cleaningPreference: { type: String, default: 'Standard Cleaned' },
  specialInstructions: { type: String, default: '' },
});

const OrderSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    shopId: { type: Schema.Types.ObjectId, ref: 'Shop', required: true, index: true },
    orderNumber: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'placed',
      index: true,
    },
    statusTitle: { type: String, default: 'Order Placed' },
    statusDescription: { type: String, default: 'Order received by shop.' },
    shop: {
      name: { type: String, required: true },
      address: { type: String, default: 'Karimnagar' },
      phone: { type: String, default: '+91 98765 43210' },
    },
    items: [OrderItemSchema],
    deliveryAddress: {
      type: { type: String, default: 'Home' },
      fullName: { type: String, default: '' },
      phone: { type: String, default: '' },
      house: { type: String, default: '' },
      street: { type: String, default: '' },
      city: { type: String, default: 'Karimnagar' },
      state: { type: String, default: 'Telangana' },
      pincode: { type: String, default: '505001' },
    },
    bill: {
      itemTotal: { type: Number, required: true },
      deliveryFee: { type: Number, default: 40 },
      packagingFee: { type: Number, default: 15 },
      tax: { type: Number, default: 12 },
      discount: { type: Number, default: 0 },
      finalTotal: { type: Number, required: true },
    },
    payment: {
      method: { type: String, enum: ['cod', 'upi', 'card'], default: 'cod' },
      status: { type: String, enum: ['pending', 'processing', 'paid', 'failed', 'refunded'], default: 'pending' },
    },
    cancellationReason: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
