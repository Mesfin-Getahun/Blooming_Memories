import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PhotoGallery from '../components/PhotoGallery';
import { birthdayContent, type MemoryMoment } from '../content/birthdayContent';

const GalleryPage = () => {
  const navigate = useNavigate();
  const [selectedMoment, setSelectedMoment] = useState<MemoryMoment | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const openMoment = (moment: MemoryMoment) => {
    setSelectedMoment(moment);
    setCurrentIdx(0);
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] pb-20">
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full text-rose-500 shadow-xl border border-rose-100 flex items-center gap-2 font-bold uppercase tracking-widest text-xs"
      >
        <ArrowLeft size={18} />
        <span>Go Home</span>
      </motion.button>

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={birthdayContent.moments[2]?.images[0] ?? '/gebeya.webp'}
            alt="Gallery Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-black text-white mb-4"
          >
            Memory Lane
          </motion.h1>
          <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full" />
        </div>
      </section>

      <div className="relative -mt-10 z-20">
        <PhotoGallery />
      </div>

      <section className="max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 mb-12 text-center">
          Extra Moments Worth Framing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {birthdayContent.extendedMoments.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => openMoment(item)}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs flex items-center gap-1">
                    <ImageIcon size={14} />
                    <span>+{item.images.length - 1}</span>
                  </div>
                )}
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 italic mb-6">"{item.description}"</p>
                <button
                  onClick={() => openMoment(item)}
                  className="text-rose-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View Gallery <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedMoment(null)}
          >
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-8 left-8 z-[110] bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-white shadow-xl border border-white/20 flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all"
              onClick={() => setSelectedMoment(null)}
            >
              <ArrowLeft size={16} />
              <span>Back to Memory Lane</span>
            </motion.button>

            <div className="relative w-full max-w-5xl h-[90vh] flex flex-col pt-12" onClick={(e) => e.stopPropagation()}>
              <div className="flex-grow relative bg-black/20 rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIdx}
                    src={selectedMoment.images[currentIdx]}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {selectedMoment.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentIdx((prev) => (prev - 1 + selectedMoment.images.length) % selectedMoment.images.length)
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setCurrentIdx((prev) => (prev + 1) % selectedMoment.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              <div className="pt-4 pb-0 text-white text-center">
                <h2 className="text-3xl font-serif font-bold mb-1">{selectedMoment.title}</h2>
                <p className="text-white/60 italic text-sm md:text-base mb-2">"{selectedMoment.description}"</p>

                <div className="flex justify-center gap-2 mt-2 mb-2">
                  {selectedMoment.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === currentIdx ? 'w-6 bg-rose-500' : 'w-1.5 bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
