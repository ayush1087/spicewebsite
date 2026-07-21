import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { X, Scale, Check, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CompareDrawer: React.FC = () => {
  const { compareList, toggleCompare, isCompareOpen, setIsCompareOpen, addToCart, products } = useShop();

  const comparedProducts = products.filter((p) => compareList.includes(p.id));

  if (compareList.length === 0) return null;

  return (
    <AnimatePresence>
      {isCompareOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl rounded-t-3xl font-sans"
        >
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-[#C9A227]">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">Compare Pure Spices ({compareList.length}/4)</h3>
                  <p className="text-[11px] text-gray-500">Side-by-side purity parameters and spice specifications</p>
                </div>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto">
              {comparedProducts.map((p) => (
                <div key={p.id} className="relative p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
                  <button
                    onClick={() => toggleCompare(p.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 bg-white rounded-full shadow-sm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl border border-gray-200 mx-auto" />
                  
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 line-clamp-1">{p.name}</h4>
                    <p className="text-[10px] text-gray-500">{p.origin}</p>
                    <p className="text-sm font-bold text-[#C9A227] mt-1">₹{p.price}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-2 space-y-1 text-[11px] text-gray-600">
                    <p><span className="font-semibold text-gray-800">Pungency:</span> {p.pungency}</p>
                    <p><span className="font-semibold text-gray-800">Rating:</span> ⭐ {p.rating}</p>
                    <p><span className="font-semibold text-gray-800">Origin:</span> {p.origin}</p>
                  </div>

                  <button
                    onClick={() => addToCart(p)}
                    className="w-full py-2 bg-[#111111] text-white text-[10px] font-bold uppercase rounded-lg hover:bg-[#C9A227] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3 h-3" /> Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
