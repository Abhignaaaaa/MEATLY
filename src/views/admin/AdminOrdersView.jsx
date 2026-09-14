import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/adminRepository';
import { Search } from 'lucide-react';
 // We can reuse this view for details if it doesn't do owner-specific writes, or just show basic info.

export default function AdminOrdersView() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [filters, setFilters] = useState({ status: 'All', payment: 'All', search: '' });

  const statuses = ['All', 'New', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];
  const payments = ['All', 'Pending', 'Paid', 'Failed', 'Refunded'];

  useEffect(() => {
    loadOrders();
  }, [filters]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await adminRepository.getOrders(filters);
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#20231B]">Global Orders</h1>

      <div className="bg-white rounded-2xl border border-[#E4E4DA] p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F7268]" />
          <input 
            type="text" placeholder="Search Order Number..." 
            className="w-full pl-9 pr-4 py-2 border border-[#E4E4DA] rounded-lg text-sm focus:outline-none focus:border-indigo-600"
            value={filters.search} onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select 
            className="border border-[#E4E4DA] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-600"
            value={filters.status} onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            {statuses.map(s => <option key={s} value={s}>{s} Status</option>)}
          </select>
          <select 
            className="border border-[#E4E4DA] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-indigo-600"
            value={filters.payment} onChange={(e) => setFilters(prev => ({ ...prev, payment: e.target.value }))}
          >
            {payments.map(s => <option key={s} value={s}>{s} Payment</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E4DA] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-[#6F7268] uppercase bg-gray-50 border-b border-[#E4E4DA]">
                <th className="px-6 py-3 font-semibold">Order</th>
                <th className="px-6 py-3 font-semibold">Shop & Customer</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold">Payment</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4DA]">
              {isLoading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-[#6F7268]">No orders found.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#20231B]">
                      {order.orderNumber}<br/>
                      <span className="font-sans text-xs font-normal text-[#6F7268]">{new Date(order.createdAt).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-bold text-[#20231B]">{order.shopId?.name || 'N/A'}</span><br/>
                      <span className="text-[#6F7268]">{order.userId?.fullName || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 font-black text-[#667A3E]">₹{order.bill.finalTotal}</td>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
