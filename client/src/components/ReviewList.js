import React from 'react';
import "./reviewStyle.css"
const ReviewsList = ({ reviews }) => {
  return (
    <div className="reviews-list">
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review">
            <strong>{review.user.name}</strong>
            <div className="rating">Rating: {review.rating}</div>
            <p className="comment">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;
