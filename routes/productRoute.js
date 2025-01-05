const express = require("express");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware");
const formidable = require("express-formidable");
const {
  createProdController,
  getProdController,
  productPhotoController,
  updateProductController,
  getSingleProductController,
  deleteProductController,
  productFiltersController,
  paymentTokenController,
  paymentController,
  tokenGen,
} = require("../controllers/prodController");

const routes = express.Router();

routes.post(
  "/create-prod",
  requireSignIn,
  isAdmin,
  formidable(),
  createProdController
);

routes.put(
  "/update-prod/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
routes.get("/get-product", getProdController);

// single product
routes.get("/get-single-product/:slug", getSingleProductController);

//get photo
routes.get("/prod-photo/:pid", productPhotoController);

//delete rproduct
routes.delete("/delete-product/:pid", deleteProductController);
// routes.get("/get-prod", requireSignIn, formidable(), getProdController);

routes.post("/prod-filter", productFiltersController);

//payment routes

//token
// routes.get("/token", paymentTokenController);

routes.get("/token", tokenGen);
//payment
routes.post("/payment", requireSignIn, paymentController);
module.exports = { routes };
