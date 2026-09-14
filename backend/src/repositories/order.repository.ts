import { Order, IOrder, OrderStatus } from '../models/Order.js';

export class OrderRepository {
  async findByUser(userId: string, status?: string): Promise<IOrder[]> {
    const filter: any = { userId };
    if (status && status !== 'all') {
      filter.status = status;
    }
    return Order.find(filter).sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IOrder | null> {
    return Order.findById(id);
  }

  async findByOrderNumber(orderNumber: string): Promise<IOrder | null> {
    return Order.findOne({ orderNumber });
  }

  async create(orderData: Partial<IOrder>): Promise<IOrder> {
    const order = new Order(orderData);
    return order.save();
  }

  async updateStatus(id: string, status: OrderStatus, title?: string, description?: string, reason?: string): Promise<IOrder | null> {
    const update: any = { status };
    if (title) update.statusTitle = title;
    if (description) update.statusDescription = description;
    if (reason) update.cancellationReason = reason;

    return Order.findByIdAndUpdate(id, update, { new: true });
  }
}

export const orderRepository = new OrderRepository();
