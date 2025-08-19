import React from 'react';
import { useParams } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import Sidebar from './Sidebar';
import { ArrowLeft, Bookmark, Settings, Search, ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import BookViewer from './BookViewer';

export default function BookReader() {
  const { bookId } = useParams();
  const { books } = useLibrary();
  
  const book = books.find(b => b.id === parseInt(bookId || '0'));
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
          <p className="text-gray-600">The book you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      
      <div className="ml-0 lg:ml-64 transition-all duration-300">
        <div className="p-4 lg:p-8">
          {/* Reader Header */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
                  <p className="text-gray-600">{book.author}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bookmark className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Page {book.currentPage} of {book.totalPages}</span>
                <span>{book.progress}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${book.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Reader Content */}
          <BookViewer book={book} />
        </div>
      </div>
    </div>
  );
}