import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import HighlightNotes from '../components/HighlightNotes';
import Letter from '../components/Letter';
import { birthdayContent } from '../content/birthdayContent';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ scale }}
      className="relative z-10 bg-[#fffdfa] origin-top"
    >
      <Hero />

      <motion.div variants={itemVariants} className="mt-2 mb-8">
        <PhotoGallery featuredOnly />
      </motion.div>

      <motion.div variants={itemVariants}>
        <HighlightNotes />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Letter />
      </motion.div>

      <footer className="py-10 text-center relative overflow-hidden">
        <div className="max-w-md mx-auto mb-6 h-px bg-pink-100" />
        <div className="space-y-4">
          <p className="text-gray-400 text-sm tracking-widest uppercase font-bold">Made with Love</p>
          <h5 className="text-3xl font-serif font-black text-gray-800 italic">For {birthdayContent.recipientName}</h5>
          <p className="text-pink-400 font-bold">(c) {new Date().getFullYear()} Forever Friends</p>
          <div className="flex justify-center gap-4 mt-6 text-rose-200">
            <Heart size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Heart size={20} fill="currentColor" />
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
