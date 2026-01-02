const { default: slugify } = require("slugify");
var braintree = require("braintree");
const prodModel = require("../models/product");
const categoryModel = require("../models/category");
const OrderModel = require("../models/order");
const dotenv = require("dotenv");
const { cloudinary } = require("../config/cloudinary");
const { publishPaymentEvent } = require("../services/rabbitmqProducer");
const fs = require("fs");

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

/**
 * Create Product with Cloudinary Upload
 */
const createProdController = async (req, res) => {
  try {
    const { name, description, slug, qty, shipped, category, price } = req.body;
    const image = req.file;

    // Validation
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
      case !image:
        return res.status(400).send({ error: "Image is required" });
    }

    // Upload image to Cloudinary
    let imageUrl = '';
    let imagePublicId = '';
    
    if (image) {
      try {
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'ecommerce/products',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        });
        
        imageUrl = result.secure_url;
        imagePublicId = result.public_id;
        
        // Delete local file after upload
        fs.unlinkSync(image.path);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).send({ error: "Image upload failed" });
      }
    }

    // Create product
    const product = new prodModel({
      name,
      description,
      slug: slugify(name),
      qty,
      shipped,
      category,
      price,
      imageUrl,
      imagePublicId
    });

    await product.save();
    
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unable to create product", success: false });
  }
};

/**
 * Get all products
 */
const getProdController = async (req, res) => {
  try {
    const products = await prodModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
      
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

/**
 * Get single product
 */
const getSingleProductController = async (req, res) => {
  try {
    const product = await prodModel
      .findOne({ slug: req.params.slug })
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

/**
 * Delete product (also delete from Cloudinary)
 */
const deleteProductController = async (req, res) => {
  try {
    const product = await prodModel.findById(req.params.pid);
    
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found"
      });
    }
    
    // Delete image from Cloudinary
    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
      }
    }
    
    await prodModel.findByIdAndDelete(req.params.pid);
    
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
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

/**
 * Update product with Cloudinary
 */
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, qty, shipped } = req.body;
    const image = req.file;

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
    }

    // Check if product exists
    const product = await prodModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Prepare update data
    const updateData = {
      name,
      description,
      price,
      category,
      qty,
      shipped,
      slug: slugify(name)
    };

    // Upload new image if provided
    if (image) {
      try {
        // Delete old image from Cloudinary
        if (product.imagePublicId) {
          await cloudinary.uploader.destroy(product.imagePublicId);
        }
        
        // Upload new image
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'ecommerce/products',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        });
        
        updateData.imageUrl = result.secure_url;
        updateData.imagePublicId = result.public_id;
        
        // Delete local file
        fs.unlinkSync(image.path);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).send({ error: "Image upload failed" });
      }
    }

    // Update product
    const updatedProduct = await prodModel.findByIdAndUpdate(
      req.params.pid,
      updateData,
      { new: true }
    );

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

/**
 * Filter products
 */
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
      message: "Error While Filtering Products",
      error,
    });
  }
};

/**
 * Generate Braintree token
 */
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

/**
 * Payment Controller with Kafka Integration
 * Publishes payment event to Kafka instead of directly creating order
 */
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
            // Publish payment event to Kafka instead of creating order directly
            const paymentEventData = {
              transactionId: result.transaction.id,
              cart: cart,
              payment: {
                success: true,
                transaction: result.transaction
              },
              buyer: req.user._id,
              timestamp: Date.now()
            };
            
            await publishPaymentEvent(paymentEventData);
            
            // Return immediate response
            res.status(200).json({
              success: true,
              message: "Payment initiated successfully. Order is being processed.",
              transactionId: result.transaction.id,
              transaction: result
            });
          } catch (kafkaError) {
            console.error("Error publishing to Kafka:", kafkaError);
            
            // Fallback: create order directly if Kafka fails
            const order = new OrderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
              transactionId: result.transaction.id
            });
            await order.save();
            
            res.status(200).json({
              message: "Payment successful, order created",
              transaction: result,
              order,
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
  getProdController,
  updateProductController,
  getSingleProductController,
  deleteProductController,
  productFiltersController,
  tokenGen,
  paymentController,
};
