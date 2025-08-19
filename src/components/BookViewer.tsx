import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut, Bookmark, Highlighter } from 'lucide-react';
import type { Book } from '../types';

interface BookViewerProps {
  book: Book;
}

export default function BookViewer({ book }: BookViewerProps) {
  const [currentPage, setCurrentPage] = useState(book.currentPage || 1);
  const [zoom, setZoom] = useState(100);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  // Sample book content - in real app, this would come from PDF parsing
  const bookPages = Array.from({ length: book.totalPages }, (_, i) => ({
    pageNumber: i + 1,
    content: `
      <h1 style="margin-bottom: 2rem; color: #1f2937; font-size: 2rem; font-weight: bold;">
        ${book.title} - Page ${i + 1}
      </h1>
      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: #374151;">
        This is the content of page ${i + 1}. In a real implementation, this would be the actual content 
        extracted from your uploaded PDF or text file. The content would be properly formatted and 
        displayed with the original styling preserved.
      </p>
      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: #374151;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: #374151;">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
        mollit anim id est laborum.
      </p>
      <p style="margin-bottom: 1.5rem; line-height: 1.8; color: #374151;">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
        dicta sunt explicabo.
      </p>
    `
  }));

  const nextPage = () => {
    if (currentPage < book.totalPages) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const resetZoom = () => {
    setZoom(100);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const currentPageContent = bookPages[currentPage - 1];

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 overflow-hidden">
      {/* Reader Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-gray-50/50">
        <div className="flex items-center space-x-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium">
            Page {currentPage} of {book.totalPages}
          </span>
          
          <button
            onClick={nextPage}
            disabled={currentPage === book.totalPages}
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-all"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <span className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium min-w-[60px] text-center">
            {zoom}%
          </span>
          
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-all"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <button
            onClick={resetZoom}
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <button className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-all">
            <Bookmark className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-all">
            <Highlighter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Pages Container */}
      <div className="relative h-[700px] bg-gradient-to-b from-amber-50 to-amber-100 overflow-hidden">
        {/* Book Spine Shadow */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 transform -translate-x-1/2 shadow-lg z-10" />
        
        {/* Left Page */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 p-8 bg-white shadow-2xl">
          <div 
            className={`h-full overflow-auto transition-all duration-300 ${
              isFlipping && flipDirection === 'prev' ? 'transform scale-95 opacity-50' : ''
            }`}
            style={{ 
              fontSize: `${zoom}%`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left'
            }}
          >
            {currentPage > 1 && (
              <div 
                className="prose prose-lg max-w-none h-full"
                dangerouslySetInnerHTML={{ 
                  __html: bookPages[currentPage - 2]?.content || '' 
                }}
              />
            )}
          </div>
          
          {/* Page Number */}
          {currentPage > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 font-medium">
              {currentPage - 1}
            </div>
          )}
        </div>

        {/* Right Page */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 p-8 bg-white shadow-2xl">
          <div 
            className={`h-full overflow-auto transition-all duration-300 ${
              isFlipping && flipDirection === 'next' ? 'transform scale-95 opacity-50' : ''
            }`}
            style={{ 
              fontSize: `${zoom}%`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left'
            }}
          >
            <div 
              className="prose prose-lg max-w-none h-full"
              dangerouslySetInnerHTML={{ 
                __html: currentPageContent?.content || '' 
              }}
            />
          </div>
          
          {/* Page Number */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 font-medium">
            {currentPage}
          </div>
        </div>

        {/* Page Flip Animation Overlay */}
        {isFlipping && (
          <div className={`absolute top-0 bottom-0 w-1/2 bg-white shadow-2xl z-20 transition-transform duration-300 ${
            flipDirection === 'next' 
              ? 'right-0 transform rotate-y-180' 
              : 'left-0 transform -rotate-y-180'
          }`}>
            <div className="h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
          </div>
        )}

        {/* Book Edges */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-300 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-amber-300 to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-amber-300 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-amber-300 to-transparent" />
      </div>

      {/* Navigation Hints */}
      <div className="p-4 bg-gray-50/50 border-t border-gray-200/50">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <span>Use arrow keys or click buttons to navigate</span>
          <span>•</span>
          <span>Space bar for next page</span>
          <span>•</span>
          <span>Scroll to zoom in pages</span>
        </div>
      </div>
    </div>
  );
}