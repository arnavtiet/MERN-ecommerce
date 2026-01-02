const express = require("express");
const { redisAuth, isAdmin } = require("../middlewares/redisAuth");
const multer = require("multer");
const path = require("path");
const {
  createProdController,
  getProdController,
  updateProductController,
  getSingleProductController,
  deleteProductController,
  productFiltersController,
  paymentController,
  tokenGen,
} = require("../controllers/prodController");

const routes = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  }
});

// Product routes
routes.post(
  "/create-prod",
  redisAuth,
  isAdmin,
  upload.single('image'),
  createProdController
);

routes.put(
  "/update-prod/:pid",
  redisAuth,
  isAdmin,
  upload.single('image'),
  updateProductController
);

// Get products
routes.get("/get-product", getProdController);

// Single product
routes.get("/get-single-product/:slug", getSingleProductController);

// Delete product
routes.delete("/delete-product/:pid", redisAuth, isAdmin, deleteProductController);

// Filter products
routes.post("/prod-filter", productFiltersController);

// Payment routes
routes.get("/token", tokenGen);
routes.post("/payment", redisAuth, paymentController);

module.exports = { routes };
