import React from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    freeShippingThreshold,
    setActivePage,
    user,
    setIsAuthModalOpen
  } = useShop();

  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - cartSubtotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#C9A227]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 tracking-tight">Your Spice Basket</h3>
                  <p className="text-xs text-gray-500 font-medium">{cart.length} item(s) selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-3 bg-amber-50/50 border-b border-amber-100">
              <div className="flex items-center justify-between text-xs font-medium text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C9A227]" />
                  {remainingForFreeShipping <= 0 ? (
                    <span className="text-emerald-700 font-semibold">🎉 You unlocked FREE Express Shipping!</span>
                  ) : (
                    <span>
                      Add <span className="font-bold text-[#C9A227]">₹{remainingForFreeShipping}</span> more for FREE shipping
                    </span>
                  )}
                </span>
                <span>{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#C9A227] to-amber-400 h-full transition-all duration-500 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-base mb-1">Your cart is currently empty</p>
                    <p className="text-xs text-gray-500 max-w-xs">Explore our artisanal cold-ground spices and heritage blends.</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setActivePage('shop');
                    }}
                    className="px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold rounded-full hover:bg-[#C9A227] transition-colors"
                  >
                    Explore Spices
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight}`}
                    className="flex gap-4 p-3 rounded-2xl bg-[#F8F8F8] border border-gray-100 hover:border-amber-200 transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">{item.product.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-semibold bg-white text-gray-600 rounded-md border border-gray-200">
                          {item.selectedWeight}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, -1)}
                            className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-bold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.selectedWeight, 1)}
                            className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Total Price */}
                        <span className="text-sm font-bold text-gray-900">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 space-y-4 shadow-lg">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">
                      {remainingForFreeShipping <= 0 ? 'FREE' : '₹49'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total Amount</span>
                    <span className="text-[#C9A227]">
                      ₹{remainingForFreeShipping <= 0 ? cartSubtotal : cartSubtotal + 49}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    if (!user) {
                      setIsAuthModalOpen(true);
                    } else {
                      setActivePage('checkout');
                    }
                  }}
                  className="w-full py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C9A227] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-xl"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  100% Authentic Guaranteed • FSSAI Certified Lab Tested
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
