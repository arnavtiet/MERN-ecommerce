import mongoose from "mongoose";

const product = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
});
