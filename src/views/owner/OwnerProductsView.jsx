import React, { useEffect, useState } from 'react';
import { ownerRepository } from '../../repositories/ownerRepository';
import { Plus, Edit2, Check, X, AlertCircle, Package } from 'lucide-react';
import Button from '../../components/common/Button';
import OwnerProductForm from './OwnerProductForm';

export default function OwnerProductsView() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await ownerRepository.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAvailability = async (product) => {
    try {
      await ownerRepository.updateProductAvailability(product._id, !product.isAvailable);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveForm = async (productData) => {
    try {
      if (selectedProduct) {
        await ownerRepository.updateProduct(selectedProduct._id, productData);
      } else {
        await ownerRepository.addProduct(productData);
      }
      setIsFormOpen(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    }
  };

  if (isLoading && products.length === 0) {
    return <div className="text-center py-10">Loading Products...</div>;
  }

  if (isFormOpen) {
    return (
      <OwnerProductForm 
        product={selectedProduct} 
        onSave={handleSaveForm}
        onCancel={() => setIsFormOpen(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#20231B]">Manage Products</h1>
        <Button 
          variant="primary" 
          leftIcon={Plus}
          onClick={() => { setSelectedProduct(null); setIsFormOpen(true); }}
        >
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E4E4DA] p-10 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-[#20231B]">No products found</h2>
          <p className="text-sm text-[#6F7268]">You haven't added any products to your shop yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className={`bg-white rounded-2xl border ${product.isAvailable ? 'border-[#E4E4DA]' : 'border-red-200 bg-red-50/30'} shadow-sm overflow-hidden flex flex-col`}>
              <div className="relative h-40 bg-gray-100">
                <img src={product.imageUrl} alt={product.title} className={`w-full h-full object-cover ${!product.isAvailable ? 'grayscale opacity-60' : ''}`} />
                {!product.isAvailable && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    UNAVAILABLE
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-[#20231B] line-clamp-1">{product.title}</h3>
                <p className="text-xs text-[#6F7268] mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-black text-[#667A3E] text-lg">₹{product.price}</span>
                  <span className="text-xs font-medium text-[#6F7268] bg-gray-100 px-2 py-1 rounded">{product.weight}</span>
                </div>
              </div>
              <div className="p-3 border-t border-[#E4E4DA] flex items-center justify-between gap-2 bg-gray-50/50">
                <button
                  onClick={() => handleToggleAvailability(product)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    product.isAvailable 
                      ? 'text-orange-700 bg-orange-100 hover:bg-orange-200' 
                      : 'text-green-700 bg-green-100 hover:bg-green-200'
                  }`}
                >
                  {product.isAvailable ? <><X className="w-4 h-4"/> Disable</> : <><Check className="w-4 h-4"/> Enable</>}
                </button>
                <button
                  onClick={() => { setSelectedProduct(product); setIsFormOpen(true); }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold text-[#20231B] bg-[#E8EEDB] hover:bg-[#d2dcb9] transition-colors"
                >
                  <Edit2 className="w-4 h-4"/> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
