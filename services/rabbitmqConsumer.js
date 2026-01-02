const { getChannel } = require('../config/rabbitmq');
const { processPaymentEvent } = require('./paymentProcessor');

/**
 * RabbitMQ Consumer Service - Consumes messages from queues
 */

const PAYMENT_QUEUE = process.env.RABBITMQ_PAYMENT_QUEUE || 'payment-events';

let isConsuming = false;

/**
 * Start payment event consumer
 */
const startPaymentConsumer = async () => {
  if (isConsuming) {
    console.log('⚠️  Payment consumer already running');
    return;
  }

  try {
    const channel = await getChannel();
    
    // Ensure queue exists
    await channel.assertQueue(PAYMENT_QUEUE, {
      durable: true,
    });
    
    // Set prefetch to 1 - process one message at a time
    await channel.prefetch(1);
    
    console.log(`✅ Waiting for messages in queue: ${PAYMENT_QUEUE}`);
    
    // Start consuming
    await channel.consume(
      PAYMENT_QUEUE,
      async (msg) => {
        if (msg !== null) {
          try {
            const paymentData = JSON.parse(msg.content.toString());
            
            console.log(`📨 Received payment event:`, {
              queue: PAYMENT_QUEUE,
              eventType: paymentData.eventType
            });
            
            // Process the payment event
            await processPaymentEvent(paymentData);
            
            // Acknowledge message (remove from queue)
            channel.ack(msg);
            console.log('✅ Payment event processed and acknowledged');
            
          } catch (error) {
            console.error('❌ Error processing payment message:', error);
            
            // Reject and requeue the message (will retry)
            channel.nack(msg, false, true);
          }
        }
      },
      {
        noAck: false, // Manual acknowledgment
      }
    );
    
    isConsuming = true;
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
  if (isConsuming) {
    const channel = await getChannel();
    await channel.cancel(PAYMENT_QUEUE);
    isConsuming = false;
    console.log('⏹️  Payment consumer stopped');
  }
};

module.exports = {
  startPaymentConsumer,
  stopConsumer
};
