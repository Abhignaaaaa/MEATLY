import React from 'react';
import Badge from '../common/Badge';

/**
 * OrderStatusBadge Component
 * Displays color-coded order status indicator using MEATLY design tokens.
 */
export default function OrderStatusBadge({ status = 'preparing', size = 'sm' }) {
  const statusConfig = {
    placed: { label: 'Order Placed', variant: 'olive' },
    confirmed: { label: 'Order Confirmed', variant: 'olive' },
    preparing: { label: 'Preparing Order', variant: 'olive' },
    ready: { label: 'Ready for Pickup', variant: 'olive' },
    out_for_delivery: { label: 'Out for Delivery', variant: 'olive' },
    delivered: { label: 'Delivered', variant: 'success' },
    cancelled: { label: 'Cancelled', variant: 'dark' },
  }[status] || { label: status, variant: 'olive' };

  return (
    <Badge variant={statusConfig.variant} size={size}>
      {statusConfig.label.toUpperCase()}
    </Badge>
  );
}
