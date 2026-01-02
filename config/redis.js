const Redis = require('ioredis');
require('dotenv').config();

// Detect if using Upstash (cloud) or local Redis
const isUpstash = process.env.REDIS_HOST?.includes('upstash.io');

// Create Redis client with support for both local and Upstash
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: process.env.REDIS_DB || 0,
  // Enable TLS for Upstash, disable for local
  tls: isUpstash ? {} : undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

// Event handlers
redisClient.on('connect', () => {
  console.log(`✅ Redis client connected to ${isUpstash ? 'Upstash (Cloud)' : 'Local Docker'}`);
});

redisClient.on('ready', () => {
  console.log('✅ Redis client ready');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis client error:', err);
});

redisClient.on('close', () => {
  console.log('⚠️  Redis client connection closed');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await redisClient.quit();
  console.log('Redis connection closed');
  process.exit(0);
});

module.exports = redisClient;
