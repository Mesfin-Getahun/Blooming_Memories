import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Camera } from 'lucide-react';

const fullGalleryImages = [
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/bestie-1-7a559248-1774801843407.webp',
    title: 'Pure Happiness',
    description: 'The day we laughed until our stomachs hurt. I will never forget that day.',
    category: 'Laughs'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/bestie-2-179a9015-1774801843408.webp',
    title: 'Adventures Await',
    description: 'Every path is better when we walk it together. Our random city walks are my favorite.',
    category: 'Travel'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/bestie-3-cd2440bf-1774801849567.webp',
    title: 'Sunset Dreams',
    description: 'Watching the sky change colors and dreaming about our big future plans.',
    category: 'Peace'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/memory-lane-montage-c2b320ff-1774802491222.webp',
    title: 'Bestie Bonding',
    description: 'The little moments that make our friendship so strong and unbreakable.',
    category: 'Love'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/adventure-gallery-overlay-cc9ec8ce-1774802490920.webp',
    title: 'Pinned Memories',
    description: 'A collection of all the polaroids we took and the tickets we saved.',
    category: 'Scrapbook'
  },
  {
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/heartfelt-letter-aesthetic-445f93e6-1774802491343.webp',
    title: 'Deep Talks',
    description: 'The late night conversations that mean more than anything else.',
    category: 'Soul'
  }
];

const FullGallery: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-rose-500 font-bold hover:text-rose-600 transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-800 flex items-center gap-2">
            <Camera className="text-rose-500" />
            Our Memory Book
          </h1>
          <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center">
            <Heart className="text-rose-400 fill-rose-400" size={20} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4"
          >
            Every Moment Matters
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            A curated collection of our favorite snapshots and the stories behind them. 
            Because every picture with you is a treasure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {fullGalleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] border border-rose-50"
            >
              <div className="relative aspect-[4/5] group overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-rose-500 tracking-wider uppercase">
                  {img.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{img.title}</h3>
                <p className="text-gray-600 leading-relaxed italic">"{img.description}"</p>
                <div className="mt-6 flex items-center gap-2 text-rose-400">
                  <Heart size={16} fill="currentColor" />
                  <Heart size={16} fill="currentColor" />
                  <Heart size={16} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FullGallery;