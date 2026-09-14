import React, { useState } from 'react';
import { 
  MapPin, Search, User, Heart, ShoppingBag, ShoppingCart, 
  Compass, SlidersHorizontal, ChevronDown, ArrowRight, Star, 
  Bell, Plus, Minus, Check, Copy, Store, ShieldCheck, Clock, 
  Smartphone, Monitor, Tablet, RefreshCw
} from 'lucide-react';

import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import SearchBar from '../components/common/SearchBar';
import Badge from '../components/common/Badge';
import Rating from '../components/common/Rating';
import IconButton from '../components/common/IconButton';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';

import BaseCard from '../components/cards/BaseCard';
import CategoryCard from '../components/cards/CategoryCard';
import ShopCard from '../components/cards/ShopCard';
import ProductCard from '../components/cards/ProductCard';
import InfoCard from '../components/cards/InfoCard';

import { CardSkeleton, GridSkeleton } from '../components/states/SkeletonLoader';
import EmptyState from '../components/states/EmptyState';

export default function DesignSystem() {
  const [activeNavTab, setActiveNavTab] = useState('home');
  const [copiedHex, setCopiedHex] = useState(null);
  const [simulatedWidth, setSimulatedWidth] = useState('full'); // 'full' | '412' | '390' | '360'
  const [buttonLoading, setButtonLoading] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [activeEmptyTab, setActiveEmptyTab] = useState('shops');

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const colors = [
    { name: 'Primary Light Olive', hex: '#667A3E', role: 'Main MEATLY brand color, primary actions, active states' },
    { name: 'Dark Olive', hex: '#46552A', role: 'Headings, dark accents, active buttons, high contrast badges' },
    { name: 'Soft Light Olive', hex: '#E8EEDB', role: 'Selected cards, category backgrounds, soft badges, secondary buttons' },
    { name: 'Main Background', hex: '#F7F8EF', role: 'Primary application page background' },
    { name: 'Warm Cream', hex: '#FAF8F1', role: 'Hero section background, inner contrast containers' },
    { name: 'Warm White', hex: '#FFFFFF', role: 'Cards, inputs, modals, navigation containers' },
    { name: 'Primary Text', hex: '#20231B', role: 'Dark charcoal main body text & titles' },
    { name: 'Secondary Text', hex: '#6F7268', role: 'Muted captions, metadata, secondary details' },
    { name: 'Border', hex: '#E4E4DA', role: 'Soft divider lines & subtle container borders' },
    { name: 'Success', hex: '#4F7D32', role: 'Positive ratings, fresh badges, order status' },
  ];

  const iconsList = [
    { name: 'MapPin', icon: MapPin },
    { name: 'Search', icon: Search },
    { name: 'User', icon: User },
    { name: 'Heart', icon: Heart },
    { name: 'ShoppingBag', icon: ShoppingBag },
    { name: 'ShoppingCart', icon: ShoppingCart },
    { name: 'Compass', icon: Compass },
    { name: 'Filter', icon: SlidersHorizontal },
    { name: 'Chevron', icon: ChevronDown },
    { name: 'ArrowRight', icon: ArrowRight },
    { name: 'Star', icon: Star },
    { name: 'Bell', icon: Bell },
    { name: 'Plus', icon: Plus },
    { name: 'Minus', icon: Minus },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8EF] pb-24">
      
      {/* Dev Header Banner */}
      <div className="bg-[#46552A] text-white px-4 py-3 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#667A3E] text-white text-xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
              DEV ONLY
            </span>
            <h1 className="text-base sm:text-lg font-bold">MEATLY Design System & UI Foundation</h1>
          </div>

          {/* Viewport Width Controls */}
          <div className="flex items-center gap-1 bg-[#20231B]/60 p-1 rounded-lg text-xs font-semibold">
            <span className="text-[#E8EEDB] px-2 hidden md:inline">Simulate Viewport:</span>
            <button
              onClick={() => setSimulatedWidth('full')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                simulatedWidth === 'full' ? 'bg-[#667A3E] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Full
            </button>
            <button
              onClick={() => setSimulatedWidth('412')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                simulatedWidth === '412' ? 'bg-[#667A3E] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> 412px
            </button>
            <button
              onClick={() => setSimulatedWidth('390')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                simulatedWidth === '390' ? 'bg-[#667A3E] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> 390px
            </button>
            <button
              onClick={() => setSimulatedWidth('360')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                simulatedWidth === '360' ? 'bg-[#667A3E] text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> 360px
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container / Frame */}
      <div 
        className={`mx-auto transition-all duration-300 ${
          simulatedWidth === 'full' 
            ? 'max-w-7xl px-4 sm:px-6 lg:px-8 py-8' 
            : 'bg-white my-6 shadow-2xl rounded-[28px] border-4 border-[#46552A] overflow-hidden'
        }`}
        style={simulatedWidth !== 'full' ? { width: `${simulatedWidth}px` } : {}}
      >

        {/* Section 1: Logo & Brand Identity */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6">
            <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 01</span>
            <h2 className="text-2xl font-black text-[#20231B]">Brand Identity & Logo Treatment</h2>
            <p className="text-sm text-[#6F7268]">Primary typographic MEATLY wordmark across various backgrounds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-[18px] border border-[#E4E4DA] flex flex-col items-center justify-center text-center">
              <span className="text-xs font-medium text-[#6F7268] mb-4">Default Light Background</span>
              <Logo size="lg" withTagline={true} />
            </div>

            <div className="bg-[#46552A] p-6 rounded-[18px] flex flex-col items-center justify-center text-center text-white">
              <span className="text-xs font-medium text-[#E8EEDB] mb-4">Dark Olive Background</span>
              <Logo variant="white" size="lg" withTagline={true} />
            </div>

            <div className="bg-[#FAF8F1] p-6 rounded-[18px] border border-[#E4E4DA] flex flex-col items-center justify-center text-center">
              <span className="text-xs font-medium text-[#6F7268] mb-4">Soft Pill Badge Variant</span>
              <Logo variant="pill" size="md" withTagline={true} />
            </div>
          </div>
        </section>

        {/* Section 2: Light Olive Color Palette System */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6">
            <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 02</span>
            <h2 className="text-2xl font-black text-[#20231B]">Light-Olive Color System Tokens</h2>
            <p className="text-sm text-[#6F7268]">Fresh, natural, premium palette. Click any swatch to copy HEX code.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {colors.map((c) => (
              <div 
                key={c.hex} 
                onClick={() => copyToClipboard(c.hex)}
                className="bg-white rounded-[18px] border border-[#E4E4DA] p-3 meatly-card-transition hover:-translate-y-1 hover:shadow-md cursor-pointer group"
              >
                <div 
                  className="w-full h-24 rounded-[12px] mb-3 flex items-end justify-end p-2 border border-black/5 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: c.hex }}
                >
                  <span className="bg-black/40 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                    {copiedHex === c.hex ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {c.hex}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#20231B] group-hover:text-[#667A3E] transition-colors">{c.name}</h4>
                <p className="text-[11px] text-[#6F7268] mt-1 leading-tight">{c.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Typography Scale */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6">
            <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 03</span>
            <h2 className="text-2xl font-black text-[#20231B]">Typography System (Inter Font)</h2>
            <p className="text-sm text-[#6F7268]">Clear visual hierarchy and legible body text scale.</p>
          </div>

          <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-6 space-y-6">
            <div className="border-b border-[#E4E4DA] pb-4">
              <span className="text-xs font-mono text-[#6F7268]">Display Heading (32px Bold)</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#20231B] mt-1">
                Fresh meat. From shops you trust.
              </h1>
            </div>

            <div className="border-b border-[#E4E4DA] pb-4">
              <span className="text-xs font-mono text-[#6F7268]">Large Heading H1 (24px Bold)</span>
              <h2 className="text-2xl font-bold text-[#20231B] mt-1">
                Popular Partner Shops in Karimnagar
              </h2>
            </div>

            <div className="border-b border-[#E4E4DA] pb-4">
              <span className="text-xs font-mono text-[#6F7268]">Section Heading H2 (20px SemiBold)</span>
              <h3 className="text-xl font-semibold text-[#20231B] mt-1">
                Shop by Fresh Category
              </h3>
            </div>

            <div className="border-b border-[#E4E4DA] pb-4">
              <span className="text-xs font-mono text-[#6F7268]">Card Heading H3 (16px Bold)</span>
              <h4 className="text-base font-bold text-[#20231B] mt-1">
                Chicken Curry Cut (Skinless - 500g)
              </h4>
            </div>

            <div className="border-b border-[#E4E4DA] pb-4">
              <span className="text-xs font-mono text-[#6F7268]">Body Text (15px Regular)</span>
              <p className="text-base text-[#20231B] mt-1 max-w-2xl">
                MEATLY connects customers with local chicken, fish, and mutton shop partners in Karimnagar for fast home delivery.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-[#6F7268]">Secondary Text & Caption (13px Muted)</span>
              <p className="text-xs text-[#6F7268] mt-1">
                Delivering freshly cut meat within 30–45 mins • 1.2 km away from your location
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Buttons & States */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 04</span>
              <h2 className="text-2xl font-black text-[#20231B]">Button System & Interactive States</h2>
              <p className="text-sm text-[#6F7268]">Primary, Secondary, Outline, and Ghost button variants.</p>
            </div>
            <button
              onClick={() => setButtonLoading(!buttonLoading)}
              className="text-xs bg-[#E8EEDB] text-[#46552A] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#d8e2c5]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${buttonLoading ? 'animate-spin' : ''}`} />
              Toggle Loading State
            </button>
          </div>

          <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-6 space-y-8">
            {/* Primary Buttons */}
            <div>
              <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">1. Primary Action Buttons (Olive Background)</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg" loading={buttonLoading} rightIcon={ArrowRight}>Explore Shops</Button>
                <Button variant="primary" size="md" loading={buttonLoading}>Add to Cart</Button>
                <Button variant="primary" size="sm" loading={buttonLoading}>Add</Button>
                <Button variant="primary" size="md" disabled>Disabled State</Button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">2. Secondary Buttons (Soft Light Olive)</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" size="lg" loading={buttonLoading}>View Shop Details</Button>
                <Button variant="secondary" size="md" loading={buttonLoading}>Select Cutting Options</Button>
                <Button variant="secondary" size="sm" loading={buttonLoading}>Filter</Button>
                <Button variant="secondary" size="md" disabled>Unavailable</Button>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">3. Outline Buttons (White Background + Olive Border)</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" size="lg" loading={buttonLoading}>Change Location</Button>
                <Button variant="outline" size="md" loading={buttonLoading}>Browse All</Button>
                <Button variant="outline" size="sm" loading={buttonLoading}>More Info</Button>
              </div>
            </div>

            {/* Ghost Buttons */}
            <div>
              <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">4. Ghost Buttons (Transparent + Hover Highlight)</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="ghost" size="md" loading={buttonLoading}>See All (32)</Button>
                <Button variant="ghost" size="sm" loading={buttonLoading}>Clear Search</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Inputs & Search Controls */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6">
            <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 05</span>
            <h2 className="text-2xl font-black text-[#20231B]">Input System & Search Controls</h2>
            <p className="text-sm text-[#6F7268]">White background, soft border, rounded corners, olive focus glow.</p>
          </div>

          <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-6 space-y-6">
            <div>
              <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">Large Search Bar</h4>
              <SearchBar 
                placeholder="Search chicken, fish, mutton..."
                onFilterClick={() => alert('Filter modal opened!')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Delivery Address in Karimnagar"
                placeholder="House No, Street, Landmark..."
                leftIcon={MapPin}
              />
              <Input
                label="Customer Contact Number"
                placeholder="+91 98765 43210"
                leftIcon={User}
              />
            </div>
          </div>
        </section>

        {/* Section 6: Badges, Rating & Icon System */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6">
            <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 06</span>
            <h2 className="text-2xl font-black text-[#20231B]">Badges, Rating & Lucide Icon System</h2>
            <p className="text-sm text-[#6F7268]">Consistent icon scale, star ratings, and contextual status badges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badges & Rating */}
            <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">Reusable Badges</h4>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="olive">FRESH</Badge>
                  <Badge variant="olive">OPEN NOW</Badge>
                  <Badge variant="success">TOP RATED</Badge>
                  <Badge variant="dark">POPULAR</Badge>
                  <Badge variant="cream">KARIMNAGAR</Badge>
                  <Badge variant="outline">DEMO SHOP</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">Rating Components</h4>
                <div className="flex flex-wrap items-center gap-6">
                  <Rating rating={4.7} size="sm" />
                  <Rating rating={4.6} reviewsCount={128} size="md" />
                  <Rating rating={4.9} reviewsCount={340} size="lg" />
                </div>
              </div>
            </div>

            {/* Icon Grid */}
            <div className="bg-white rounded-[18px] border border-[#E4E4DA] p-6">
              <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">Lucide Icon Set</h4>
              <div className="grid grid-cols-5 sm:grid-cols-7 gap-3">
                {iconsList.map((ic) => {
                  const Icon = ic.icon;
                  return (
                    <div key={ic.name} className="flex flex-col items-center p-2 rounded-xl bg-[#FAF8F1] border border-[#E4E4DA] text-center">
                      <Icon className="w-5 h-5 text-[#667A3E] mb-1" />
                      <span className="text-[10px] text-[#6F7268] font-medium truncate w-full">{ic.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Card Components Showcase */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6">
            <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 07</span>
            <h2 className="text-2xl font-black text-[#20231B]">Card Component System</h2>
            <p className="text-sm text-[#6F7268]">Base Cards, Category Cards, Shop Cards, and Product Cards.</p>
          </div>

          {/* Category Cards */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-[#20231B] mb-4">Category Cards (Chicken, Fish, Mutton)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CategoryCard
                title="Chicken"
                subtitle="Curry cut, boneless & tender cuts"
                itemCount="24+ items"
                imageUrl="https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400"
              />
              <CategoryCard
                title="Fish"
                subtitle="Freshwater & sea fish cuts"
                itemCount="16+ items"
                imageUrl="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400"
              />
              <CategoryCard
                title="Mutton"
                subtitle="Fresh goat meat & curry cuts"
                itemCount="12+ items"
                imageUrl="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=400"
              />
            </div>
          </div>

          {/* Demo Shop Cards */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-[#20231B] mb-4">Demo Shop Cards (Karimnagar Partners)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ShopCard
                name="Fresh Chicken Centre"
                rating={4.6}
                reviewsCount={142}
                distance="1.2 km"
                deliveryTime="20-25 min"
                categories={["Chicken", "Eggs"]}
                imageUrl="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600"
              />
              <ShopCard
                name="Sri Fish Market"
                rating={4.5}
                reviewsCount={98}
                distance="2.1 km"
                deliveryTime="30-35 min"
                categories={["Fish", "Prawns"]}
                imageUrl="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600"
              />
              <ShopCard
                name="Karimnagar Meat Point"
                rating={4.7}
                reviewsCount={210}
                distance="2.8 km"
                deliveryTime="25-30 min"
                categories={["Mutton", "Chicken"]}
                imageUrl="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600"
              />
            </div>
          </div>

          {/* Product Cards */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-[#20231B] mb-4">Popular Product Cards</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ProductCard
                title="Chicken Curry Cut"
                weight="500 g"
                price={180}
                originalPrice={200}
                shopName="Fresh Chicken Centre"
                imageUrl="https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500"
              />
              <ProductCard
                title="Chicken Boneless"
                weight="500 g"
                price={240}
                shopName="Fresh Chicken Centre"
                imageUrl="https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=500"
              />
              <ProductCard
                title="Fish Curry Cut"
                weight="500 g"
                price={220}
                shopName="Sri Fish Market"
                imageUrl="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500"
              />
              <ProductCard
                title="Mutton Curry Cut"
                weight="500 g"
                price={450}
                originalPrice={480}
                shopName="Karimnagar Meat Point"
                imageUrl="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=500"
              />
            </div>
          </div>

          {/* Info Banner */}
          <InfoCard />
        </section>

        {/* Section 8: Header & Bottom Navigation Shell */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6">
            <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 08</span>
            <h2 className="text-2xl font-black text-[#20231B]">Application Navigation Shell</h2>
            <p className="text-sm text-[#6F7268]">Desktop Header & Fixed Mobile Bottom Navigation bar.</p>
          </div>

          <div className="space-y-6">
            {/* Header Preview */}
            <div className="bg-[#FAF8F1] p-4 rounded-[20px] border border-[#E4E4DA]">
              <span className="text-xs font-bold text-[#6F7268] uppercase tracking-wider block mb-3">Header Component Live Preview</span>
              <Header
                activeTab={activeNavTab}
                onTabChange={(tab) => setActiveNavTab(tab)}
                cartCount={cartCount}
                locationName="Karimnagar, Telangana"
              />
            </div>

            {/* Mobile Bottom Nav Preview */}
            <div className="bg-[#FAF8F1] p-4 rounded-[20px] border border-[#E4E4DA]">
              <span className="text-xs font-bold text-[#6F7268] uppercase tracking-wider block mb-3">Mobile Bottom Navigation Preview</span>
              <div className="relative bg-white rounded-xl border border-[#E4E4DA] overflow-hidden py-2">
                <BottomNavigation
                  activeTab={activeNavTab}
                  onTabChange={(tab) => setActiveNavTab(tab)}
                  cartCount={cartCount}
                  className="!static border-t-0 shadow-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Skeleton Loaders & Empty States */}
        <section className="mb-12">
          <div className="border-b border-[#E4E4DA] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#667A3E] uppercase tracking-widest">SECTION 09</span>
              <h2 className="text-2xl font-black text-[#20231B]">Skeleton Loaders & Empty States</h2>
              <p className="text-sm text-[#6F7268]">Smooth visual feedback for loading and empty screens.</p>
            </div>

            {/* Empty State Switcher Tabs */}
            <div className="flex bg-[#E8EEDB] p-1 rounded-xl gap-1 text-xs font-bold">
              <button
                onClick={() => setActiveEmptyTab('shops')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  activeEmptyTab === 'shops' ? 'bg-[#667A3E] text-white' : 'text-[#46552A]'
                }`}
              >
                No Shops
              </button>
              <button
                onClick={() => setActiveEmptyTab('orders')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  activeEmptyTab === 'orders' ? 'bg-[#667A3E] text-white' : 'text-[#46552A]'
                }`}
              >
                No Orders
              </button>
              <button
                onClick={() => setActiveEmptyTab('cart')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  activeEmptyTab === 'cart' ? 'bg-[#667A3E] text-white' : 'text-[#46552A]'
                }`}
              >
                Empty Cart
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skeleton Grid */}
            <div>
              <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">Skeleton Loader Shimmer Effect</h4>
              <GridSkeleton count={2} type="shop" />
            </div>

            {/* Empty State Component */}
            <div>
              <h4 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider mb-3">Empty State Container</h4>
              <EmptyState 
                type={activeEmptyTab}
                onAction={() => alert(`Navigating from empty ${activeEmptyTab} state!`)}
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
