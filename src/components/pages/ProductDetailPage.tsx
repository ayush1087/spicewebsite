import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Star, ShoppingBag, Heart, Scale, ShieldCheck, Truck, RotateCcw, Share2, Check, Sparkles, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, addToCart, toggleWishlist, wishlist, toggleCompare, compareList, setActivePage, products } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImg, setActiveImg] = useState<string>(product.image);
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weightOptions[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'nutrition' | 'storage' | 'reviews'>('description');
  const [is360Active, setIs360Active] = useState<boolean>(false);
  const [rotateDeg, setRotateDeg] = useState<number>(0);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  // Bundle offer product
  const bundleProduct = products.find((p) => p.id !== product.id) || products[1];

  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Gallery & 360 View */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-gray-50 rounded-3xl p-8 border border-gray-200/60 overflow-hidden flex items-center justify-center min-h-[420px]">
              {/* 360 view simulation toggle */}
              <button
                onClick={() => setIs360Active(!is360Active)}
                className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors ${
                  is360Active ? 'bg-[#C9A227] text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" /> 360° Rotator
              </button>

              {is360Active ? (
                <div
                  className="cursor-grab active:cursor-grabbing flex flex-col items-center justify-center space-y-4 py-8"
                  onMouseMove={(e) => {
                    if (e.buttons === 1) {
                      setRotateDeg((prev) => (prev + e.movementX) % 360);
                    }
                  }}
                >
                  <motion.img
                    src={activeImg}
                    alt="360 view"
                    style={{ transform: `rotateY(${rotateDeg}deg)` }}
                    className="w-72 h-72 object-cover rounded-2xl shadow-xl transition-transform"
                  />
                  <p className="text-xs text-gray-500 font-medium">‹ Drag left/right to rotate product ›</p>
                </div>
              ) : (
                <img
                  src={activeImg}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>

            {/* Thumbnail switcher */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveImg(imgUrl);
                    setIs360Active(false);
                  }}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImg === imgUrl && !is360Active
                      ? 'border-[#C9A227] scale-105 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-[#C9A227] bg-amber-50 px-3 py-1 rounded-md">
                  {product.category}
                </span>
                <span className="text-xs text-gray-400 font-medium">{product.hindiName}</span>
                <span className="text-xs text-emerald-600 font-semibold ml-auto flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 font-serif-luxury">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Price & Discount */}
            <div className="flex items-baseline gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200/60">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="text-xs font-bold text-[#C9A227] bg-amber-100 px-2.5 py-1 rounded-full">
                Save {product.discount}%
              </span>
            </div>

            {/* Weight Pack Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                Select Package Weight:
              </label>
              <div className="flex flex-wrap gap-3">
                {product.weightOptions.map((wt) => (
                  <button
                    key={wt}
                    onClick={() => setSelectedWeight(wt)}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      selectedWeight === wt
                        ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                        : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector + Add to Cart */}
            <div className="flex gap-4 items-center pt-2">
              <div className="flex items-center border border-gray-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, selectedWeight, quantity)}
                className="flex-1 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C9A227] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" /> Add To Cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border transition-colors ${
                  isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span>NABL Lab Test Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C9A227]" />
                <span>Free Shipping over ₹799</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle Widget */}
        <div className="p-8 bg-amber-50/40 rounded-3xl border border-amber-200/60 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C9A227]">
            <Sparkles className="w-4 h-4" />
            <span>Frequently Bought Together</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-xl p-2 border border-gray-200">
                <img src={product.image} alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
              <Plus className="w-5 h-5 text-gray-400" />
              <div className="w-20 h-20 bg-white rounded-xl p-2 border border-gray-200">
                <img src={bundleProduct.image} alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-sm font-bold text-gray-900">
                {product.name} + {bundleProduct.name}
              </p>
              <p className="text-xs text-gray-500">Combine for authentic curry base foundation.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{product.price + bundleProduct.price - 50}</p>
                <p className="text-xs text-gray-400 line-through">₹{product.price + bundleProduct.price}</p>
              </div>
              <button
                onClick={() => {
                  addToCart(product);
                  addToCart(bundleProduct);
                }}
                className="px-5 py-3 bg-[#111111] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#C9A227] transition-colors"
              >
                Add Both To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="space-y-6">
          <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
            {(['description', 'ingredients', 'nutrition', 'storage', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-xs uppercase font-bold tracking-wider capitalize border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-[#C9A227] text-[#C9A227]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 bg-gray-50/60 rounded-3xl border border-gray-200/60 text-sm text-gray-700 leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-base">Origin & Terroir</h3>
                <p>{product.description}</p>
                <p><strong className="text-gray-900">Harvest Origin:</strong> {product.origin}</p>
                <p><strong className="text-gray-900">Pungency Profile:</strong> {product.pungency}</p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-base">100% Pure Botanical Ingredients</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-base">Nutritional Information per 100g</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-xs text-gray-500">Energy</span>
                    <p className="font-bold text-gray-900">{product.nutrition.calories}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-xs text-gray-500">Protein</span>
                    <p className="font-bold text-gray-900">{product.nutrition.protein}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-xs text-gray-500">Carbohydrates</span>
                    <p className="font-bold text-gray-900">{product.nutrition.carbs}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-xs text-gray-500">Dietary Fiber</span>
                    <p className="font-bold text-gray-900">{product.nutrition.fiber}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 text-base">Optimal Storage & Preservation</h3>
                <p>{product.storage}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">Customer Reviews & Ratings</h3>
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-gray-900">{product.rating} / 5.0</span>
                  </div>
                  <p className="text-xs text-gray-600">"Outstanding aroma and deep color. Truly high grade!" — Meera K.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
