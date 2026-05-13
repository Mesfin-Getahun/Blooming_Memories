import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: string;
  scale: number;
  duration: number;
  delay: number;
}

const FloatingDecorations = () => {
  const [elements] = useState<FloatingElement[]>(() =>
    Array.from({ length: 15 }, (_, id) => ({
      id,
      x: `${Math.random() * 100}vw`,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    })),
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element, i) => (
        <motion.div
          key={element.id}
          initial={{
            opacity: 0,
            y: '100vh',
            x: element.x,
            scale: element.scale,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: '-10vh',
            transition: {
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
            },
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
