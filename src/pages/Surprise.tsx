import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Star, PartyPopper, Home as HomeIcon, Gift, MousePointer2 } from 'lucide-react';

const Surprise: React.FC = () => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isOpened) {
      // Massive explosion of confetti when opened
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      const fire = (particleRatio: number, opts: any) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });

      // Continuous smaller bursts
      const interval = setInterval(() => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff1493', '#ffd700']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff1493', '#ffd700']
        });
      }, 1500);

      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [isOpened]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-center relative overflow-hidden px-4 py-20">
      {/* Animated Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 2000 - 1000, 
            y: Math.random() * 2000 - 1000 
          }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            x: [Math.random() * 2000 - 1000, Math.random() * 2000 - 1000],
            y: [Math.random() * 2000 - 1000, Math.random() * 2000 - 1000],
            scale: [1, 1.5, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute text-pink-300/30 pointer-events-none"
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%` 
          }}
        >
          {i % 4 === 0 ? <Heart size={Math.random() * 30 + 10} /> : 
           i % 4 === 1 ? <Sparkles size={Math.random() * 30 + 10} /> : 
           i % 4 === 2 ? <Star size={Math.random() * 30 + 10} /> : 
           <PartyPopper size={Math.random() * 30 + 10} />}
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="magic-box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 5, opacity: 0, filter: 'blur(20px)' }}
            transition={{ type: "spring", damping: 15 }}
            className="flex flex-col items-center gap-8 cursor-pointer group"
            onClick={() => setIsOpened(true)}
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 5, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 bg-pink-500/20 blur-[100px] rounded-full group-hover:bg-pink-500/40 transition-colors" />
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/magical-surprise-box-a4471704-1774906352805.webp"
                alt="Magic Gift Box"
                className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-[3rem] shadow-[0_0_50px_rgba(255,20,147,0.3)] border-4 border-white/20 group-hover:scale-105 transition-transform duration-500"
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-full shadow-2xl text-pink-600"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <MousePointer2 size={32} />
              </motion.div>
            </motion.div>
            
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">
                Something AMAZING for Merrye...
              </h2>
              <p className="text-pink-300 text-xl font-serif italic animate-pulse">
                (Click to open your special surprise!)
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed-content"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="max-w-5xl w-full z-20 flex flex-col items-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-amber-200 mb-6 drop-shadow-2xl">
                SURPRISE BESTIE! 💖
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl md:text-3xl text-white/90 font-serif italic max-w-3xl mx-auto leading-relaxed"
              >
                "Merrye, you are the magic in every single day. 
                I wanted to give you a moment as beautiful and unexpected as your friendship is to me."
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative w-full aspect-[16/9] max-h-[600px] overflow-hidden rounded-[4rem] shadow-[0_0_100px_rgba(255,105,180,0.2)] border-8 border-white/10"
            >
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/df88d20c-57ed-4e6c-80f0-6229741cdc32/best-friends-on-the-moon-93cb4c59-1774906348316.webp"
                alt="Magical Moment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-8 md:bottom-16 md:left-16"
              >
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 max-w-sm">
                  <Heart className="text-rose-400 fill-rose-400 mb-2" size={24} />
                  <p className="text-white text-lg font-medium leading-tight">
                    "Distance may be there, but in my heart, we're always sitting on the moon together."
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-12 flex flex-col md:flex-row gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="px-10 py-5 bg-white text-rose-600 rounded-full font-bold text-xl shadow-2xl flex items-center justify-center gap-3"
              >
                <HomeIcon size={24} />
                Love this! Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,20,147,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/gallery')}
                className="px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold text-xl shadow-2xl flex items-center justify-center gap-3 border-2 border-white/20"
              >
                <Sparkles size={24} />
                Our Memories
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Surprise;