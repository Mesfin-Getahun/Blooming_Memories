import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        toast.success('Playing birthday beats', {
          description: "Enjoy the vibes, bestie!",
          icon: <Music className="text-pink-500" />,
        });
      } catch {
        toast.error('Click again to enable sound');
      }
      return;
    }

    audio.pause();
    toast.info('Music paused', { icon: <VolumeX className="text-gray-500" /> });
  };

  return (
    <div className="fixed bottom-8 right-8 z-[250]">
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="bg-white/95 backdrop-blur-2xl p-4 md:p-5 rounded-full shadow-[0_10px_40px_rgba(244,63,94,0.3)] border border-pink-100 text-pink-600 flex flex-row-reverse items-center gap-3 group transition-all"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -45 }}
              className="relative"
            >
              <Volume2 size={28} />
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-pink-400 rounded-full -z-10"
              />
              <motion.div
                animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-rose-300 rounded-full -z-10"
              />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <VolumeX size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-700 ease-in-out whitespace-nowrap text-sm font-black tracking-widest uppercase px-0 group-hover:px-2">
          {isPlaying ? "Bestie's Soundtrack" : 'Play the Magic'}
        </span>
      </motion.button>

      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3"
      />
    </div>
  );
};

export default MusicPlayer;
