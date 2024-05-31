import ReviewModel from '../models/reviewModel.js';

// Add Review
export const addReviewController = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const review = new ReviewModel({ productId, userId: req.userId, rating, comment });
    await review.save();
    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add review', error });
  }
};

// Get Reviews
export const getReviewsController = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get reviews', error });
  }
};
