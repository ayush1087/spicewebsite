import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Chef Ranveer Mehra',
      title: 'Executive Chef, Heritage Dining',
      rating: 5,
      comment: 'The Lakadong turmeric from CROF is in a league of its own. The vibrant golden hue and intense aroma transform our curries completely. You can instantly smell the difference compared to commercial brands.',
      verified: true,
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Kavita Subramaniam',
      title: 'Culinary Blogger & Homemaker',
      rating: 5,
      comment: 'CROF Kashmiri Red Chilli gives that deep restaurant-style red color without making the food uncomfortably spicy. The glass packaging with vacuum seal feels ultra luxury!',
      verified: true,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Dr. Siddharth Rao',
      title: 'Ayurvedic Physician',
      rating: 5,
      comment: 'I recommend CROF turmeric to my patients for its verified 7.5% curcumin content. Clean, lab-certified, and ethically sourced. Truly the Apple of Indian spices.',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            Trusted By Chefs & Connoisseurs
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif-luxury">
            Refined Words From Our Community
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-[#F8F8F8] border border-gray-100 shadow-luxury space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#C9A227] opacity-60" />
                <div className="flex text-amber-400 gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 font-light leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover border border-amber-300"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-gray-900">{r.name}</h4>
                    {r.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />}
                  </div>
                  <p className="text-[11px] text-gray-500">{r.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
