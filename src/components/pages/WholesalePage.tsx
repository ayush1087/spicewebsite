import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Building2, Download, Send, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export const WholesalePage: React.FC = () => {
  const { addToast } = useShop();

  const [form, setForm] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    estVolume: '50kg - 250kg',
    spicesInterested: 'Lakadong Turmeric, Kashmiri Chilli',
    city: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Wholesale Inquiry Submitted! Our B2B concierge will reach out within 4 hours.', 'success');
    setForm({
      businessName: '',
      contactPerson: '',
      email: '',
      phone: '',
      estVolume: '50kg - 250kg',
      spicesInterested: 'Lakadong Turmeric, Kashmiri Chilli',
      city: '',
      message: ''
    });
  };

  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            B2B & Commercial Partnerships
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold font-serif-luxury text-gray-900 leading-tight">
            Wholesale & Bulk Institutional Supply
          </h1>
          <p className="text-sm text-gray-600 font-light leading-relaxed">
            Supplying 5-star hotel chains, Michelin-starred restaurants, food manufacturers, and luxury exporters with lab-certified bulk single-origin spices.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <Building2 className="w-6 h-6 text-[#C9A227]" />
            <h3 className="font-bold text-gray-900 text-sm">Direct Farm Pricing</h3>
            <p className="text-gray-500">Tiered bulk pricing starting from 25kg vacuum-sealed master bags.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#C9A227]" />
            <h3 className="font-bold text-gray-900 text-sm">Custom Mesh & Moisture Spec</h3>
            <p className="text-gray-500">Milled to exact client mesh size and essential oil percentage requirements.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <Truck className="w-6 h-6 text-[#C9A227]" />
            <h3 className="font-bold text-gray-900 text-sm">Pan-India Freight Support</h3>
            <p className="text-gray-500">Cold-chain and express palletized shipment across India & exports.</p>
          </div>
        </div>

        {/* Form + Catalog Download Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-[#F8F8F8] p-8 rounded-3xl border border-gray-200 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 font-serif-luxury">Submit Wholesale Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Company / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    placeholder="e.g. Oberoi Hotels / Food Tech Pvt Ltd"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    placeholder="e.g. Chef Rajesh Kumar"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. purchase@hotel.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Estimated Monthly Volume</label>
                  <select
                    value={form.estVolume}
                    onChange={(e) => setForm({ ...form, estVolume: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="25kg - 50kg">25kg - 50kg (Small Batch)</option>
                    <option value="50kg - 250kg">50kg - 250kg (Standard B2B)</option>
                    <option value="250kg - 1000kg">250kg - 1 Ton (Commercial)</option>
                    <option value="1 Ton+">1 Ton+ (Export Grade)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">City / Export Port</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Mumbai / Nhava Sheva"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Specific Spices or Custom Specs</label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Mention desired curcumin percentage, mesh size, or custom packaging..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C9A227] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" /> Submit Bulk Inquiry
              </button>
            </form>
          </div>

          {/* Right Download Box */}
          <div className="lg:col-span-5 bg-[#111111] text-white p-8 rounded-3xl space-y-6">
            <span className="text-xs font-bold uppercase text-[#C9A227] tracking-widest">Digital Resources</span>
            <h3 className="text-2xl font-bold font-serif-luxury">Download 2026 Wholesale Product Catalog & Pricing Guide</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Complete batch specification matrix, NABL lab certificates, export HSN codes, and tier-1 distributor minimum order thresholds.
            </p>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
              <p><strong className="text-amber-300">MOQ Standard:</strong> 25kg per SKU</p>
              <p><strong className="text-amber-300">Lab Reports:</strong> Included with every dispatch</p>
              <p><strong className="text-amber-300">Shelf Life:</strong> 18 Months in Vacuum Foil</p>
            </div>

            <button
              onClick={() => addToast('CROF 2026 Wholesale Catalog PDF Downloaded!', 'success')}
              className="w-full py-4 bg-[#C9A227] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download B2B Catalog (PDF 4.2MB)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
