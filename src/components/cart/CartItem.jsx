import React from 'react';
import { Plus, Minus, Trash2, Edit3, MessageSquare } from 'lucide-react';
import Badge from '../common/Badge';

/**
 * Cart Item Component
 * Displays customized product attributes (weight, cut, cleaning, instructions) with quantity controls & remove action.
 */
export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onEdit
}) {
  if (!item) return null;

  return (
    <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-3.5 sm:p-4 shadow-xs meatly-card-transition hover:border-[#d2dcb9]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        
        {/* Left Side: Thumbnail & Customization Info */}
        <div className="flex items-start gap-3.5 flex-1">
          {/* Image */}
          <div 
            onClick={() => onEdit && onEdit(item)} 
            className="cursor-pointer w-20 h-20 sm:w-22 sm:h-22 rounded-[14px] overflow-hidden bg-[#FAF8F1] border border-[#E4E4DA] shrink-0"
          >
            <img
              src={item.image}
              alt={item.productName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info & Customizations */}
          <div className="space-y-1 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h4 
                onClick={() => onEdit && onEdit(item)} 
                className="cursor-pointer hover:underline text-sm sm:text-base font-bold text-[#20231B] leading-tight"
              >
                {item.productName}
              </h4>
              <span className="text-sm sm:text-base font-black text-[#20231B] shrink-0 sm:hidden">
                ₹{item.unitPrice * item.quantity}
              </span>
            </div>

            <p className="text-xs text-[#6F7268] font-medium">
              Weight: <span className="font-bold text-[#20231B]">{item.weight}</span>
            </p>

            {/* Customization Badges */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              {item.cutPreference && (
                <Badge variant="olive" size="sm">
                  Cut: {item.cutPreference}
                </Badge>
              )}
              {item.cleaningPreference && (
                <Badge variant="cream" size="sm">
                  Clean: {item.cleaningPreference}
                </Badge>
              )}
            </div>

            {/* Special Instructions Preview */}
            {item.specialInstructions && (
              <div className="flex items-center gap-1 text-[11px] text-[#6F7268] pt-1">
                <MessageSquare className="w-3 h-3 text-[#667A3E] shrink-0" />
                <span className="italic truncate max-w-[220px]">
                  "{item.specialInstructions}"
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Quantity Controls & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#FAF8F1]">
          
          {/* Price (Desktop) */}
          <div className="hidden sm:block text-right">
            <span className="text-base font-black text-[#20231B] block">
              ₹{item.unitPrice * item.quantity}
            </span>
            <span className="text-[10px] text-[#6F7268]">
              ₹{item.unitPrice} / {item.weight}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F1] rounded-[12px] p-1 border border-[#E4E4DA]">
            <button
              type="button"
              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1 rounded-md bg-white text-[#46552A] hover:bg-[#46552A] hover:text-white transition-colors cursor-pointer border border-[#E4E4DA]"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            
            <span className="text-xs font-bold text-[#46552A] min-w-6 text-center">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 rounded-md bg-[#667A3E] text-white hover:bg-[#46552A] transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Buttons: Edit & Remove */}
          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="p-1.5 rounded-lg text-[#6F7268] hover:text-[#667A3E] hover:bg-[#E8EEDB] transition-colors cursor-pointer"
                title="Edit Customization"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onRemove && onRemove(item.id)}
              className="p-1.5 rounded-lg text-[#6F7268] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
