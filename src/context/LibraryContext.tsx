import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Book } from '../types';

interface LibraryStats {
  totalBooks: number;
  totalPages: number;
  readingHours: number;
  completedBooks: number;
}

interface LibraryContextType {
  books: Book[];
  stats: LibraryStats;
  addBook: (book: Book) => void;
  updateBook: (bookId: number, updates: Partial<Book>) => void;
  removeBook: (bookId: number) => void;
  toggleFavorite: (bookId: number) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Load books from localStorage
    const storedBooks = localStorage.getItem('library');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      // Initialize with sample data
      const sampleBooks: Book[] = [
        {
          id: 1,
          title: "The Art of Clean Code",
          author: "Robert C. Martin",
          progress: 45,
          totalPages: 464,
          currentPage: 210,
          lastRead: "2 hours ago",
          addedDate: new Date().toISOString(),
          isFavorite: true,
          tags: ["Programming", "Technical"],
          fileType: "application/pdf",
          fileSize: 2048000
        },
        {
          id: 2,
          title: "Design Patterns",
          author: "Gang of Four",
          progress: 23,
          totalPages: 395,
          currentPage: 91,
          lastRead: "Yesterday",
          addedDate: new Date().toISOString(),
          isFavorite: false,
          tags: ["Programming", "Architecture"],
          fileType: "application/pdf",
          fileSize: 3072000
        },
        {
          id: 3,
          title: "JavaScript: The Good Parts",
          author: "Douglas Crockford",
          progress: 100,
          totalPages: 176,
          currentPage: 176,
          lastRead: "Last week",
          addedDate: new Date().toISOString(),
          isFavorite: true,
          tags: ["JavaScript", "Programming"],
          fileType: "application/pdf",
          fileSize: 1024000
        }
      ];
      setBooks(sampleBooks);
      localStorage.setItem('library', JSON.stringify(sampleBooks));
    }
  }, []);

  useEffect(() => {
    // Save books to localStorage whenever books change
    localStorage.setItem('library', JSON.stringify(books));
  }, [books]);

  const stats: LibraryStats = {
    totalBooks: books.length,
    totalPages: books.reduce((sum, book) => sum + Math.floor(book.totalPages * book.progress / 100), 0),
    readingHours: Math.floor(books.reduce((sum, book) => sum + (book.totalPages * book.progress / 100) / 10, 0)),
    completedBooks: books.filter(book => book.progress === 100).length
  };

  const addBook = (book: Book) => {
    setBooks(prev => [...prev, book]);
  };

  const updateBook = (bookId: number, updates: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, ...updates } : book
    ));
  };

  const removeBook = (bookId: number) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  };

  const toggleFavorite = (bookId: number) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
    ));
  };

  return (
    <LibraryContext.Provider value={{
      books,
      stats,
      addBook,
      updateBook,
      removeBook,
      toggleFavorite
    }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}