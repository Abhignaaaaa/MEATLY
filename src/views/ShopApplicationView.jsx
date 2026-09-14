import React, { useState } from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { ownerRepository } from '../repositories/ownerRepository';

import { useEffect } from 'react';
export default function ShopApplicationView({ onBack, onSuccess }) {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    shopType: 'Chicken',
    description: '',
    ownerName: user?.fullName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: 'Karimnagar',
    pincode: '',
    openingHours: '08:00 AM - 09:00 PM',
    deliveryRadius: '5 km',
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=800',
  });

    const [existingApp, setExistingApp] = useState(null);

  useEffect(() => {
    ownerRepository.getMyApplication().then(app => {
      if (app && app.applicationStatus === 'REJECTED') {
        setExistingApp(app);
        setFormData(prev => ({
          ...prev,
          name: app.name,
          shopType: app.categories?.[0] || 'Chicken',
          description: app.description,
          ownerName: app.ownerName || prev.ownerName,
          phone: app.phone || prev.phone,
          email: app.email || prev.email,
          address: app.address,
          city: app.city || 'Karimnagar',
          pincode: app.pincode,
          openingHours: app.openingHours,
          deliveryRadius: app.deliveryRadius
        }));
      }
    });
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSubmit = {
        ...formData,
        categories: [formData.shopType]
      };
      
      if (existingApp) {
        await ownerRepository.resubmitApplication(existingApp._id, dataToSubmit);
      } else {
        await ownerRepository.submitApplication(dataToSubmit);
      }
      onSuccess();

    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8EF] flex flex-col">
      <Header activeTab="profile" />
      <div className="flex-1 max-w-2xl w-full mx-auto p-4 py-8">
        <button onClick={onBack} className="text-[#667A3E] text-sm font-bold mb-6 hover:underline flex items-center gap-1">
          ? Back
        </button>
        <h1 className="text-2xl font-black text-[#20231B] mb-2">Register Your Shop</h1>
        <p className="text-[#6F7268] text-sm mb-6">Join MEATLY as a partner and grow your business in {formData.city}.</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm font-medium mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl border border-[#E4E4DA]">
          <div>
            <h2 className="text-lg font-bold text-[#20231B] mb-4 border-b border-[#E4E4DA] pb-2">1. Shop Information</h2>
            <div className="space-y-4">
              <Input label="Shop Name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Fresh Chicken Centre" />
              <div>
                <label className="block text-xs font-bold text-[#46552A] mb-1.5 uppercase tracking-wider">Shop Type</label>
                <select name="shopType" value={formData.shopType} onChange={handleChange} className="w-full bg-[#F7F8EF] border border-[#E4E4DA] rounded-xl px-4 py-3 text-sm text-[#20231B] focus:outline-none focus:ring-2 focus:ring-[#667A3E]/30 focus:border-[#667A3E] transition-all">
                  <option value="Chicken">Chicken</option>
                  <option value="Mutton">Mutton</option>
                  <option value="Fish">Fish</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
              <Input label="Short Description (Optional)" name="description" value={formData.description} onChange={handleChange} placeholder="e.g. Best quality fresh meat in town." />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#20231B] mb-4 border-b border-[#E4E4DA] pb-2">2. Owner Information</h2>
            <div className="space-y-4">
              <Input label="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
              <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
              <Input label="Email (Optional)" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#20231B] mb-4 border-b border-[#E4E4DA] pb-2">3. Location</h2>
            <div className="space-y-4">
              <Input label="Shop Address" name="address" value={formData.address} onChange={handleChange} required placeholder="e.g. 123 Main Road" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                <Input label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F1] p-4 rounded-xl text-xs text-[#6F7268] border border-[#E4E4DA]">
            <p className="font-semibold text-[#46552A] mb-1">Confirmation</p>
            <p>I confirm that the information provided is accurate and I am authorized to register this shop.</p>
          </div>

          <Button variant="primary" type="submit" fullWidth disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Shop for Review'}
          </Button>
        </form>
      </div>
    </div>
  );
}
