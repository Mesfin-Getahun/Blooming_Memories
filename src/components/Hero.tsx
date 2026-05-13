import React, { useEffect, useState } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CakeSlice, Camera, Heart, PartyPopper, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { birthdayContent } from '../content/birthdayContent';

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 90]);
  const opacity = useTransform(scrollY, [0, 360], [1, 0.3]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoaded(true);
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.75 },
        colors: ['#f05a7e', '#ffb84d', '#fff2d8'],
        disableForReducedMotion: true,
      });
    }, 350);

    return () => window.clearTimeout(timer);
  }, []);

  const handleCelebrate = () => {
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.62 },
      colors: ['#f05a7e', '#f28f3b', '#fff2d8', '#8d5b4c'],
    });

    toast.success('Memory lane unlocked', {
      description: `The surprise is ready for ${birthdayContent.recipientName}.`,
      duration: 2200,
    });

    window.setTimeout(() => navigate('/surprise'), 900);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const heroImage = birthdayContent.heroMontage[0] ?? birthdayContent.allMemoryImages[0] ?? '/gebeya.webp';

  return (
    <section className="relative isolate overflow-hidden px-4 pb-14 pt-6 md:px-8 md:pb-20 md:pt-10">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(255,243,224,0.95),_rgba(255,250,245,0.92)_36%,_rgba(248,229,221,0.8)_70%,_rgba(233,214,207,0.45)_100%)]" />
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[6%] h-72 w-72 rounded-full bg-[#f6b26b]/30 blur-3xl" />
        <div className="absolute right-[-5%] top-[10%] h-96 w-96 rounded-full bg-[#f05a7e]/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-80 w-80 rounded-full bg-[#f8e0c8] blur-3xl" />
        <div className="memory-grid absolute inset-x-0 top-0 h-full opacity-40" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        className="mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center gap-8"
      >
        <motion.div variants={itemVariants} className="relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="absolute -inset-5 rounded-[3rem] bg-[radial-gradient(circle,_rgba(240,90,126,0.18),_transparent_70%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-white bg-white shadow-[0_30px_80px_rgba(35,24,21,0.16)]">
            <img src={heroImage} alt={birthdayContent.recipientName} className="h-[26rem] w-full object-cover md:h-[32rem]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(35,24,21,0.15)_55%,_rgba(35,24,21,0.45)_100%)]" />
            <div className="absolute left-4 top-4 rounded-full bg-[#f05a7e] px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-lg">
              Happy Birthday
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-[1.6rem] border border-white/30 bg-white/18 p-4 text-left text-white backdrop-blur-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#ffe2d3]">{birthdayContent.introBadge}</p>
              <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">
                Happy Birthday, my bestie
              </h1>
              <p className="mt-2 text-sm leading-6 text-white/88 md:text-base">{birthdayContent.recipientName}, today is all about you.</p>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-3 -top-4 rounded-[1.6rem] bg-[#fff7ef] px-4 py-3 text-[#f28f3b] shadow-[0_18px_35px_rgba(242,143,59,0.22)]"
          >
            <CakeSlice size={28} />
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute -left-3 bottom-24 rounded-full bg-white p-3 text-[#f05a7e] shadow-[0_18px_35px_rgba(240,90,126,0.18)]"
          >
            <PartyPopper size={24} />
          </motion.div>
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/75 px-5 py-2 text-[11px] font-black uppercase tracking-[0.35em] text-[#8d5b4c] shadow-[0_14px_35px_rgba(141,91,76,0.08)] backdrop-blur-xl"
          >
            <Sparkles size={15} className="text-[#f05a7e]" />
            {birthdayContent.introBadge}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mx-auto max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.04em] text-[#231815] md:text-6xl"
          >
            Happy birthday to the bestie who makes every memory feel special.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5f463d] md:text-lg"
          >
            A tiny birthday surprise made with love, laughter, and our favorite moments together.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCelebrate}
              className="group flex items-center gap-3 rounded-full bg-[#231815] px-7 py-4 text-sm font-black uppercase tracking-[0.28em] text-[#fff7f1] shadow-[0_20px_45px_rgba(35,24,21,0.24)] transition-colors hover:bg-[#f05a7e]"
            >
              <PartyPopper size={18} />
              Open the surprise
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              href="#memory-gallery"
              className="flex items-center gap-3 rounded-full border border-[#d8b4a4] bg-white/80 px-7 py-4 text-sm font-black uppercase tracking-[0.28em] text-[#8d5b4c] shadow-[0_16px_35px_rgba(141,91,76,0.08)] backdrop-blur-xl"
            >
              <Camera size={18} />
              Open our memories
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
