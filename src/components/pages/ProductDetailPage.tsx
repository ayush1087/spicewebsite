import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Star, ShoppingBag, Heart, Scale, ShieldCheck, Truck, RotateCcw, Share2, Check, Sparkles, Plus, AlertCircle, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, addToCart, toggleWishlist, wishlist, toggleCompare, compareList, setActivePage, products, reviews, addReview, toggleReviewLike, likedReviews, orders, user, setIsAuthModalOpen } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImg, setActiveImg] = useState<string>(product.image);
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weightOptions[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'nutrition' | 'storage' | 'reviews'>('description');
  const [is360Active, setIs360Active] = useState<boolean>(false);
  const [rotateDeg, setRotateDeg] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showAllReviews, setShowAllReviews] = useState(false);


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
                {product.inStock ? (
                  <span className="text-xs text-emerald-600 font-semibold ml-auto flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                  </span>
                ) : (
                  <span className="text-xs text-red-500 font-semibold ml-auto flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Out of Stock
                  </span>
                )}
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

              {product.inStock ? (
                <button
                  onClick={() => addToCart(product, selectedWeight, quantity)}
                  className="flex-1 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C9A227] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" /> Add To Cart
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 py-4 bg-red-50 text-red-500 text-xs font-bold uppercase tracking-widest rounded-xl cursor-not-allowed flex items-center justify-center gap-2 shadow-sm border border-red-100"
                >
                  <AlertCircle className="w-4 h-4" /> Out of Stock
                </button>
              )}

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

            {activeTab === 'reviews' && (() => {
              const productReviews = reviews?.filter(r => r.product === product.name && r.status === 'Approved') || [];
              const avgRating = productReviews.length 
                ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
                : '0.0';
              
              // Check eligibility: Order must belong to this user (we use name or contact to match) and contain the product (accounting for weight variants in the name string)
              const hasPurchased = orders?.some(o => {
                const isUserOrder = user && (o.customer.name === user.name || o.customer.email === user.contact);
                const hasItem = o.items.some((i: any) => i.name.includes(product.name));
                return isUserOrder && hasItem && o.status !== 'Cancelled';
              });

              const handleSubmitReview = () => {
                if (!reviewText.trim()) return;
                addReview({
                  id: Date.now(),
                  author: user?.name || 'Verified Customer',
                  product: product.name,
                  rating: reviewRating,
                  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                  text: reviewText,
                  status: 'Pending', // Needs admin approval
                  helpful: 0
                });
                setReviewText('');
                setReviewRating(5);
                alert('Your review has been submitted for approval!');
              };

              return (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-base">Customer Reviews & Ratings</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                      <span className="font-bold">{avgRating} / 5.0</span>
                      <span className="text-gray-500 text-xs">({productReviews.length} Reviews)</span>
                    </div>
                  </div>

                  {/* Rating Breakdown Card */}
                  {productReviews.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
                      <div className="text-center flex-shrink-0">
                        <div className="text-4xl font-bold text-gray-900 font-serif-luxury">{avgRating}</div>
                        <div className="flex text-amber-500 my-2 justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">Based on {productReviews.length} reviews</div>
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        {[5, 4, 3, 2, 1].map(star => {
                          const count = productReviews.filter(r => r.rating === star).length;
                          const percent = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;
                          return (
                            <div key={star} className="flex items-center gap-3 text-xs">
                              <div className="flex items-center gap-1 w-12 text-gray-600 font-medium">
                                {star} <Star className="w-3 h-3 fill-current text-amber-500" />
                              </div>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${percent}%` }}></div>
                              </div>
                              <div className="w-8 text-right text-gray-400">{count}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Add Review Section */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    {!user ? (
                      <div className="text-center space-y-3">
                        <p className="text-gray-600 text-sm">Please log in to share your experience with this product.</p>
                        <button onClick={() => setIsAuthModalOpen(true)} className="px-6 py-2 bg-[#C9A227] text-white font-bold rounded-xl hover:bg-[#b08d22] transition-colors">
                          Login to Review
                        </button>
                      </div>
                    ) : !hasPurchased ? (
                      <div className="text-center text-gray-500 text-sm">
                        <AlertCircle className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <p>Only verified buyers can leave a review. Purchase this product to unlock reviews.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900">Write a Review</h4>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} onClick={() => setReviewRating(star)} className={`transition-colors ${star <= reviewRating ? 'text-amber-500' : 'text-gray-300'}`}>
                              <Star className="w-6 h-6 fill-current" />
                            </button>
                          ))}
                        </div>
                        <textarea 
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="How did you like the aroma and flavor?..."
                          className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#C9A227]"
                          rows={3}
                        />
                        <button 
                          onClick={handleSubmitReview}
                          disabled={!reviewText.trim()}
                          className="px-6 py-2 bg-[#C9A227] text-white font-bold rounded-xl hover:bg-[#b08d22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Review
                        </button>
                      </div>
                    )}
                  </div>

                  {/* List of Reviews */}
                  <div className="space-y-4">
                    {productReviews.length === 0 ? (
                      <p className="text-center text-gray-400 text-sm italic">Be the first to review this product!</p>
                    ) : (
                      <>
                        {(showAllReviews ? productReviews : productReviews.slice(0, 1)).map(r => (
                          <div key={r.id} className="p-4 bg-white rounded-2xl border border-gray-100 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gray-900 text-sm">{r.author} <span className="text-green-600 text-[10px] bg-green-50 px-2 py-0.5 rounded-full ml-1 font-medium">Verified Buyer</span></span>
                              <span className="text-gray-400 text-xs">{r.date}</span>
                            </div>
                            <div className="flex text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : 'text-gray-200'}`} />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600 pb-2">{r.text}</p>
                            <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
                              <button 
                                onClick={() => toggleReviewLike(r.id)}
                                className={`flex items-center gap-1.5 text-xs transition-colors ${
                                  likedReviews.includes(r.id.toString()) 
                                    ? 'text-blue-600 font-bold' 
                                    : 'text-gray-500 hover:text-blue-600'
                                }`}
                              >
                                <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews.includes(r.id.toString()) ? 'fill-current' : ''}`} />
                                <span>Helpful ({r.helpful || 0})</span>
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        {!showAllReviews && productReviews.length > 1 && (
                          <button 
                            onClick={() => setShowAllReviews(true)}
                            className="w-full py-3 mt-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                          >
                            View All {productReviews.length} Reviews
                          </button>
                        )}
                        {showAllReviews && productReviews.length > 1 && (
                          <button 
                            onClick={() => setShowAllReviews(false)}
                            className="w-full py-3 mt-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                          >
                            Show Less
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
