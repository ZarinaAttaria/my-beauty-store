// src/components/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReviewForm = ({ onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post(`http://localhost:8080/api/v1/review/create-review`, {
            productId: params.productId,
            rating,
            comment,
          });
      onReviewAdded(data.review);
      setRating(0);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add a Review</h4>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
