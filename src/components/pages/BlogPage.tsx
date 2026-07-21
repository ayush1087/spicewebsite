import React from 'react';
import { BLOGS } from '../../data/blogs';
import { Clock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogPage: React.FC = () => {
  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            Editorial Magazine
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-luxury text-gray-900">
            The Spice Science & Heritage Journal
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-luxury hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C9A227]">{post.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 hover:text-[#C9A227] transition-colors mt-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-2 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};
