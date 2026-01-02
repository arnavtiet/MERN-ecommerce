const OrderModel = require('../models/order');
const { publishOrderEvent } = require('./rabbitmqProducer');
const { clearCart } = require('./cartService');

/**
 * Payment Processor - Handles payment event processing
 */

/**
 * Process payment event from Kafka
 * @param {object} paymentData - Payment event data
 */
const processPaymentEvent = async (paymentData) => {
  try {
    console.log('🔄 Processing payment event:', paymentData.eventType);
    
    const { cart, payment, buyer, transactionId } = paymentData;
    
    // Validate payment data
    if (!cart || !payment || !buyer) {
      throw new Error('Invalid payment data: missing required fields');
    }
    
    // Check if payment was successful
    if (payment.success) {
      // Create order in database
      const order = new OrderModel({
        products: cart,
        payment: payment,
        buyer: buyer,
        transactionId: transactionId,
        status: 'processing',
        createdAt: new Date()
      });
      
      await order.save();
      console.log('✅ Order created successfully:', order._id);
      
      // Clear user's cart after successful order
      await clearCart(buyer);
      console.log('✅ Cart cleared for user:', buyer);
      
      // Publish order created event
      await publishOrderEvent({
        orderId: order._id.toString(),
        eventType: 'ORDER_CREATED',
        buyer: buyer,
        products: cart,
        total: payment.transaction?.amount || 0,
        status: 'processing'
      });
      
      console.log('✅ Payment processed successfully');
      
    } else {
      console.log('⚠️  Payment failed, no order created');
      
      // Publish payment failed event
      await publishOrderEvent({
        eventType: 'PAYMENT_FAILED',
        buyer: buyer,
        transactionId: transactionId,
        reason: payment.message || 'Unknown error'
      });
    }
    
  } catch (error) {
    console.error('❌ Error processing payment event:', error);
    
    // Publish error event
    try {
      await publishOrderEvent({
        eventType: 'PAYMENT_PROCESSING_ERROR',
        error: error.message,
        paymentData: paymentData
      });
    } catch (publishError) {
      console.error('❌ Error publishing error event:', publishError);
    }
    
    throw error;
  }
};

/**
 * Handle payment success
 * @param {object} orderData - Order data
 */
const handlePaymentSuccess = async (orderData) => {
  // Additional success handling logic
  console.log('💰 Payment successful for order:', orderData.orderId);
  
  // Here you could:
  // - Send confirmation email
  // - Update inventory
  // - Trigger shipping workflow
  // - Send notifications
};

/**
 * Handle payment failure
 * @param {object} failureData - Failure data
 */
const handlePaymentFailure = async (failureData) => {
  // Additional failure handling logic
  console.log('❌ Payment failed:', failureData.reason);
  
  // Here you could:
  // - Send failure notification
  // - Log for analytics
  // - Retry logic
};

module.exports = {
  processPaymentEvent,
  handlePaymentSuccess,
  handlePaymentFailure
};
