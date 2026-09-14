/**
 * Demo Data for MEATLY Shop Discovery & Shop Details (Karimnagar Launch Market)
 */

export const allShopsData = [
  {
    id: 'shop-1',
    name: 'Fresh Chicken Centre',
    rating: 4.6,
    reviewsCount: 142,
    distance: '1.2 km',
    deliveryTime: '25–35 min',
    isOpen: true,
    categories: ['Chicken', 'Eggs'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
    coverImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    description: 'Fresh chicken cuts prepared to your preference. Daily farm fresh stock.',
    address: 'Collectorate Road, Karimnagar',
    openingHours: '8:00 AM – 9:00 PM',
    minOrder: 199,
    deliveryFee: 'Free delivery above ₹499',
    isDemo: true,
    isPopular: true,
    isTopRated: true,
    reviews: [
      { id: 'r1', author: 'Rahul V.', rating: 5, comment: 'Fresh cuts and very good quality packaging.', date: '2 days ago' },
      { id: 'r2', author: 'Sravanthi K.', rating: 4.5, comment: 'Clean shop hygiene and quick delivery in Karimnagar.', date: '1 week ago' },
      { id: 'r3', author: 'Mahesh B.', rating: 4.5, comment: 'Tender boneless chicken cuts. Highly recommended!', date: '2 weeks ago' },
    ]
  },
  {
    id: 'shop-2',
    name: 'Sri Fish Market',
    rating: 4.5,
    reviewsCount: 98,
    distance: '2.1 km',
    deliveryTime: '30–40 min',
    isOpen: true,
    categories: ['Fish', 'Prawns'],
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    coverImageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=1200',
    description: 'Freshwater river fish and sea fish cleaned and sliced fresh daily.',
    address: 'Tower Circle, Karimnagar',
    openingHours: '7:30 AM – 8:30 PM',
    minOrder: 249,
    deliveryFee: 'Free delivery above ₹499',
    isDemo: true,
    isPopular: true,
    isTopRated: false,
    reviews: [
      { id: 'r4', author: 'Kiran Kumar', rating: 5, comment: 'Best fish market in town. Perfectly cleaned curry cuts.', date: '3 days ago' },
      { id: 'r5', author: 'Priyanka M.', rating: 4, comment: 'Fresh catch delivered fast with ice gel packs.', date: '5 days ago' },
    ]
  },
  {
    id: 'shop-3',
    name: 'Karimnagar Meat Point',
    rating: 4.7,
    reviewsCount: 210,
    distance: '2.8 km',
    deliveryTime: '25–35 min',
    isOpen: true,
    categories: ['Mutton', 'Chicken'],
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600',
    coverImageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200',
    description: 'Premium quality tender mutton and farm chicken cut fresh for curry.',
    address: 'Mukarampura, Karimnagar',
    openingHours: '8:00 AM – 9:30 PM',
    minOrder: 299,
    deliveryFee: 'Free delivery above ₹499',
    isDemo: true,
    isPopular: true,
    isTopRated: true,
    reviews: [
      { id: 'r6', author: 'Venkatesh G.', rating: 5, comment: 'Tender goat mutton cuts. Excellent flavor and cut quality.', date: 'Yesterday' },
      { id: 'r7', author: 'Anitha R.', rating: 4.5, comment: 'Reliable shop in Mukarampura. Clean and hygienic.', date: '4 days ago' },
    ]
  },
  {
    id: 'shop-4',
    name: 'Telangana Fresh Meat Hub',
    rating: 4.8,
    reviewsCount: 320,
    distance: '3.4 km',
    deliveryTime: '30–40 min',
    isOpen: true,
    categories: ['Chicken', 'Mutton', 'Fish'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    coverImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
    description: 'One-stop marketplace shop for fresh chicken, mutton, and seasonal fish.',
    address: 'Kaman Road, Karimnagar',
    openingHours: '7:00 AM – 9:00 PM',
    minOrder: 199,
    deliveryFee: 'Free delivery above ₹499',
    isDemo: true,
    isPopular: false,
    isTopRated: true,
    reviews: [
      { id: 'r8', author: 'Srinivas P.', rating: 5, comment: 'Wide variety of cuts available. Highly satisfied.', date: '3 days ago' },
    ]
  },
  {
    id: 'shop-5',
    name: 'Royal Mutton House',
    rating: 4.6,
    reviewsCount: 86,
    distance: '1.8 km',
    deliveryTime: '20–30 min',
    isOpen: false,
    categories: ['Mutton'],
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600',
    coverImageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=1200',
    description: 'Specialized mutton shop providing premium rib cuts and biryani cuts.',
    address: 'Rajiv Rahadari, Karimnagar',
    openingHours: '8:00 AM – 8:00 PM',
    minOrder: 350,
    deliveryFee: 'Free delivery above ₹599',
    isDemo: true,
    isPopular: false,
    isTopRated: false,
    reviews: [
      { id: 'r9', author: 'Mohammed A.', rating: 5, comment: 'Best mutton for biryani in Karimnagar.', date: '1 week ago' },
    ]
  },
];

export const shopProductsData = {
  'shop-1': [
    { id: 'p101', title: 'Chicken Curry Cut (Small Pieces)', category: 'Chicken', weight: '500 g', price: 180, originalPrice: 200, tag: 'Best Seller', imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500' },
    { id: 'p102', title: 'Chicken Boneless', category: 'Chicken', weight: '500 g', price: 240, originalPrice: 260, tag: 'Tender Cut', imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=500' },
    { id: 'p103', title: 'Chicken Drumsticks / Leg Pieces', category: 'Chicken', weight: '500 g', price: 210, originalPrice: 230, tag: 'Fresh Cut', imageUrl: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=500' },
    { id: 'p104', title: 'Chicken Breast Cut', category: 'Chicken', weight: '500 g', price: 250, originalPrice: 270, tag: 'Lean Protein', imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500' },
    { id: 'p105', title: 'Chicken Lollipop (Cleaned)', category: 'Chicken', weight: '500 g', price: 230, originalPrice: 250, tag: 'Party Special', imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=500' },
  ],
  'shop-2': [
    { id: 'p201', title: 'Rohu Fish Curry Cut', category: 'Fish', weight: '500 g', price: 220, originalPrice: 250, tag: 'Fresh Catch', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500' },
    { id: 'p202', title: 'Katla Fish Steak Cut', category: 'Fish', weight: '500 g', price: 240, originalPrice: 270, tag: 'Popular', imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=500' },
    { id: 'p203', title: 'Fresh Tiger Prawns (Cleaned)', category: 'Fish', weight: '250 g', price: 320, originalPrice: 350, tag: 'Cleaned', imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=500' },
  ],
  'shop-3': [
    { id: 'p301', title: 'Mutton Curry Cut (Rich Fat)', category: 'Mutton', weight: '500 g', price: 450, originalPrice: 480, tag: 'Premium Cut', imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=500' },
    { id: 'p302', title: 'Mutton Biryani Cut', category: 'Mutton', weight: '500 g', price: 470, originalPrice: 500, tag: 'Special Cut', imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=500' },
    { id: 'p303', title: 'Mutton Boneless', category: 'Mutton', weight: '500 g', price: 580, originalPrice: 620, tag: 'Tender', imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=500' },
    { id: 'p304', title: 'Chicken Curry Cut', category: 'Chicken', weight: '500 g', price: 185, originalPrice: 200, tag: 'Fresh Cut', imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500' },
  ],
};

// Fallback products for other shops
export const defaultShopProducts = [
  { id: 'p401', title: 'Fresh Chicken Curry Cut', category: 'Chicken', weight: '500 g', price: 180, tag: 'Fresh Cut', imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500' },
  { id: 'p402', title: 'Fresh Fish Slices', category: 'Fish', weight: '500 g', price: 230, tag: 'Cleaned', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500' },
  { id: 'p403', title: 'Tender Mutton Cut', category: 'Mutton', weight: '500 g', price: 460, tag: 'Premium', imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=500' },
];
