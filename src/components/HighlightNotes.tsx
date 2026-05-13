import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayContent } from '../content/birthdayContent';

const HighlightNotes = () => {
  return (
    <section className="rounded-[2.8rem] border border-white/70 bg-[linear-gradient(180deg,_rgba(255,251,247,0.95),_rgba(249,238,231,0.88))] px-4 py-16 shadow-[0_24px_80px_rgba(35,24,21,0.06)] md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-6 py-3 text-xs font-black uppercase tracking-[0.4em] text-[#8d5b4c] shadow-sm">
            <Sparkles size={16} className="text-[#f05a7e]" />
            Why She Is Unforgettable
          </div>
          <h2 className="text-4xl font-black tracking-[-0.04em] text-[#231815] md:text-7xl">
            The little things that make her magic
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {birthdayContent.highlightNotes.map((note, index) => (
            <motion.article
              key={note.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-[0_24px_50px_rgba(35,24,21,0.08)]"
            >
              <Heart size={20} className="mb-5 fill-current text-[#f05a7e]" />
              <h3 className="mb-4 text-2xl font-bold tracking-tight text-[#231815]">{note.title}</h3>
              <p className="text-base leading-7 text-[#5f463d]">{note.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightNotes;
