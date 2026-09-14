/**
 * Extended Product Catalog Demo Data for MEATLY Step 4
 * Features category-specific cutting options, cleaning options, add-ons, and gallery images.
 */

export const cuttingOptionsByCategory = {
  chicken: [
    { id: 'curry', title: 'Curry Cut', desc: 'Traditional medium curry pieces with bone' },
    { id: 'small', title: 'Small Pieces', desc: 'Bite-sized pieces for quick frying & gravy' },
    { id: 'medium', title: 'Medium Pieces', desc: 'Standard size for traditional curries' },
    { id: 'large', title: 'Large Pieces', desc: 'Larger cuts ideal for biryani & slow cooking' },
    { id: 'boneless', title: 'Boneless Cuts', desc: 'Clean 100% boneless meat cubes' },
    { id: 'leg', title: 'Leg Pieces', desc: 'Whole drumsticks cleaned & prepped' },
    { id: 'breast', title: 'Breast Fillet', desc: 'Lean chicken breast cuts' },
  ],
  fish: [
    { id: 'curry', title: 'Curry Cut', desc: 'Cleaned fish slices for traditional fish curry' },
    { id: 'steaks', title: 'Steaks Cut', desc: 'Thick cross-section steaks with center bone' },
    { id: 'fillet', title: 'Boneless Fillet', desc: 'Skinless boneless fish fillets' },
    { id: 'small', title: 'Small Fry Cut', desc: 'Smaller slices for deep fish fry' },
    { id: 'whole', title: 'Whole Cleaned', desc: 'Whole fish gutted & descaled with head' },
  ],
  mutton: [
    { id: 'curry', title: 'Curry Cut', desc: 'Balanced mixture of bone and meat pieces' },
    { id: 'small', title: 'Small Pieces', desc: 'Small curry cuts for quick pressure cooking' },
    { id: 'biryani', title: 'Biryani Cut', desc: 'Larger succuent cuts for mutton biryani' },
    { id: 'boneless', title: 'Boneless Mutton', desc: 'Clean boneless goat meat pieces' },
    { id: 'keema', title: 'Mince / Keema', desc: 'Finely ground fresh mutton mince' },
  ],
};

export const cleaningOptionsByCategory = {
  chicken: [
    { id: 'cleaned', title: 'Cleaned', desc: 'Washed and prepped' },
    { id: 'skinless', title: 'Skinless', desc: 'Skin completely removed (Recommended)' },
    { id: 'with-skin', title: 'With Skin', desc: 'Retains natural skin' },
  ],
  fish: [
    { id: 'cleaned', title: 'Cleaned & Descaled', desc: 'Scales removed and gutted' },
    { id: 'extra-clean', title: 'Extra Washed', desc: 'Rinsed in salt water' },
    { id: 'fillet', title: 'Skinless Fillet', desc: 'Skin and bones removed' },
  ],
  mutton: [
    { id: 'cleaned', title: 'Cleaned', desc: 'Prepped and excess fat washed' },
    { id: 'trimmed', title: 'Fat Trimmed', desc: 'Excess fat trimmed off' },
    { id: 'boneless', title: '100% Boneless', desc: 'All bones removed' },
  ],
};

export const addonOptions = [
  { id: 'extra-cleaning', title: 'Extra Hygienic Salt Wash', price: 20, desc: 'Rinsed with natural sea salt' },
  { id: 'marination', title: 'Special Karimnagar Spices Marination', price: 30, desc: 'Pre-marinated in local spices' },
];

export const detailedProductsData = {
  'prod-1': {
    id: 'prod-1',
    shopId: 'shop-1',
    shopName: 'Fresh Chicken Centre',
    shopRating: 4.6,
    shopDistance: '1.2 km',
    shopIsOpen: true,
    title: 'Chicken Curry Cut',
    category: 'chicken',
    weightOptions: ['250 g', '500 g', '1 kg', '1.5 kg', '2 kg'],
    defaultWeight: '500 g',
    basePrice: 180,
    originalPrice: 200,
    rating: 4.6,
    reviewsCount: 128,
    isAvailable: true,
    tag: 'Freshly Prepared',
    description: 'Farm fresh tender chicken cut to your preference. Prepared right after order placement in Karimnagar.',
    images: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=800',
    ],
    about: 'Our chicken is sourced daily from verified local farms near Karimnagar. Cut and prepped in hygienic conditions only after you order.',
    whatsIncluded: 'Fresh cut chicken pieces, vacuum/hygienic pouch sealed with ice packs.',
    storageInfo: 'Store in refrigerator at 0-4°C. Consume within 24 hours of delivery.',
  },
  'prod-2': {
    id: 'prod-2',
    shopId: 'shop-1',
    shopName: 'Fresh Chicken Centre',
    shopRating: 4.6,
    shopDistance: '1.2 km',
    shopIsOpen: true,
    title: 'Chicken Boneless',
    category: 'chicken',
    weightOptions: ['250 g', '500 g', '1 kg'],
    defaultWeight: '500 g',
    basePrice: 240,
    originalPrice: 260,
    rating: 4.8,
    reviewsCount: 94,
    isAvailable: true,
    tag: 'Tender Cut',
    description: '100% boneless fresh chicken breast and thigh meat cubes. Perfect for tikka, fries, and gravies.',
    images: [
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=800',
    ],
    about: 'Hand-trimmed boneless meat cubes free from bones and excess cartilage.',
    whatsIncluded: 'Boneless chicken cubes sealed in leak-proof trays.',
    storageInfo: 'Keep chilled below 4°C.',
  },
  'prod-3': {
    id: 'prod-3',
    shopId: 'shop-2',
    shopName: 'Sri Fish Market',
    shopRating: 4.5,
    shopDistance: '2.1 km',
    shopIsOpen: true,
    title: 'Fish Curry Cut (Rohu / Katla)',
    category: 'fish',
    weightOptions: ['500 g', '1 kg'],
    defaultWeight: '500 g',
    basePrice: 220,
    originalPrice: 250,
    rating: 4.5,
    reviewsCount: 65,
    isAvailable: true,
    tag: 'Fresh Catch',
    description: 'Fresh river fish descaled, cleaned, and sliced into curry cuts.',
    images: [
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
    ],
    about: 'Sourced fresh early morning from local Karimnagar reservoirs.',
    whatsIncluded: 'Cleaned fish steaks/slices ready for cooking.',
    storageInfo: 'Cook immediately or refrigerate under 2°C.',
  },
  'prod-4': {
    id: 'prod-4',
    shopId: 'shop-3',
    shopName: 'Karimnagar Meat Point',
    shopRating: 4.7,
    shopDistance: '2.8 km',
    shopIsOpen: true,
    title: 'Mutton Curry Cut',
    category: 'mutton',
    weightOptions: ['250 g', '500 g', '1 kg'],
    defaultWeight: '500 g',
BasePrice: 450,
    originalPrice: 480,
    rating: 4.7,
    reviewsCount: 112,
    isAvailable: true,
    tag: 'Premium Cut',
    description: 'Fresh tender goat mutton curry cut with a balanced mix of bone and meat pieces.',
    images: [
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=800',
    ],
    about: 'Fresh goat meat sourced from trusted local farmers in Telangana.',
    whatsIncluded: 'Tender mutton curry pieces packaged in food-grade pouch.',
    storageInfo: 'Refrigerate immediately.',
  },
};

// Fallback product data
export const defaultDetailedProduct = detailedProductsData['prod-1'];
