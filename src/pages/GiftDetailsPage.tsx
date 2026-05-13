import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GiftStorySection, { giftStoryCollections } from '../components/GiftStorySection';

const GiftDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffaf5] px-4 pb-20 pt-24 md:px-8">
      <motion.button
        onClick={() => navigate('/')}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/75 bg-white/90 px-5 py-3 text-xs font-black uppercase tracking-[0.28em] text-[#8d5b4c] shadow-[0_16px_35px_rgba(35,24,21,0.08)] md:left-8 md:top-8"
      >
        <ArrowLeft size={16} />
        Back home
      </motion.button>

      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <GiftStorySection
          badge="Birthday Wishes"
          title="The wishes I saved for this year"
          stories={giftStoryCollections.birthdayWishes}
        />
      </div>
    </div>
  );
};

export default GiftDetailsPage;
