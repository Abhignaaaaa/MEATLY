import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';

/**
 * Product Image Gallery Component
 * Features main image preview, thumbnail switcher, and overlay favorite/share controls.
 */
export default function ImageGallery({
  images = [],
  title = '',
  onBack,
  isFavorite = false,
  onToggleFavorite,
  onShare,
  tag = 'Freshly Prepared',
  className = ''
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentImage = images[activeImageIndex] || images[0] || 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800';

  return (
    <div className={`space-y-3 ${className}`}>
      
      {/* Main Image Container */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-[20px] overflow-hidden bg-white border border-[#E4E4DA] shadow-sm">
        <img
          src={currentImage}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Floating Top Bar Buttons */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#20231B] hover:bg-white transition-all shadow-md cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleFavorite}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                isFavorite 
                  ? 'bg-[#667A3E] text-white' 
                  : 'bg-white/90 text-[#20231B] hover:bg-white'
              }`}
              aria-label="Favorite Product"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            {onShare && (
              <button
                type="button"
                onClick={onShare}
                className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#20231B] hover:bg-white transition-all shadow-md cursor-pointer"
                aria-label="Share Product"
              >
                <Share2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Floating Tag */}
        {tag && (
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#E4E4DA] text-xs font-bold text-[#46552A]">
            {tag}
          </div>
        )}
      </div>

      {/* Thumbnail Switcher Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => {
            const isSelected = activeImageIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-16 h-16 rounded-[12px] overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  isSelected ? 'border-[#667A3E] ring-2 ring-[#667A3E]/20 scale-105' : 'border-[#E4E4DA] opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}
