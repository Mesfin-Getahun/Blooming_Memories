import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Camera, Images } from 'lucide-react';
import StoryDetailModal, { type StoryDetailItem } from '../components/StoryDetailModal';

const fullGalleryImages = [
  {
    "title": "Moment on 20251109",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/Screenshot_20251109-210126.jpg",
      "/memories/Screenshot_20251109-210149.jpg"
    ]
  },
  {
    "title": "Moment on 20251119",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/IMG_20251119_114155_052.jpg"
    ]
  },
  {
    "title": "Moment on 20260103",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/IMG_20260103_111826_272.jpg",
      "/memories/IMG_20260103_111831_116.jpg",
      "/memories/IMG_20260103_111832_687.jpg",
      "/memories/IMG_20260103_111837_507.jpg"
    ]
  },
  {
    "title": "Moment on 20260108",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/IMG_20260108_095611_809.jpg",
      "/memories/IMG_20260108_095703_613.jpg",
      "/memories/IMG_20260108_100033_588.jpg",
      "/memories/IMG_20260108_100606_582.jpg"
    ]
  },
  {
    "title": "Moment on 20260113",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/IMG_20260113_180143_644.jpg",
      "/memories/IMG_20260113_181951_772.jpg",
      "/memories/IMG_20260113_182308_278.jpg"
    ]
  },
  {
    "title": "Moment on 20260202",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/Screenshot_20260202-172119.jpg"
    ]
  },
  {
    "title": "Moment on 20260214",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/Screenshot_20260214-180215.jpg"
    ]
  },
  {
    "title": "Moment on 20260218",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/IMG_20260218_132108_998.jpg",
      "/memories/IMG_20260218_132111_067.jpg",
      "/memories/IMG_20260218_151744_913.jpg",
      "/memories/IMG_20260218_151905_018.jpg",
      "/memories/IMG_20260218_152049_854.jpg",
      "/memories/IMG_20260218_152057_688.jpg",
      "/memories/IMG_20260218_152122_415.jpg",
      "/memories/IMG_20260218_170434_507.jpg",
      "/memories/IMG_20260218_181107_063.jpg"
    ]
  },
  {
    "title": "Moment on 20260413",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/Screenshot_20260413-113232.jpg",
      "/memories/Screenshot_20260413-113240.jpg",
      "/memories/Screenshot_20260413-120213.jpg",
      "/memories/Screenshot_20260413-120303.jpg",
      "/memories/Screenshot_20260413-120350.jpg",
      "/memories/Screenshot_20260413-120405.jpg",
      "/memories/Screenshot_20260413-120421.jpg"
    ]
  },
  {
    "title": "Moment on 2026-04-07 (Part 1)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/photo_10_2026-04-07_21-26-29.jpg",
      "/memories/photo_10_2026-04-07_21-26-54.jpg",
      "/memories/photo_10_2026-04-07_21-27-20.jpg",
      "/memories/photo_11_2026-04-07_21-27-20.jpg",
      "/memories/photo_12_2026-04-07_21-27-20.jpg",
      "/memories/photo_13_2026-04-07_21-27-20.jpg",
      "/memories/photo_14_2026-04-07_21-27-20.jpg",
      "/memories/photo_15_2026-04-07_21-27-20.jpg",
      "/memories/photo_16_2026-04-07_21-27-20.jpg"
    ]
  },
  {
    "title": "Moment on 2026-04-07 (Part 2)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/photo_17_2026-04-07_21-27-20.jpg",
      "/memories/photo_18_2026-04-07_21-27-20.jpg",
      "/memories/photo_19_2026-04-07_21-27-20.jpg",
      "/memories/photo_1_2026-04-07_21-26-29.jpg",
      "/memories/photo_1_2026-04-07_21-26-54.jpg",
      "/memories/photo_1_2026-04-07_21-27-03.jpg",
      "/memories/photo_1_2026-04-07_21-27-20.jpg",
      "/memories/photo_20_2026-04-07_21-27-20.jpg",
      "/memories/photo_21_2026-04-07_21-27-20.jpg"
    ]
  },
  {
    "title": "Moment on 2026-04-07 (Part 3)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/photo_22_2026-04-07_21-27-20.jpg",
      "/memories/photo_23_2026-04-07_21-27-20.jpg",
      "/memories/photo_2_2026-04-07_21-26-29.jpg",
      "/memories/photo_2_2026-04-07_21-26-54.jpg",
      "/memories/photo_2_2026-04-07_21-27-03.jpg",
      "/memories/photo_2_2026-04-07_21-27-20.jpg",
      "/memories/photo_3_2026-04-07_21-26-29.jpg",
      "/memories/photo_3_2026-04-07_21-26-54.jpg",
      "/memories/photo_3_2026-04-07_21-27-03.jpg"
    ]
  },
  {
    "title": "Moment on 2026-04-07 (Part 4)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/photo_3_2026-04-07_21-27-20.jpg",
      "/memories/photo_4_2026-04-07_21-26-29.jpg",
      "/memories/photo_4_2026-04-07_21-26-54.jpg",
      "/memories/photo_4_2026-04-07_21-27-03.jpg",
      "/memories/photo_4_2026-04-07_21-27-20.jpg",
      "/memories/photo_5_2026-04-07_21-26-29.jpg",
      "/memories/photo_5_2026-04-07_21-26-54.jpg",
      "/memories/photo_5_2026-04-07_21-27-03.jpg",
      "/memories/photo_5_2026-04-07_21-27-20.jpg"
    ]
  },
  {
    "title": "Moment on 2026-04-07 (Part 5)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/photo_6_2026-04-07_21-26-29.jpg",
      "/memories/photo_6_2026-04-07_21-26-54.jpg",
      "/memories/photo_6_2026-04-07_21-27-03.jpg",
      "/memories/photo_6_2026-04-07_21-27-20.jpg",
      "/memories/photo_7_2026-04-07_21-26-29.jpg",
      "/memories/photo_7_2026-04-07_21-26-54.jpg",
      "/memories/photo_7_2026-04-07_21-27-03.jpg",
      "/memories/photo_7_2026-04-07_21-27-20.jpg",
      "/memories/photo_8_2026-04-07_21-26-29.jpg"
    ]
  },
  {
    "title": "Moment on 2026-04-07 (Part 6)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/photo_8_2026-04-07_21-26-54.jpg",
      "/memories/photo_8_2026-04-07_21-27-03.jpg",
      "/memories/photo_8_2026-04-07_21-27-20.jpg",
      "/memories/photo_9_2026-04-07_21-26-29.jpg",
      "/memories/photo_9_2026-04-07_21-26-54.jpg",
      "/memories/photo_9_2026-04-07_21-27-03.jpg",
      "/memories/photo_9_2026-04-07_21-27-20.jpg"
    ]
  },
  {
    "title": "Snapchat Memories (Part 1)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/Snapchat-1025405750.jpg",
      "/memories/Snapchat-1028650149.jpg",
      "/memories/Snapchat-1034650492.jpg",
      "/memories/Snapchat-1045073573.jpg",
      "/memories/Snapchat-1064943570.jpg",
      "/memories/Snapchat-1100318839.jpg",
      "/memories/Snapchat-1114799599.jpg",
      "/memories/Snapchat-1177643341.jpg",
      "/memories/Snapchat-1306918670.jpg"
    ]
  },
  {
    "title": "Snapchat Memories (Part 2)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/Snapchat-1366819838.jpg",
      "/memories/Snapchat-1402737241.jpg",
      "/memories/Snapchat-1620853624.jpg",
      "/memories/Snapchat-1621509561.jpg",
      "/memories/Snapchat-1658538093.jpg",
      "/memories/Snapchat-1738655121.jpg",
      "/memories/Snapchat-174698694.jpg",
      "/memories/Snapchat-1798796476.jpg",
      "/memories/Snapchat-1835888232.jpg"
    ]
  },
  {
    "title": "Snapchat Memories (Part 3)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/Snapchat-189167645.jpg",
      "/memories/Snapchat-197374908.jpg",
      "/memories/Snapchat-2041685368.jpg",
      "/memories/Snapchat-2091231754.jpg",
      "/memories/Snapchat-211604926.jpg",
      "/memories/Snapchat-239099353.jpg",
      "/memories/Snapchat-33638924.jpg",
      "/memories/Snapchat-391877438.jpg",
      "/memories/Snapchat-463258493.jpg"
    ]
  },
  {
    "title": "Snapchat Memories (Part 4)",
    "description": "Captured together in perfect sync.",
    "category": "Memories",
    "urls": [
      "/memories/Snapchat-5428205.jpg",
      "/memories/Snapchat-746185491 (2).jpg",
      "/memories/Snapchat-766216686.jpg",
      "/memories/Snapchat-892456745.jpg"
    ]
  },
  {
    "title": "Mixed Memories",
    "description": "Random moments that bring a smile.",
    "category": "Mixed",
    "urls": [
      "/memories/-2147483648_-220169.jpg"
    ]
  }
];

const FullGallery: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMoment, setSelectedMoment] = useState<StoryDetailItem | null>(null);

  const openModal = (img: typeof fullGalleryImages[0]) => {
    setSelectedMoment({
      title: img.title,
      text: img.description,
      tag: img.category,
      location: "Full Gallery",
      images: img.urls
    });
  };

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
              onClick={() => openModal(img)}
              className="bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] border border-rose-50 cursor-pointer"
            >
              <div className="relative aspect-[4/5] group overflow-hidden">
                <img 
                  src={img.urls[0]} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {img.urls.length > 1 && (
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                      <Images size={14} />
                      {img.urls.length}
                    </div>
                  )}
                  <div className="bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-rose-500 tracking-wider uppercase">
                    {img.category}
                  </div>
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

      <StoryDetailModal
        item={selectedMoment}
        onClose={() => setSelectedMoment(null)}
      />
    </div>
  );
};

export default FullGallery;