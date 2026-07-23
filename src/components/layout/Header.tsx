import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';
import { CrofLogo } from '../ui/CrofLogo';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, Sparkles, Package, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    user,
    setIsAuthModalOpen,
    setAccountTab,
    logout,
    coupons
  } = useShop();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const activeCoupon = coupons?.find(c => c.status === 'Active');

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
      {activeCoupon && (
        <button 
          onClick={() => setActivePage('shop')}
          className="w-full bg-[#111111] hover:bg-black text-white text-[11px] py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227] animate-pulse" />
          <span>
            {activeCoupon.discount} off {activeCoupon.minOrderValue ? `on all orders above ₹${activeCoupon.minOrderValue}` : 'on all orders'} | Code: <strong className="text-[#C9A227]">{activeCoupon.code}</strong>
          </span>
        </button>
      )}

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
                className={`group relative text-xs uppercase font-semibold tracking-wider transition-colors flex items-center gap-1 py-1 ${
                  activePage === item.id
                    ? 'text-[#C9A227]'
                    : 'text-gray-800 hover:text-[#C9A227]'
                }`}
              >
                {item.label}
                {item.hasMegaMenu && <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#C9A227] transition-colors" />}
                
                {/* Active/Hover Indicator line */}
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[#C9A227] transform origin-left transition-transform duration-300 ${
                    activePage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} 
                />
              </button>

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

          {/* Account / Login */}
          {!user ? (
            <div className="relative group p-[3px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(201,162,39,0.4)]" onClick={() => setIsAuthModalOpen(true)}>
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#111111_0%,#F5E68C_30%,#C9A227_50%,#111111_100%)]"></span>
              <button
                className="relative px-6 py-2.5 w-full h-full font-semibold rounded-full bg-[#111111] text-white flex items-center gap-2 text-xs uppercase tracking-wider hover:bg-gray-900 transition-colors"
              >
                <User className="w-3.5 h-3.5" /> Login
              </button>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-2 text-gray-700 hover:text-[#C9A227] hover:bg-gray-100 rounded-full transition-colors"
                title="My Account"
              >
                <User className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    style={{ transformOrigin: "top right" }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-5 py-3 border-b border-gray-100 mb-1">
                      <p className="text-sm font-extrabold text-gray-900 truncate">{user.name}</p>
                    </div>
                    <button
                      onClick={() => { setAccountTab('orders'); setActivePage('account'); setIsProfileDropdownOpen(false); }}
                      className="w-full text-left px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-[#C9A227] hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <Package className="w-4 h-4 text-gray-500 group-hover:text-[#C9A227]" /> Past Orders
                    </button>
                    <button
                      onClick={() => { setAccountTab('profile'); setActivePage('account'); setIsProfileDropdownOpen(false); }}
                      className="w-full text-left px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-[#C9A227] hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <User className="w-4 h-4 text-gray-500 group-hover:text-[#C9A227]" /> Edit Profile
                    </button>
                    <button
                      onClick={() => { setAccountTab('settings'); setActivePage('account'); setIsProfileDropdownOpen(false); }}
                      className="w-full text-left px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-[#C9A227] hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <Settings className="w-4 h-4 text-gray-500 group-hover:text-[#C9A227]" /> Settings
                    </button>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button
                      onClick={() => { logout(); setIsProfileDropdownOpen(false); setActivePage('home'); }}
                      className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

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
