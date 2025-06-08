import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Book, GoogleBook } from "../types";
import "./TodoList.css";

function TodoList() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
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
        )}&maxResults=10&projection=full`
      );
      const data = await response.json();
      console.log(data);
      const savedBookIds = new Set(books.map((book: Book) => book.id));
      const filteredResults = (data.items || []).filter(
        (book: GoogleBook) => !savedBookIds.has(book.id)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResults([]);
    }
  }

  function addBookFromAPI(book: GoogleBook) {
    console.log(book.id);
    const newBook: Book = {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.[0], // Take the first author if available
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      read: false,
      dateAdded: new Date().toISOString(),
      dateCompleted: null,
    };
    console.log(newBook, "newBook");
    setBooks([newBook, ...books]);
    setSearchQuery("");
    setSearchResults([]);
    setShowDropdown(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(true);
    searchBooks(value);
  }

  function deleteBook(id: string) {
    setBooks(books.filter((book: Book) => book.id !== id));
  }

  function toggleRead(id: string) {
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

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <span style={{ color: "#ffd700" }}>★</span>
        ))}
        {hasHalfStar && (
          <span
            style={{
              position: "relative",
              overflow: "hidden",
              width: "1em",
            }}
          >
            <span
              style={{ position: "absolute", color: "#ddd", left: 0, top: 0 }}
            >
              ★
            </span>
            <span
              style={{
                color: "#ffd700",
                position: "absolute",
                left: 0,
                top: 0,
                width: "50%",
                overflow: "hidden",
              }}
            >
              ★
            </span>
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} style={{ color: "#ddd" }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="todo-list">
      <div className="text-box-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          {showDropdown &&
            searchResults.length > 0 &&
            searchQuery.length > 0 && (
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
                      {book.volumeInfo.averageRating && (
                        <p className="book-description">
                          Rating:
                          {renderStarRating(book.volumeInfo.averageRating)}
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
        .sort((a: Book, b: Book) => {
          if (a.read && !b.read) return 1;
          if (!a.read && b.read) return -1;
          return a.title.localeCompare(b.title);
        })
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
