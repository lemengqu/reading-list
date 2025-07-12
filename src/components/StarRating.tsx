import React from 'react';
import './StarRating.css';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (rating || 0) ? 'filled' : ''}`}
          onClick={() => onRatingChange(star)}
          onMouseEnter={(e) => {
            const stars = e.currentTarget.parentElement?.querySelectorAll('.star');
            stars?.forEach((s, i) => {
              if (i < star) {
                s.classList.add('hover');
              } else {
                s.classList.remove('hover');
              }
            });
          }}
          onMouseLeave={(e) => {
            const stars = e.currentTarget.parentElement?.querySelectorAll('.star');
            stars?.forEach(star => star.classList.remove('hover'));
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
