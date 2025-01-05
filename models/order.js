const mongoose = require("mongoose");
// import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "productModel",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "Not process",
      enum: ["Not process", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderModel", orderSchema);
