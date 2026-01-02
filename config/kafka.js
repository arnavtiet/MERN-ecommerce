const { Kafka } = require('kafkajs');
require('dotenv').config();

// Detect cloud provider based on environment variables
const hasCloudKarafka = process.env.KAFKA_USERNAME && process.env.KAFKA_PASSWORD;
const topicPrefix = process.env.KAFKA_TOPIC_PREFIX || '';

// Create Kafka client with support for both local and cloud
const kafkaConfig = {
  clientId: process.env.KAFKA_CLIENT_ID || 'ecommerce-app',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
};

// Add SASL authentication for CloudKarafka or Confluent Cloud
if (hasCloudKarafka) {
  kafkaConfig.ssl = true;
  kafkaConfig.sasl = {
    mechanism: 'scram-sha-256', // CloudKarafka uses SCRAM-SHA-256
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  };
  console.log('🔐 Kafka configured for Cloud (CloudKarafka/Confluent) with SASL authentication');
} else {
  console.log('🏠 Kafka configured for Local Docker');
}

const kafka = new Kafka(kafkaConfig);

// Create producer
const producer = kafka.producer({
  allowAutoTopicCreation: false, // CloudKarafka requires manual topic creation
  transactionTimeout: 30000
});

// Create consumer
const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || 'payment-processor-group',
  sessionTimeout: 30000,
  heartbeatInterval: 3000
});

// Helper function to add topic prefix (for CloudKarafka)
const getTopicName = (baseTopic) => {
  return topicPrefix ? `${topicPrefix}${baseTopic}` : baseTopic;
};

// Producer connection
let producerConnected = false;

const connectProducer = async () => {
  try {
    await producer.connect();
    producerConnected = true;
    console.log(`✅ Kafka producer connected to ${hasCloudKarafka ? 'Cloud' : 'Local Docker'}`);
  } catch (error) {
    console.error('❌ Kafka producer connection failed:', error.message);
    throw error;
  }
};

// Consumer connection
let consumerConnected = false;

const connectConsumer = async () => {
  try {
    await consumer.connect();
    consumerConnected = true;
    console.log(`✅ Kafka consumer connected to ${hasCloudKarafka ? 'Cloud' : 'Local Docker'}`);
  } catch (error) {
    console.error('❌ Kafka consumer connection failed:', error.message);
    throw error;
  }
};

// Graceful shutdown
const disconnectKafka = async () => {
  try {
    if (producerConnected) {
      await producer.disconnect();
      console.log('Kafka producer disconnected');
    }
    if (consumerConnected) {
      await consumer.disconnect();
      console.log('Kafka consumer disconnected');
    }
  } catch (error) {
    console.error('Error disconnecting Kafka:', error);
  }
};

process.on('SIGINT', async () => {
  await disconnectKafka();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectKafka();
  process.exit(0);
});

module.exports = {
  kafka,
  producer,
  consumer,
  connectProducer,
  connectConsumer,
  disconnectKafka,
  getTopicName // Export helper for topic prefix
};
