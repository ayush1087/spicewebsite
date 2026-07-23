import React from 'react';
import { Leaf, Palette, Award, Flag, Sparkles, PackageCheck, FlaskConical } from 'lucide-react';
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
      description: '100% natural vibrant pigments from cold-harvested crops.'
    },
    {
      icon: Award,
      title: 'FSSAI Certified',
      description: 'Rigorous 32-parameter laboratory tested for safety.'
    },
    {
      icon: PackageCheck,
      title: 'Hygienically Packed',
      description: 'Automated touch-free packaging process.'
    },
    {
      icon: Flag,
      title: 'Made in India',
      description: 'Supporting high-altitude micro-farmers across 7 states.'
    },
    {
      icon: FlaskConical,
      title: 'Lab Tested',
      description: 'Every batch tested for purity and absolute quality.'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Cold-ground under 30°C to lock in volatile essential oils.'
    }
  ];

  return (
    <section className="py-16 bg-[#F8F8F8] border-y border-gray-200/60 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-nowrap md:flex-wrap md:justify-center overflow-x-auto md:overflow-visible pb-6 md:pb-0 gap-6 text-center snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="snap-center shrink-0 w-[80vw] sm:w-[calc(50%-12px)] md:w-[224px] p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] transition-all flex flex-col items-center space-y-3"
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
        </motion.div>
      </div>
    </section>
  );
};
