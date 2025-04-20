import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  function addBook(title: string) {
    if (!title.trim()) return; // Prevent adding empty titles

    const newBook = {
      id: Date.now(),
      title,
      read: false,
    };
    setBooks([newBook, ...books]);
    setNewTitle("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      addBook(newTitle);
    }
  }

  function deleteBook(id: number) {
    setBooks(books.filter((book) => book.id !== id));
  }

  function toggleRead(id: number) {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          return { ...book, read: !book.read };
        } else {
          return book;
        }
      })
    );
  }

  return (
    <div className="todo-list">
      <div className="add-book-container">
        <input
          type="text"
          placeholder="Enter Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => addBook(newTitle)}>Add</button>
      </div>
      {books.map((book) => (
        <TodoItem
          key={book.id}
          book={book}
          deleteBook={deleteBook}
          toggleRead={toggleRead}
        />
      ))}
    </div>
  );
}

export default TodoList;
