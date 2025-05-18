export interface Book {
  id: number; // Unique identifier for the book item
  title: string; // Title of the book
  author?: string; // Author of the book
  thumbnail?: string; // URL of the book's thumbnail image
  read: boolean; // Whether the book has been marked as read
  dateAdded: string | number; // Timestamp or ISO string when the book was added
  dateCompleted: string | number | null; // Timestamp when the book was completed, or null if not completed
}
export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}
