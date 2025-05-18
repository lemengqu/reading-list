import React from "react";
import { Book } from "../types";

interface TodoItemProps {
  book: Book; // The book item to display
  deleteBook: (id: number) => void; // Function to delete the book
  toggleRead: (id: number) => void; // Function to toggle the read status
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
      <input type="checkbox" checked={book.read} onChange={handleChange} />
      <p>{book.title}</p>
      <button className="delete-btn" onClick={() => deleteBook(book.id)}>
        X
      </button>
    </div>
  );
}

export default TodoItem;
