# Quick Setup Guide: Redis & Kafka (Updated 2024)

## ⚠️ Important Update
**Upstash Kafka has been deprecated.** This guide now uses **CloudKarafka** (free forever) and **Upstash Redis** (still active).

---

## For Development: Use Docker (Recommended)

### Quick Start
```bash
# 1. Start Redis and Kafka locally
docker-compose up -d

# 2. Copy environment file
cp .env.example .env

# 3. Start backend
npm install
npm run server

# 4. Start frontend
cd client
npm install
npm run dev
```

Your `.env` is already configured for local Docker - just add MongoDB, Cloudinary, and Braintree credentials!

---

## For Deployment: Free Cloud Services

### 1️⃣ Redis - Upstash (Free Forever)

**Sign Up:**
1. Go to https://upstash.com
2. Sign up with GitHub/Google (no credit card)
3. Click "Create Database"

**Configure:**
- Name: `ecommerce-redis`
- Type: Regional (free)
- Region: Choose closest to you

**Get Credentials:**
After creation, copy:
- **Endpoint**: `redis-12345.upstash.io`
- **Port**: `6379`
- **Token/Password**: `AaBbCcDd...`

**Update .env:**
```env
REDIS_HOST=redis-12345.upstash.io
REDIS_PORT=6379
REDIS_PASSWORD=AaBbCcDd...  # ← Use the token here
```

---

### 2️⃣ Kafka - CloudKarafka (Free Forever)

**Sign Up:**
1. Go to https://www.cloudkarafka.com
2. Click "Sign Up" (no credit card required)
3. Choose **"Developer Duck"** plan (FREE)

**Create Instance:**
1. Click "Create New Instance"
2. Name: `ecommerce-kafka`
3. Plan: **Developer Duck** (free)
4. Region: Choose closest to you
5. Click "Create Instance"

**Get Credentials:**
Go to instance details page, copy:
- **Brokers**: `dory-01.srvs.cloudkafka.com:9094`
- **Username**: `abc12345`
- **Password**: `xyz67890`
- **Prefix**: `abc12345-` (important!)

**Create Topics:**
1. Go to "Topics" tab
2. Create topic: `abc12345-payment-events` (with your prefix!)
3. Create topic: `abc12345-order-events`

**Update .env:**
```env
KAFKA_BROKERS=dory-01.srvs.cloudkafka.com:9094
KAFKA_USERNAME=abc12345
KAFKA_PASSWORD=xyz67890
KAFKA_TOPIC_PREFIX=abc12345-
KAFKA_CLIENT_ID=ecommerce-app
KAFKA_PAYMENT_TOPIC=payment-events
KAFKA_ORDER_TOPIC=order-events
KAFKA_GROUP_ID=payment-processor-group
```

---

## Alternative: Confluent Cloud (Best for Production)

If you need more than the free tier later:

**Sign Up:**
1. Go to https://confluent.cloud
2. Sign up (requires credit card, but you get $400 free credits)
3. Create cluster (choose Basic tier)

**Get Credentials:**
- **Bootstrap Server**: `pkc-xxx.us-east-1.aws.confluent.cloud:9092`
- **API Key**: Your username
- **API Secret**: Your password

**Update .env:**
```env
KAFKA_BROKERS=pkc-xxx.us-east-1.aws.confluent.cloud:9092
KAFKA_USERNAME=your_api_key
KAFKA_PASSWORD=your_api_secret
KAFKA_CLIENT_ID=ecommerce-app
KAFKA_PAYMENT_TOPIC=payment-events
KAFKA_ORDER_TOPIC=order-events
KAFKA_GROUP_ID=payment-processor-group
```

---

## Comparison Table

| Service | Free Tier | Credit Card? | Best For |
|---------|-----------|--------------|----------|
| **Docker** | Unlimited | No | Development |
| **Upstash Redis** | 10K commands/day | No | Production |
| **CloudKarafka** | 5 topics, 10MB | No | Small apps |
| **Confluent Cloud** | $400 credits | Yes | Production |
| **Railway** | $5/month | No | Hobby projects |

---

## My Recommendation

### For You (Free Options Only):

1. **Development**: Use Docker
   ```bash
   docker-compose up -d
   ```

2. **Deployment**: 
   - **Redis**: Upstash (free forever)
   - **Kafka**: CloudKarafka (free forever)

This combination gives you:
- ✅ No credit card required
- ✅ Free forever
- ✅ Production-ready
- ✅ Supports ~100 users/day

---

## Quick Setup Commands

### Local Development
```bash
# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Cloud Deployment
```bash
# 1. Sign up for Upstash Redis
# 2. Sign up for CloudKarafka
# 3. Update .env with credentials
# 4. Deploy your app!
```

---

## Need Help?

- **CloudKarafka Docs**: https://www.cloudkarafka.com/docs/index.html
- **Upstash Docs**: https://docs.upstash.com/redis
- **Issues?** Check the troubleshooting section in the main walkthrough

---

## Summary

✅ **Redis**: Upstash (still the best free option)  
✅ **Kafka**: CloudKarafka (free replacement for deprecated Upstash Kafka)  
✅ **Development**: Docker (already configured)  
✅ **No credit card needed!**
