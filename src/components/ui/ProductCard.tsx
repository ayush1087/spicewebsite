import React from 'react';
import type { Product } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { Star, ShoppingBag, Eye, Heart, Scale, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateCartQuantity, setQuickViewProduct, wishlist, toggleWishlist, compareList, toggleCompare, openProductPage } = useShop();

  const cartItem = cart.find(item => item.product.id === product.id && item.selectedWeight === product.weightOptions[0]);
  const quantity = cartItem ? cartItem.quantity : 0;

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-luxury hover:shadow-2xl transition-all flex flex-col font-sans"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
        {product.isBestSeller && (
          <span className="bg-[#111111] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
            Best Seller
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#C9A227] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm">
            Rare Crop
          </span>
        )}
        {product.discount > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Top Right Action Icons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isWishlisted
              ? 'bg-red-50 text-red-500'
              : 'bg-white/80 hover:bg-white text-gray-700 hover:text-red-500'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product.id);
          }}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isCompared
              ? 'bg-amber-50 text-[#C9A227]'
              : 'bg-white/80 hover:bg-white text-gray-700 hover:text-[#C9A227]'
          }`}
          title="Compare Specs"
        >
          <Scale className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="p-2.5 bg-white/80 hover:bg-white text-gray-700 hover:text-[#C9A227] rounded-full backdrop-blur-md transition-all shadow-sm"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image Container */}
      <div
        onClick={() => openProductPage(product.id)}
        className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-50 cursor-pointer flex items-center justify-center p-6"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        {/* Subtle Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest z-10">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1 font-medium">
            <span className="text-[10px] uppercase font-bold text-[#C9A227] tracking-wider">
              {product.category}
            </span>
            <span>{product.hindiName}</span>
          </div>

          <h3
            onClick={() => openProductPage(product.id)}
            className="font-bold text-base text-gray-900 line-clamp-1 cursor-pointer hover:text-[#C9A227] transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-light leading-relaxed">
            {product.tagline}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-gray-800">{product.rating}</span>
            <span className="text-xs text-gray-400 font-medium">({product.reviewCount})</span>
          </div>
        </div>

        {/* Footer Row: Price & Add to Cart */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            </div>
            <span className="text-[10px] font-semibold text-gray-400 block">{product.weightOptions[0]} Pack</span>
          </div>

          {!product.inStock ? (
            <button
              disabled
              className="px-4 py-2.5 bg-red-50 text-red-500 text-xs font-bold rounded-xl cursor-not-allowed flex items-center gap-1.5 shadow-sm border border-red-100"
            >
              Out of Stock
            </button>
          ) : quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-[#C9A227] transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 bg-[#111111] px-2 py-1.5 rounded-xl border border-[#111111] shadow-sm"
            >
              <button 
                onClick={() => updateCartQuantity(product.id, product.weightOptions[0], -1)}
                className="w-7 h-7 flex items-center justify-center bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-bold"
              >
                -
              </button>
              <span className="text-xs font-bold text-white w-4 text-center">{quantity}</span>
              <button 
                onClick={() => updateCartQuantity(product.id, product.weightOptions[0], 1)}
                className="w-7 h-7 flex items-center justify-center bg-[#C9A227] text-[#111111] rounded-lg hover:bg-amber-400 transition-colors font-bold"
              >
                +
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
