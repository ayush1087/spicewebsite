import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Collections: React.FC = () => {
  const { setActivePage, products } = useShop();

  const collections = [
    {
      productId: 'lakadong-turmeric',
      name: 'Lakadong Turmeric',
      tagline: '7.5%+ Natural Curcumin',
      image: '/images/lakadong-turmeric.png',
      span: 'col-span-1 md:col-span-2'
    },
    {
      productId: 'kashmiri-red-chilli',
      name: 'Kashmiri Red Chilli',
      tagline: 'Vibrant Natural Crimson',
      image: '/images/kashmiri-chilli.png',
      span: 'col-span-1'
    },
    {
      productId: 'coriander-seed-powder',
      name: 'Royal Malwa Coriander',
      tagline: 'Sweet Citrus Aroma',
      image: '/images/coriander-powder.png',
      span: 'col-span-1'
    },
    {
      productId: 'wayanad-black-pepper',
      name: 'Tellicherry Black Pepper',
      tagline: '4.25mm Jumbo Peppercorns',
      image: '/images/black-pepper.png',
      span: 'col-span-1 md:col-span-2'
    },
    {
      productId: 'royal-garam-masala',
      name: 'Royal Garam Masala',
      tagline: '16 Slow-Roasted Spices',
      image: '/images/garam-masala.png',
      span: 'col-span-1'
    },
    {
      productId: 'unrefined-roasted-cumin',
      name: 'Unjha Cumin Seeds',
      tagline: 'Skillet Roasted & Milled',
      image: '/images/cumin-powder.png',
      span: 'col-span-1'
    }
  ];

  // Dynamically filter collections based on whether the corresponding product still exists in the catalog
  const visibleCollections = collections.filter((col) =>
    products.some((p) => p.id === col.productId)
  );

  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
              Curated Harvests
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
              Featured Spice Collections
            </h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-[#C9A227] flex items-center gap-2 transition-colors"
          >
            Explore All Spices <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Collections Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleCollections.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className={`group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-luxury cursor-pointer ${item.span}`}
              onClick={() => setActivePage('shop')}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end">
                <span className="text-xs font-semibold text-[#C9A227] uppercase tracking-wider mb-1">
                  {item.tagline}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                  {item.name}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A227]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
