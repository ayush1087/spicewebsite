import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { Package, Heart, MapPin, User, Truck, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, setActivePage, openProductPage } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'tracking' | 'wishlist' | 'addresses' | 'profile'>('orders');

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* User Profile Header */}
        <div className="p-8 bg-[#111111] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#C9A227] text-[#111111] font-bold text-2xl flex items-center justify-center font-serif-luxury">
              AS
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif-luxury">Ayush Sharma</h1>
              <p className="text-xs text-gray-400">CROF Reserve Member • ayush@example.com</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-semibold"
            >
              {orders.length} Past Orders
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className="px-4 py-2 bg-[#C9A227] text-[#111111] rounded-xl font-bold"
            >
              {wishlist.length} Wishlisted
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="flex border-b border-gray-200 gap-6 overflow-x-auto">
          {[
            { id: 'orders', label: 'Order History', icon: Package },
            { id: 'tracking', label: 'Live Track Order', icon: Truck },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
            { id: 'addresses', label: 'Addresses', icon: MapPin },
            { id: 'profile', label: 'Profile', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 text-xs uppercase font-bold tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#C9A227] text-[#C9A227]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>
          {/* Orders History Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 font-serif-luxury">Past Spice Deliveries</h2>
              {orders.map((order) => (
                <div key={order.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between border-b border-gray-200 pb-3 text-xs gap-2">
                    <div>
                      <span className="font-bold text-gray-900">{order.id}</span>
                      <span className="text-gray-400 ml-3">Placed on {order.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 font-semibold rounded-md">
                        {order.status}
                      </span>
                      <span className="font-bold text-gray-900">Total: ₹{order.total}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {order.items.map((it: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-gray-700">
                        <span>{it.name} x {it.qty}</span>
                        <span className="font-semibold">₹{it.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">Tracking #: {order.trackingNo}</span>
                    <button
                      onClick={() => setActiveTab('tracking')}
                      className="text-[#C9A227] font-bold hover:underline"
                    >
                      Track Order Status →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live Order Tracking Visual Step Tracker */}
          {activeTab === 'tracking' && (
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs uppercase font-bold text-[#C9A227]">Live Dispatch Status</span>
                  <h2 className="text-2xl font-bold font-serif-luxury text-gray-900">Order #ORD-8921</h2>
                  <p className="text-xs text-gray-500">Estimated Delivery: Tomorrow by 5:00 PM</p>
                </div>
                <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-xs font-bold text-gray-900">
                  Carrier: BlueDart Air Express
                </div>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                <div className="p-4 bg-white rounded-2xl border border-emerald-300 space-y-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-xs text-gray-900">Order Confirmed</h4>
                  <p className="text-[10px] text-gray-400">Jul 15, 10:30 AM</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-emerald-300 space-y-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-xs text-gray-900">Fresh Cold Milled</h4>
                  <p className="text-[10px] text-gray-400">Jul 15, 2:15 PM</p>
                </div>
                <div className="p-4 bg-[#111111] text-white rounded-2xl shadow-lg space-y-1">
                  <Truck className="w-5 h-5 text-[#C9A227] animate-bounce" />
                  <h4 className="font-bold text-xs">Out For Express Transit</h4>
                  <p className="text-[10px] text-amber-300">In Transit - Hub Mumbai</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-1 opacity-50">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <h4 className="font-bold text-xs text-gray-900">Delivered</h4>
                  <p className="text-[10px] text-gray-400">Pending</p>
                </div>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 font-serif-luxury">Saved Spices ({wishlistedProducts.length})</h2>
              {wishlistedProducts.length === 0 ? (
                <div className="py-12 text-center text-gray-400 bg-gray-50 rounded-3xl border border-gray-200">
                  <p className="text-gray-900 font-bold text-base">Your wishlist is empty</p>
                  <button
                    onClick={() => setActivePage('shop')}
                    className="mt-3 px-6 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-full hover:bg-[#C9A227] transition-colors"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlistedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 font-serif-luxury">Saved Shipping Addresses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-6 bg-gray-50 rounded-2xl border border-[#C9A227] space-y-2 relative">
                  <span className="absolute top-4 right-4 bg-[#C9A227] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Primary
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm">Home Estate</h4>
                  <p className="text-gray-600">Ayush Sharma • +91 98765 43210</p>
                  <p className="text-gray-500">Suite 402, Royal Residency, Bandra West, Mumbai, MH - 400050</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Settings Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-4 text-xs">
              <h2 className="text-xl font-bold text-gray-900 font-serif-luxury">Personal Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input type="text" defaultValue="Ayush Sharma" className="w-full p-3 bg-white border rounded-xl" />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Email</label>
                  <input type="email" defaultValue="ayush@example.com" className="w-full p-3 bg-white border rounded-xl" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
