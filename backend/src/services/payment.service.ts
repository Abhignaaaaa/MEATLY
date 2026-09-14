import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Payment, PaymentMethod } from '../models/Payment.js';
import { Order } from '../models/Order.js';
import { orderRepository } from '../repositories/order.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { config } from 'dotenv';
config();

const PAYMENT_MODE = process.env.PAYMENT_MODE || 'mock';

let razorpayInstance: Razorpay | null = null;
if (PAYMENT_MODE !== 'mock') {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.warn('[PaymentService] Razorpay keys missing but PAYMENT_MODE is not mock!');
  } else {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
}

export class PaymentService {
  async createPaymentIntent(userId: string, orderId: string, method: PaymentMethod) {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('Order not found');
    if (String(order.userId) !== String(userId)) throw ApiError.forbidden('Access denied');

    if (order.payment?.status === 'paid') {
      throw ApiError.badRequest('Order is already paid');
    }

    const amountInPaise = Math.round(order.bill.finalTotal * 100);
    const provider = method === 'cod' ? 'cash' : (PAYMENT_MODE === 'mock' ? 'mock' : 'razorpay');

    const payment = new Payment({
      orderId: order._id,
      userId,
      amount: amountInPaise,
      currency: 'INR',
      paymentMethod: method,
      provider,
      paymentStatus: 'pending',
    });

    if (method === 'cod') {
      await payment.save();
      return { success: true, method: 'cod', paymentId: payment._id };
    }

    if (PAYMENT_MODE === 'mock') {
      payment.providerOrderId = 'mock_order_' + Date.now();
      await payment.save();
      return {
        success: true,
        method,
        provider: 'mock',
        paymentId: payment._id,
        amount: amountInPaise,
        providerOrderId: payment.providerOrderId,
        key: 'mock_key_id'
      };
    }

    if (!razorpayInstance) {
      throw ApiError.internal('Razorpay is not configured');
    }

    const rpOrder = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: String(order._id).substring(0, 40),
    });

    payment.providerOrderId = rpOrder.id;
    await payment.save();

    return {
      success: true,
      method,
      provider: 'razorpay',
      paymentId: payment._id,
      amount: amountInPaise,
      providerOrderId: rpOrder.id,
      key: process.env.RAZORPAY_KEY_ID
    };
  }

  async verifyPayment(userId: string, orderId: string, payload: any) {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound('Order not found');
    if (String(order.userId) !== String(userId)) throw ApiError.forbidden('Access denied');

    const payment = await Payment.findOne({ orderId: order._id, paymentStatus: 'pending' });
    if (!payment) throw ApiError.notFound('No pending payment found for this order');

    if (PAYMENT_MODE === 'mock') {
      payment.paymentStatus = 'paid';
      payment.providerPaymentId = payload.razorpay_payment_id || 'mock_pay_' + Date.now();
      payment.paidAt = new Date();
      await payment.save();

      await Order.findByIdAndUpdate(order._id, {
        'payment.status': 'paid'
      });

      return { success: true, paymentStatus: 'paid' };
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payload;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      payment.paymentStatus = 'failed';
      payment.failureReason = 'Missing signature or payload';
      await payment.save();
      await Order.findByIdAndUpdate(order._id, { 'payment.status': 'failed' });
      throw ApiError.badRequest('Invalid payment payload');
    }

    if (razorpay_order_id !== payment.providerOrderId) {
       throw ApiError.badRequest('Order ID mismatch');
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      payment.paymentStatus = 'paid';
      payment.providerPaymentId = razorpay_payment_id;
      payment.providerSignature = razorpay_signature;
      payment.paidAt = new Date();
      await payment.save();

      await Order.findByIdAndUpdate(order._id, {
        'payment.status': 'paid'
      });

      return { success: true, paymentStatus: 'paid' };
    } else {
      payment.paymentStatus = 'failed';
      payment.failureReason = 'Signature mismatch';
      await payment.save();
      await Order.findByIdAndUpdate(order._id, { 'payment.status': 'failed' });
      throw ApiError.badRequest('Payment signature verification failed');
    }
  }
}

export const paymentService = new PaymentService();

