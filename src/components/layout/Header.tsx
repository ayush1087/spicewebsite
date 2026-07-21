import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { CrofLogo } from '../ui/CrofLogo';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop', hasMegaMenu: true },
    { id: 'shop', label: 'Collections' },
    { id: 'about', label: 'About' },
    { id: 'wholesale', label: 'Wholesale' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav shadow-lg py-2.5'
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-gray-100'
      }`}
    >
      {/* Top Banner Announcement */}
      <div className="bg-[#111111] text-white text-[11px] py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C9A227] animate-pulse" />
        <span>Complimentary Express Shipping on all orders above ₹799 | Code: <strong className="text-[#C9A227]">PURECROF</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-1">
        {/* Logo */}
        <CrofLogo
          variant="dark"
          size={isScrolled ? 'sm' : 'md'}
          onClick={() => setActivePage('home')}
        />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative py-2"
              onMouseEnter={() => item.hasMegaMenu && setIsMegaMenuOpen(true)}
              onMouseLeave={() => item.hasMegaMenu && setIsMegaMenuOpen(false)}
            >
              <button
                onClick={() => {
                  setActivePage(item.id);
                  setIsMegaMenuOpen(false);
                }}
                className={`text-xs uppercase font-semibold tracking-wider transition-colors flex items-center gap-1 py-1 ${
                  activePage === item.id
                    ? 'text-[#C9A227]'
                    : 'text-gray-800 hover:text-[#C9A227]'
                }`}
              >
                {item.label}
                {item.hasMegaMenu && <ChevronDown className="w-3 h-3 text-gray-400" />}
              </button>

              {/* Active Indicator line */}
              {activePage === item.id && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227] rounded-full"
                />
              )}

              {/* Mega Menu Dropdown */}
              {item.hasMegaMenu && isMegaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-6 font-sans z-50 mt-1"
                >
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#C9A227] tracking-widest mb-3">
                      Essential Spices
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform"
                      >
                        Lakadong Turmeric
                      </li>
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform"
                      >
                        Royal Malwa Coriander
                      </li>
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform"
                      >
                        Roasted Cumin Seeds
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#C9A227] tracking-widest mb-3">
                      Chilli & Pepper
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform"
                      >
                        Kashmiri Red Chilli
                      </li>
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform"
                      >
                        Tellicherry Black Pepper
                      </li>
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform"
                      >
                        Bhut Jolokia Flakes
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-[#C9A227] tracking-widest mb-3">
                      Exotic Reserves
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform text-[#C9A227] font-semibold"
                      >
                        Mongra Saffron A1
                      </li>
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform"
                      >
                        Royal Mughal Garam Masala
                      </li>
                      <li
                        onClick={() => {
                          setActivePage('shop');
                          setIsMegaMenuOpen(false);
                        }}
                        className="hover:text-gray-900 cursor-pointer font-medium hover:translate-x-1 transition-transform"
                      >
                        Idukki Jumbo Green Cardamom
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Icon Actions */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gray-700 hover:text-[#C9A227] hover:bg-gray-100 rounded-full transition-colors"
            title="Search Spices"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => setActivePage('account')}
            className="relative p-2 text-gray-700 hover:text-[#C9A227] hover:bg-gray-100 rounded-full transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account Icon */}
          <button
            onClick={() => setActivePage('account')}
            className="p-2 text-gray-700 hover:text-[#C9A227] hover:bg-gray-100 rounded-full transition-colors"
            title="My Account"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-[#111111] text-white hover:bg-[#C9A227] rounded-full transition-all shadow-md flex items-center justify-center"
            title="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A227] text-white border-2 border-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3"
          >
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-sm font-semibold uppercase tracking-wider ${
                  activePage === item.id ? 'text-[#C9A227]' : 'text-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
