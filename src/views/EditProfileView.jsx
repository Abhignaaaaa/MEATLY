import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, CheckCircle, Camera } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

/**
 * MEATLY Edit Profile View (`/account/edit`)
 */
export default function EditProfileView({
  onBack,
  onBackToHome,
  onExploreShops
}) {
  const { user, updateUser } = useAuth();
  const { cartCount } = useCart();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      fullName,
      email,
      phone,
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      if (onBack) onBack();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      <Header activeTab="profile" cartCount={cartCount} locationName="Karimnagar, Telangana" />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Header Navigation */}
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
              Edit Profile
            </h1>
            <p className="text-xs sm:text-sm text-[#6F7268]">
              Update your personal contact details
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="bg-[#E8EEDB] border border-[#667A3E]/30 text-[#46552A] p-4 rounded-[16px] flex items-center gap-3 animate-fade-in shadow-xs">
            <CheckCircle className="w-5 h-5 text-[#667A3E] shrink-0" />
            <span className="text-xs sm:text-sm font-bold">
              Profile details updated successfully!
            </span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-[24px] border border-[#E4E4DA] p-6 space-y-6 shadow-xs">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center space-y-3 pt-2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#E8EEDB] text-[#46552A] font-bold text-3xl flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <span>{fullName.charAt(0) || 'U'}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => alert('Photo upload standard feature demo')}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#667A3E] text-white border-2 border-white shadow-md hover:bg-[#46552A] transition-colors cursor-pointer"
                title="Change Photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-[#6F7268] font-medium">
              Profile Photo
            </span>
          </div>

          <div className="space-y-4">
            <Input
              label="Full Name"
              icon={User}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rahul Verma"
              required
            />

            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul.verma@example.com"
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#20231B]">
                Mobile Phone Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-xs font-bold text-[#46552A] bg-[#E8EEDB] px-2 py-1 rounded-md pointer-events-none">
                  +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  className="w-full bg-white text-[#20231B] text-sm rounded-[12px] border border-[#E4E4DA] pl-14 pr-3.5 py-3 focus:outline-none focus:border-[#667A3E] focus:ring-4 focus:ring-[#667A3E]/15 font-semibold"
                />
              </div>
              <p className="text-[11px] text-[#6F7268] pl-1">
                Used for order updates and WhatsApp delivery notifications in Karimnagar.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>

        </form>

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
