const redisClient = require('../config/redis');

/**
 * Liked Service - Manages liked/favorited products in Redis
 */

const LIKED_PREFIX = 'liked:user:';

/**
 * Get user's liked products
 * @param {string} userId - User ID
 * @returns {Promise<Array>}
 */
const getLiked = async (userId) => {
  try {
    const key = `${LIKED_PREFIX}${userId}`;
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting liked products:', error);
    throw error;
  }
};

/**
 * Add product to liked list
 * @param {string} userId - User ID
 * @param {object} product - Product to add
 * @returns {Promise<Array>}
 */
const addToLiked = async (userId, product) => {
  try {
    const liked = await getLiked(userId);
    
    // Check if product already liked
    const exists = liked.some(item => item._id === product._id);
    
    if (!exists) {
      liked.push(product);
      const key = `${LIKED_PREFIX}${userId}`;
      await redisClient.set(key, JSON.stringify(liked));
    }
    
    return liked;
  } catch (error) {
    console.error('Error adding to liked:', error);
    throw error;
  }
};

/**
 * Remove product from liked list
 * @param {string} userId - User ID
 * @param {string} productId - Product ID to remove
 * @returns {Promise<Array>}
 */
const removeFromLiked = async (userId, productId) => {
  try {
    const liked = await getLiked(userId);
    const updatedLiked = liked.filter(item => item._id !== productId);
    
    const key = `${LIKED_PREFIX}${userId}`;
    await redisClient.set(key, JSON.stringify(updatedLiked));
    
    return updatedLiked;
  } catch (error) {
    console.error('Error removing from liked:', error);
    throw error;
  }
};

/**
 * Check if product is liked
 * @param {string} userId - User ID
 * @param {string} productId - Product ID
 * @returns {Promise<boolean>}
 */
const isLiked = async (userId, productId) => {
  try {
    const liked = await getLiked(userId);
    return liked.some(item => item._id === productId);
  } catch (error) {
    console.error('Error checking if liked:', error);
    throw error;
  }
};

/**
 * Clear all liked products
 * @param {string} userId - User ID
 * @returns {Promise<boolean>}
 */
const clearLiked = async (userId) => {
  try {
    const key = `${LIKED_PREFIX}${userId}`;
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('Error clearing liked:', error);
    throw error;
  }
};

module.exports = {
  getLiked,
  addToLiked,
  removeFromLiked,
  isLiked,
  clearLiked
};
