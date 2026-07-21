import React from 'react';
import { Leaf, Palette, Award, Flag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustSection: React.FC = () => {
  const trustItems = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Zero fillers, unrefined, and free from synthetic preservatives.'
    },
    {
      icon: Palette,
      title: 'No Artificial Colors',
      description: '100% natural vibrant pigments straight from cold-harvested crops.'
    },
    {
      icon: Award,
      title: 'FSSAI Certified',
      description: 'Rigorous 32-parameter laboratory tested for pesticide residue.'
    },
    {
      icon: Flag,
      title: 'Made in India',
      description: 'Supporting high-altitude micro-farmers across 7 states.'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Cold-ground under 30°C to lock in volatile essential oils.'
    }
  ];

  return (
    <section className="py-16 bg-[#F8F8F8] border-y border-gray-200/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#C9A227]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
