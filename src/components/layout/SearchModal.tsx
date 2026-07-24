import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductPage, products } = useShop();
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All Spices');

  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.hindiName.toLowerCase().includes(query.toLowerCase()) ||
      p.category.some(cat => cat.toLowerCase().includes(query.toLowerCase()));
    const matchesCat = selectedCat === 'All Spices' || p.category.includes(selectedCat);
    return matchesQuery && matchesCat;
  });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 z-50 flex flex-col max-h-[85vh]"
          >
            {/* Input Bar */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-white">
              <Search className="w-6 h-6 text-[#C9A227]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for Kashmiri chilli, Lakadong turmeric, saffron..."
                className="w-full text-lg md:text-xl font-medium placeholder-gray-400 focus:outline-none bg-transparent"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Pill Filters */}
            <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCat === cat
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Found {filteredProducts.length} Results
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <p className="text-gray-900 font-medium text-base">No spices match "{query}"</p>
                  <p className="text-xs text-gray-500 mt-1">Try searching for turmeric, pepper, saffron or garam masala.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        openProductPage(p.id);
                      }}
                      className="group flex items-center gap-4 p-3 rounded-2xl border border-gray-100 hover:border-amber-300 hover:bg-amber-50/20 cursor-pointer transition-all"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-200 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] uppercase font-bold text-[#C9A227]">
                            {p.name}
                          </span>
                          <span className="text-xs font-bold">₹{p.price}</span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">{p.hindiName}</span>
                        <h4 className="font-semibold text-sm text-gray-900 truncate group-hover:text-[#C9A227] transition-colors">
                          {p.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {p.rating}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#C9A227] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
