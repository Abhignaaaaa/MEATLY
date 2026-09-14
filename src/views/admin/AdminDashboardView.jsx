import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/adminRepository';
import { Users, Store, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import Button from '../../components/common/Button';

export default function AdminDashboardView({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await adminRepository.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading Dashboard...</div>;
  if (!stats) return <div className="text-center py-10 text-red-500">Failed to load dashboard.</div>;

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Shops', value: stats.totalShops, icon: Store, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: "Today's Orders", value: stats.todayOrders, icon: ShoppingBag, color: 'text-pink-600', bg: 'bg-pink-100' },
    { label: "Today's Sales", value: `₹${stats.todaySales}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#20231B]">Admin Overview</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-6 border border-[#E4E4DA] shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bg} ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[#6F7268] font-medium">{card.label}</p>
              <p className="text-2xl font-black text-[#20231B]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
