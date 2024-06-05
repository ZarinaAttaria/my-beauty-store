import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { createReviewController, getReviewsController } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/create-review', requireSignIn, createReviewController);
router.get('/product-reviews/:productId', getReviewsController);

export default router;
