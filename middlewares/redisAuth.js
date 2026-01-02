const { getSession } = require('../services/sessionService');

/**
 * Redis-based authentication middleware
 * Replaces JWT authentication with Redis session validation
 */

const redisAuth = async (req, res, next) => {
  try {
    // Get session ID from Authorization header or cookie
    const sessionId = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.sessionId;
    
    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: 'No session found. Please login.'
      });
    }
    
    // Get session from Redis
    const session = await getSession(sessionId);
    
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session. Please login again.'
      });
    }
    
    // Attach user data to request
    req.user = session.user;
    req.sessionId = sessionId;
    
    next();
  } catch (error) {
    console.error('Redis auth error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

/**
 * Admin role check middleware
 * Must be used after redisAuth middleware
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
  
  if (req.user.role !== 1) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  
  next();
};

module.exports = { redisAuth, isAdmin };
