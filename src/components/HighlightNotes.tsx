import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayContent } from '../content/birthdayContent';

const HighlightNotes = () => {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white text-rose-500 px-6 py-3 rounded-full mb-6 font-black text-xs uppercase tracking-[0.4em] shadow-sm border border-rose-100">
            <Sparkles size={16} />
            Why She Is Unforgettable
          </div>
          <h2 className="text-4xl md:text-7xl font-serif font-black text-gray-900 tracking-tight">
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
              className="rounded-[2rem] border border-rose-100 bg-white/90 p-8 shadow-[0_20px_45px_rgba(244,63,94,0.08)]"
            >
              <Heart size={20} className="mb-5 text-rose-400 fill-current" />
              <h3 className="mb-4 text-2xl font-serif font-bold text-gray-900">{note.title}</h3>
              <p className="text-base leading-7 text-gray-600">{note.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightNotes;
