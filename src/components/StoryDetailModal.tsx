import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, ImageIcon, Calendar } from 'lucide-react';

export type StoryDetailItem = {
  title: string;
  text: string;
  tag: string;
  location: string;
  images: string[];
};

type StoryDetailModalProps = {
  item: StoryDetailItem | null;
  onClose: (event?: React.MouseEvent) => void;
};

const StoryDetailModal = ({ item, onClose }: StoryDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!item) {
      return;
    }

    setCurrentImageIndex(0);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      scrollContainerRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  const stepImage = (direction: 1 | -1, event?: React.MouseEvent) => {
    event?.stopPropagation();
    if (!item) {
      return;
    }
    setCurrentImageIndex((prev) => (prev + direction + item.images.length) % item.images.length);
  };

  const modalContent = (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[410] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(44,25,21,0.82),_rgba(18,12,10,0.94)_72%)] backdrop-blur-xl md:flex md:items-center md:justify-center md:p-6"
          onClick={() => onClose()}
        >
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-3 top-4 z-[420] flex items-center gap-2 rounded-full border border-white/15 bg-white/92 px-4 py-3 text-xs font-black uppercase tracking-[0.28em] text-[#8d5b4c] shadow-[0_16px_35px_rgba(35,24,21,0.2)] md:left-8 md:top-8"
            onClick={(event) => onClose(event)}
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>

          <div
            ref={scrollContainerRef}
            className="flex h-[100dvh] w-full flex-col overflow-y-auto overflow-x-hidden bg-[#fff9f4] md:h-auto md:w-auto md:max-h-[90vh] md:max-w-[36rem] md:rounded-[2.5rem] md:border md:border-white/70 shadow-[0_30px_80px_rgba(35,24,21,0.12)]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Top section: Main image + Arrows */}
            <div className="relative h-[55vh] min-h-[16rem] w-full shrink-0 bg-[#f7ebe4] md:h-[28rem] md:min-h-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={item.images[currentImageIndex]}
                  src={item.images[currentImageIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </AnimatePresence>

              {item.images.length > 1 && (
                <>
                  <button
                    onClick={(event) => stepImage(-1, event)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-[#231815] shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(event) => stepImage(1, event)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-[#231815] shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-white"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom section: Content */}
            <div className="flex flex-col px-5 py-8 pb-12 md:p-8">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#8d5b4c]">
                  <Calendar size={14} />
                  {item.tag}
                </div>
                <h3 className="mb-4 text-3xl font-black leading-tight tracking-[-0.03em] text-[#231815] md:text-4xl">
                  {item.title}
                </h3>
                <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#8d5b4c]">
                  <MapPin size={16} className="text-[#f05a7e]" />
                  {item.location}
                </div>
                <p className="whitespace-pre-line text-base leading-8 text-[#5f463d] md:text-lg">{item.text}</p>
              </div>

              {/* Thumbnails */}
              {item.images.length > 1 && (
                <div className="mt-8">
                  <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[#8d5b4c]">
                    <ImageIcon size={15} className="text-[#f28f3b]" />
                    Little previews
                  </div>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                    {item.images.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`overflow-hidden rounded-[1rem] transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'scale-105 ring-2 ring-[#f05a7e] ring-offset-2 ring-offset-[#fff9f4]'
                            : 'opacity-60 hover:scale-105 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${item.title} preview ${index + 1}`}
                          className="aspect-square w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default StoryDetailModal;
