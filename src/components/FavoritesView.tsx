import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import Sidebar from './Sidebar';
import { Heart, Search, Grid, List, MoreVertical } from 'lucide-react';

export default function FavoritesView() {
  const navigate = useNavigate();
  const { books, toggleFavorite } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const favoriteBooks = books.filter(book => 
    book.isFavorite && 
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      
      <div className="ml-0 lg:ml-64 transition-all duration-300">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600 text-lg">Your most loved books and resources</p>
          </div>

          {/* Search and View Controls */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search favorites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list' ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Favorites Grid/List */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 overflow-hidden">
            {favoriteBooks.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-red-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No matching favorites' : 'No favorites yet'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'Start adding books to your favorites to see them here'}
                </p>
              </div>
            ) : (
              <div className="p-6">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteBooks.map((book) => (
                      <div 
                        key={book.id} 
                        className="group bg-white rounded-xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => navigate(`/reader/${book.id}`)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="w-16 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{book.title.slice(0, 2).toUpperCase()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => toggleFavorite(book.id)}
                              className="p-1 hover:bg-gray-100 rounded transition-all"
                            >
                              <Heart className="w-4 h-4 text-red-500 fill-current" />
                            </button>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all">
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{book.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Last read: {book.lastRead}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favoriteBooks.map((book) => (
                      <div 
                        key={book.id} 
                        className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => navigate(`/reader/${book.id}`)}
                      >
                        <div className="w-12 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">{book.title.slice(0, 2).toUpperCase()}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Progress: {book.progress}%</span>
                            <span>Last read: {book.lastRead}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => toggleFavorite(book.id)}
                            className="p-2 hover:bg-gray-100 rounded transition-all"
                          >
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded transition-all">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}