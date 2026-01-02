const { producer, connectProducer, getTopicName } = require('../config/kafka');

/**
 * Kafka Producer Service - Publishes messages to Kafka topics
 */

let isConnected = false;

/**
 * Initialize producer connection
 */
const initProducer = async () => {
  if (!isConnected) {
    await connectProducer();
    isConnected = true;
  }
};

/**
 * Publish payment event to Kafka
 * @param {object} paymentData - Payment event data
 * @returns {Promise<object>}
 */
const publishPaymentEvent = async (paymentData) => {
  try {
    await initProducer();
    
    const baseTopic = process.env.KAFKA_PAYMENT_TOPIC || 'payment-events';
    const topic = getTopicName(baseTopic); // Add prefix for CloudKarafka
    const message = {
      key: paymentData.transactionId || Date.now().toString(),
      value: JSON.stringify({
        ...paymentData,
        timestamp: Date.now(),
        eventType: 'PAYMENT_INITIATED'
      }),
      headers: {
        'event-type': 'payment',
        'version': '1.0'
      }
    };
    
    const result = await producer.send({
      topic,
      messages: [message]
    });
    
    console.log('✅ Payment event published:', result);
    return result;
  } catch (error) {
    console.error('❌ Error publishing payment event:', error);
    throw error;
  }
};

/**
 * Publish order event to Kafka
 * @param {object} orderData - Order event data
 * @returns {Promise<object>}
 */
const publishOrderEvent = async (orderData) => {
  try {
    await initProducer();
    
    const baseTopic = process.env.KAFKA_ORDER_TOPIC || 'order-events';
    const topic = getTopicName(baseTopic); // Add prefix for CloudKarafka
    const message = {
      key: orderData.orderId || Date.now().toString(),
      value: JSON.stringify({
        ...orderData,
        timestamp: Date.now()
      }),
      headers: {
        'event-type': 'order',
        'version': '1.0'
      }
    };
    
    const result = await producer.send({
      topic,
      messages: [message]
    });
    
    console.log('✅ Order event published:', result);
    return result;
  } catch (error) {
    console.error('❌ Error publishing order event:', error);
    throw error;
  }
};

/**
 * Publish generic event to Kafka
 * @param {string} topic - Topic name
 * @param {object} data - Event data
 * @returns {Promise<object>}
 */
const publishEvent = async (topic, data) => {
  try {
    await initProducer();
    
    const message = {
      key: data.id || Date.now().toString(),
      value: JSON.stringify({
        ...data,
        timestamp: Date.now()
      })
    };
    
    const result = await producer.send({
      topic,
      messages: [message]
    });
    
    console.log(`✅ Event published to ${topic}:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Error publishing event to ${topic}:`, error);
    throw error;
  }
};

module.exports = {
  initProducer,
  publishPaymentEvent,
  publishOrderEvent,
  publishEvent
};
