/**
 * Demo Data for MEATLY Customer Home Screen (Karimnagar Launch Market)
 */

export const categoriesData = [
  {
    id: 'chicken',
    title: 'Chicken',
    subtitle: 'Fresh cuts daily',
    itemCount: '24+ items',
    badgeText: 'Popular',
    imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'fish',
    title: 'Fish',
    subtitle: 'Fresh catch',
    itemCount: '16+ items',
    badgeText: 'Fresh',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'mutton',
    title: 'Mutton',
    subtitle: 'Premium cuts',
    itemCount: '12+ items',
    badgeText: 'Top Rated',
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=500',
  },
];

export const popularShopsData = [
  {
    id: 'shop-1',
    name: 'Fresh Chicken Centre',
    rating: 4.6,
    reviewsCount: 142,
    distance: '1.2 km',
    deliveryTime: '20-25 min',
    isOpen: true,
    categories: ['Chicken', 'Eggs'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
    isDemo: true,
  },
  {
    id: 'shop-2',
    name: 'Sri Fish Market',
    rating: 4.5,
    reviewsCount: 98,
    distance: '2.1 km',
    deliveryTime: '30-35 min',
    isOpen: true,
    categories: ['Fish', 'Prawns'],
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    isDemo: true,
  },
  {
    id: 'shop-3',
    name: 'Karimnagar Meat Point',
    rating: 4.7,
    reviewsCount: 210,
    distance: '2.8 km',
    deliveryTime: '25-30 min',
    isOpen: true,
    categories: ['Mutton', 'Chicken'],
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600',
    isDemo: true,
  },
];

export const nearbyShopsData = [
  ...popularShopsData,
  {
    id: 'shop-4',
    name: 'Telangana Fresh Meat Hub',
    rating: 4.8,
    reviewsCount: 320,
    distance: '3.4 km',
    deliveryTime: '30-40 min',
    isOpen: true,
    categories: ['Chicken', 'Mutton', 'Fish'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    isDemo: true,
  },
];

export const popularProductsData = [
  {
    id: 'prod-1',
    title: 'Chicken Curry Cut',
    weight: '500 g',
    price: 180,
    originalPrice: 200,
    shopName: 'Fresh Chicken Centre',
    tag: 'Fresh Cut',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'prod-2',
    title: 'Chicken Boneless',
    weight: '500 g',
    price: 240,
    originalPrice: 260,
    shopName: 'Fresh Chicken Centre',
    tag: 'Tender Cut',
    imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'prod-3',
    title: 'Fish Curry Cut',
    weight: '500 g',
    price: 220,
    originalPrice: 250,
    shopName: 'Sri Fish Market',
    tag: 'Fresh Catch',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: 'prod-4',
    title: 'Mutton Curry Cut',
    weight: '500 g',
    price: 450,
    originalPrice: 480,
    shopName: 'Karimnagar Meat Point',
    tag: 'Premium Cut',
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=500',
  },
];

export const promoBannerData = {
  badge: "TODAY'S SPECIAL OFFER",
  title: "Fresh cuts. Better prices.",
  subtitle: "Discover today's offers from verified local Karimnagar shops.",
  ctaText: "View Offers",
  imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
};
