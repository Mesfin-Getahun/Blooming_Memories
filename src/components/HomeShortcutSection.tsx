import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Birthday Wishes',
    text: 'Open the wishes section and read each one in the same card detail style.',
    href: '/gift-details',
    icon: Heart,
    button: 'Open wishes',
  },
];

const HomeShortcutSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 md:px-8">
      <div className="grid gap-5 md:grid-cols-1">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[2.2rem] border border-white/75 bg-white/80 p-6 shadow-[0_20px_55px_rgba(35,24,21,0.08)] backdrop-blur-xl md:p-8"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-[#fff2ea] p-4 text-[#f05a7e]">
                <Icon size={22} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-[#231815] md:text-3xl">{card.title}</h2>
              <p className="mt-3 text-base leading-7 text-[#5f463d]">{card.text}</p>
              <Link
                to={card.href}
                className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#231815] px-6 py-3 text-xs font-black uppercase tracking-[0.28em] text-white transition-colors hover:bg-[#f05a7e]"
              >
                {card.button}
                <ArrowRight size={16} />
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default HomeShortcutSection;
