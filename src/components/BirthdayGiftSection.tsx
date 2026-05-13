import React from 'react';
import { motion } from 'framer-motion';
import { Gift, HeartHandshake, Sparkles, Stars } from 'lucide-react';
import { birthdayContent } from '../content/birthdayContent';

const icons = [Gift, HeartHandshake, Stars];

const BirthdayGiftSection = () => {
  return (
    <section className="rounded-[2.8rem] border border-white/70 bg-[linear-gradient(135deg,_rgba(255,248,241,0.96),_rgba(252,236,228,0.92)_45%,_rgba(255,245,234,0.98))] px-4 py-16 shadow-[0_24px_80px_rgba(35,24,21,0.08)] md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-6 py-3 text-xs font-black uppercase tracking-[0.38em] text-[#8d5b4c] shadow-sm">
            <Sparkles size={16} className="text-[#f05a7e]" />
            Birthday Gift
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-[#231815] md:text-6xl">
            More than a website. A little gift wrapped in our memories.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5f463d] md:text-xl">{birthdayContent.giftIntro}</p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {birthdayContent.giftPromises.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/85 bg-white/85 p-8 shadow-[0_22px_50px_rgba(35,24,21,0.07)]"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-[#fff2ea] p-4 text-[#f05a7e]">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#231815]">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#5f463d]">{item.text}</p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-[2.2rem] border border-[#f2d8cc] bg-[#231815] px-6 py-7 text-center text-white shadow-[0_24px_60px_rgba(35,24,21,0.2)] md:px-10"
        >
          <p className="text-xs font-black uppercase tracking-[0.4em] text-[#ffcfbc]">Birthday ribbon note</p>
          <p className="mt-4 text-2xl font-black leading-relaxed tracking-tight md:text-3xl">
            {birthdayContent.giftRibbon}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdayGiftSection;
