import React, { useState } from 'react';
import { ArrowLeft, MapPin, Plus, Trash2, Home, Briefcase, CheckCircle } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import Button from '../components/common/Button';
import AddressForm from '../components/checkout/AddressForm';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

/**
 * MEATLY Saved Addresses View (`/account/addresses`)
 */
export default function AddressesView({
  onBack,
  onBackToHome,
  onExploreShops
}) {
  const { savedAddresses, addAddress, removeAddress } = useAuth();
  const { cartCount } = useCart();
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSaveAddress = (newAddr) => {
    addAddress(newAddr);
    setShowAddForm(false);
    setSuccessMessage('New address saved successfully!');
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  const handleRemoveAddress = (id) => {
    removeAddress(id);
    setSuccessMessage('Address removed successfully.');
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  const getIcon = (type) => {
    if (type === 'Work') return <Briefcase className="w-4 h-4 text-[#667A3E]" />;
    return <Home className="w-4 h-4 text-[#667A3E]" />;
  };

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      <Header activeTab="profile" cartCount={cartCount} locationName="Karimnagar, Telangana" />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-white border border-[#E4E4DA] hover:bg-[#E8EEDB] text-[#46552A] transition-colors cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#20231B] tracking-tight">
                Saved Addresses
              </h1>
              <p className="text-xs sm:text-sm text-[#6F7268]">
                Delivery addresses for Karimnagar
              </p>
            </div>
          </div>

          {!showAddForm && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={Plus}
              onClick={() => setShowAddForm(true)}
            >
              Add New
            </Button>
          )}
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="bg-[#E8EEDB] border border-[#667A3E]/30 text-[#46552A] p-4 rounded-[16px] flex items-center gap-3 animate-fade-in shadow-xs">
            <CheckCircle className="w-5 h-5 text-[#667A3E] shrink-0" />
            <span className="text-xs sm:text-sm font-bold">
              {successMessage}
            </span>
          </div>
        )}

        {/* Add Address Form Accordion / Modal State */}
        {showAddForm && (
          <div className="animate-fade-in">
            <AddressForm
              onSave={handleSaveAddress}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Saved Address List */}
        <div className="space-y-4">
          {savedAddresses.length === 0 ? (
            <div className="bg-white rounded-[24px] border border-[#E4E4DA] p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#20231B]">No Saved Addresses</h3>
                <p className="text-xs text-[#6F7268] mt-1">
                  Add your home or work address for quick Karimnagar delivery.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                leftIcon={Plus}
                onClick={() => setShowAddForm(true)}
              >
                Add Delivery Address
              </Button>
            </div>
          ) : (
            savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white rounded-[20px] border border-[#E4E4DA] p-5 shadow-xs flex items-start justify-between gap-4 transition-all hover:border-[#667A3E]/50"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-md bg-[#E8EEDB]">
                      {getIcon(addr.type)}
                    </span>
                    <span className="text-sm font-bold text-[#20231B]">
                      {addr.type} Address
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-extrabold uppercase bg-[#667A3E] text-white px-2 py-0.5 rounded-full">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#20231B]">
                      {addr.fullName} • {addr.phone}
                    </p>
                    <p className="text-xs text-[#6F7268] mt-1">
                      {addr.house}, {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveAddress(addr.id)}
                  className="p-2 text-[#6F7268] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove Address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </main>

      <BottomNavigation
        activeTab="profile"
        cartCount={cartCount}
        onTabChange={(tab) => {
          if (tab === 'home' && onBackToHome) onBackToHome();
          if (tab === 'explore' && onExploreShops) onExploreShops();
        }}
      />
    </div>
  );
}
