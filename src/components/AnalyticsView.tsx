import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import Sidebar from './Sidebar';
import { BarChart3, TrendingUp, Clock, BookOpen, Target, Calendar, Award, Star } from 'lucide-react';

export default function AnalyticsView() {
  const { books, stats } = useLibrary();

  const readingStreak = 7; // Mock data
  const averageReadingTime = 45; // minutes per day
  const monthlyGoal = 5; // books per month
  const currentMonthBooks = 2;

  const genreStats = books.reduce((acc, book) => {
    book.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topGenres = Object.entries(genreStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const weeklyProgress = [
    { day: 'Mon', pages: 25 },
    { day: 'Tue', pages: 32 },
    { day: 'Wed', pages: 18 },
    { day: 'Thu', pages: 45 },
    { day: 'Fri', pages: 28 },
    { day: 'Sat', pages: 52 },
    { day: 'Sun', pages: 38 }
  ];

  const maxPages = Math.max(...weeklyProgress.map(d => d.pages));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      
      <div className="ml-0 lg:ml-64 transition-all duration-300">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Reading Analytics</h1>
            <p className="text-gray-600 text-lg">Track your reading journey and progress</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-50">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.totalBooks}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Books</h3>
              <p className="text-xs text-green-600 mt-1">+2 this month</p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-green-50">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stats.totalPages.toLocaleString()}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Pages Read</h3>
              <p className="text-xs text-green-600 mt-1">+15% from last month</p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-50">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{readingStreak}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Day Streak</h3>
              <p className="text-xs text-green-600 mt-1">Keep it up!</p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-orange-50">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{Math.round((currentMonthBooks / monthlyGoal) * 100)}%</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Monthly Goal</h3>
              <p className="text-xs text-gray-500 mt-1">{currentMonthBooks}/{monthlyGoal} books</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Weekly Reading Progress */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200/50">
                <h2 className="text-xl font-semibold text-gray-900">Weekly Progress</h2>
                <p className="text-gray-600 mt-1">Pages read this week</p>
              </div>
              <div className="p-6">
                <div className="flex items-end justify-between h-48 space-x-2">
                  {weeklyProgress.map((day, index) => (
                    <div key={day.day} className="flex flex-col items-center flex-1">
                      <div className="w-full flex flex-col justify-end h-40 mb-2">
                        <div 
                          className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all duration-500 ease-out"
                          style={{ 
                            height: `${(day.pages / maxPages) * 100}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{day.day}</span>
                      <span className="text-xs text-gray-500">{day.pages}p</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Genre Distribution */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200/50">
                <h2 className="text-xl font-semibold text-gray-900">Reading Genres</h2>
                <p className="text-gray-600 mt-1">Your favorite categories</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topGenres.map(([genre, count], index) => {
                    const percentage = (count / books.length) * 100;
                    const colors = [
                      'from-blue-500 to-blue-600',
                      'from-green-500 to-green-600',
                      'from-purple-500 to-purple-600',
                      'from-orange-500 to-orange-600',
                      'from-red-500 to-red-600'
                    ];
                    
                    return (
                      <div key={genre} className="flex items-center space-x-3">
                        <div className="w-16 text-sm font-medium text-gray-700">{genre}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div 
                            className={`bg-gradient-to-r ${colors[index]} h-3 rounded-full transition-all duration-500`}
                            style={{ 
                              width: `${percentage}%`,
                              animationDelay: `${index * 200}ms`
                            }}
                          />
                        </div>
                        <div className="w-12 text-sm text-gray-600 text-right">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reading Goals */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200/50">
                <h2 className="text-xl font-semibold text-gray-900">Reading Goals</h2>
                <p className="text-gray-600 mt-1">Track your progress</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Monthly Goal</span>
                    <span className="text-sm text-blue-600 font-semibold">{currentMonthBooks}/{monthlyGoal} books</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(currentMonthBooks / monthlyGoal) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Daily Reading Time</span>
                    <span className="text-sm text-green-600 font-semibold">{averageReadingTime} min</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(averageReadingTime / 60) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 border-b border-gray-200/50">
                <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
                <p className="text-gray-600 mt-1">Your reading milestones</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-800">First Book Completed</h3>
                    <p className="text-xs text-yellow-700">Finished your first book</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Star className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-semibold text-blue-800">Week Streak</h3>
                    <p className="text-xs text-blue-700">Read for 7 consecutive days</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 opacity-50">
                  <Calendar className="w-8 h-8 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600">Month Master</h3>
                    <p className="text-xs text-gray-500">Complete monthly goal (Locked)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}