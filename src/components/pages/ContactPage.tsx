import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Order Query', message: '' });
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Orders placed before 2 PM are dispatched same day. Express delivery takes 2-4 business days across metro cities in India.'
    },
    {
      q: 'Are CROF spices 100% natural with no artificial color?',
      a: 'Yes! Absolutely zero synthetic dyes, zero lead chromate, zero anti-caking agents. Every batch is certified by NABL labs.'
    },
    {
      q: 'What is the shelf life of cold-ground spices?',
      a: 'Thanks to our quad-layer zipper packaging, volatile essential oils stay protected for up to 18 months from milling.'
    },
    {
      q: 'Can I track my order live?',
      a: 'Yes, visit the My Account section or check the WhatsApp tracking link sent upon dispatch.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Thank you! Your message has been sent to CROF Concierge.', 'success');
    setForm({ name: '', email: '', phone: '', subject: 'Order Query', message: '' });
  };

  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            Concierge Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-luxury text-gray-900">
            We are here to assist your culinary journey.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#F8F8F8] p-8 rounded-3xl border border-gray-200 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 font-serif-luxury">Send Us A Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. rahul@domain.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="Order Query">Order Status & Shipping Query</option>
                  <option value="Product Feedback">Spice Quality & Feedback</option>
                  <option value="Press / Media">Press & Media Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can our concierge help you?"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C9A227] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

          {/* Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#111111] text-white rounded-3xl space-y-6">
              <h3 className="text-xl font-bold font-serif-luxury">Estate Concierge Contact</h3>
              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C9A227]" />
                  <span>+91 1800-202-CROF (Mon-Sat, 9am-7pm)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C9A227]" />
                  <span>concierge@crofspices.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                  <span>CROF Luxury Estate, Western Ghats Valley, Idukki, Kerala - 685561</span>
                </div>
              </div>
            </div>

            {/* Map Visual Placeholder */}
            <div className="relative h-56 rounded-3xl overflow-hidden border border-gray-200 shadow-md">
              <iframe
                title="Estate Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125712.98144709148!2d76.9016!3d9.8512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b079fe03a5b6f3d%3A0x6b876412151fa40!2sIdukki%2C%20Kerala!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale opacity-90 hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-gray-200">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold font-serif-luxury text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs text-gray-900 flex justify-between items-center bg-gray-50/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C9A227] transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 text-xs text-gray-600 border-t border-gray-100 bg-white leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
