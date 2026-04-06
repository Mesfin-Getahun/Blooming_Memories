import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const FloatingDecorations = () => {
  const elements = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: '100vh', 
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: '-10vh',
            transition: { 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }
          }}
          className="absolute text-pink-300/20"
        >
          {i % 2 === 0 ? <Heart size={20} fill="currentColor" /> : <Sparkles size={24} />}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingDecorations;