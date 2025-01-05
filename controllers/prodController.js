const { default: slugify } = require("slugify");
var braintree = require("braintree");
const prodModel = require("../models/product");
const fs = require("fs");
const categoryModel = require("../models/category");
const OrderModel = require("../models/order");
const dotenv = require("dotenv");
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProdController = async (req, res) => {
  try {
    const { name, description, slug, qty, shipped, category, price } =
      req.fields;
    const { image } = req.files;
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !qty:
        return res.status(400).send({ error: "Quantity is required" });
      case !shipped:
        return res.status(400).send({ error: "Shipped is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !image && image.size > 1000000:
        return res
          .status(400)
          .send({ error: "Image is required and should be less than 1MB" });
    }
    const product = new prodModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    res
      .status(201)
      .send({ success: true, message: "product created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "unable to create ", success: false });
  }
};
const getProdController = async (req, res) => {
  try {
    const products = await prodModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
const getSingleProductController = async (req, res) => {
  try {
    const product = await prodModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await prodModel.findById(req.params.pid).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
const deleteProductController = async (req, res) => {
  try {
    await prodModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product 2.0
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, qty, shipped } = req.fields;
    const { image } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !qty:
        return res.status(400).send({ error: "Quantity is Required" });
      case image && image.size > 1000000:
        return res.status(400).send({ error: "Image should be less than 1MB" });
    }

    // Check if product exists
    const product = await prodModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Update product fields
    const updatedProduct = await prodModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    // Update image if provided
    if (image) {
      try {
        updatedProduct.image.data = fs.readFileSync(image.path);
        updatedProduct.image.contentType = image.type;
      } catch (err) {
        return res.status(500).send({ error: "Error processing image file" });
      }
    }

    await updatedProduct.save();

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in updating product",
    });
  }
};

// filters product controller
const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await prodModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

//payment controller

//token generator
// const paymentTokenController = async (req, res) => {
//   try {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
const tokenGen = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        console.error("Error generating client token:", err);
        return res
          .status(500)
          .json({ message: "Failed to generate client token" });
      }
      res.status(200).json(response);
    });
  } catch (error) {
    console.error("Unexpected error in token generation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//payment
// const paymentController = async (req, res) => {
//   try {
//     const { nonce, cart } = req.body;
//     let total = 0;
//     cart.map((i) => {
//       total += i.price;
//     });
//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: total,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           const order = new OrderModel({
//             products: cart,
//             payment: result,
//             buyer: req.user._id,
//           }).save();
//           res.json(result);
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

const paymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;

    // Validate request body
    if (!nonce || !cart || !Array.isArray(cart) || cart.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid payment details or cart data" });
    }

    // Calculate the total amount
    const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

    // Create the Braintree transaction
    gateway.transaction.sale(
      {
        amount: total.toFixed(2),
        paymentMethodNonce: nonce,
        options: { submitForSettlement: true },
      },
      async (error, result) => {
        if (error) {
          console.error("Transaction error:", error);
          return res
            .status(500)
            .json({ message: "Payment processing failed, please try again" });
        }

        if (result && result.success) {
          try {
            // Create a new order
            const order = new OrderModel({
              products: cart,
              payment: result,
              buyer: req.user._id, // Assuming `req.user` is populated via authentication middleware
            });

            await order.save(); // Save the order to the database

            res.status(200).json({
              message: "Payment successful, order created",
              transaction: result,
              order,
            });
          } catch (saveError) {
            console.error("Error saving order:", saveError);
            res.status(500).json({
              message: "Transaction succeeded, but failed to save order",
            });
          }
        } else {
          console.error("Transaction result error:", result);
          res
            .status(500)
            .json({ message: result.message || "Payment processing error" });
        }
      }
    );
  } catch (error) {
    console.error("Unexpected error in payment processing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProdController,
  productPhotoController,
  getProdController,
  updateProductController,
  getSingleProductController,
  deleteProductController,
  productFiltersController,
  tokenGen,
  paymentController,
};
