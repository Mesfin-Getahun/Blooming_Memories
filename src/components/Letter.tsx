import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { birthdayContent } from '../content/birthdayContent';

const Letter = () => {
  return (
    <section className="pt-4 pb-12 px-4 bg-rose-50/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-16 rounded-[2rem] shadow-2xl relative border-t-8 border-pink-400"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-lg border-4 border-pink-100">
            <Heart className="text-pink-500 fill-pink-500" size={32} />
          </div>

          <div className="absolute top-8 right-8 text-rose-200 font-bold text-xs tracking-widest uppercase hidden md:block">
            {birthdayContent.celebrationDate}
          </div>

          <div className="space-y-6 text-gray-700 font-serif italic text-lg leading-relaxed">
            <p className="text-2xl font-bold not-italic text-gray-900 mb-8 flex justify-between items-start">
              <span>{birthdayContent.letterGreeting}</span>
              <span className="text-rose-200 text-sm tracking-widest uppercase md:hidden">
                {birthdayContent.celebrationDate}
              </span>
            </p>

            {birthdayContent.letterParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="pt-10">
              <p className="text-xl font-bold not-italic text-pink-600">{birthdayContent.letterClosing}</p>
              <p className="text-2xl font-handwriting">{birthdayContent.letterSignature}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Letter;
