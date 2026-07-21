import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { setActivePage, products } = useShop();
  let bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  if (bestSellers.length === 0) {
    bestSellers = products.slice(0, 4);
  }

  return (
    <section className="py-24 bg-[#F8F8F8] font-sans border-y border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C9A227]">
              <Sparkles className="w-4 h-4" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
              Best Seller Reserve
            </h2>
          </div>

          <button
            onClick={() => setActivePage('shop')}
            className="text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-[#C9A227] flex items-center gap-2 transition-colors"
          >
            View Entire Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        {bestSellers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 space-y-4">
            <p className="text-gray-400 font-light text-sm">No spices found in catalog.</p>
            <button
              onClick={() => {
                setActivePage('admin');
                window.location.hash = '#admin';
              }}
              className="px-5 py-2.5 bg-[#111111] hover:bg-[#C9A227] hover:text-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Reset Catalog in Admin Panel
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
