import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import Letter from '../components/Letter';
import HomeShortcutSection from '../components/HomeShortcutSection';

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
      className="relative z-10 origin-top"
    >
      <Hero />

      <motion.div variants={itemVariants}>
        <HomeShortcutSection />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-2 mb-10">
        <PhotoGallery featuredOnly />
      </motion.div>

      <motion.div variants={itemVariants} className="px-4 md:px-8">
        <Letter />
      </motion.div>

      <footer className="relative overflow-hidden px-4 py-16 text-center md:px-8">
        <div className="mx-auto mb-6 h-px max-w-md bg-[#e2c9bd]" />
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#8d5b4c]">Made with love</p>
          <h5 className="text-3xl font-black italic text-[#231815] md:text-4xl">For My Bestie</h5>
          <p className="font-bold text-[#f05a7e]">&copy; {new Date().getFullYear()} Forever Friends</p>
          <div className="mt-6 flex justify-center gap-4 text-[#d8b4a4]">
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
