import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Play, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden font-sans">
      {/* Background Subtle Luxury Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-amber-100/40 via-yellow-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Spice Pouch Mock Cards */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute top-44 left-12 w-52 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-2xl pointer-events-auto cursor-pointer hover:scale-105 transition-transform animate-float"
        onClick={() => setActivePage('shop')}
      >
        <img
          src="/images/lakadong-turmeric.png"
          alt="Lakadong Turmeric"
          className="w-full h-36 object-cover rounded-xl mb-2"
        />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-[#C9A227]">7.5% Curcumin</p>
            <h4 className="text-xs font-bold text-gray-900">Lakadong Turmeric</h4>
          </div>
          <span className="text-xs font-bold text-gray-900">₹399</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 18, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden lg:block absolute bottom-24 right-12 w-56 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-2xl pointer-events-auto cursor-pointer hover:scale-105 transition-transform animate-float"
        onClick={() => setActivePage('shop')}
      >
        <img
          src="/images/kashmiri-chilli.png"
          alt="Kashmiri Red Chilli"
          className="w-full h-40 object-cover rounded-xl mb-2"
        />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-red-500">Natural Crimson</p>
            <h4 className="text-xs font-bold text-gray-900">Kashmiri Red Chilli</h4>
          </div>
          <span className="text-xs font-bold text-gray-900">₹349</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Heritage Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-[#C9A227] text-xs font-semibold uppercase tracking-widest shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Single-Origin Cold Ground Spices
        </motion.div>

        {/* Monumental Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#111111] leading-[1.05]">
            Pure Taste. <br />
            <span className="text-gold-gradient font-serif-luxury italic">Pure Aroma.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Authentic single-origin spices harvested from high-altitude micro-farms and cold-ground to preserve vital essential oils for modern kitchens.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={() => setActivePage('shop')}
            className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#C9A227] transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setActivePage('about')}
            className="w-full sm:w-auto px-8 py-4 bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
          >
            <Play className="w-4 h-4 text-[#C9A227] fill-current" />
            Watch Story
          </button>
        </motion.div>

        {/* Floating Hero Feature Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-left border-t border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">100% Lab Tested</p>
              <p className="text-[11px] text-gray-500">Zero synthetic dyes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Cold Stone Ground</p>
              <p className="text-[11px] text-gray-500">Volatiles preserved</p>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">FSSAI Certified</p>
              <p className="text-[11px] text-gray-500">Highest food standard</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
