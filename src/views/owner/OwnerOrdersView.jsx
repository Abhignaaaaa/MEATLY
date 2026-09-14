import React, { useEffect, useState } from 'react';
import { ownerRepository } from '../../repositories/ownerRepository';
import { Search, ShoppingBag } from 'lucide-react';
import OwnerOrderDetailsView from './OwnerOrderDetailsView';

export default function OwnerOrdersView() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [filters, setFilters] = useState({
    status: 'All',
    search: '',
    sort: 'Newest'
  });

  const statuses = ['All', 'New', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];

  useEffect(() => {
    loadOrders();
  }, [filters]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await ownerRepository.getOrders(filters);
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-orange-100 text-orange-800';
      case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedOrder) {
    return (
      <OwnerOrderDetailsView 
        orderId={selectedOrder._id} 
        onBack={() => { setSelectedOrder(null); loadOrders(); }} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#20231B]">Manage Orders</h1>

      <div className="bg-white rounded-2xl border border-[#E4E4DA] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F7268]" />
          <input 
            type="text" 
            placeholder="Search Order Number..." 
            className="w-full pl-9 pr-4 py-2 border border-[#E4E4DA] rounded-lg text-sm focus:outline-none focus:border-[#667A3E]"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="border border-[#E4E4DA] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#667A3E]"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            className="border border-[#E4E4DA] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#667A3E]"
            value={filters.sort}
            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {isLoading && orders.length === 0 ? (
        <div className="text-center py-10">Loading Orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4E4DA] p-10 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-[#20231B]">No orders found</h2>
          <p className="text-sm text-[#6F7268]">No orders match your current filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E4E4DA] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-[#6F7268] uppercase bg-gray-50 border-b border-[#E4E4DA]">
                  <th className="px-6 py-3 font-semibold">Order</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Items</th>
                  <th className="px-6 py-3 font-semibold">Payment</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4DA]">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#20231B]">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-[#6F7268]">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{order.items.length} items (₹{order.bill.finalTotal})</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {order.payment.method} - {order.payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#667A3E] font-bold text-sm hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
