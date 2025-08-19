import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Clock, MoreVertical } from 'lucide-react';
import type { Book as BookType } from '../types';

interface RecentBooksProps {
  books: BookType[];
}

export default function RecentBooks({ books }: RecentBooksProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 overflow-hidden">
      <div className="p-6 border-b border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-900">Recent Books</h2>
        <p className="text-gray-600 mt-1">Continue where you left off</p>
      </div>
      
      <div className="p-6">
        {books.length === 0 ? (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books yet</h3>
            <p className="text-gray-600">Upload your first book to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="group border border-gray-200/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/reader/${book.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{book.lastRead}</span>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {book.progress}% complete
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}