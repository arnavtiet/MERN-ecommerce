const { getChannel } = require('../config/rabbitmq');

/**
 * RabbitMQ Producer Service - Publishes messages to queues
 */

const PAYMENT_QUEUE = process.env.RABBITMQ_PAYMENT_QUEUE || 'payment-events';
const ORDER_QUEUE = process.env.RABBITMQ_ORDER_QUEUE || 'order-events';

/**
 * Publish payment event to RabbitMQ
 * @param {object} paymentData - Payment event data
 * @returns {Promise<boolean>}
 */
const publishPaymentEvent = async (paymentData) => {
  try {
    const channel = await getChannel();
    
    // Ensure queue exists
    await channel.assertQueue(PAYMENT_QUEUE, {
      durable: true, // Survive RabbitMQ restart
    });
    
    const message = {
      ...paymentData,
      timestamp: Date.now(),
      eventType: 'PAYMENT_INITIATED'
    };
    
    // Publish message
    const sent = channel.sendToQueue(
      PAYMENT_QUEUE,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true, // Survive RabbitMQ restart
        contentType: 'application/json'
      }
    );
    
    if (sent) {
      console.log('✅ Payment event published to queue:', PAYMENT_QUEUE);
      return true;
    } else {
      console.warn('⚠️  Payment event buffered (queue full)');
      return false;
    }
  } catch (error) {
    console.error('❌ Error publishing payment event:', error);
    throw error;
  }
};

/**
 * Publish order event to RabbitMQ
 * @param {object} orderData - Order event data
 * @returns {Promise<boolean>}
 */
const publishOrderEvent = async (orderData) => {
  try {
    const channel = await getChannel();
    
    // Ensure queue exists
    await channel.assertQueue(ORDER_QUEUE, {
      durable: true,
    });
    
    const message = {
      ...orderData,
      timestamp: Date.now()
    };
    
    // Publish message
    const sent = channel.sendToQueue(
      ORDER_QUEUE,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
        contentType: 'application/json'
      }
    );
    
    if (sent) {
      console.log('✅ Order event published to queue:', ORDER_QUEUE);
      return true;
    } else {
      console.warn('⚠️  Order event buffered (queue full)');
      return false;
    }
  } catch (error) {
    console.error('❌ Error publishing order event:', error);
    throw error;
  }
};

module.exports = {
  publishPaymentEvent,
  publishOrderEvent
};
