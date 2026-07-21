import React, { useEffect, useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';
import { CompareDrawer } from './components/layout/CompareDrawer';
import { QuickViewModal } from './components/ui/QuickViewModal';

// Home Section Components
import { HeroSection } from './components/home/HeroSection';
import { TrustSection } from './components/home/TrustSection';
import { Collections } from './components/home/Collections';
import { BestSellers } from './components/home/BestSellers';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { ProcessTimeline } from './components/home/ProcessTimeline';
import { VideoSection } from './components/home/VideoSection';
import { Testimonials } from './components/home/Testimonials';
import { InstaFeed } from './components/home/InstaFeed';

// Page Components
import { ShopPage } from './components/pages/ShopPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { BlogPage } from './components/pages/BlogPage';
import { WholesalePage } from './components/pages/WholesalePage';
import { ContactPage } from './components/pages/ContactPage';
import { AccountPage } from './components/pages/AccountPage';
import { CheckoutPage } from './components/pages/CheckoutPage';

// Standalone Secure Admin Application
import { AdminPortal } from './components/admin/AdminPortal';

import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, toasts } = useShop();

  // Check URL pathname or hash for standalone /admin route
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    return path.includes('/admin') || hash === '#admin' || activePage === 'admin';
  });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      setIsAdminRoute(path.includes('/admin') || hash === '#admin' || activePage === 'admin');
    };
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, [activePage]);

  // Lenis Smooth Scroll Setup for Customer Store
  useEffect(() => {
    if (isAdminRoute) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isAdminRoute]);

  // IF ADMIN ROUTE: Render standalone isolated Admin Application (No Store Header/Footer)
  if (isAdminRoute) {
    return <AdminPortal />;
  }

  // PUBLIC CUSTOMER STORE (No Admin Links Visible)
  return (
    <div className="relative min-h-screen bg-white text-[#2B2B2B] flex flex-col font-sans selection:bg-[#C9A227] selection:text-white">
      {/* Global Customer Header */}
      <Header />

      {/* Main Customer Route Switcher */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activePage === 'home' && (
              <>
                <HeroSection />
                <TrustSection />
                <Collections />
                <BestSellers />
                <WhyChooseUs />
                <ProcessTimeline />
                <VideoSection />
                <Testimonials />
                <InstaFeed />
              </>
            )}

            {activePage === 'shop' && <ShopPage />}
            {activePage === 'product' && <ProductDetailPage />}
            {activePage === 'about' && <AboutPage />}
            {activePage === 'blog' && <BlogPage />}
            {activePage === 'wholesale' && <WholesalePage />}
            {activePage === 'contact' && <ContactPage />}
            {activePage === 'account' && <AccountPage />}
            {activePage === 'checkout' && <CheckoutPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Customer Footer */}
      <Footer />

      {/* Customer Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <CompareDrawer />
      <QuickViewModal />

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className="pointer-events-auto flex items-center gap-3 px-5 py-3.5 bg-[#111111] text-white rounded-2xl shadow-2xl border border-[#C9A227]/40 text-xs font-semibold"
            >
              {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />}
              {t.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
              {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              <span>{t.title}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}

export default App;
