import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import Sidebar from './Sidebar';
import StatsCards from './StatsCards';
import RecentBooks from './RecentBooks';
import ReadingProgress from './ReadingProgress';
import UploadModal from './UploadModal';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { books, stats } = useLibrary();
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      
      <div className="ml-0 lg:ml-64 transition-all duration-300">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 text-lg">
                Continue your reading journey
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="mt-4 sm:mt-0 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              <span>Add Books</span>
            </button>
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
            {/* Recent Books */}
            <div className="xl:col-span-2">
              <RecentBooks books={books.slice(0, 6)} />
            </div>

            {/* Reading Progress */}
            <div className="xl:col-span-1">
              <ReadingProgress books={books.filter(book => book.progress > 0)} />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}