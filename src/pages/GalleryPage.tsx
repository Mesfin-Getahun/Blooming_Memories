import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PhotoGallery from '../components/PhotoGallery';
import { birthdayContent } from '../content/birthdayContent';

const GalleryPage = () => {
  const navigate = useNavigate();
  const heroImage = birthdayContent.allMemoryImages[1] ?? birthdayContent.allMemoryImages[0] ?? '/gebeya.webp';

  return (
    <div className="min-h-screen overflow-hidden bg-[#fffaf5] pb-20">
      <motion.button
        onClick={() => navigate('/')}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-[#8d5b4c] shadow-[0_16px_35px_rgba(35,24,21,0.08)] backdrop-blur-xl md:left-8 md:top-8"
      >
        <ArrowLeft size={16} />
        Back home
      </motion.button>

      <section className="relative isolate overflow-hidden px-4 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,_rgba(255,247,240,1)_0%,_rgba(255,250,245,0.98)_45%,_rgba(248,234,226,0.75)_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-70">
          <img src={heroImage} alt="Memory hero" className="h-full w-full object-cover blur-[3px]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(16,10,8,0.72),_rgba(16,10,8,0.22)_45%,_rgba(240,90,126,0.18)_100%)]" />
        </div>

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl rounded-[2.5rem] border border-white/10 bg-black/20 p-8 text-white shadow-[0_30px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl md:p-10"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.34em] text-[#ffd7c5]">
              <Sparkles size={14} />
              Birthday memory box
            </div>
            <h1 className="mt-5 text-5xl font-black leading-[0.94] tracking-[-0.04em] md:text-7xl">
              Every little memory I wanted to keep for you.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
              This page is where the birthday gift turns into a keepsake. The photos live here, but the feeling is still
              about us, our story, and all the moments worth keeping close.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-[1.8rem] border border-white/15 bg-white/10 px-5 py-4">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">Frames loaded</p>
                <p className="mt-2 text-4xl font-black">{birthdayContent.memoryCount}</p>
              </div>
              <div className="rounded-[1.8rem] border border-white/15 bg-white/10 px-5 py-4">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">Built around</p>
                <p className="mt-2 flex items-center gap-2 text-lg font-bold">
                  <Camera size={18} className="text-[#ffd7c5]" />
                  real sample photos
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PhotoGallery />
    </div>
  );
};

export default GalleryPage;
