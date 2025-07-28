import { Book } from "../types";
import "./ReadingListItem.css";
import StarRating from "./StarRating";
import { useState, useEffect } from "react";

interface ReadingListItemProps {
  book: Book; // The book item to display
  deleteBook: (id: string) => void; // Function to delete the book
  toggleRead: (id: string) => void; // Function to toggle the read status
  onRatingChange: (id: string, rating: number) => void; // Function to handle rating changes
}
function ReadingListItem({
  book,
  deleteBook,
  toggleRead,
  onRatingChange,
}: ReadingListItemProps) {
  const { read, dateAdded, dateCompleted } = book;

  const tooltipText = `Added: ${new Date(dateAdded).toLocaleString()}${
    read && dateCompleted
      ? `\nCompleted: ${new Date(dateCompleted).toLocaleString()}`
      : ""
  }`;
  function handleChange() {
    toggleRead(book.id);
  }

  let itemType = "reading-item";
  if (book.read) {
    itemType = "reading-item read";
  }

  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [reviewText, setReviewText] = useState("");

  // Load saved review from localStorage when component mounts
  useEffect(() => {
    const savedReview = localStorage.getItem(`bookReview_${book.id}`);
    if (savedReview) {
      setReviewText(savedReview);
    }
  }, [book.id]);

  // Save review to localStorage whenever it changes
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setReviewText(newText);
    localStorage.setItem(`bookReview_${book.id}`, newText);
  };

  const toggleReview = () => {
    setIsReviewExpanded(!isReviewExpanded);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the review
    console.log("Review submitted:", reviewText);
    // Optionally collapse after submit
    setIsReviewExpanded(false);
  };

  return (
    <div className={itemType} title={tooltipText}>
      <div className="book-content">
        <div className="book-checkbox">
          <input type="checkbox" checked={book.read} onChange={handleChange} />
        </div>
        {book.thumbnail && (
          <img
            src={book.thumbnail}
            alt={`Cover of ${book.title}`}
            className="book-thumbnail"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        )}
        <div className="book-details">
          <div className="book-header">
            <div className="book-info">
              <p className="book-title">{book.title}</p>
              {book.author && <p className="book-author">by {book.author}</p>}
            </div>
            <div className="action-container">
              <div className="rating-container">
                <StarRating
                  rating={book.rating || 0}
                  onRatingChange={(rating) => onRatingChange(book.id, rating)}
                />
                <button
                  className="review-btn"
                  onClick={toggleReview}
                  aria-expanded={isReviewExpanded}
                >
                  {isReviewExpanded ? "Hide" : "Review..."}
                </button>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteBook(book.id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>

      {isReviewExpanded && (
        <div className="review-section">
          <form onSubmit={handleReviewSubmit}>
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
      )}
    </div>
  );
}

export default ReadingListItem;
