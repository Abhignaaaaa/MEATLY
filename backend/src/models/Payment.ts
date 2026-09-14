import mongoose, { Schema, Document } from 'mongoose';

export type PaymentMethod = 'cod' | 'upi' | 'card';
export type PaymentProvider = 'cash' | 'razorpay' | 'mock';
export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';

export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  provider: PaymentProvider;
  paymentStatus: PaymentStatus;
  providerOrderId?: string;
  providerPaymentId?: string;
  providerSignature?: string;
  paidAt?: Date;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentMethod: { type: String, enum: ['cod', 'upi', 'card'], required: true },
    provider: { type: String, enum: ['cash', 'razorpay', 'mock'], required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'paid', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    providerOrderId: { type: String, index: true, sparse: true },
    providerPaymentId: { type: String, index: true, sparse: true },
    providerSignature: { type: String },
    paidAt: { type: Date },
    failureReason: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

