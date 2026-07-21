import React from 'react';
import { Hand, Hammer, Flame, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Hand,
      title: 'Hand Selected Ingredients',
      description: 'Micro-batches hand sorted by certified spice masters to remove discolored stems or debris.'
    },
    {
      icon: Hammer,
      title: 'Stone Ground Milling',
      description: 'Cold granite stone mills run slowly to prevent frictional heating and preserve essential oils.'
    },
    {
      icon: Flame,
      title: 'Maximum Freshness',
      description: 'Milled within 72 hours of shipment and sealed in triple-laminate oxygen-barrier foil.'
    },
    {
      icon: ShieldAlert,
      title: 'Traditional Processing',
      description: 'Zero chemical bleaching, zero artificial dyes, and zero synthetic anti-caking agents.'
    },
    {
      icon: Sparkles,
      title: 'Lab Tested Purity',
      description: 'Every batch tested for heavy metals, aflatoxins, and 100+ pesticide residues.'
    },
    {
      icon: CheckCircle2,
      title: 'Rich Volatile Aroma',
      description: 'Double essential oil concentration compared to mass commercial brands.'
    }
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Storytelling Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <img
                src="/images/kashmiri-chilli.png"
                alt="Traditional Milling"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex flex-col justify-end text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
                  The Craftsmanship
                </span>
                <h3 className="text-2xl font-bold font-serif-luxury">
                  "Real spice aroma cannot be simulated in a factory."
                </h3>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 p-4 bg-[#111111] text-white rounded-2xl shadow-xl z-20 hidden sm:block border border-amber-900/30">
              <p className="text-xs font-bold text-[#C9A227]">7.5% Curcumin</p>
              <p className="text-[11px] text-gray-300">Certified by NABL Accredited Labs</p>
            </div>
          </div>

          {/* Right Column: Features Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
                Uncompromising Standards
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mt-1 leading-tight">
                Why CROF Outperforms Commercial Brands
              </h2>
              <p className="text-sm text-gray-600 font-light mt-3 leading-relaxed">
                Most mass market spice brands pulverize high volumes at high speed, heating spices up to 90°C and burning away essential oils. CROF honors centuries-old slow milling traditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="p-5 rounded-2xl bg-[#F8F8F8] border border-gray-100 space-y-2 hover:border-amber-200 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-gray-900">{f.title}</h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      {f.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
