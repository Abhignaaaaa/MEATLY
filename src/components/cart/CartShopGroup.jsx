import React from 'react';
import { Store, MapPin } from 'lucide-react';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import CartItem from './CartItem';

/**
 * Cart Shop Grouping Component
 * Groups items visually by local partner shop.
 */
export default function CartShopGroup({
  group,
  onUpdateQuantity,
  onRemoveItem,
  onEditItem
}) {
  if (!group || !group.items || group.items.length === 0) return null;

  return (
    <div className="bg-[#FAF8F1] rounded-[20px] border border-[#E4E4DA] p-4 sm:p-5 space-y-3.5 shadow-xs">
      
      {/* Shop Group Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E4E4DA]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center shrink-0 border border-[#d2dcb9]">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#20231B]">
                {group.shopName}
              </h3>
              <Badge variant={group.shopIsOpen ? 'olive' : 'dark'} size="sm">
                {group.shopIsOpen ? 'OPEN NOW' : 'CLOSED'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6F7268] mt-0.5 font-medium">
              <Rating rating={group.shopRating} size="sm" />
              <span>•</span>
              <span className="inline-flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-[#667A3E]" />
                {group.shopDistance} away
              </span>
            </div>
          </div>
        </div>

        <span className="text-xs font-semibold text-[#46552A] bg-[#E8EEDB] px-2.5 py-1 rounded-full">
          {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Group Cart Items */}
      <div className="space-y-3">
        {group.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
            onEdit={onEditItem}
          />
        ))}
      </div>

    </div>
  );
}
