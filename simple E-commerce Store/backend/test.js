// Simple test script to verify the application works correctly
const { User, Product, sequelize } = require('./models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Test functions
async function testUserModel() {
  try {
    console.log('Testing User model...');
    
    // Create a test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });
    
    console.log('User created successfully');
    
    // Find the user
    const foundUser = await User.findOne({ where: { email: 'test@example.com' } });
    console.log('User found:', foundUser.name);
    
    // Test password comparison
    const isMatch = await bcrypt.compare('password123', foundUser.password);
    console.log('Password comparison result:', isMatch);
    
    // Clean up
    await User.destroy({ where: { email: 'test@example.com' } });
    console.log('User test completed successfully');
  } catch (error) {
    console.error('User test failed:', error);
  }
}

async function testProductModel() {
  try {
    console.log('Testing Product model...');
    
    // Create a test product
    const product = await Product.create({
      name: 'Test Product',
      description: 'This is a test product',
      price: 99.99,
      category: 'Test',
      imageUrl: 'https://example.com/image.jpg',
      stock: 10
    });
    
    console.log('Product created successfully');
    
    // Find the product
    const foundProduct = await Product.findOne({ where: { name: 'Test Product' } });
    console.log('Product found:', foundProduct.name);
    
    // Clean up
    await Product.destroy({ where: { name: 'Test Product' } });
    console.log('Product test completed successfully');
  } catch (error) {
    console.error('Product test failed:', error);
  }
}

async function runTests() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('PostgreSQL connected for testing');
    
    await testUserModel();
    await testProductModel();
    console.log('All tests completed successfully');
  } catch (error) {
    console.error('Tests failed:', error);
  } finally {
    process.exit(0);
  }
}

runTests();