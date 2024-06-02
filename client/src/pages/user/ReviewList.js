// src/components/ReviewsList.js
import React from 'react';

const ReviewsList = ({ reviews }) => {
  return (
    <div>
      <h4>Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review">
            <strong>{review.user.name}</strong>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;
