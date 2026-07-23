import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ui/ProductCard';
import { Package, Heart, MapPin, User, Truck, CheckCircle2, Clock, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export const AccountPage: React.FC = () => {
  const { orders, wishlist, setActivePage, openProductPage, user, setUser, setIsAuthModalOpen, accountTab, setAccountTab, logout, addToast, cancelOrder } = useShop();
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [editName, setEditName] = useState(user?.name || '');

  const trackedOrder = trackingOrderId ? orders.find(o => o.id === trackingOrderId) : orders[0];

  if (!user) {
    return (
      <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen flex flex-col items-center justify-center text-center px-4">
        <User className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold font-serif-luxury text-gray-900 mb-2">Account Access Required</h2>
        <p className="text-gray-500 mb-6 text-sm max-w-sm">Please sign in to view your orders, wishlist, and profile details.</p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-8 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C9A227] transition-all shadow-lg"
        >
          Login / Register
        </button>
      </div>
    );
  }

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const initials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="pt-40 sm:pt-48 pb-24 bg-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* User Profile Header */}
        <div className="p-8 bg-[#111111] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#C9A227] text-[#111111] font-bold text-2xl flex items-center justify-center font-serif-luxury">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif-luxury">{user.name}</h1>
              <p className="text-xs text-gray-400">CROF Reserve Member • {user.contact}</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <button
              onClick={() => setAccountTab('orders')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-semibold"
            >
              {orders.length} Past Orders
            </button>
            <button
              onClick={() => setAccountTab('wishlist')}
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
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setAccountTab(tab.id as any)}
                className={`py-3 text-xs uppercase font-bold tracking-wider flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  accountTab === tab.id
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
          {accountTab === 'orders' && (
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
                      onClick={() => {
                        setTrackingOrderId(order.id);
                        setAccountTab('tracking');
                      }}
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
          {accountTab === 'tracking' && (
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-8">
              {trackedOrder ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-xs uppercase font-bold text-[#C9A227]">Live Dispatch Status</span>
                      <h2 className="text-2xl font-bold font-serif-luxury text-gray-900">Order #{trackedOrder.id}</h2>
                      <p className="text-xs text-gray-500">
                        {trackedOrder.status === 'Cancelled' ? 'Order Cancelled' : 'Estimated Delivery: 3-5 Business Days'}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      {(trackedOrder.status === 'Processing' || trackedOrder.status === 'Fresh Cold Milled' || trackedOrder.status === 'Placed') && (
                        <button
                          onClick={() => cancelOrder(trackedOrder.id)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-xl border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors"
                        >
                          Cancel Order
                        </button>
                      )}
                      <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-xs font-bold text-gray-900">
                        Carrier: BlueDart Air Express
                      </div>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                    <div className={`p-4 rounded-2xl border ${trackedOrder.status === 'Cancelled' ? 'bg-red-50 border-red-200 opacity-50' : 'bg-white border-emerald-300'} space-y-1`}>
                      <CheckCircle2 className={`w-5 h-5 ${trackedOrder.status === 'Cancelled' ? 'text-red-600' : 'text-emerald-600'}`} />
                      <h4 className="font-bold text-xs text-gray-900">{trackedOrder.status === 'Cancelled' ? 'Cancelled' : 'Order Confirmed'}</h4>
                      <p className="text-[10px] text-gray-400">{trackedOrder.date}</p>
                    </div>
                    {trackedOrder.status !== 'Cancelled' && (
                      <>
                        <div className={`p-4 rounded-2xl border ${trackedOrder.status === 'Processing' || trackedOrder.status === 'Placed' ? 'bg-[#111111] text-white shadow-lg border-transparent' : 'bg-white border-emerald-300 opacity-50'} space-y-1`}>
                          <Clock className={`w-5 h-5 ${trackedOrder.status === 'Processing' || trackedOrder.status === 'Placed' ? 'text-[#C9A227] animate-pulse' : 'text-gray-400'}`} />
                          <h4 className="font-bold text-xs">Fresh Cold Milled</h4>
                          <p className="text-[10px] opacity-70">Processing</p>
                        </div>
                        <div className={`p-4 rounded-2xl border ${trackedOrder.status === 'Shipped' ? 'bg-[#111111] text-white shadow-lg border-transparent' : 'bg-white border-gray-200 opacity-50'} space-y-1`}>
                          <Truck className={`w-5 h-5 ${trackedOrder.status === 'Shipped' ? 'text-[#C9A227] animate-bounce' : 'text-gray-400'}`} />
                          <h4 className="font-bold text-xs">Out For Express Transit</h4>
                          <p className="text-[10px] text-gray-400">Pending</p>
                        </div>
                        <div className={`p-4 rounded-2xl border ${trackedOrder.status === 'Delivered' ? 'bg-[#111111] text-white shadow-lg border-transparent' : 'bg-white border-gray-200 opacity-50'} space-y-1`}>
                          <CheckCircle2 className={`w-5 h-5 ${trackedOrder.status === 'Delivered' ? 'text-emerald-500' : 'text-gray-400'}`} />
                          <h4 className="font-bold text-xs">Delivered</h4>
                          <p className="text-[10px] text-gray-400">Pending</p>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <Truck className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-bold text-gray-900 mb-1">No active orders</p>
                  <p className="text-xs">You haven't placed any orders yet to track.</p>
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {accountTab === 'wishlist' && (
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

          {/* Profile Settings Tab */}
          {accountTab === 'profile' && (
            <div className="max-w-2xl p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-6 text-xs">
              <h2 className="text-xl font-bold text-gray-900 font-serif-luxury">Personal Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]" 
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Google Account (Email)</label>
                  <input 
                    type="text" 
                    value={user.contact} 
                    readOnly
                    disabled
                    className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" 
                  />
                </div>
              </div>
              <button 
                onClick={() => {
                  setUser({ ...user, name: editName });
                  addToast('Profile details updated successfully');
                }}
                className="px-6 py-3 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-[#C9A227] transition-all"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Settings Tab */}
          {accountTab === 'settings' && (
            <div className="max-w-2xl p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-8 text-xs">
              <h2 className="text-xl font-bold text-gray-900 font-serif-luxury">Account Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <div>
                    <h4 className="font-bold text-gray-900">Offers through WhatsApp</h4>
                    <p className="text-gray-500 text-[10px]">Receive exclusive deals and order updates on WhatsApp.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A227]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <div>
                    <h4 className="font-bold text-gray-900">Offers through SMS</h4>
                    <p className="text-gray-500 text-[10px]">Receive text messages for promotions.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9A227]"></div>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-bold text-red-600 mb-2">Danger Zone</h4>
                <button
                  onClick={() => {
                    if(window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      logout();
                      setActivePage('home');
                    }
                  }}
                  className="px-6 py-3 bg-white text-red-600 border border-red-200 text-xs font-bold rounded-xl hover:bg-red-50 transition-all"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
