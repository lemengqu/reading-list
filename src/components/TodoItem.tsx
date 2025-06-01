import React from "react";
import { Book } from "../types";
import "./TodoItem.css";

interface TodoItemProps {
  book: Book; // The book item to display
  deleteBook: (id: string) => void; // Function to delete the book
  toggleRead: (id: string) => void; // Function to toggle the read status
}
function TodoItem({ book, deleteBook, toggleRead }: TodoItemProps) {
  const { id, title, read, dateAdded, dateCompleted } = book;

  const tooltipText = `Added: ${new Date(dateAdded).toLocaleString()}${
    read && dateCompleted
      ? `\nCompleted: ${new Date(dateCompleted).toLocaleString()}`
      : ""
  }`;
  function handleChange() {
    toggleRead(book.id);
  }

  let itemType = "todo-item";
  if (book.read) {
    itemType = "todo-item read";
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
          {book.author && <p className="book-author">by {book.author}</p>}
        </div>
        <button className="delete-btn" onClick={() => deleteBook(book.id)}>
          X
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
