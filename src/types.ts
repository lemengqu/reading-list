export interface Book {
  id: number; // Unique identifier for the book item
  title: string; // Title of the book
  read: boolean; // Whether the book has been marked as read
  dateAdded: string | number; // Timestamp or ISO string when the book was added
  dateCompleted?: string | number; // Optional timestamp when the book was completed
}
