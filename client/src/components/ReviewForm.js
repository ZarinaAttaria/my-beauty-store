import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./reviewStyle.css"

const ReviewForm = ({ productId, fetchReviews }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (value) => {
    setRating(value);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/review/create-review', {
        rating,
        comment,
        productId,
      });
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  return (
    <form onSubmit={submitReview} className="review-form">
      <h2 className='reviewheading'>Write a Review</h2>
      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={value <= rating ? "star selected" : "star"}
              onClick={() => handleStarClick(value)}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="comment-input"
        ></textarea>
      </div>
      <button type="submit" className="submit-button">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
