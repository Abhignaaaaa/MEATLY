import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/adminRepository';
import { Store, Check, X } from 'lucide-react';

export default function AdminShopsView() {
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      setIsLoading(true);
      const data = await adminRepository.getShops();
      setShops(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (shop) => {
    try {
      await adminRepository.updateShopStatus(shop._id, !shop.isActive);
      loadShops();
    } catch (err) {
      console.error(err);
      alert('Failed to update shop status');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#20231B]">Shops Directory</h1>

      <div className="bg-white rounded-2xl border border-[#E4E4DA] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-[#6F7268] uppercase bg-gray-50 border-b border-[#E4E4DA]">
                <th className="px-6 py-3 font-semibold">Shop Name</th>
                <th className="px-6 py-3 font-semibold">Owner</th>
                <th className="px-6 py-3 font-semibold">Open Status</th>
                <th className="px-6 py-3 font-semibold">Admin Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4DA]">
              {isLoading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center">Loading...</td></tr>
              ) : shops.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-[#6F7268]">No shops found.</td></tr>
              ) : (
                shops.map(shop => (
                  <tr key={shop._id} className={`hover:bg-gray-50 ${!shop.isActive ? 'bg-red-50/50' : ''}`}>
                    <td className="px-6 py-4 font-bold text-[#20231B]">{shop.name}<br/><span className="text-xs font-normal text-[#6F7268]">{shop.phone}</span></td>
                    <td className="px-6 py-4 text-sm text-[#6F7268]">{shop.ownerId?.fullName || 'N/A'}<br/>{shop.ownerId?.phone}</td>
                    <td className="px-6 py-4">
                      {shop.isOpen ? <span className="text-green-600 font-bold text-xs uppercase">Open</span> : <span className="text-red-600 font-bold text-xs uppercase">Closed</span>}
                    </td>
                    <td className="px-6 py-4">
                      {shop.isActive ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs uppercase font-bold">Active</span> : <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs uppercase font-bold">Disabled</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleToggleStatus(shop)}
                        className={`text-sm font-bold hover:underline ${shop.isActive ? 'text-red-600' : 'text-green-600'}`}
                      >
                        {shop.isActive ? 'Disable Shop' : 'Enable Shop'}
                      </button>
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
