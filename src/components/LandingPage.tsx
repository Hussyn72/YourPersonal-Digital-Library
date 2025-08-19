import React from 'react';
import { BookOpen, Upload, BarChart3, Bookmark, Search, Star, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onAuth: (mode: 'login' | 'signup') => void;
}

export default function LandingPage({ onAuth }: LandingPageProps) {
  const features = [
    {
      icon: <Upload className="w-8 h-8 text-blue-600" />,
      title: "Easy Upload",
      description: "Drag & drop your books and PDFs effortlessly into your personal library"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      title: "Reading Progress",
      description: "Track your reading journey with bookmarks, highlights, and progress indicators"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Analytics Dashboard",
      description: "Visualize your reading habits with beautiful charts and statistics"
    },
    {
      icon: <Search className="w-8 h-8 text-orange-600" />,
      title: "Smart Search",
      description: "Find any book instantly with powerful search and filtering options"
    },
    {
      icon: <Bookmark className="w-8 h-8 text-red-600" />,
      title: "Favorites & Bookmarks",
      description: "Save and organize your favorite books and important pages"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Personalized Experience",
      description: "Customize your library with tags, categories, and personal notes"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">LibraryPro</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onAuth('login')}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => onAuth('signup')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Personal
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Digital Library</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload, organize, and track your reading progress with the most beautiful and intuitive 
              personal library platform. Your books, your way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onAuth('signup')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span className="text-lg font-semibold">Start Building Your Library</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onAuth('login')}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Already have an account?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Digital Library
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to enhance your reading experience and keep you organized.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Reading Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of readers who have organized their digital libraries with LibraryPro.
            </p>
            <button
              onClick={() => onAuth('signup')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg font-semibold"
            >
              Create Your Library Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">LibraryPro</span>
          </div>
          <p className="text-center text-gray-400">
            © 2025 LibraryPro. Built with love for book enthusiasts.
          </p>
        </div>
      </footer>
    </div>
  );
}