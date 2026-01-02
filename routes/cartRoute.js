const express = require('express');
const { redisAuth } = require('../middlewares/redisAuth');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getCartCount
} = require('../services/cartService');

const router = express.Router();

/**
 * GET /api/v1/cart
 * Get user's cart
 */
router.get('/', redisAuth, async (req, res) => {
  try {
    const cart = await getCart(req.user._id);
    
    res.status(200).json({
      success: true,
      cart,
      count: cart.reduce((total, item) => total + (item.quantity || 1), 0)
    });
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving cart'
    });
  }
});

/**
 * GET /api/v1/cart/count
 * Get cart item count
 */
router.get('/count', redisAuth, async (req, res) => {
  try {
    const count = await getCartCount(req.user._id);
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error getting cart count:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving cart count'
    });
  }
});

/**
 * POST /api/v1/cart
 * Add item to cart
 */
router.post('/', redisAuth, async (req, res) => {
  try {
    const { product } = req.body;
    
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product data required'
      });
    }
    
    const cart = await addToCart(req.user._id, product);
    
    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      cart
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to cart'
    });
  }
});

/**
 * PUT /api/v1/cart/:productId
 * Update cart item quantity
 */
router.put('/:productId', redisAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Quantity required'
      });
    }
    
    const cart = await updateCartItemQuantity(req.user._id, productId, quantity);
    
    res.status(200).json({
      success: true,
      message: 'Cart updated',
      cart
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart'
    });
  }
});

/**
 * DELETE /api/v1/cart/:productId
 * Remove item from cart
 */
router.delete('/:productId', redisAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await removeFromCart(req.user._id, productId);
    
    res.status(200).json({
      success: true,
      message: 'Product removed from cart',
      cart
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing from cart'
    });
  }
});

/**
 * DELETE /api/v1/cart
 * Clear entire cart
 */
router.delete('/', redisAuth, async (req, res) => {
  try {
    await clearCart(req.user._id);
    
    res.status(200).json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
});

module.exports = { router };
