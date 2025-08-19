import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import LibraryView from './components/LibraryView';
import FavoritesView from './components/FavoritesView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import BookReader from './components/BookReader';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';

function AppContent() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? <Navigate to="/dashboard" /> : 
              <LandingPage 
                onAuth={(mode) => {
                  setAuthMode(mode);
                  setShowAuthModal(true);
                }} 
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/library" 
            element={user ? <LibraryView /> : <Navigate to="/" />} 
          />
          <Route 
            path="/favorites" 
            element={user ? <FavoritesView /> : <Navigate to="/" />} 
          />
          <Route 
            path="/analytics" 
            element={user ? <AnalyticsView /> : <Navigate to="/" />} 
          />
          <Route 
            path="/settings" 
            element={user ? <SettingsView /> : <Navigate to="/" />} 
          />
          <Route 
            path="/reader/:bookId" 
            element={user ? <BookReader /> : <Navigate to="/" />} 
          />
        </Routes>
        
        {showAuthModal && (
          <AuthModal 
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onSwitchMode={(mode) => setAuthMode(mode)}
          />
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <AppContent />
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;