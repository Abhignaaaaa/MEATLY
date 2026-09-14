import React, { useEffect, useState } from 'react';
import { ownerRepository } from '../../repositories/ownerRepository';
import { ArrowLeft, User, MapPin, Phone } from 'lucide-react';
import Button from '../../components/common/Button';

export default function OwnerOrderDetailsView({ orderId, onBack }) {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const data = await ownerRepository.getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    setIsUpdating(true);
    try {
      const updated = await ownerRepository.updateOrderStatus(order._id, newStatus);
      setOrder(updated);
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading Order Details...</div>;
  if (!order) return <div className="text-center py-10 text-red-500">Failed to load order.</div>;

  const validTransitions = {
    'placed': ['confirmed', 'cancelled'],
    'confirmed': ['preparing', 'cancelled'],
    'preparing': ['ready'],
    'ready': ['out_for_delivery'],
    'out_for_delivery': ['delivered'],
    'delivered': [],
    'cancelled': []
  };
  const availableActions = validTransitions[order.status] || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#6F7268] hover:text-[#20231B] font-bold">
          <ArrowLeft className="w-5 h-5" /> Back to Orders
        </button>
        <span className="font-mono font-black text-xl text-[#20231B]">{order.orderNumber}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Items & Fulfillment */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E4E4DA] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E4DA] pb-4">
              <h2 className="text-lg font-bold text-[#20231B]">Fulfillment Status</h2>
              <span className="px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider bg-gray-100 text-gray-800">
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {availableActions.map(action => (
                <Button 
                  key={action}
                  variant={action === 'cancelled' ? 'outline' : 'primary'}
                  disabled={isUpdating}
                  onClick={() => handleUpdateStatus(action)}
                >
                  Mark as {action.replace(/_/g, ' ')}
                </Button>
              ))}
              {availableActions.length === 0 && (
                <p className="text-sm text-[#6F7268] italic">No further status updates available.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E4E4DA] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E4E4DA] bg-[#FAF8F1]">
              <h2 className="text-lg font-bold text-[#20231B]">Order Items</h2>
            </div>
            <div className="divide-y divide-[#E4E4DA]">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-[#E4E4DA]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-[#20231B]">{item.name}</h3>
                      <span className="font-black text-[#667A3E]">₹{item.totalPrice}</span>
                    </div>
                    <p className="text-xs font-bold text-[#6F7268]">Qty: {item.quantity} × {item.weight}</p>
                    <div className="pt-2 text-xs text-[#6F7268] space-y-0.5">
                      <p><span className="font-semibold text-[#20231B]">Cut:</span> {item.cutPreference}</p>
                      <p><span className="font-semibold text-[#20231B]">Cleaning:</span> {item.cleaningPreference}</p>
                      {item.specialInstructions && (
                        <p className="text-orange-700 bg-orange-50 p-1.5 rounded mt-1 border border-orange-100">
                          <span className="font-bold">Note:</span> {item.specialInstructions}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customer & Bill */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E4E4DA] p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-[#20231B] border-b border-[#E4E4DA] pb-2">Customer Details</h2>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2 text-[#20231B]"><User className="w-4 h-4 text-[#667A3E]"/> {order.deliveryAddress?.fullName || 'Customer'}</p>
              <p className="flex items-center gap-2 text-[#20231B]"><Phone className="w-4 h-4 text-[#667A3E]"/> {order.deliveryAddress?.phone || 'N/A'}</p>
              <div className="flex gap-2 text-[#20231B]">
                <MapPin className="w-4 h-4 text-[#667A3E] flex-shrink-0 mt-0.5"/>
                <span>
                  {order.deliveryAddress?.house}, {order.deliveryAddress?.street}, <br/>
                  {order.deliveryAddress?.city}, {order.deliveryAddress?.state} {order.deliveryAddress?.pincode}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E4E4DA] p-6 shadow-sm space-y-4 text-sm">
            <h2 className="text-lg font-bold text-[#20231B] border-b border-[#E4E4DA] pb-2">Payment Details</h2>
            <div className="flex justify-between items-center">
              <span className="text-[#6F7268]">Method</span>
              <span className="font-bold text-[#20231B] uppercase">{order.payment.method}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6F7268]">Status</span>
              <span className={`font-bold uppercase px-2 py-0.5 rounded text-xs ${order.payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                {order.payment.status}
              </span>
            </div>

            <div className="border-t border-[#E4E4DA] pt-4 mt-2 space-y-2">
              <div className="flex justify-between items-center text-[#6F7268]">
                <span>Item Total</span>
                <span>₹{order.bill.itemTotal}</span>
              </div>
              <div className="flex justify-between items-center text-[#6F7268]">
                <span>Delivery Fee</span>
                <span>₹{order.bill.deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center text-[#6F7268]">
                <span>Packaging & Tax</span>
                <span>₹{order.bill.packagingFee + order.bill.tax}</span>
              </div>
              {order.bill.discount > 0 && (
                <div className="flex justify-between items-center text-green-600 font-medium">
                  <span>Discount</span>
                  <span>-₹{order.bill.discount}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-[#E4E4DA] text-base">
                <span className="font-bold text-[#20231B]">Final Total</span>
                <span className="font-black text-[#667A3E]">₹{order.bill.finalTotal}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
