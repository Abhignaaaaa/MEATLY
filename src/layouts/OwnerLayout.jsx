import React from 'react';
import { LayoutDashboard, Store, Package, ShoppingBag, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function OwnerLayout({ currentView, onNavigate, children }) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, view: 'owner-dashboard' },
    { label: 'Orders', icon: ShoppingBag, view: 'owner-orders' },
    { label: 'Products', icon: Package, view: 'owner-products' },
    { label: 'Shop Details', icon: Store, view: 'owner-shop' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-black text-[#667A3E] tracking-tighter">MEATLY <span className="text-[#20231B]">OWNER</span></h1>
        <p className="text-xs text-[#6F7268] mt-1">Welcome, {user?.fullName}</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              onNavigate(item.view);
              setIsMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-semibold transition-colors ${
              currentView.startsWith(item.view) 
                ? 'bg-[#667A3E] text-white' 
                : 'text-[#6F7268] hover:bg-[#E8EEDB] hover:text-[#20231B]'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-[12px] text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F7F8EF] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#E4E4DA] fixed h-full z-10">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E4E4DA] z-30 flex items-center justify-between px-4">
        <h1 className="text-xl font-black text-[#667A3E] tracking-tighter">MEATLY <span className="text-[#20231B]">OWNER</span></h1>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2">
          {isMobileOpen ? <X className="w-6 h-6 text-[#20231B]" /> : <Menu className="w-6 h-6 text-[#20231B]" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-20" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-30 transform transition-transform duration-300 flex flex-col ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
