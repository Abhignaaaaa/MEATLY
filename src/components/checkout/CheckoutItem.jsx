import React from 'react';
import Badge from '../common/Badge';

/**
 * Compact Checkout Item Summary Component
 */
export default function CheckoutItem({ item }) {
  if (!item) return null;

  return (
    <div className="bg-[#FAF8F1] rounded-[14px] border border-[#E4E4DA] p-3 flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3">
        <img
          src={item.image}
          alt={item.productName}
          className="w-12 h-12 rounded-[10px] object-cover border border-[#E4E4DA] shrink-0"
        />
        <div>
          <h4 className="font-bold text-[#20231B] leading-tight">
            {item.productName}
          </h4>
          <span className="text-[11px] text-[#6F7268] block">
            {item.shopName} • <span className="font-semibold text-[#20231B]">{item.weight}</span> (Qty: {item.quantity})
          </span>
          <div className="flex items-center gap-1 flex-wrap mt-1">
            {item.cutPreference && (
              <Badge variant="olive" size="sm">
                {item.cutPreference}
              </Badge>
            )}
            {item.cleaningPreference && (
              <Badge variant="cream" size="sm">
                {item.cleaningPreference}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <span className="font-black text-sm text-[#20231B] shrink-0">
        ₹{item.unitPrice * item.quantity}
      </span>
    </div>
  );
}
