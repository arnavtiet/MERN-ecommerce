const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, lowercase: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    shipped: { type: Boolean, required: true },
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productModel", prodSchema);
