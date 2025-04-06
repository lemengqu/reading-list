import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    console.log("useEffect: saving books", JSON.stringify(books));
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  function addBook(title: string) {
    const newBook = {
      id: Date.now(),
      title,
      read: false,
    };
    setBooks([...books, newBook]);
    setNewTitle("");
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
      {books.map((book) => (
        <TodoItem
          key={book.id}
          book={book}
          deleteBook={deleteBook}
          toggleRead={toggleRead}
        />
      ))}
      <input
        placeholder="Enter Title..."
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button onClick={() => addBook(newTitle)}>Add</button>
    </div>
  );
}

export default TodoList;
