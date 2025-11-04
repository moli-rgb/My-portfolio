const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import model definitions
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Initialize models
const userModel = User(sequelize, DataTypes);
const productModel = Product(sequelize, DataTypes);
const orderModel = Order(sequelize, DataTypes);
const orderItemModel = OrderItem(sequelize, DataTypes);

// Define relationships
userModel.hasMany(orderModel, { foreignKey: 'userId' });
orderModel.belongsTo(userModel, { foreignKey: 'userId' });

productModel.hasMany(orderItemModel, { foreignKey: 'productId' });
orderItemModel.belongsTo(productModel, { foreignKey: 'productId' });

orderModel.hasMany(orderItemModel, { foreignKey: 'orderId' });
orderItemModel.belongsTo(orderModel, { foreignKey: 'orderId' });

// Sync models with database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database tables:', err);
  });

module.exports = {
  sequelize,
  User: userModel,
  Product: productModel,
  Order: orderModel,
  OrderItem: orderItemModel
};