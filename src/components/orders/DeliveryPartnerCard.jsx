import React from 'react';
import { Bike, ShieldCheck } from 'lucide-react';
import Badge from '../common/Badge';

/**
 * DeliveryPartnerCard Component
 * Displays generic demo rider information for out_for_delivery orders.
 */
export default function DeliveryPartnerCard({ riderInfo }) {
  if (!riderInfo) return null;

  return (
    <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E4E4DA]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center shrink-0 border border-[#d2dcb9]">
            <Bike className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#20231B]">
              Delivery Partner Assigned
            </h4>
            <span className="text-xs text-[#6F7268]">On the way with your fresh meat</span>
          </div>
        </div>
        <Badge variant="olive" size="sm">DISPATCHED</Badge>
      </div>

      <div className="bg-[#FAF8F1] rounded-[12px] p-3 border border-[#E4E4DA] flex items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-[#20231B] block text-sm">
            {riderInfo.name}
          </span>
          <span className="text-[#6F7268] mt-0.5 block font-medium">
            Vehicle: {riderInfo.vehicle}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#46552A] font-bold bg-[#E8EEDB] px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-[#667A3E]" />
          <span>Verified Rider</span>
        </div>
      </div>
    </div>
  );
}
