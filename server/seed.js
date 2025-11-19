import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sample products data
const sampleProducts = [
  {
    name: "Classic Polo Shirt",
    description: "Premium cotton polo shirt with modern fit",
    small_description: "Comfortable and stylish",
    price: 1299,
    category: "polos",
    image_main: "/assets/images/products/polo1.jpg",
    "image-2": "/assets/images/products/polo1-2.jpg",
    "image-3": "/assets/images/products/polo1-3.jpg",
    "image-4": "/assets/images/products/polo1-4.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Cotton",
    fit: "Regular Fit",
    care: "Machine wash cold",
    key_feature: "Breathable fabric",
    tags: ["casual", "summer", "cotton"],
    rating: 4.5,
    reviews: 120,
    inStock: true,
    featured: true,
    badge: "TRENDING"
  },
  {
    name: "Formal White Shirt",
    description: "Classic white formal shirt perfect for office",
    small_description: "Professional and elegant",
    price: 1599,
    category: "shirts",
    image_main: "/assets/images/products/shirt1.jpg",
    "image-2": "/assets/images/products/shirt1-2.jpg",
    sizes: ["S", "M", "L", "XL"],
    material: "Cotton Blend",
    fit: "Slim Fit",
    care: "Dry clean recommended",
    key_feature: "Wrinkle-free",
    tags: ["formal", "office", "classic"],
    rating: 4.7,
    reviews: 85,
    inStock: true,
    featured: true,
    badge: "NEW"
  },
  {
    name: "Oversized T-Shirt",
    description: "Trendy oversized t-shirt for casual wear",
    small_description: "Relaxed and comfortable",
    price: 899,
    category: "polos",
    image_main: "/assets/images/products/oversize1.jpg",
    sizes: ["M", "L", "XL"],
    material: "Cotton Jersey",
    fit: "Oversized Fit",
    care: "Machine wash",
    key_feature: "Extra comfort",
    tags: ["casual", "streetwear", "oversized"],
    rating: 4.3,
    reviews: 95,
    inStock: true,
    featured: false,
    badge: "LIMITED"
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany();
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${products.length} products`);

    console.log('\n📦 Sample Products:');
    products.forEach(product => {
      console.log(`  - ${product.name} (${product.category}) - ₹${product.price}`);
    });

    console.log('\n✨ Database seeded successfully!');
    console.log('\n💡 To add more products:');
    console.log('   1. Edit server/seed.js');
    console.log('   2. Add products to sampleProducts array');
    console.log('   3. Run: node server/seed.js');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
