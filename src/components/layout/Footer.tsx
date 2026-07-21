import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { CrofLogo } from '../ui/CrofLogo';
import { Mail, Phone, MapPin, Globe, Share2, MessageCircle, ShieldCheck, Award, Leaf, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, addToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast('Thank you for subscribing to CROF Reserve Circle!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10 border-t border-amber-900/20 font-sans relative overflow-hidden">
      {/* Background Subtle Shimmer Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#c9a227_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Top Newsletter & Story Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A227] font-bold">The Luxury Heritage</span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold tracking-tight text-white">
              Elevate every dish with untamed aroma & pure origin spices.
            </h2>
            <p className="text-sm text-gray-400 max-w-xl font-light leading-relaxed">
              CROF brings unadulterated high-curcumin spices from high-altitude micro-farms directly to your kitchen. Cold ground, lab-certified, and beautifully packaged.
            </p>
          </div>

          <div className="lg:col-span-6 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-semibold text-white">Join CROF Connoisseurs Circle</h3>
            <p className="text-xs text-gray-400">Receive private reserve drops, seasonal harvest recipes, and 10% off your first order.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C9A227] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-2"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Multi-Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-6">
            <CrofLogo variant="light" size="md" onClick={() => setActivePage('home')} />
            <p className="text-xs text-gray-400 leading-relaxed pr-6">
              CROF Pure Taste • Pure Aroma is a registered luxury spice house dedicated to single-origin Indian spices harvested under sustainable farming practices.
            </p>
            <div className="flex gap-3 text-gray-400">
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#111111] transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#111111] transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#social" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#111111] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors">Best Sellers</button></li>
              <li><button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors">Whole Spices</button></li>
              <li><button onClick={() => setActivePage('shop')} className="hover:text-white transition-colors">Artisanal Blends</button></li>
              <li><button onClick={() => setActivePage('wholesale')} className="hover:text-white transition-colors">B2B Wholesale</button></li>
            </ul>
          </div>

          {/* Column 2: Customer Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><button onClick={() => setActivePage('account')} className="hover:text-white transition-colors">Track Order</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">Shipping & Returns</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">FSSAI Lab Reports</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">Contact Support</button></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Concierge</h4>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A227]" />
                <span>+91 1800-202-CROF</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A227]" />
                <span>concierge@crofspices.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span>CROF Spice Estate, Western Ghats Valley, Kerala - 685561</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#C9A227]" />
            <div>
              <p className="font-semibold text-white">100% Natural</p>
              <p className="text-[10px] text-gray-400">No added preservatives or color</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#C9A227]" />
            <div>
              <p className="font-semibold text-white">FSSAI & ISO Certified</p>
              <p className="text-[10px] text-gray-400">Purity batch lab tested</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-[#C9A227]" />
            <div>
              <p className="font-semibold text-white">Cold Stone Ground</p>
              <p className="text-[10px] text-gray-400">Essential oils retained</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#C9A227]" />
            <div>
              <p className="font-semibold text-white">Direct Farm Sourced</p>
              <p className="text-[10px] text-gray-400">Fair trade with smallholders</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} CROF Spices Private Limited. All Rights Reserved. Pure Taste • Pure Aroma.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#shipping" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
