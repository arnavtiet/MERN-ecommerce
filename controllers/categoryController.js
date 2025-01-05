const express = require("express");
const categoryModel = require("../models/category");
const slugify = require("slugify");
const app = express();

const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category already exists" });
    }
    const newCategory = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    return res.status(200).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successful",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in updating category" });
  }
};
const getCategoryController = async (req, res) => {
  try {
    const data = await categoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "fetching all category", data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in fetching category" });
  }
};

const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const catagory = await categoryModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "single category",
      catagory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error getting single catagory",
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: "category deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in deleting category" });
  }
};

module.exports = {
  categoryController,
  updateCategoryController,
  getCategoryController,
  singleCategoryController,
  deleteCategoryController,
};
