import React, { useState, useEffect } from 'react';

interface BookReviewProps {
  bookId: string;
  isExpanded: boolean;
  onClose: () => void;
}

const BookReview: React.FC<BookReviewProps> = ({ bookId, isExpanded, onClose }) => {
  const [reviewText, setReviewText] = useState("");

  // Load saved review from localStorage when component mounts
  useEffect(() => {
    const savedReview = localStorage.getItem(`bookReview_${bookId}`);
    if (savedReview) {
      setReviewText(savedReview);
    }
  }, [bookId]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setReviewText(newText);
    localStorage.setItem(`bookReview_${bookId}`, newText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  if (!isExpanded) return null;

  return (
    <div className="review-section">
      <form onSubmit={handleSubmit}>
        <textarea
          className="review-textarea"
          value={reviewText}
          onChange={handleReviewChange}
          placeholder="Share your thoughts about this book..."
          rows={3}
        />
        <div className="review-actions">
          <button type="submit" className="submit-review">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookReview;
