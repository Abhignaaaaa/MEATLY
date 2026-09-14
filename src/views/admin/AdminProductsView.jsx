import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/adminRepository';
import { Package } from 'lucide-react';

export default function AdminProductsView() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await adminRepository.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      await adminRepository.updateProductAvailability(product._id, !product.isAvailable);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#20231B]">Global Products</h1>

      <div className="bg-white rounded-2xl border border-[#E4E4DA] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-[#6F7268] uppercase bg-gray-50 border-b border-[#E4E4DA]">
                <th className="px-6 py-3 font-semibold">Product</th>
                <th className="px-6 py-3 font-semibold">Shop</th>
                <th className="px-6 py-3 font-semibold">Price/Weight</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4DA]">
              {isLoading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-[#6F7268]">No products found.</td></tr>
              ) : (
                products.map(product => (
                  <tr key={product._id} className={`hover:bg-gray-50 ${!product.isAvailable ? 'bg-red-50/50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100">
                          <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-[#20231B]">{product.title}</p>
                          <p className="text-xs text-[#6F7268]">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#20231B]">{product.shopId?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm"><span className="font-bold text-[#667A3E]">₹{product.price}</span> / {product.weight}</td>
                    <td className="px-6 py-4">
                      {product.isAvailable ? <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs uppercase font-bold">Available</span> : <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs uppercase font-bold">Unavailable</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleToggleStatus(product)}
                        className={`text-sm font-bold hover:underline ${product.isAvailable ? 'text-red-600' : 'text-green-600'}`}
                      >
                        {product.isAvailable ? 'Force Disable' : 'Enable'}
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
