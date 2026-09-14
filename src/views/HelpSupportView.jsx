import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, PhoneCall, MessageSquare, Mail, ChevronDown, ChevronUp, Search, ShieldCheck } from 'lucide-react';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';
import { helpFaqs } from '../data/demoUser';
import { useCart } from '../context/CartContext';

/**
 * MEATLY Help & Support View (`/account/help`)
 */
export default function HelpSupportView({
  onBack,
  onBackToHome,
  onExploreShops
}) {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState(helpFaqs[0].id);

  const filteredFaqs = helpFaqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F8EF] text-[#20231B] flex flex-col pb-24 md:pb-12">
      <Header activeTab="profile" cartCount={cartCount} locationName="Karimnagar, Telangana" />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Navigation Header */}
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
              Help & Support
            </h1>
            <p className="text-xs sm:text-sm text-[#6F7268]">
              Frequently asked questions & Karimnagar customer care
            </p>
          </div>
        </div>

        {/* Contact Support Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <a
            href="tel:+919123456789"
            className="bg-white rounded-[20px] border border-[#E4E4DA] p-4 text-center meatly-card-transition hover:border-[#667A3E] shadow-xs space-y-2 block"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#20231B] block">Call Support</span>
              <span className="text-[11px] text-[#6F7268] block">+91 91234 56789</span>
            </div>
          </a>

          <button
            onClick={() => alert('WhatsApp Support line: +91 91234 56789 (Demo)')}
            className="bg-white rounded-[20px] border border-[#E4E4DA] p-4 text-center meatly-card-transition hover:border-[#667A3E] shadow-xs space-y-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#20231B] block">WhatsApp Chat</span>
              <span className="text-[11px] text-[#6F7268] block">Instant response</span>
            </div>
          </button>

          <a
            href="mailto:support@meatly.in"
            className="bg-white rounded-[20px] border border-[#E4E4DA] p-4 text-center meatly-card-transition hover:border-[#667A3E] shadow-xs space-y-2 block"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8EEDB] text-[#667A3E] flex items-center justify-center mx-auto border border-[#d2dcb9]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#20231B] block">Email Support</span>
              <span className="text-[11px] text-[#6F7268] block">support@meatly.in</span>
            </div>
          </a>

        </div>

        {/* Search FAQ */}
        <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider">
            Search Support Articles
          </h3>
          <SearchBar
            placeholder="Search FAQs (e.g. cutting preferences, delivery, payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
          />
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#6F7268] uppercase tracking-wider px-1">
            Frequently Asked Questions
          </h3>

          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-[20px] border border-[#E4E4DA] p-8 text-center text-[#6F7268] text-xs">
              No matching questions found for "{searchQuery}".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-[18px] border border-[#E4E4DA] shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#20231B] flex items-center justify-between hover:bg-[#FAF8F1] transition-colors cursor-pointer"
                  >
                    <span className="pr-2">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#667A3E] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#6F7268] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#6F7268] leading-relaxed border-t border-[#FAF8F1] pt-3 bg-[#FAF8F1]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Local Support Guarantee */}
        <div className="bg-[#E8EEDB] rounded-[20px] p-5 border border-[#667A3E]/30 text-center space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#667A3E] mx-auto" />
          <h4 className="text-sm font-bold text-[#46552A]">
            MEATLY Karimnagar Customer Guarantee
          </h4>
          <p className="text-xs text-[#46552A]/90 max-w-md mx-auto">
            100% Fresh Meat Guarantee. If you have any concern with cut quality, weight, or hygiene, our local Karimnagar team is here to assist instantly.
          </p>
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
