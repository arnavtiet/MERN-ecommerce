const amqp = require('amqplib');
require('dotenv').config();

/**
 * RabbitMQ Configuration
 * Supports both local Docker and CloudAMQP
 */

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
const isCloud = RABBITMQ_URL.includes('cloudamqp.com');

let connection = null;
let channel = null;

/**
 * Connect to RabbitMQ
 */
const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    
    console.log(`✅ RabbitMQ connected to ${isCloud ? 'CloudAMQP (Cloud)' : 'Local Docker'}`);
    
    // Handle connection errors
    connection.on('error', (err) => {
      console.error('❌ RabbitMQ connection error:', err);
    });
    
    connection.on('close', () => {
      console.log('⚠️  RabbitMQ connection closed');
    });
    
    return { connection, channel };
  } catch (error) {
    console.error('❌ Failed to connect to RabbitMQ:', error.message);
    throw error;
  }
};

/**
 * Get or create channel
 */
const getChannel = async () => {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel;
};

/**
 * Close RabbitMQ connection
 */
const closeRabbitMQ = async () => {
  try {
    if (channel) {
      await channel.close();
      console.log('RabbitMQ channel closed');
    }
    if (connection) {
      await connection.close();
      console.log('RabbitMQ connection closed');
    }
  } catch (error) {
    console.error('Error closing RabbitMQ:', error);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeRabbitMQ();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeRabbitMQ();
  process.exit(0);
});

module.exports = {
  connectRabbitMQ,
  getChannel,
  closeRabbitMQ,
  RABBITMQ_URL
};
