import React from 'react';
import { Camera, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const InstaFeed: React.FC = () => {
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
      likes: '2.4k',
      caption: 'Cold ground Lakadong turmeric in glass reserve containers.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
      likes: '1.8k',
      caption: 'Pampore Kashmiri chilli sun-drying under autumn snow caps.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=600',
      likes: '3.1k',
      caption: 'Stone milling coriander seeds at low RPM.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?auto=format&fit=crop&q=80&w=600',
      likes: '4.2k',
      caption: 'Tellicherry black peppercorns harvested in Wayanad.'
    }
  ];

  return (
    <section className="py-20 bg-[#F8F8F8] font-sans border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C9A227]">
            <Camera className="w-4 h-4" />
            <span>#CrofSpices</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-serif-luxury">
            Follow Our Instagram Journal
          </h2>
          <p className="text-xs text-gray-500 font-light">@crofspices • Tag your kitchen creations for a feature</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.03 }}
              className="group relative h-64 rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-gray-200"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-end gap-1 text-xs font-semibold text-amber-300">
                  <Heart className="w-4 h-4 fill-current" />
                  {post.likes}
                </div>
                <p className="text-xs font-light line-clamp-3 italic">
                  "{post.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
