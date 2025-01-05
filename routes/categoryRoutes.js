const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  categoryController,
  updateCategoryController,
  getCategoryController,
  singleCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const routes = express.Router();

//routes

//create category
routes.post("/create-category", requireSignIn, isAdmin, categoryController);
//update category
routes.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
//get all categories

routes.get("/getCategory", getCategoryController);

//get single category
routes.get("/singleCategory/:slug", singleCategoryController);

//delete category
routes.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
module.exports = { routes };
