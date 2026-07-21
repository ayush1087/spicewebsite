import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { useShop } from '../../context/ShopContext';
import { SlidersHorizontal, Grid, List, Search, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const ShopPage: React.FC = () => {
  const { openProductPage, products } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('All Spices');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [selectedWeight, setSelectedWeight] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const weights = ['All', '100g', '250g', '500g', '1kg', '1g'];

  // Filtering logic
  let filtered = products.filter((p) => {
    const matchCat = selectedCategory === 'All Spices' || p.category === selectedCategory;
    const matchPrice = p.price <= maxPrice;
    const matchWeight = selectedWeight === 'All' || p.weightOptions.includes(selectedWeight);
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hindiName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPrice && matchWeight && matchSearch;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            Single-Origin Spice Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-luxury text-gray-900">
            Artisanal Reserve Collection
          </h1>
          <p className="text-xs text-gray-500 font-light">
            Cold-ground, pesticide-tested, and harvested at peak aroma maturity.
          </p>
        </div>

        {/* Search & Top Action Bar */}
        <div className="p-4 bg-[#F8F8F8] rounded-2xl border border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by spice name..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#111111] text-white' : 'text-gray-500'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#111111] text-white' : 'text-gray-500'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#C9A227]"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-8 bg-gray-50/50 p-6 rounded-3xl border border-gray-200/60">
            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">Categories</h3>
              <div className="space-y-1 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-2 px-3 rounded-xl font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-[#111111] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#C9A227]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-gray-200/60">
              <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                <span>Max Price</span>
                <span className="text-[#C9A227]">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C9A227]"
              />
            </div>

            {/* Weight Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-200/60">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">Pack Weight</h3>
              <div className="flex flex-wrap gap-2">
                {weights.map((wt) => (
                  <button
                    key={wt}
                    onClick={() => setSelectedWeight(wt)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      selectedWeight === wt
                        ? 'bg-[#C9A227] text-white border-[#C9A227]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory('All Spices');
                setMaxPrice(2000);
                setSelectedWeight('All');
                setSearchQuery('');
              }}
              className="w-full py-2.5 bg-white border border-gray-200 text-xs font-bold text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Reset All Filters
            </button>
          </div>

          {/* Product Grid / List Area */}
          <div className="lg:col-span-9">
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-gray-400 space-y-3 bg-gray-50 rounded-3xl border border-gray-200">
                <p className="text-gray-900 font-bold text-lg">No spices match your active filters</p>
                <p className="text-xs text-gray-500">Try resetting filters or expanding price range.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => openProductPage(p.id)}
                    className="p-4 rounded-3xl bg-white border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all flex flex-col sm:flex-row items-center gap-6 cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-32 h-32 object-cover rounded-2xl border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C9A227]">{p.category}</span>
                      <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                      <p className="text-xs text-gray-500 font-light">{p.description}</p>
                      <div className="flex items-center gap-4 text-xs pt-2">
                        <span className="font-bold text-gray-900 text-base">₹{p.price}</span>
                        <span className="text-gray-400 line-through">₹{p.originalPrice}</span>
                        <span className="text-amber-500 font-semibold">⭐ {p.rating} ({p.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
