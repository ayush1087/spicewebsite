import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutPage: React.FC = () => {
  const timeline = [
    { year: '2019', title: 'The Soil Discovery', text: 'Traversed Kashmir & Meghalaya to map micro-farms with natural high curcumin.' },
    { year: '2021', title: 'Granite Stone Mill Lab', text: 'Established cold stone grinding unit operating under 30°C low heat.' },
    { year: '2024', title: 'National Recognition', text: 'Certified 100% pesticide-free across 32 safety parameters by NABL.' },
    { year: '2026', title: 'Global Reserve House', text: 'Exporting single-origin Indian spices to over 14 countries worldwide.' }
  ];

  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            Our Story & Heritage
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif-luxury text-gray-900 leading-tight">
            "We refuse to compromise on the purity of Indian soil."
          </h1>
          <p className="text-sm text-gray-600 font-light leading-relaxed">
            CROF was founded to restore real aroma to modern cooking by rejecting high-speed commercial grinding and artificial coloring.
          </p>
        </div>

        {/* Founder Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1000"
                alt="CROF Estate Founder"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">Founder's Note</span>
            <h2 className="text-3xl font-bold text-gray-900 font-serif-luxury">
              Crafted like fine wine, sourced like rare gems.
            </h2>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              When industrial spice factories heat crops to over 90°C during mass grinding, they evaporate up to 70% of the natural essential oils. The resulting powder has color, but no living aroma.
            </p>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              At CROF, we work directly with 350+ smallholder farming families across Pampore, Jaintia Hills, and Wayanad. Our spices are slow stone-ground and immediately sealed in oxygen-barrier packaging.
            </p>

            <div className="pt-2 border-t border-gray-100 flex items-center gap-4">
              <div>
                <p className="font-bold text-gray-900 text-sm">Vikramaditya Roy</p>
                <p className="text-xs text-gray-400">Founder & Chief Master Blender</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 font-serif-luxury">Our Milestones</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((t, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <span className="text-2xl font-bold text-[#C9A227] font-serif-luxury">{t.year}</span>
                <h4 className="font-bold text-sm text-gray-900">{t.title}</h4>
                <p className="text-xs text-gray-500 font-light">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Showcase */}
        <div className="p-10 bg-[#111111] text-white rounded-3xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">Laboratory Standards</span>
            <h2 className="text-3xl font-bold font-serif-luxury">Certifications & Quality Badges</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <ShieldCheck className="w-8 h-8 text-[#C9A227] mx-auto" />
              <h4 className="font-bold">FSSAI License</h4>
              <p className="text-[10px] text-gray-400">Lic No: 10021022000891</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <Award className="w-8 h-8 text-[#C9A227] mx-auto" />
              <h4 className="font-bold">ISO 22000 Certified</h4>
              <p className="text-[10px] text-gray-400">Food Safety Standard</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <Sparkles className="w-8 h-8 text-[#C9A227] mx-auto" />
              <h4 className="font-bold">NABL Lab Tested</h4>
              <p className="text-[10px] text-gray-400">Zero Aflatoxins</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <Heart className="w-8 h-8 text-[#C9A227] mx-auto" />
              <h4 className="font-bold">Fair Trade Sourced</h4>
              <p className="text-[10px] text-gray-400">Ethical Farm Wages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
