const express = require('express');
const { redisAuth } = require('../middlewares/redisAuth');
const { getSession, refreshSession, deleteSession } = require('../services/sessionService');

const router = express.Router();

/**
 * GET /api/v1/session
 * Get current session data
 */
router.get('/', redisAuth, async (req, res) => {
  try {
    const session = await getSession(req.sessionId);
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }
    
    res.status(200).json({
      success: true,
      session: {
        user: session.user,
        createdAt: session.createdAt,
        lastAccessed: session.lastAccessed
      }
    });
  } catch (error) {
    console.error('Error getting session:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving session'
    });
  }
});

/**
 * POST /api/v1/session/refresh
 * Refresh session TTL
 */
router.post('/refresh', redisAuth, async (req, res) => {
  try {
    const refreshed = await refreshSession(req.sessionId);
    
    if (!refreshed) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Session refreshed successfully'
    });
  } catch (error) {
    console.error('Error refreshing session:', error);
    res.status(500).json({
      success: false,
      message: 'Error refreshing session'
    });
  }
});

/**
 * DELETE /api/v1/session/logout
 * Logout and delete session
 */
router.delete('/logout', redisAuth, async (req, res) => {
  try {
    await deleteSession(req.sessionId);
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging out'
    });
  }
});

module.exports = { router };
