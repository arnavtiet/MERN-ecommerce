const redisClient = require('../config/redis');

/**
 * Session Service - Manages user sessions in Redis
 */

const SESSION_PREFIX = 'session:';
const SESSION_TTL = parseInt(process.env.REDIS_SESSION_TTL) || 604800; // 7 days default

/**
 * Create a new session
 * @param {string} sessionId - Unique session identifier
 * @param {object} userData - User data to store in session
 * @returns {Promise<boolean>}
 */
const createSession = async (sessionId, userData) => {
  try {
    const key = `${SESSION_PREFIX}${sessionId}`;
    const sessionData = {
      user: userData,
      createdAt: Date.now(),
      lastAccessed: Date.now()
    };
    
    await redisClient.setex(key, SESSION_TTL, JSON.stringify(sessionData));
    return true;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

/**
 * Get session data
 * @param {string} sessionId - Session identifier
 * @returns {Promise<object|null>}
 */
const getSession = async (sessionId) => {
  try {
    const key = `${SESSION_PREFIX}${sessionId}`;
    const data = await redisClient.get(key);
    
    if (!data) return null;
    
    const sessionData = JSON.parse(data);
    
    // Update last accessed time
    sessionData.lastAccessed = Date.now();
    await redisClient.setex(key, SESSION_TTL, JSON.stringify(sessionData));
    
    return sessionData;
  } catch (error) {
    console.error('Error getting session:', error);
    throw error;
  }
};

/**
 * Update session data
 * @param {string} sessionId - Session identifier
 * @param {object} updates - Data to update
 * @returns {Promise<boolean>}
 */
const updateSession = async (sessionId, updates) => {
  try {
    const key = `${SESSION_PREFIX}${sessionId}`;
    const existingData = await getSession(sessionId);
    
    if (!existingData) return false;
    
    const updatedData = {
      ...existingData,
      user: { ...existingData.user, ...updates },
      lastAccessed: Date.now()
    };
    
    await redisClient.setex(key, SESSION_TTL, JSON.stringify(updatedData));
    return true;
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
};

/**
 * Delete session
 * @param {string} sessionId - Session identifier
 * @returns {Promise<boolean>}
 */
const deleteSession = async (sessionId) => {
  try {
    const key = `${SESSION_PREFIX}${sessionId}`;
    const result = await redisClient.del(key);
    return result > 0;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
};

/**
 * Refresh session TTL
 * @param {string} sessionId - Session identifier
 * @returns {Promise<boolean>}
 */
const refreshSession = async (sessionId) => {
  try {
    const key = `${SESSION_PREFIX}${sessionId}`;
    const result = await redisClient.expire(key, SESSION_TTL);
    return result === 1;
  } catch (error) {
    console.error('Error refreshing session:', error);
    throw error;
  }
};

module.exports = {
  createSession,
  getSession,
  updateSession,
  deleteSession,
  refreshSession
};
