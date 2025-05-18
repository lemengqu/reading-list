import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Book, GoogleBook } from "../types";
import "./TodoList.css";

function TodoList() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [newTitle, setNewTitle] = useState<string>("");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  async function searchBooks(query: string) {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=10`
      );
      const data = await response.json();
      setSearchResults(data.items || []);
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResults([]);
    }
  }

  function addBookFromAPI(book: GoogleBook) {
    const newBook: Book = {
      id: Date.now(),
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.[0], // Take the first author if available
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      read: false,
      dateAdded: new Date().toISOString(),
      dateCompleted: null,
    };
    console.log(newBook, "newBook");
    setBooks([newBook, ...books]);
    setNewTitle("");
    setSearchResults([]);
    setShowDropdown(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNewTitle(value);
    setShowDropdown(true);
    searchBooks(value);
  }

  function handleKeyPress(e: { key: string }) {
    if (e.key === "Enter") {
      setShowDropdown(true);
      searchBooks(newTitle);
    }
  }

  function deleteBook(id: number) {
    setBooks(books.filter((book: Book) => book.id !== id));
  }

  function toggleRead(id: number) {
    setBooks(
      books.map((book: Book) =>
        book.id === id
          ? {
              ...book,
              read: !book.read,
              dateCompleted: !book.read ? new Date().toISOString() : null,
            }
          : book
      )
    );
  }

  return (
    <div className="todo-list">
      <div className="text-box-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a book..."
            value={newTitle}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          {showDropdown && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((book) => (
                <div
                  key={book.id}
                  className="search-result"
                  onClick={() => addBookFromAPI(book)}
                >
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || ""}
                    alt={book.volumeInfo.title}
                    className="book-cover"
                  />
                  <div className="book-info">
                    <h3>{book.volumeInfo.title}</h3>
                    {book.volumeInfo.authors && (
                      <p className="book-authors">
                        {book.volumeInfo.authors.join(", ")}
                      </p>
                    )}
                    {book.volumeInfo.description && (
                      <p className="book-description">
                        {book.volumeInfo.description.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {books
        .filter((book: Book) =>
          book.title.toLowerCase().startsWith(searchTitle.toLowerCase())
        )
        .map((book: Book) => (
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
