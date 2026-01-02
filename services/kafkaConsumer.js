const { consumer, connectConsumer, getTopicName } = require('../config/kafka');
const { processPaymentEvent } = require('./paymentProcessor');

/**
 * Kafka Consumer Service - Consumes messages from Kafka topics
 */

let isRunning = false;

/**
 * Start payment event consumer
 */
const startPaymentConsumer = async () => {
  if (isRunning) {
    console.log('⚠️  Payment consumer already running');
    return;
  }

  try {
    await connectConsumer();
    
    const baseTopic = process.env.KAFKA_PAYMENT_TOPIC || 'payment-events';
    const topic = getTopicName(baseTopic); // Add prefix for CloudKarafka
    
    await consumer.subscribe({
      topic,
      fromBeginning: false
    });
    
    console.log(`✅ Subscribed to topic: ${topic}`);
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const paymentData = JSON.parse(message.value.toString());
          
          console.log(`📨 Received payment event:`, {
            topic,
            partition,
            offset: message.offset,
            key: message.key?.toString(),
            eventType: paymentData.eventType
          });
          
          // Process the payment event
          await processPaymentEvent(paymentData);
          
        } catch (error) {
          console.error('❌ Error processing payment message:', error);
          // In production, you might want to send to a dead letter queue
        }
      }
    });
    
    isRunning = true;
    console.log('✅ Payment consumer started successfully');
    
  } catch (error) {
    console.error('❌ Error starting payment consumer:', error);
    throw error;
  }
};

/**
 * Stop consumer
 */
const stopConsumer = async () => {
  if (isRunning) {
    await consumer.stop();
    await consumer.disconnect();
    isRunning = false;
    console.log('⏹️  Payment consumer stopped');
  }
};

module.exports = {
  startPaymentConsumer,
  stopConsumer
};
