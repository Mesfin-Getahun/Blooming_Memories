import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles, PartyPopper, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { birthdayContent } from '../content/birthdayContent';

const SurprisePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const floatingElements = Array.from({ length: 15 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-amber-400 flex flex-col items-center justify-center p-6 overflow-hidden relative text-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        {floatingElements.map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: '110vh',
              x: `${Math.random() * 100}vw`,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: '-10vh',
              transition: {
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              },
            }}
            className="absolute text-white"
          >
            {i % 2 === 0 ? (
              <Heart size={Math.random() * 30 + 10} fill="currentColor" />
            ) : (
              <Sparkles size={Math.random() * 30 + 10} />
            )}
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-8 left-8 z-50 bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30 flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Go Back</span>
      </motion.button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 max-w-4xl"
      >
        <div className="flex justify-center gap-4 mb-8">
          <PartyPopper size={48} className="text-amber-300" />
          <Stars size={48} className="text-white" />
          <PartyPopper size={48} className="text-amber-300" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 drop-shadow-lg font-serif italic">
          {birthdayContent.surpriseTitle}
        </h1>

        <p className="text-xl md:text-3xl text-white font-medium mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Happy birthday, {birthdayContent.recipientName}. I hope this year loves you as deeply and as gently as you
          deserve.
        </p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/20 backdrop-blur-lg p-10 rounded-[3rem] border border-white/30 shadow-2xl"
        >
          <p className="text-white text-2xl md:text-3xl font-serif italic leading-relaxed">
            "{birthdayContent.heroQuote}"
          </p>
          <div className="mt-8 flex justify-center gap-2 text-rose-200">
            <Heart fill="currentColor" />
            <Heart fill="currentColor" />
            <Heart fill="currentColor" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SurprisePage;
