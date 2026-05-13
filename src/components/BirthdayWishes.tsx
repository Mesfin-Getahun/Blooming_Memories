import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayContent } from '../content/birthdayContent';

const BirthdayWishes = () => {
  return (
    <section className="rounded-[2.8rem] border border-white/75 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(252,241,234,0.95))] px-4 py-16 shadow-[0_24px_80px_rgba(35,24,21,0.06)] md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-[#fff6f0] px-6 py-3 text-xs font-black uppercase tracking-[0.38em] text-[#8d5b4c] shadow-sm">
            <Sparkles size={16} className="text-[#f28f3b]" />
            Birthday Wishes
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-[#231815] md:text-6xl">
            What I want this new year to bring you
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {birthdayContent.birthdayWishes.map((wish, index) => (
            <motion.article
              key={wish.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[2rem] border border-[#f5e1d7] bg-[#fffaf6] p-8 shadow-[0_20px_45px_rgba(35,24,21,0.05)]"
            >
              <div className="mb-5 flex items-center gap-3 text-[#f05a7e]">
                <Heart size={18} className="fill-current" />
                <span className="text-xs font-black uppercase tracking-[0.35em] text-[#8d5b4c]">{wish.label}</span>
              </div>
              <p className="text-lg leading-8 text-[#5f463d]">{wish.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BirthdayWishes;
