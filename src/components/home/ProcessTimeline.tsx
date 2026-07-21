import React from 'react';
import { Sprout, Filter, Hammer, TestTube, PackageCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Farm Harvest',
      subtitle: 'High-altitude micro-farms in Kashmir, Meghalaya & Malwa',
      icon: Sprout
    },
    {
      number: '02',
      title: 'Manual Cleaning',
      subtitle: 'Air cleaning and triple sorting for 100% foreign matter removal',
      icon: Filter
    },
    {
      number: '03',
      title: 'Cold Stone Grinding',
      subtitle: 'Milled under 30°C in traditional granite slow-run mills',
      icon: Hammer
    },
    {
      number: '04',
      title: 'Lab Quality Testing',
      subtitle: 'Spectrophotometric curcumin & piperine batch certification',
      icon: TestTube
    },
    {
      number: '05',
      title: 'Airtight Foil Packaging',
      subtitle: 'Quad-layer zipper pouches preserving aroma for 12+ months',
      icon: PackageCheck
    },
    {
      number: '06',
      title: 'Express Delivery',
      subtitle: 'Shipped direct from estate to kitchen doorstep in 48-72 hours',
      icon: Truck
    }
  ];

  return (
    <section className="py-24 bg-[#111111] text-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            From Soil To Plate
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury tracking-tight">
            Our Uncompromising 6-Step Process
          </h2>
          <p className="text-sm text-gray-400 font-light">
            Every gram of CROF spice follows a traceable, transparent journey designed to maintain maximum volatile essential oils.
          </p>
        </div>

        {/* Timeline Horizontal Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A227] transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#C9A227] font-serif-luxury">
                    {s.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-[#C9A227] group-hover:text-[#111111] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-white">{s.title}</h3>
                  <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                    {s.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
