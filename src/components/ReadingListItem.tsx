import React from "react";
import { Book } from "../types";
import "./ReadingListItem.css";
import StarRating from "./StarRating";

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
  const { id, title, read, dateAdded, dateCompleted } = book;

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
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        )}
        <div className="book-details">
          <p className="book-title">{book.title}</p>
          <div className="book-meta">
            {book.author && <p className="book-author">by {book.author}</p>}
            <StarRating 
              rating={book.rating || 0} 
              onRatingChange={(rating) => onRatingChange(book.id, rating)} 
            />
          </div>
        </div>
        <button className="delete-btn" onClick={() => deleteBook(book.id)}>
          X
        </button>
      </div>
    </div>
  );
}

export default ReadingListItem;
