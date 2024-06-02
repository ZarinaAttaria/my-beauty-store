
import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";

// Create Review
export const createReviewController = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    // Validate request
    if (!productId || !rating || !comment) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Create and save the review
    const review = new reviewModel({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).send({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating review",
      error,
    });
  }
};

// Get Reviews for a Product
export const getProductReviewsController = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Get the reviews
    const reviews = await reviewModel
      .find({ product: productId })
      .populate("user", "name email");

    res.status(200).send({
      success: true,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching reviews",
      error,
    });
  }
};

// Delete Review
export const deleteReviewController = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Check if the review exists
    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }

    // Check if the user is the author or an admin
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).send({ message: "Not authorized" });
    }

    await review.remove();

    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting review",
      error,
    });
  }
};
