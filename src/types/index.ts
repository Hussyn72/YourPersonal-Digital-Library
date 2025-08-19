export interface Book {
  id: number;
  title: string;
  author: string;
  progress: number;
  totalPages: number;
  currentPage: number;
  lastRead: string;
  addedDate: string;
  isFavorite: boolean;
  tags: string[];
  fileType: string;
  fileSize: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ReadingSession {
  id: string;
  bookId: number;
  startTime: Date;
  endTime: Date;
  pagesRead: number;
}

export interface Bookmark {
  id: string;
  bookId: number;
  page: number;
  note?: string;
  createdAt: Date;
}