import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  ZoomIn,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { birthdayContent, type MemoryMoment } from '../content/birthdayContent';

interface PhotoGalleryProps {
  featuredOnly?: boolean;
}

const PhotoGallery = ({ featuredOnly = false }: PhotoGalleryProps) => {
  const navigate = useNavigate();
  const [selectedMoment, setSelectedMoment] = useState<MemoryMoment | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayMoments = featuredOnly ? birthdayContent.moments.slice(0, 3) : birthdayContent.moments;

  const openLightbox = (moment: MemoryMoment) => {
    setSelectedMoment(moment);
    setCurrentImageIndex(0);
  };

  const closeLightbox = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedMoment(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedMoment) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedMoment.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedMoment) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedMoment.images.length) % selectedMoment.images.length);
    }
  };

  return (
    <section className="pt-8 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 bg-rose-50 text-rose-500 px-6 py-3 rounded-full mb-6 font-black text-xs uppercase tracking-[0.4em] shadow-sm border border-rose-100"
        >
          <Sparkles size={18} className="animate-pulse" />
          Treasured Times
        </motion.div>
        <h2 className="text-5xl md:text-8xl font-serif font-black text-gray-900 mb-6 leading-tight">
          {featuredOnly ? 'Captured Moments' : 'Our Full Memory Box'}
        </h2>
        <div className="w-48 h-2 bg-gradient-to-r from-pink-400 via-rose-500 to-amber-400 mx-auto rounded-full mb-8 shadow-[0_5px_15px_rgba(244,63,94,0.3)]" />
        {featuredOnly && (
          <p className="text-gray-500 italic max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-serif">
            Replace these placeholder stories with the exact moments she would instantly recognize.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
        {displayMoments.map((moment, index) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`${moment.colSpan || ''} relative group cursor-pointer h-[500px] md:h-[650px] rounded-[4rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-gray-100 flex flex-col ring-1 ring-black/5 hover:ring-rose-200 transition-all`}
            onClick={() => openLightbox(moment)}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={moment.images[0]}
                alt={moment.title}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>

            {moment.images.length > 1 && (
              <div className="absolute top-8 right-8 z-20 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 transform transition-all group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white border border-pink-50">
                <ImageIcon size={18} className="group-hover:text-white text-pink-500" />
                <span className="text-sm font-black tracking-tighter">{moment.images.length} Photos</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500" />

            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14 text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="flex items-center gap-2 text-pink-300 font-black text-[10px] uppercase tracking-[0.3em] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Calendar size={14} />
                    {moment.date}
                  </span>
                  <span className="flex items-center gap-2 text-rose-100/80 font-black text-[10px] uppercase tracking-[0.3em]">
                    <MapPin size={14} />
                    {moment.location}
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-black mb-6 group-hover:text-pink-200 transition-colors leading-[1.1] tracking-tighter">
                  {moment.title}
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-6 group-hover:translate-y-0 italic line-clamp-3">
                  "{moment.description}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="w-16 h-1.5 bg-pink-500 rounded-full transition-all duration-1000 group-hover:w-full group-hover:opacity-50" />
                  <ZoomIn size={24} className="opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {featuredOnly && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -8, boxShadow: '0 30px 60px -12px rgba(244, 63, 94, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/gallery')}
            className="group relative flex items-center gap-5 bg-white border-4 border-pink-500 text-pink-600 px-14 py-7 rounded-full font-black text-xl shadow-2xl hover:bg-pink-500 hover:text-white transition-all duration-500 overflow-hidden"
          >
            <ImageIcon size={28} className="group-hover:rotate-12 transition-transform" />
            <span className="relative z-10 uppercase tracking-widest">Explore Full Memory Box</span>
            <ArrowRight size={28} className="transition-transform group-hover:translate-x-3" />
            <div className="absolute inset-0 bg-pink-600/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-[50px] flex items-center justify-center p-4 pt-16 md:p-12 md:pt-20"
            onClick={() => closeLightbox()}
          >
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-4 left-4 md:top-8 md:left-8 z-[220] bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white shadow-xl border border-white/20 flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all"
              onClick={(e) => closeLightbox(e)}
            >
              <ArrowLeft size={18} />
              <span>Back to Gallery</span>
            </motion.button>

            <div
              className="relative w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full md:w-2/3 aspect-[4/5] md:aspect-square lg:aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)] bg-black ring-1 ring-white/10 group/lightbox">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedMoment.images[currentImageIndex]}
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {selectedMoment.images.length > 1 && (
                  <div className="opacity-0 md:group-hover/lightbox:opacity-100 transition-opacity duration-500">
                    <button
                      onClick={prevImage}
                      className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-2xl p-4 md:p-7 rounded-full text-white transition-all border border-white/10 shadow-2xl"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-2xl p-4 md:p-7 rounded-full text-white transition-all border border-white/10 shadow-2xl"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-black/40 backdrop-blur-xl p-3 rounded-full border border-white/10">
                  {selectedMoment.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        i === currentImageIndex
                          ? 'w-16 bg-pink-500 shadow-[0_0_15px_rgba(244,63,94,0.8)]'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/3 text-white">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-h-[35vh] md:max-h-none overflow-y-auto pr-4 scrollbar-hide"
                >
                  <div className="flex items-center gap-4 text-pink-400 mb-4 md:mb-10">
                    <Heart size={20} fill="currentColor" className="animate-pulse" />
                    <span className="uppercase tracking-[0.4em] text-[10px] md:text-xs font-black">
                      {selectedMoment.date}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-6xl lg:text-8xl font-serif font-black mb-4 md:mb-10 leading-[0.9] tracking-tighter">
                    {selectedMoment.title}
                  </h2>
                  <div className="flex items-center gap-2 md:gap-3 text-white/50 mb-4 md:mb-12">
                    <MapPin size={16} />
                    <span className="text-base md:text-2xl font-medium tracking-tight">{selectedMoment.location}</span>
                  </div>
                  <p className="text-white/70 text-base md:text-2xl leading-relaxed italic mb-6 md:mb-8 border-l-4 border-pink-500 pl-6 md:pl-10 font-serif">
                    "{selectedMoment.description}"
                  </p>

                  <div className="grid grid-cols-4 gap-3 md:gap-6 pb-4">
                    {selectedMoment.images.map((img, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.15 }}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`aspect-square rounded-[1rem] md:rounded-[1.5rem] overflow-hidden border-2 md:border-4 transition-all shadow-2xl ${
                          i === currentImageIndex
                            ? 'border-pink-500 scale-110 md:scale-125 z-10'
                            : 'border-transparent opacity-30 hover:opacity-100'
                        }`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt={`${selectedMoment.title} ${i + 1}`} />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
