# RabbitMQ Setup Guide (Free CloudAMQP)

## Why RabbitMQ Instead of Kafka?

✅ **Simpler** - Easier to understand and use  
✅ **Perfect for queues** - Built for job processing  
✅ **Free tier** - 1 million messages/month  
✅ **No credit card** - CloudAMQP free plan  
✅ **Better for payments** - Reliable message delivery  

---

## CloudAMQP Free Tier

- **1 million messages/month** FREE
- **20 connections**
- **No credit card required**
- **Perfect for development and small production**

---

## Setup CloudAMQP (5 Minutes)

### Step 1: Create Account

1. Go to https://www.cloudamqp.com
2. Click **"Sign Up"**
3. Sign up with email or GitHub (no credit card needed)

### Step 2: Create Instance

1. Click **"Create New Instance"**
2. Fill in:
   - **Name**: `ecommerce-rabbitmq`
   - **Plan**: **Little Lemur** (FREE)
   - **Region**: Choose closest to you
   - **Tags**: (optional)
3. Click **"Create Instance"**

### Step 3: Get Connection URL

1. Click on your instance name
2. Copy the **AMQP URL**:
   ```
   amqps://username:password@host.cloudamqp.com/vhost
   ```

### Step 4: Update .env

```env
# RabbitMQ Configuration (CloudAMQP)
RABBITMQ_URL=amqps://username:password@host.cloudamqp.com/vhost
RABBITMQ_PAYMENT_QUEUE=payment-events
RABBITMQ_ORDER_QUEUE=order-events
```

That's it! No topic creation needed - RabbitMQ auto-creates queues.

---

## Local Development (Docker)

For local development, use Docker:

```bash
# Already in your docker-compose.yml
docker-compose up -d rabbitmq
```

Access RabbitMQ Management UI:
- URL: http://localhost:15672
- Username: `guest`
- Password: `guest`

---

## Environment Variables

### Local (Docker)
```env
RABBITMQ_URL=amqp://guest:guest@localhost:5672
RABBITMQ_PAYMENT_QUEUE=payment-events
RABBITMQ_ORDER_QUEUE=order-events
```

### Cloud (CloudAMQP)
```env
RABBITMQ_URL=amqps://username:password@host.cloudamqp.com/vhost
RABBITMQ_PAYMENT_QUEUE=payment-events
RABBITMQ_ORDER_QUEUE=order-events
```

The code automatically detects local vs cloud!

---

## Monitoring

### CloudAMQP Dashboard
- View messages in queues
- Monitor connections
- Check message rates
- See error logs

### Local RabbitMQ UI
- http://localhost:15672
- Real-time queue monitoring
- Message browsing

---

## Free Tier Limits

| Feature | Free Tier |
|---------|-----------|
| Messages/month | 1,000,000 |
| Connections | 20 |
| Queues | Unlimited |
| Message size | 128 MB |
| Retention | 28 days |

**Is 1M/month enough?**
- ~33,000 messages/day
- ~1,400 messages/hour
- Perfect for small-medium apps!

---

## Comparison: Kafka vs RabbitMQ

| Feature | Kafka | RabbitMQ |
|---------|-------|----------|
| **Complexity** | High | Low |
| **Setup** | Complex | Simple |
| **Free Tier** | 10MB | 1M msgs/month |
| **Best For** | Event streaming | Job queues |
| **Learning Curve** | Steep | Gentle |
| **Your Use Case** | Overkill | Perfect ✅ |

---

## Quick Start

### 1. Start Local RabbitMQ
```bash
docker-compose up -d rabbitmq
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Backend
```bash
npm run server
```

You should see:
```
✅ RabbitMQ connected to Local Docker
✅ Payment queue ready
✅ Order queue ready
```

### 4. Deploy to Cloud
1. Sign up for CloudAMQP
2. Create instance
3. Update `.env` with AMQP URL
4. Deploy!

---

## Troubleshooting

### Connection Failed
- Check RABBITMQ_URL format
- Verify firewall allows port 5672 (AMQP)
- For CloudAMQP, use `amqps://` (with 's')

### Messages Not Processing
- Check RabbitMQ dashboard
- Verify queue names match
- Check consumer is running

---

## Summary

✅ **Simpler than Kafka**  
✅ **Free forever** (1M msgs/month)  
✅ **No credit card needed**  
✅ **Perfect for payments**  
✅ **Easy monitoring**  

RabbitMQ is the right choice for your payment queue! 🚀
