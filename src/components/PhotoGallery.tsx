import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ImageIcon, MapPin, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { birthdayContent, type MemoryMoment } from '../content/birthdayContent';
import StoryDetailModal, { type StoryDetailItem } from './StoryDetailModal';

interface PhotoGalleryProps {
  featuredOnly?: boolean;
}

const PhotoGallery = ({ featuredOnly = false }: PhotoGalleryProps) => {
  const navigate = useNavigate();
  const [selectedMoment, setSelectedMoment] = useState<MemoryMoment | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayMoments = featuredOnly ? birthdayContent.moments : [...birthdayContent.moments, ...birthdayContent.extendedMoments];
  const allNewImages = birthdayContent.allMemoryImages.filter(img => img.includes('photo_2026-07-17_'));
  const spotlightImages = allNewImages.length > 0 ? allNewImages.slice(0, 10) : birthdayContent.allMemoryImages.slice(0, 10);

  const openLightbox = (moment: MemoryMoment) => {
    setSelectedMoment(moment);
  };

  const closeLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedMoment(null);
  };

  return (
    <section id="memory-gallery" className="mx-auto max-w-7xl px-4 pb-14 pt-10 md:px-8 md:pb-24">
      <div className="mb-12 rounded-[2.5rem] border border-white/70 bg-white/70 p-5 shadow-[0_25px_80px_rgba(35,24,21,0.08)] backdrop-blur-xl md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-[#fdf1e8] px-4 py-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#8d5b4c]">
              <Sparkles size={14} className="text-[#f05a7e]" />
              {featuredOnly ? 'Memory corner' : 'Full memory box'}
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[#231815] md:text-6xl">
              {featuredOnly ? 'A few of the moments I wanted inside your gift' : 'The memories we made together'}
            </h2>
          </div>
          <div className="rounded-[1.75rem] border border-[#ecd7ca] bg-[#fff8f3] px-5 py-4 text-right">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8d5b4c]">Memories saved</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-[#231815]">{birthdayContent.memoryCount}</p>
          </div>
        </div>

        <div className="memory-spotlight flex gap-4 overflow-x-auto pb-2">
          {spotlightImages.map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="min-w-[12rem] rounded-[1.6rem] border border-white/80 bg-white p-2 shadow-[0_18px_45px_rgba(35,24,21,0.1)] md:min-w-[14rem]"
            >
              <img src={image} alt={`Memory strip ${index + 1}`} className="h-44 w-full rounded-[1.2rem] object-cover md:h-52" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-12">
        {displayMoments.map((moment, index) => {
          const spanClass = moment.colSpan || (featuredOnly
            ? index === 0
              ? 'xl:col-span-7'
              : index === 1
                ? 'xl:col-span-5'
                : 'xl:col-span-12'
            : index % 3 === 0
              ? 'xl:col-span-7'
              : index % 3 === 1
                ? 'xl:col-span-5'
                : 'xl:col-span-6');

          const isFullWidth = spanClass?.includes('col-span-12');

          return (
            <motion.article
              key={moment.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: index * 0.08, duration: 0.8 }}
              onClick={() => openLightbox(moment)}
              className={`group relative cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/70 bg-[#fff9f4] shadow-[0_30px_80px_rgba(35,24,21,0.12)] transition-transform duration-500 hover:-translate-y-2 ${spanClass}`}
            >
              <div className={`grid gap-0 ${isFullWidth ? 'lg:grid-cols-[1.15fr_0.85fr]' : ''}`}>
                <div className={`relative overflow-hidden ${isFullWidth ? 'min-h-[22rem] md:min-h-[26rem] xl:min-h-[30rem]' : 'min-h-[16rem] md:min-h-[20rem] xl:min-h-[24rem]'}`}>
                  <img
                    src={moment.images[0]}
                    alt={moment.title}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231815]/90 via-[#231815]/10 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-white backdrop-blur-xl">
                    {moment.images.length} frame{moment.images.length > 1 ? 's' : ''}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <p className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#ffd6c2]">
                        <Calendar size={14} />
                        {moment.date}
                      </p>
                      <h3 className="max-w-xl text-3xl font-black leading-tight tracking-[-0.03em] md:text-4xl">
                        {moment.title}
                      </h3>
                    </div>
                    <ArrowRight className="shrink-0 transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#8d5b4c]">
                      <MapPin size={16} className="text-[#f05a7e]" />
                      {moment.location}
                    </div>
                    <p className="text-base leading-8 text-[#5f463d] md:text-lg">{moment.description}</p>
                  </div>

                  <div className="mt-6">
                    <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[#8d5b4c]">
                      <ImageIcon size={15} className="text-[#f28f3b]" />
                      Little preview
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {moment.images.slice(0, 3).map((image, previewIndex) => (
                        <div key={`${image}-${previewIndex}`} className="overflow-hidden rounded-[1.2rem] bg-[#f7ebe4]">
                          <img
                            src={image}
                            alt={`${moment.title} preview ${previewIndex + 1}`}
                            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {featuredOnly && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => navigate('/gallery')}
            className="group flex items-center gap-3 rounded-full bg-[#f05a7e] px-8 py-4 text-sm font-black uppercase tracking-[0.28em] text-white shadow-[0_20px_45px_rgba(240,90,126,0.3)] transition-transform hover:-translate-y-1"
          >
            Open every memory
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      )}

      <StoryDetailModal
        item={
          selectedMoment
            ? ({
                title: selectedMoment.title,
                text: selectedMoment.description,
                tag: selectedMoment.date,
                location: selectedMoment.location,
                images: selectedMoment.images,
              } satisfies StoryDetailItem)
            : null
        }
        onClose={closeLightbox}
      />
    </section>
  );
};

export default PhotoGallery;
