const { Product, sequelize } = require('./models');
require('dotenv').config();

// Sample products data with more reliable image URLs
const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    stock: 25
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with heart rate monitor, GPS, and water resistance.',
    price: 249.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    stock: 15
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and built-in grinder.',
    price: 89.99,
    category: 'Home & Kitchen',
    imageUrl: 'https://www.coffeespiration.com/wp-content/uploads/2020/12/2-1.jpg',
    stock: 30
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with extra cushioning and breathable mesh.',
    price: 129.99,
    category: 'Sports & Outdoors',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    stock: 40
  },
  {
    name: 'Backpack',
    description: 'Durable backpack with laptop compartment and multiple pockets.',
    price: 59.99,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    stock: 35
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360-degree sound and 12-hour battery.',
    price: 79.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
    stock: 20
  }
];

// Seed the database
const seedProducts = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('PostgreSQL connected for seeding');
    
    // Delete existing products
    await Product.destroy({ where: {} });
    console.log('Existing products deleted');
    
    // Insert new products
    await Product.bulkCreate(products);
    console.log('Products seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();