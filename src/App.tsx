import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FloatingDecorations from './components/FloatingDecorations';
import MusicPlayer from './components/MusicPlayer';
import { Toaster } from 'sonner';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const SurprisePage = lazy(() => import('./pages/SurprisePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const GiftDetailsPage = lazy(() => import('./pages/GiftDetailsPage'));

const AppContent = () => {
  const location = useLocation();
  const isSurprisePage = location.pathname === '/surprise';

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-[#ffd7c5] selection:text-[#8d5b4c] font-sans">
      <Toaster position="top-center" richColors />

      {!isSurprisePage && (
        <>
          <FloatingDecorations />
          <MusicPlayer />
        </>
      )}

      <main className="relative">
        <Suspense fallback={<div className="min-h-screen" />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/surprise" element={<SurprisePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/gift-details" element={<GiftDetailsPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
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
