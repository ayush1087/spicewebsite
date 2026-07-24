import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Star, ShoppingBag, Heart, Check, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, wishlist, openProductPage } = useShop();
  const [selectedWeight, setSelectedWeight] = useState<string>('');

  if (!quickViewProduct) return null;

  const defaultVariant = quickViewProduct.variants?.[0] || { weight: '100g', price: 0, salePrice: 0, currentStock: 0 };
  const activeWeight = selectedWeight || defaultVariant.weight;
  const selectedVariant = quickViewProduct.variants?.find((v: any) => v.weight === activeWeight) || defaultVariant;
  const isWishlisted = wishlist.includes(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-50 grid grid-cols-1 md:grid-cols-2 font-sans border border-gray-100 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-900 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="relative bg-gray-50 p-8 flex items-center justify-center">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
            />
            {quickViewProduct.discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#C9A227] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {quickViewProduct.discount}% OFF
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                <span className="uppercase font-bold tracking-widest text-[#C9A227]">
                  {quickViewProduct.name}
                </span>
                <span>{quickViewProduct.hindiName}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-2 tracking-tight">{quickViewProduct.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-700">{quickViewProduct.rating}</span>
                <span className="text-xs text-gray-400">({quickViewProduct.reviewCount} reviews)</span>
              </div>

              {/* Tagline */}
              <p className="text-xs text-gray-600 italic mt-3 border-l-2 border-[#C9A227] pl-3 py-0.5">
                "{quickViewProduct.tagline}"
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-bold text-gray-900">₹{selectedVariant.salePrice}</span>
                <span className="text-sm text-gray-400 line-through">₹{selectedVariant.price}</span>
                <span className="text-xs font-semibold text-emerald-600">Tax Included</span>
              </div>

              {/* Weight Selector */}
              <div className="mt-6">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-2">
                  Select Pack Weight:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants?.map((variant: any) => (
                    <button
                      key={variant.weight}
                      disabled={variant.currentStock === 0}
                      onClick={() => setSelectedWeight(variant.weight)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        activeWeight === variant.weight
                          ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                          : variant.currentStock === 0
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {variant.weight} {variant.currentStock === 0 && '(Sold Out)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                <button
                  disabled={selectedVariant.currentStock === 0}
                  onClick={() => {
                    if (selectedVariant.currentStock > 0) {
                      addToCart(quickViewProduct, activeWeight);
                      setQuickViewProduct(null);
                    }
                  }}
                  className={`flex-1 py-3.5 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md ${
                    selectedVariant.currentStock > 0
                      ? 'bg-[#111111] hover:bg-[#C9A227]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" /> {selectedVariant.currentStock > 0 ? 'Add To Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  const id = quickViewProduct.id;
                  setQuickViewProduct(null);
                  openProductPage(id);
                }}
                className="w-full text-center text-xs font-semibold text-gray-600 hover:text-[#C9A227] underline py-1"
              >
                View Full Specifications, Lab Test & Reviews →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
