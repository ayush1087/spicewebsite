import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingCart: React.FC = () => {
  const { cart, setIsCartOpen, cartSubtotal } = useShop();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 left-6 sm:left-auto sm:w-auto z-40"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto bg-[#111111] hover:bg-[#222222] text-white rounded-2xl shadow-2xl border border-[#C9A227]/30 p-4 flex items-center justify-between gap-6 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-[#C9A227]" />
                <span className="absolute -top-2 -right-2 bg-[#C9A227] text-[#111111] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs text-gray-400 font-medium">Your Cart</p>
                <p className="text-sm font-bold">₹{cartSubtotal.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right sm:hidden">
                <p className="text-sm font-bold">₹{cartSubtotal.toLocaleString()}</p>
              </div>
              <span className="bg-[#C9A227] text-[#111111] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider group-hover:bg-white transition-colors">
                View Cart
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
