import React, { useState } from 'react';
import Button from '../../components/common/Button';

export default function OwnerProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    category: product?.category || 'Chicken',
    weight: product?.weight || '500 g',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    tag: product?.tag || '',
    imageUrl: product?.imageUrl || '',
    description: product?.description || '',
    isAvailable: product ? product.isAvailable : true,
    isActive: product ? product.isActive : true
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#20231B]">
          {product ? 'Edit Product' : 'Add New Product'}
        </h1>
        <button onClick={onCancel} className="text-sm font-bold text-[#6F7268] hover:text-[#20231B]">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-[#E4E4DA] shadow-sm space-y-6">
        <div className="space-y-4">
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#20231B]">Product Title</label>
            <input 
              type="text" name="title" value={formData.title} onChange={handleChange} required
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#20231B]">Category</label>
              <select 
                name="category" value={formData.category} onChange={handleChange} required
                className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E] bg-white"
              >
                <option value="Chicken">Chicken</option>
                <option value="Mutton">Mutton</option>
                <option value="Fish">Fish</option>
                <option value="Eggs">Eggs</option>
                <option value="Prawns">Prawns</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#20231B]">Unit / Weight</label>
              <input 
                type="text" name="weight" value={formData.weight} onChange={handleChange} required
                placeholder="e.g. 500 g"
                className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#20231B]">Selling Price (₹)</label>
              <input 
                type="number" name="price" value={formData.price} onChange={handleChange} required min="0"
                className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#20231B]">Original Price (₹)</label>
              <input 
                type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} min="0"
                placeholder="Optional"
                className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#20231B]">Image URL</label>
            <input 
              type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#20231B]">Description</label>
            <textarea 
              name="description" value={formData.description} onChange={handleChange} rows="3" required
              className="w-full border border-[#E4E4DA] rounded-xl px-4 py-3 focus:outline-none focus:border-[#667A3E]" 
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" name="isAvailable" id="isAvailable" checked={formData.isAvailable} onChange={handleChange}
              className="w-5 h-5 accent-[#667A3E]" 
            />
            <label htmlFor="isAvailable" className="text-sm font-bold text-[#20231B]">
              Product is currently available for ordering
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E4E4DA] flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
