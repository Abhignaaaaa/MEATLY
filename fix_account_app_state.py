with open("src/views/AccountView.jsx", "r") as f:
    text = f.read()

# Add useEffect and useState imports
text = text.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';")
# Add ownerRepository import
text = text.replace("import { useCart } from '../context/CartContext';", "import { useCart } from '../context/CartContext';\nimport { ownerRepository } from '../repositories/ownerRepository';\nimport Badge from '../components/common/Badge';\nimport { Clock, AlertCircle } from 'lucide-react';")

# Add state for application
hooks = """  const { cartCount } = useCart();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [application, setApplication] = useState(null);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user && (!user.role || user.role === 'customer')) {
      ownerRepository.getMyApplication().then(app => {
        setApplication(app);
        setAppLoading(false);
      });
    } else {
      setAppLoading(false);
    }
  }, [isAuthenticated, user]);
"""
text = text.replace("  const { cartCount } = useCart();\n  const [isLogoutOpen, setIsLogoutOpen] = useState(false);", hooks)

# Replace the banner
banner = """
        {(!user.role || user.role === 'customer') && !appLoading && (
          <>
            {!application && (
              <div className="bg-[#46552A] text-white rounded-[22px] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">Own a meat shop?</h3>
                  <p className="text-sm opacity-90 mt-1">Join MEATLY and reach customers in your area.</p>
                </div>
                <Button variant="outline" className="text-white border-white hover:bg-[#667A3E] hover:text-white" onClick={onNavigateToShopRegister}>
                  Register Your Shop
                </Button>
              </div>
            )}
            
            {application?.applicationStatus === 'PENDING' && (
              <div className="bg-orange-50 border border-orange-200 rounded-[22px] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#20231B]">Shop Application</h3>
                    <p className="text-sm text-[#6F7268] mt-1">Application Under Review</p>
                  </div>
                </div>
                <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100" onClick={onNavigateToShopRegister}>
                  View Status
                </Button>
              </div>
            )}

            {application?.applicationStatus === 'REJECTED' && (
              <div className="bg-red-50 border border-red-200 rounded-[22px] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#20231B]">Shop Application</h3>
                    <p className="text-sm text-[#6F7268] mt-1">Changes Required</p>
                  </div>
                </div>
                <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-100" onClick={onNavigateToShopRegister}>
                  Edit & Resubmit
                </Button>
              </div>
            )}
          </>
        )}
"""
text = text.replace("""        {(!user.role || user.role === 'customer') && (
          <div className="bg-[#46552A] text-white rounded-[22px] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">Own a meat shop?</h3>
              <p className="text-sm opacity-90 mt-1">Join MEATLY as a partner and grow your local business.</p>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-[#667A3E] hover:text-white" onClick={onNavigateToShopRegister}>
              Register Your Shop
            </Button>
          </div>
        )}""", banner)

with open("src/views/AccountView.jsx", "w") as f:
    f.write(text)
