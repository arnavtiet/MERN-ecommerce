const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.GO_URL);
    console.log(`database connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting database ${error}`);
  }
};

module.exports = connectDB();
