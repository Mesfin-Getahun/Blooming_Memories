import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { birthdayContent } from '../content/birthdayContent';

const Letter = () => {
  return (
    <section className="pb-12 pt-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] border border-white/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(250,239,233,0.92))] p-8 shadow-[0_28px_90px_rgba(35,24,21,0.08)] md:p-16"
        >
          <div className="absolute inset-x-0 top-0 h-3 rounded-t-[2.5rem] bg-[linear-gradient(90deg,_#f05a7e,_#f28f3b,_#ffd6a5)]" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full border-4 border-[#fff1ea] bg-white p-4 shadow-lg">
            <Heart className="fill-[#f05a7e] text-[#f05a7e]" size={32} />
          </div>

          <div className="absolute right-8 top-8 hidden text-xs font-bold uppercase tracking-widest text-[#d6aea0] md:block">
            {birthdayContent.celebrationDate}
          </div>

          <div className="space-y-6 text-lg italic leading-relaxed text-[#5f463d]">
            <p className="mb-8 flex items-start justify-between text-2xl font-bold not-italic text-[#231815]">
              <span>{birthdayContent.letterGreeting}</span>
              <span className="text-sm uppercase tracking-widest text-[#d6aea0] md:hidden">
                {birthdayContent.celebrationDate}
              </span>
            </p>

            {birthdayContent.letterParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="pt-10">
              <p className="text-xl font-bold not-italic text-[#f05a7e]">{birthdayContent.letterClosing}</p>
              <p className="text-2xl font-handwriting">{birthdayContent.letterSignature}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Letter;
