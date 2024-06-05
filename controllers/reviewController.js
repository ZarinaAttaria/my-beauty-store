import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';

// Create a review
export const createReviewController = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const user = req.user._id;

    const review = new Review({
      rating,
      comment,
      product: productId,
      user,
    });

    const savedReview = await review.save();

    // Update product ratings and numReviews
    const product = await Product.findById(productId);
    const reviews = await Review.find({ product: productId });

    product.numReviews = reviews.length;
    product.ratings = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    await product.save();

    res.status(201).json({ success: true, review: savedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get reviews for a product
export const getReviewsController = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
