const express = require('express');
const { redisAuth } = require('../middlewares/redisAuth');
const {
  getLiked,
  addToLiked,
  removeFromLiked,
  isLiked
} = require('../services/likedService');

const router = express.Router();

/**
 * GET /api/v1/liked
 * Get user's liked products
 */
router.get('/', redisAuth, async (req, res) => {
  try {
    const liked = await getLiked(req.user._id);
    
    res.status(200).json({
      success: true,
      liked,
      count: liked.length
    });
  } catch (error) {
    console.error('Error getting liked products:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving liked products'
    });
  }
});

/**
 * POST /api/v1/liked
 * Add product to liked list
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
    
    const liked = await addToLiked(req.user._id, product);
    
    res.status(200).json({
      success: true,
      message: 'Product added to favorites',
      liked
    });
  } catch (error) {
    console.error('Error adding to liked:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding to favorites'
    });
  }
});

/**
 * DELETE /api/v1/liked/:productId
 * Remove product from liked list
 */
router.delete('/:productId', redisAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    const liked = await removeFromLiked(req.user._id, productId);
    
    res.status(200).json({
      success: true,
      message: 'Product removed from favorites',
      liked
    });
  } catch (error) {
    console.error('Error removing from liked:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing from favorites'
    });
  }
});

/**
 * GET /api/v1/liked/check/:productId
 * Check if product is liked
 */
router.get('/check/:productId', redisAuth, async (req, res) => {
  try {
    const { productId } = req.params;
    const liked = await isLiked(req.user._id, productId);
    
    res.status(200).json({
      success: true,
      isLiked: liked
    });
  } catch (error) {
    console.error('Error checking liked status:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking liked status'
    });
  }
});

module.exports = { router };
