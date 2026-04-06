import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import SurprisePage from './pages/SurprisePage';
import GalleryPage from './pages/GalleryPage';
import FloatingDecorations from './components/FloatingDecorations';
import MusicPlayer from './components/MusicPlayer';
import { Toaster } from 'sonner';
import './App.css';

// Wrapper to handle route-specific layout logic if needed
const AppContent = () => {
  const location = useLocation();
  const isSurprisePage = location.pathname === '/surprise';

  return (
    <div className="min-h-screen bg-[#fffdfa] selection:bg-pink-100 selection:text-pink-600 overflow-x-hidden font-sans">
      <Toaster position="top-center" richColors />
      
      {/* Hide decorations and music player on the surprise page for maximum impact? 
          Actually, let's keep them but maybe the surprise page has its own.
          Let's hide them for the surprise page to avoid clutter. */}
      {!isSurprisePage && (
        <>
          <FloatingDecorations />
          <MusicPlayer />
        </>
      )}
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/surprise" element={<SurprisePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;