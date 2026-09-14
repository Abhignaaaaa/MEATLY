import React from 'react';
import { ArrowRight, RefreshCw, Eye, Store } from 'lucide-react';
import BaseCard from '../cards/BaseCard';
import OrderStatusBadge from './OrderStatusBadge';
import Button from '../common/Button';

/**
 * OrderCard Component
 * Displays compact order summary for My Orders list page.
 */
export default function OrderCard({
  order,
  onTrackOrder,
  onViewDetails,
  onReorder
}) {
  if (!order) return null;

  const isActive = ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(order.status);
  const isDelivered = order.status === 'delivered';

  return (
    <BaseCard
      padding="p-4 sm:p-5"
      className={`space-y-3.5 ${
        isActive ? 'bg-white border-[#667A3E]/40 shadow-sm ring-1 ring-[#667A3E]/10' : 'bg-white'
      }`}
    >
      {/* Top Order ID & Status Header */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E4E4DA]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-sm text-[#20231B]">{order.id}</span>
            {isActive && (
              <span className="w-2 h-2 rounded-full bg-[#667A3E] animate-ping"></span>
            )}
          </div>
          <span className="text-[11px] text-[#6F7268] block mt-0.5">{order.date}</span>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      {/* Shop Info & Product Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#20231B] flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-[#667A3E]" />
            {order.shop.name}
          </span>
          <span className="text-[#6F7268] font-medium">
            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Product Items List Preview */}
        <div className="space-y-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs text-[#6F7268] bg-[#FAF8F1] px-2.5 py-1.5 rounded-[10px]">
              <span className="font-medium truncate max-w-[200px] sm:max-w-[280px]">
                {item.name} ({item.weight})
              </span>
              <span className="font-bold text-[#20231B] shrink-0">₹{item.totalPrice}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Amount & Action CTAs */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#E4E4DA]">
        <div>
          <span className="text-[10px] text-[#6F7268] block font-medium">Total Paid</span>
          <span className="text-base font-black text-[#20231B]">₹{order.total}</span>
        </div>

        <div className="flex items-center gap-2">
          {isActive && onTrackOrder && (
            <Button
              variant="primary"
              size="sm"
              rightIcon={ArrowRight}
              onClick={() => onTrackOrder(order)}
            >
              Track Order
            </Button>
          )}

          {isDelivered && onReorder && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={RefreshCw}
              onClick={() => onReorder(order)}
            >
              Reorder
            </Button>
          )}

          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={Eye}
              onClick={() => onViewDetails(order)}
            >
              Details
            </Button>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
