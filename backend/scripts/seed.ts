import { connectDatabase, disconnectDatabase } from '../src/config/database.js';
import { Shop } from '../src/models/Shop.js';
import { Product } from '../src/models/Product.js';
import { User } from '../src/models/User.js';

async function seedData() {
  console.log('[Seed Script] Starting MEATLY database seeding for Karimnagar launch market...');
  
  const connected = await connectDatabase();
  if (!connected) {
    console.error('[Seed Error] Database connection failed. Aborting seed script.');
    process.exit(1);
  }

  // Clear existing collections
  await Shop.deleteMany({});
  await Product.deleteMany({});
  await User.deleteMany({});

  // 1. Seed Demo Customer
  const demoUser = await User.create({
    fullName: 'Rahul Verma',
    phone: '9876543210',
    email: 'rahul.verma@example.com',
    role: 'customer',
    memberSince: 'Sep 2026',
  });
  console.log(`[Seed] Created Demo User: ${demoUser.fullName} (${demoUser.phone})`);

  // 1.5 Seed Demo Shop Owner
  const demoOwner = await User.create({
    fullName: 'Srinivas Reddy',
    phone: '9998887776',
    email: 'srinivas.owner@example.com',
    role: 'shop_owner',
    memberSince: 'Sep 2026',
  });
  console.log(`[Seed] Created Demo Shop Owner: ${demoOwner.fullName} (${demoOwner.phone})`);

  // Add Demo Admin
  const adminUser = await User.create({
    fullName: 'Admin User',
    phone: '1112223334',
    email: 'admin@meatly.in',
    role: 'admin',
    memberSince: 'Sep 2026',
  });
  console.log(`[Seed] Created Demo Admin: ${adminUser.fullName} (${adminUser.phone})`);

  // 2. Seed Shops
  const shopsData = [
    {
      ownerId: demoOwner._id,
      name: 'Fresh Chicken Centre',
      description: 'Fresh chicken cuts prepared to your preference. Daily farm fresh stock.',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
      coverImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
      address: 'Collectorate Road, Karimnagar',
      categories: ['Chicken', 'Eggs'],
      rating: 4.6,
      reviewsCount: 142,
      distance: '1.2 km',
      deliveryTime: '25–35 min',
      isOpen: true,
      isPopular: true,
      isTopRated: true,
      reviews: [
        { id: 'r1', author: 'Rahul V.', rating: 5, comment: 'Fresh cuts and very good quality packaging.', date: '2 days ago' },
        { id: 'r2', author: 'Sravanthi K.', rating: 4.5, comment: 'Clean shop hygiene and quick delivery in Karimnagar.', date: '1 week ago' },
      ],
    },
    {
      name: 'Sri Fish Market',
      description: 'Freshwater river fish and sea fish cleaned and sliced fresh daily.',
      imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
      coverImageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=1200',
      address: 'Tower Circle, Karimnagar',
      categories: ['Fish', 'Prawns'],
      rating: 4.5,
      reviewsCount: 98,
      distance: '2.1 km',
      deliveryTime: '30–40 min',
      isOpen: true,
      isPopular: true,
      isTopRated: false,
      reviews: [
        { id: 'r3', author: 'Kiran Kumar', rating: 5, comment: 'Best fish market in town. Perfectly cleaned curry cuts.', date: '3 days ago' },
      ],
    },
    {
      name: 'Karimnagar Meat Point',
      description: 'Premium quality tender mutton and farm chicken cut fresh for curry.',
      imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600',
      coverImageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=1200',
      address: 'Mukarampura, Karimnagar',
      categories: ['Mutton', 'Chicken'],
      rating: 4.7,
      reviewsCount: 210,
      distance: '2.8 km',
      deliveryTime: '25–35 min',
      isOpen: true,
      isPopular: true,
      isTopRated: true,
      reviews: [
        { id: 'r4', author: 'Venkatesh G.', rating: 5, comment: 'Tender goat mutton cuts. Excellent flavor and cut quality.', date: 'Yesterday' },
      ],
    },
    {
      name: 'Telangana Fresh Meat Hub',
      description: 'One-stop marketplace shop for fresh chicken, mutton, and seasonal fish.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
      coverImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
      address: 'Kaman Road, Karimnagar',
      categories: ['Chicken', 'Mutton', 'Fish'],
      rating: 4.8,
      reviewsCount: 320,
      distance: '3.4 km',
      deliveryTime: '30–40 min',
      isOpen: true,
      isPopular: false,
      isTopRated: true,
      reviews: [],
    },
  ];

  const createdShops = await Shop.insertMany(shopsData);
  console.log(`[Seed] Created ${createdShops.length} Karimnagar Partner Shops.`);

  // 3. Seed Products for Shops
  const shop1 = createdShops[0]; // Fresh Chicken Centre
  const shop2 = createdShops[1]; // Sri Fish Market
  const shop3 = createdShops[2]; // Karimnagar Meat Point

  const productsData = [
    {
      shopId: shop1._id,
      title: 'Chicken Curry Cut (Small Pieces)',
      category: 'Chicken',
      weight: '500 g',
      price: 180,
      originalPrice: 200,
      tag: 'Best Seller',
      imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=500',
      description: 'Skinless chicken cut into small curry-friendly pieces.',
    },
    {
      shopId: shop1._id,
      title: 'Chicken Boneless',
      category: 'Chicken',
      weight: '500 g',
      price: 240,
      originalPrice: 260,
      tag: 'Tender Cut',
      imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=500',
      description: 'Tender boneless chicken breast and thigh cuts.',
    },
    {
      shopId: shop1._id,
      title: 'Chicken Drumsticks / Leg Pieces',
      category: 'Chicken',
      weight: '500 g',
      price: 210,
      originalPrice: 230,
      tag: 'Fresh Cut',
      imageUrl: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=500',
      description: 'Juicy chicken drumsticks cleaned and prepared for frying.',
    },
    {
      shopId: shop2._id,
      title: 'Rohu Fish Curry Cut',
      category: 'Fish',
      weight: '500 g',
      price: 220,
      originalPrice: 250,
      tag: 'Fresh Catch',
      imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=500',
      description: 'Fresh river Rohu fish descaled, gutted and sliced into curry steaks.',
    },
    {
      shopId: shop2._id,
      title: 'Katla Fish Steak Cut',
      category: 'Fish',
      weight: '500 g',
      price: 240,
      originalPrice: 270,
      tag: 'Popular',
      imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=500',
      description: 'Premium Katla fish thick cut steaks.',
      isAvailable: false,
    },
    {
      shopId: shop3._id,
      title: 'Mutton Curry Cut (Rich Fat)',
      category: 'Mutton',
      weight: '500 g',
      price: 450,
      originalPrice: 480,
      tag: 'Premium Cut',
      imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=500',
      description: 'Tender goat mutton cuts with balanced bone and fat.',
    },
    {
      shopId: shop3._id,
      title: 'Mutton Biryani Cut',
      category: 'Mutton',
      weight: '500 g',
      price: 470,
      originalPrice: 500,
      tag: 'Special Cut',
      imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=500',
      description: 'Large tender mutton pieces specially cut for Hyderabadi biryani.',
    },
  ];

  const createdProducts = await Product.insertMany(productsData);
  console.log(`[Seed] Created ${createdProducts.length} Fresh Meat Products.`);

  console.log('[Seed Complete] MEATLY database successfully seeded!');
  await disconnectDatabase();
  process.exit(0);
}

seedData().catch((err) => {
  console.error('[Seed Fatal Error]', err);
  process.exit(1);
});
