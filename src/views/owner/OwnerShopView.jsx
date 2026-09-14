import React, { useEffect, useState } from 'react';
import { ownerRepository } from '../../repositories/ownerRepository';
import Button from '../../components/common/Button';

export default function OwnerShopView() {
  const [shop, setShop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    try {
      const data = await ownerRepository.getShopDetails();
      setShop(data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load shop details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShop(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    try {
      await ownerRepository.updateShopDetails(shop);
      setMessage('Shop details updated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update shop details.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading Shop...</div>;
  }

  if (!shop) {
    return <div className="text-center py-10 text-red-500">Failed to load shop.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#20231B]">Manage Shop Details</h1>

      {message && (
        <div className={`p-4 rounded-lg font-medium text-sm ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 border border-[#E4E4DA] shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#20231B]">Shop Name</label>
            <input 
              type="text" name="name" value={shop.name} onChange={handleChange} required
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#20231B]">Phone Number</label>
            <input 
              type="text" name="phone" value={shop.phone} onChange={handleChange} required
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-[#20231B]">Description</label>
            <textarea 
              name="description" value={shop.description} onChange={handleChange} rows="3"
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-[#20231B]">Full Address</label>
            <textarea 
              name="address" value={shop.address} onChange={handleChange} rows="2" required
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#20231B]">Opening Hours</label>
            <input 
              type="text" name="openingHours" value={shop.openingHours} onChange={handleChange}
              placeholder="e.g. 8:00 AM - 9:00 PM"
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#20231B]">Estimated Delivery Time</label>
            <input 
              type="text" name="deliveryTime" value={shop.deliveryTime} onChange={handleChange}
              placeholder="e.g. 25-35 min"
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#20231B]">Minimum Order (₹)</label>
            <input 
              type="number" name="minOrder" value={shop.minOrder} onChange={handleChange}
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="flex items-center gap-3 pt-6 md:col-span-2">
            <input 
              type="checkbox" name="isOpen" id="isOpen" checked={shop.isOpen} onChange={handleChange}
              className="w-5 h-5 accent-[#667A3E]" 
            />
            <label htmlFor="isOpen" className="text-base font-bold text-[#20231B]">
              Shop is currently OPEN for orders
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E4E4DA] flex justify-end">
          <Button type="submit" variant="primary" size="lg" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Shop Details'}
          </Button>
        </div>
      </form>
    </div>
  );
}
