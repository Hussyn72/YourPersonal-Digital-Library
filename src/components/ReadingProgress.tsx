import React from 'react';
import { TrendingUp, Award } from 'lucide-react';
import type { Book } from '../types';

interface ReadingProgressProps {
  books: Book[];
}

export default function ReadingProgress({ books }: ReadingProgressProps) {
  const totalProgress = books.reduce((sum, book) => sum + book.progress, 0) / books.length || 0;
  
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 overflow-hidden h-fit">
      <div className="p-6 border-b border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-900">Reading Progress</h2>
        <p className="text-gray-600 mt-1">Your reading journey</p>
      </div>
      
      <div className="p-6">
        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-blue-600">{Math.round(totalProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* Individual Books */}
        <div className="space-y-4">
          {books.slice(0, 5).map((book) => (
            <div key={book.id} className="border border-gray-200/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 truncate">{book.title}</h4>
                <span className="text-xs text-blue-600 font-semibold">{book.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${book.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Achievement */}
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-yellow-600" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-800">Achievement Unlocked!</h3>
              <p className="text-xs text-yellow-700">Keep reading to unlock more achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}