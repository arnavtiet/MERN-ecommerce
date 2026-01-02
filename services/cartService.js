const redisClient = require('../config/redis');

/**
 * Cart Service - Manages shopping cart in Redis
 */

const CART_PREFIX = 'cart:user:';

/**
 * Get user's cart
 * @param {string} userId - User ID
 * @returns {Promise<Array>}
 */
const getCart = async (userId) => {
  try {
    const key = `${CART_PREFIX}${userId}`;
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

/**
 * Add item to cart
 * @param {string} userId - User ID
 * @param {object} product - Product to add
 * @returns {Promise<Array>}
 */
const addToCart = async (userId, product) => {
  try {
    const cart = await getCart(userId);
    
    // Check if product already exists
    const existingIndex = cart.findIndex(item => item._id === product._id);
    
    if (existingIndex > -1) {
      // Update quantity if product exists
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      // Add new product
      cart.push({ ...product, quantity: 1 });
    }
    
    const key = `${CART_PREFIX}${userId}`;
    await redisClient.set(key, JSON.stringify(cart));
    
    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

/**
 * Remove item from cart
 * @param {string} userId - User ID
 * @param {string} productId - Product ID to remove
 * @returns {Promise<Array>}
 */
const removeFromCart = async (userId, productId) => {
  try {
    const cart = await getCart(userId);
    const updatedCart = cart.filter(item => item._id !== productId);
    
    const key = `${CART_PREFIX}${userId}`;
    await redisClient.set(key, JSON.stringify(updatedCart));
    
    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

/**
 * Update item quantity in cart
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Array>}
 */
const updateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await getCart(userId);
    const itemIndex = cart.findIndex(item => item._id === productId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        cart.splice(itemIndex, 1);
      } else {
        cart[itemIndex].quantity = quantity;
      }
    }
    
    const key = `${CART_PREFIX}${userId}`;
    await redisClient.set(key, JSON.stringify(cart));
    
    return cart;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw error;
  }
};

/**
 * Clear entire cart
 * @param {string} userId - User ID
 * @returns {Promise<boolean>}
 */
const clearCart = async (userId) => {
  try {
    const key = `${CART_PREFIX}${userId}`;
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

/**
 * Get cart item count
 * @param {string} userId - User ID
 * @returns {Promise<number>}
 */
const getCartCount = async (userId) => {
  try {
    const cart = await getCart(userId);
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  } catch (error) {
    console.error('Error getting cart count:', error);
    throw error;
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  getCartCount
};
