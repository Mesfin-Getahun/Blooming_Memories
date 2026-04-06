import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { Heart, PartyPopper, Sparkles, Calendar, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { birthdayContent } from '../content/birthdayContent';

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const yTranslate = useTransform(scrollY, [0, 500], [0, 100]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff69b4', '#ffd700', '#ffffff'],
        disableForReducedMotion: true,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCelebrate = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffd700', '#ffffff'],
    });

    toast.success('Yay!', {
      description: `Something magical is waiting for you, ${birthdayContent.recipientName}!`,
      duration: 2000,
    });

    setTimeout(() => {
      navigate('/surprise');
    }, 1000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 0, rotate: -15, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
        delay: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05 + 0.8,
        type: 'spring',
        stiffness: 150,
        damping: 10,
      },
    }),
  };

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden pt-10 pb-20">
      <motion.div
        style={{ y: yTranslate, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/floral-bg-dc9a9f67-1774801842787.webp"
          alt="Background Pattern"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fffdfa]" />
      </motion.div>

      <AnimatePresence>
        {isLoaded &&
          [...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0, Math.random() + 0.5, 0],
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 800,
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
              className="absolute z-0 text-pink-200 pointer-events-none"
            >
              <Star size={Math.random() * 15 + 10} fill="currentColor" />
            </motion.div>
          ))}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        className="z-10 max-w-6xl w-full flex flex-col items-center px-4"
      >
        <motion.div variants={itemVariants} className="mb-8 flex items-center gap-3">
          <div className="h-[1px] w-12 bg-rose-200" />
          <span className="px-5 py-2 bg-rose-50 text-rose-500 rounded-full text-xs md:text-sm font-black tracking-[0.3em] uppercase flex items-center gap-2 shadow-sm border border-rose-100/50">
            <Calendar size={14} className="mb-0.5" />
            {birthdayContent.celebrationDate}
          </span>
          <div className="h-[1px] w-12 bg-rose-200" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10 w-full">
          <motion.div variants={imageVariants} className="relative group order-2 md:order-1">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, -1, 1, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              <img
                src={birthdayContent.moments[0]?.images[0] ?? '/gebeya.webp'}
                alt={birthdayContent.recipientName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
                rotate: [0, -15, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
              className="absolute -top-6 -left-6 bg-pink-400 p-4 rounded-2xl shadow-xl text-white z-20"
            >
              <Heart size={28} className="fill-current" />
            </motion.div>
          </motion.div>

          <motion.div variants={imageVariants} className="relative group order-1 md:order-2">
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 1, -1, 0],
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              <img
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/birthday-cake-with-candles-4f589466-1774810995521.webp"
                alt="Beautiful Birthday Cake"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
                rotate: [0, 15, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-rose-500 p-4 rounded-2xl shadow-xl text-white z-20"
            >
              <Sparkles size={28} />
            </motion.div>
          </motion.div>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 font-serif tracking-tighter leading-none mb-4 flex flex-wrap justify-center gap-x-3">
            <span className="flex">
              {'Happy'.split('').map((char, i) => (
                <motion.span key={i} custom={i} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="flex">
              {'Birthday'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i + 5}
                  variants={letterVariants}
                  className="inline-block text-rose-500 italic"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.span variants={itemVariants} className="text-3xl md:text-5xl font-black text-pink-400 tracking-tight">
            {birthdayContent.relationshipLabel} {birthdayContent.recipientName}!
          </motion.span>
        </div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto italic font-serif leading-relaxed px-6"
        >
          &quot;{birthdayContent.heroQuote}&quot;
        </motion.p>

        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000" />
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(244, 63, 94, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCelebrate}
            className="relative px-10 py-5 bg-rose-500 text-white rounded-full font-bold text-xl shadow-lg flex items-center gap-4 mx-auto"
          >
            <PartyPopper size={24} className="group-hover:rotate-12 transition-transform" />
            <span>Open Your Surprise</span>
            <Heart size={24} className="group-hover:scale-125 transition-transform fill-current" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-bold uppercase tracking-widest opacity-60">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-rose-200 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
