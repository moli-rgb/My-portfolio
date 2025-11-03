const express = require('express');
const auth = require('../middleware/auth');
const { Order, OrderItem, Product, sequelize } = require('../models');

const router = express.Router();

// Create a new order
router.post('/', auth, async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { items, totalAmount } = req.body;
    
    // Create the order
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      status: 'pending'
    }, { transaction });
    
    // Create order items
    for (const item of items) {
      const product = await Product.findByPk(item.product, { transaction });
      if (!product) {
        await transaction.rollback();
        return res.status(404).json({ message: `Product with id ${item.product} not found` });
      }
      
      if (product.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ 
          message: `Insufficient stock for product ${product.name}` 
        });
      }
      
      // Update stock
      await product.decrement('stock', { by: item.quantity, transaction });
      
      // Create order item
      await OrderItem.create({
        orderId: order.id,
        productId: item.product,
        quantity: item.quantity,
        price: product.price
      }, { transaction });
    }
    
    // Commit transaction
    await transaction.commit();
    
    // Fetch the complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });
    
    res.status(201).json(completeOrder);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID (only if user owns the order)
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user owns this order
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const { status } = req.body;
    
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await order.update({ status });
    
    // Fetch the complete order with items
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ]
    });
    
    res.json(completeOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;