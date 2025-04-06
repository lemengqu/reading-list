import React from "react";

function TodoItem({ book, deleteBook, toggleRead }) {
  function handleChange() {
    toggleRead(book.id);
  }

  let itemType = "todo-item";
  if (book.read) {
    itemType = "todo-item read";
  }

  return (
    <div className={itemType}>
      <input type="checkbox" checked={book.read} onChange={handleChange} />
      <p>{book.title}</p>
      <button onClick={() => deleteBook(book.id)}>X</button>
    </div>
  );
}

export default TodoItem;
