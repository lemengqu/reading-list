import { Book } from "../types";
import "./ReadingListItem.css";
import StarRating from "./StarRating";
import { useState } from "react";
import BookReview from "./BookReview";

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

  // display added and completion date on hover
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

  const toggleReview = () => {
    setIsReviewExpanded(!isReviewExpanded);
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

      <BookReview 
        bookId={book.id} 
        isExpanded={isReviewExpanded} 
        onClose={() => setIsReviewExpanded(false)} 
      />
    </div>
  );
}

export default ReadingListItem;
