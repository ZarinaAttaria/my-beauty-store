import express from "express";
import {
  createReviewController,
  getProductReviewsController,
  deleteReviewController,
} from "../controllers/reviewController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create review route
router.post("/create-review", requireSignIn, createReviewController);

// Get reviews for a product route
router.get("/get-reviews/:productId", getProductReviewsController);

// Delete review route
router.delete("/delete-review/:reviewId", requireSignIn, deleteReviewController);

export default router;
