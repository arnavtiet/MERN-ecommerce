// import  dotenv from dotenv
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./config/database.js");
const authRoute = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoutes.js");
const productRoute = require("./routes/productRoute.js");
const sessionRoute = require("./routes/sessionRoute.js");
const cartRoute = require("./routes/cartRoute.js");
const likedRoute = require("./routes/likedRoute.js");
const { testConnection: testCloudinary } = require("./config/cloudinary.js");
const { connectRabbitMQ } = require("./config/rabbitmq.js");
const { startPaymentConsumer } = require("./services/rabbitmqConsumer.js");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Database
connectDB();

// Test Cloudinary connection
testCloudinary();

// Connect to RabbitMQ and start consumer
connectRabbitMQ()
  .then(() => startPaymentConsumer())
  .catch(err => {
    console.error('Failed to start RabbitMQ:', err);
  });

// Routes
app.use("/api/v1/auth", authRoute.router);
app.use("/api/v1/category", categoryRoute.routes);
app.use("/api/v1/product", productRoute.routes);
app.use("/api/v1/session", sessionRoute.router);
app.use("/api/v1/cart", cartRoute.router);
app.use("/api/v1/liked", likedRoute.router);

// Health check
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send({ 
    message: "E-commerce API Server",
    status: "running",
    services: {
      database: "MongoDB",
      cache: "Redis",
      messageQueue: "RabbitMQ",
      imageStorage: "Cloudinary"
    }
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
