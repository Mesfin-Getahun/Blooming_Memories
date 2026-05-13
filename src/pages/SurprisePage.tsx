import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles, PartyPopper, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { birthdayContent } from '../content/birthdayContent';

interface FloatingElement {
  id: number;
  x: string;
  duration: number;
  delay: number;
  size: number;
  icon: 'heart' | 'sparkles';
}

const SurprisePage = () => {
  const navigate = useNavigate();
  const [floatingElements] = useState<FloatingElement[]>(() =>
    Array.from({ length: 15 }, (_, id) => ({
      id,
      x: `${Math.random() * 100}vw`,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      size: Math.random() * 30 + 10,
      icon: id % 2 === 0 ? 'heart' : 'sparkles',
    })),
  );

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

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(135deg,_#f05a7e,_#f28f3b,_#f7c58b)] p-6 text-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            initial={{
              opacity: 0,
              y: '110vh',
              x: element.x,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: '-10vh',
              transition: {
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
              },
            }}
            className="absolute text-white"
          >
            {element.icon === 'heart' ? (
              <Heart size={element.size} fill="currentColor" />
            ) : (
              <Sparkles size={element.size} />
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
        className="relative z-10 max-w-5xl"
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

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-[3rem] border border-white/30 bg-white/20 p-10 shadow-2xl backdrop-blur-lg"
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

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="rounded-[3rem] border border-white/30 bg-[#231815]/20 p-10 text-left text-white shadow-2xl backdrop-blur-lg"
          >
            <p className="text-xs font-black uppercase tracking-[0.38em] text-[#ffe0d0]">Birthday note</p>
            <p className="mt-5 text-xl leading-9 md:text-2xl">
              You are one of the easiest people to celebrate because you bring so much light, softness, and joy into the
              lives around you. This little surprise is just my way of saying you matter, you are loved, and you make life
              better.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SurprisePage;
