import React, { useState } from 'react';
import { Play, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative py-28 bg-black text-white font-sans overflow-hidden">
      {/* Background Visual Banner */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/garam-masala.png"
          alt="From Farm To Kitchen"
          className="w-full h-full object-cover opacity-40 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C9A227] text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          Estate Documentary
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold font-serif-luxury tracking-tight leading-tight">
          From Farm To Your Kitchen.
        </h2>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          Take a 2-minute visual journey into the high-altitude fields of Kashmir and Meghalaya where our spice masters preserve pure aroma.
        </p>

        {/* Luxury Play Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setIsPlaying(true)}
            className="group relative w-20 h-20 rounded-full bg-[#C9A227] text-[#111111] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
          >
            <span className="absolute inset-0 rounded-full bg-[#C9A227] animate-ping opacity-40" />
            <Play className="w-8 h-8 fill-current translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlaying(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl z-50 border border-white/20 aspect-video"
            >
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 text-white hover:text-[#C9A227] p-2 bg-black/60 rounded-full z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Aesthetic Demo Video Stream */}
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                title="CROF Estate Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
