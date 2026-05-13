import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, MapPin, Sparkles } from 'lucide-react';
import { birthdayContent } from '../content/birthdayContent';
import StoryDetailModal, { type StoryDetailItem } from './StoryDetailModal';

type StoryCard = {
  id: string;
  title: string;
  text: string;
  tag: string;
  location: string;
  images: string[];
};

type GiftStorySectionProps = {
  badge: string;
  title: string;
  stories: StoryCard[];
};

const pickImages = (start: number, size: number) => {
  const images = birthdayContent.allMemoryImages.slice(start, start + size);
  return images.length > 0 ? images : birthdayContent.allMemoryImages.slice(0, Math.max(size, 1));
};

export const giftStoryCollections = {
  birthdayWishes: birthdayContent.birthdayWishes.map((wish, index) => ({
    id: `wish-${index + 1}`,
    title: wish.label,
    text: wish.text,
    tag: 'Birthday wish',
    location: index === 0 ? 'For this year' : index === 1 ? 'For the future' : 'For us',
    images: pickImages(24 + index * 3, 4),
  })),
} as const;

const GiftStorySection = ({ badge, title, stories }: GiftStorySectionProps) => {
  const [selectedStory, setSelectedStory] = useState<StoryCard | null>(null);

  const openStory = (story: StoryCard) => {
    setSelectedStory(story);
  };

  const closeStory = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedStory(null);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 md:px-8 md:pb-24">
      <div className="mb-12 rounded-[2.5rem] border border-white/70 bg-white/70 p-5 shadow-[0_25px_80px_rgba(35,24,21,0.08)] backdrop-blur-xl md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-[#fdf1e8] px-4 py-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#8d5b4c]">
              <Sparkles size={14} className="text-[#f05a7e]" />
              {badge}
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[#231815] md:text-6xl">{title}</h2>
          </div>
          <div className="rounded-[1.75rem] border border-[#ecd7ca] bg-[#fff8f3] px-5 py-4 text-right">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8d5b4c]">Wishes saved</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-[#231815]">{stories.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-12">
          {stories.map((story, index) => {
            const spanClass =
              index % 3 === 0 ? 'xl:col-span-7' : index % 3 === 1 ? 'xl:col-span-5' : 'xl:col-span-6';

            return (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: index * 0.08, duration: 0.75 }}
                onClick={() => openStory(story)}
                className={`group cursor-pointer overflow-hidden rounded-[2.4rem] border border-white/80 bg-[#fff9f4] shadow-[0_28px_70px_rgba(35,24,21,0.1)] transition-transform duration-500 hover:-translate-y-2 ${spanClass}`}
              >
                <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                  <div className="relative min-h-[18rem] overflow-hidden md:min-h-[22rem]">
                    <img src={story.images[0]} alt={story.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231815]/82 via-[#231815]/8 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-white backdrop-blur-xl">
                      {story.images.length} details
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.32em] text-[#ffd6c2]">{story.tag}</p>
                      <h3 className="text-3xl font-black leading-tight tracking-[-0.03em] md:text-4xl">{story.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#8d5b4c]">
                        <MapPin size={16} className="text-[#f05a7e]" />
                        {story.location}
                      </div>
                      <p className="text-base leading-8 text-[#5f463d] md:text-lg">{story.text}</p>
                    </div>

                    <div className="mt-6">
                      <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[#8d5b4c]">
                        <ImageIcon size={15} className="text-[#f28f3b]" />
                        Little preview
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {story.images.slice(0, 3).map((image, previewIndex) => (
                          <div key={`${story.id}-${previewIndex}`} className="overflow-hidden rounded-[1.2rem] bg-[#f7ebe4]">
                            <img
                              src={image}
                              alt={`${story.title} preview ${previewIndex + 1}`}
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
      </div>

      <StoryDetailModal item={selectedStory as StoryDetailItem | null} onClose={closeStory} />
    </section>
  );
};

export default GiftStorySection;
