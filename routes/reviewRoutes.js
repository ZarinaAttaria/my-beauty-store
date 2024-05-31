import express from 'express';
import { addReviewController, getReviewsController } from '../controllers/reviewController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-review', requireSignIn, addReviewController)
router.post('/get-review',  getReviewsController)


