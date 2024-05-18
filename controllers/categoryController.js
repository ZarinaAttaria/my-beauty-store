import slugify from "slugify";
import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";

// Create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating category",
    });
  }
};

// Update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid category ID format" });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating category",
    });
  }
};


// get all category
export const categoryController = async (req, res) => {
    try {
      
      const category = await categoryModel.find({});
  
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };

  // single category
export const singleCategoryController = async (req, res) => {
    
    try {
      const {slug}=req.params
      const category = await categoryModel.findOne({slug:req.params.slug});
  
      res.status(200).send({
        success: true,
        message: "Get Single Category Success",
        category
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting single category",
      });
    }
  };

  // delete category
export const deleteCategoryController = async (req, res) => {
    
    try {
        const {id}=req.params
    await categoryModel.findByIdAndDelete(id);
  
      res.status(200).send({
        success: true,
        message: "Category deleted Successfully",
    
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while deleting category",
      });
    }
  };
