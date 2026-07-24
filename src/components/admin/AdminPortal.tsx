import React, { useState, useEffect } from 'react';
import type { Product } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { CrofLogo } from '../ui/CrofLogo';
import {
  LayoutDashboard, ShoppingCart, Package, Tags, Warehouse, Users, Percent,
  Star, BarChart3, Truck, Image as ImageIcon, ShieldCheck, Settings, LogOut, Lock, Key,
  Plus, Edit, Trash2, AlertTriangle, ArrowUpRight, ArrowRight, ArrowLeft, Download, X, Layers, Briefcase, CreditCard,
  Megaphone, FileText, Activity
} from 'lucide-react';
import { InventoryTab } from './InventoryTab';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const salesData = [
  { name: 'Jan', revenue: 4000, orders: 24 },
  { name: 'Feb', revenue: 3000, orders: 18 },
  { name: 'Mar', revenue: 5000, orders: 35 },
  { name: 'Apr', revenue: 2780, orders: 15 },
  { name: 'May', revenue: 8900, orders: 60 },
  { name: 'Jun', revenue: 12390, orders: 85 },
  { name: 'Jul', revenue: 15490, orders: 110 },
];

const customerGrowthData = [
  { name: 'Week 1', customers: 40 },
  { name: 'Week 2', customers: 85 },
  { name: 'Week 3', customers: 120 },
  { name: 'Week 4', customers: 210 },
];

export const AdminPortal: React.FC = () => {
  const { addToast, orders, products, deleteProduct, addProduct, updateProduct, resetCatalog, updateOrderStatus, coupons, addCoupon, deleteCoupon, toggleCouponStatus, reviews, updateVariantStock, stockHistory } = useShop();

  const totalRevenue = orders.reduce((acc, o) => (o.status !== 'Cancelled' ? acc + o.total : acc), 0);
  const totalOrders = orders.length;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState('admin@crof.com');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Section Tab
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'orders'
    | 'products'
    | 'categories'
    | 'collections'
    | 'inventory'
    | 'customers'
    | 'reviews'
    | 'coupons'
    | 'wholesale'
    | 'shipping'
    | 'payments'
    | 'analytics'
    | 'marketing'
    | 'media'
    | 'reports'
    | 'users'
    | 'settings'
    | 'activity'
  >('dashboard');

  // Dynamic States for Admin Data Management
  const [categories, setCategories] = useState<string[]>([
    'All Products',
    'Spice Powders',
    'Whole Spices',
    'Masalas',
    'Combo Packs'
  ]);



  const [selectedReviewProduct, setSelectedReviewProduct] = useState<any | null>(null);
  const [reviewSortBy, setReviewSortBy] = useState<'helpful' | 'latest' | 'positive' | 'negative'>('helpful');
  const [announcementText, setAnnouncementText] = useState(
    'Complimentary Express Shipping on all orders above ₹799 | Code: PURECROF'
  );
  const [heroTitle, setHeroTitle] = useState('Pure Taste. Pure Aroma.');

  // Product Editor Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [category, setCategory] = useState<string[]>(['All Products']);
  const [price, setPrice] = useState<number>(299);
  const [originalPrice, setOriginalPrice] = useState<number>(350);
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [origin, setOrigin] = useState('');
  const [pungency, setPungency] = useState<'Mild' | 'Medium' | 'Hot' | 'Extra Hot'>('Mild');
  const [customImageLabels, setCustomImageLabels] = useState<Record<string, string>>({});

  const handleLabelChange = (url: string, newLabel: string) => {
    setCustomImageLabels(prev => ({ ...prev, [url]: newLabel }));
  };

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [newCouponThreshold, setNewCouponThreshold] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Preloaded Spice Images List
  const preloadedImages = [
    { label: 'Lakadong Turmeric', path: '/images/lakadong-turmeric.png' },
    { label: 'Kashmiri Chilli', path: '/images/kashmiri-chilli.png' },
    { label: 'Red Chilli Powder', path: '/images/red-chilli.png' },
    { label: 'Coriander Powder', path: '/images/coriander-powder.png' },
    { label: 'Garam Masala', path: '/images/garam-masala.png' },
    { label: 'Cumin Powder', path: '/images/cumin-powder.png' },
    { label: 'Black Pepper', path: '/images/black-pepper.png' }
  ];

  const customImages = Array.from(new Set(
    products
      .map(p => p.image)
      .filter(img => !preloadedImages.some(pre => pre.path === img))
  ));

  const openAddModal = () => {
    setSelectedProduct(null);
    setName('');
    setHindiName('');
    setCategory(['All Products']);
    setPrice(299);
    setOriginalPrice(350);
    setTagline('Pure handpicked aroma.');
    setDescription('Farmed organically and cold milled under 30°C to preserve top notes.');
    setImage('');
    setGallery([]);
    setOrigin('Pristine Farms, India');
    setPungency('Mild');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setSelectedProduct(p);
    setName(p.name);
    setHindiName(p.hindiName);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setTagline(p.tagline);
    setDescription(p.description);
    setImage(p.image);
    setGallery(Array.isArray(p.gallery) ? p.gallery : (p.image ? [p.image] : []));
    setOrigin(p.origin);
    setPungency(p.pungency);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload: Product = {
      id: selectedProduct ? selectedProduct.id : name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      hindiName,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      rating: selectedProduct ? selectedProduct.rating : 4.8,
      reviewCount: selectedProduct ? selectedProduct.reviewCount : 1,
      tagline,
      description,
      image,
      gallery: gallery.length > 0 ? gallery : [image],
      variants: selectedProduct ? selectedProduct.variants : [
        { weight: '100g', sku: 'NEW-100G', price: Number(originalPrice), salePrice: Number(price), currentStock: 100, reservedStock: 0, status: 'In Stock' }
      ],
      discount: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      origin,
      pungency,
      ingredients: selectedProduct ? selectedProduct.ingredients : [`100% Pure ${name}`],
      nutrition: selectedProduct ? selectedProduct.nutrition : { calories: '300 kcal', protein: '10g', carbs: '60g', fat: '8g', fiber: '20g' },
      storage: selectedProduct ? selectedProduct.storage : 'Store in a cool, dry place.'
    };

    if (selectedProduct) {
      updateProduct(productPayload);
    } else {
      addProduct(productPayload);
    }
    setIsModalOpen(false);
  };

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@crof.com' && password === 'crof2026') {
      setIsAuthenticated(true);
      setLoginError('');
      addToast('Secure Admin Session Initiated. Welcome back, Master Admin.', 'success');
    } else {
      setLoginError('Invalid Administrator credentials. Please verify Email & Password.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    addToast('Admin Session Revoked. Logged out securely.', 'info');
  };

  // CSV Export
  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Name,Category,Rating\n' +
      products.map((p) => `"${p.name}","${p.category.join(', ')}",${p.rating}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CROF_Admin_Catalog_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    addToast('Exported Inventory Catalog CSV', 'success');
  };

  // ----------------------------------------------------
  // RENDER LOGIN GATE IF UNAUTHENTICATED
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#c9a227_1px,transparent_1px)] [background-size:40px_40px] opacity-10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8 z-10"
        >
          <div className="text-center space-y-3">
            <CrofLogo variant="light" size="lg" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-[#C9A227] text-[10px] font-bold uppercase tracking-widest rounded-full">
              <Lock className="w-3 h-3" /> Secure Admin Portal
            </div>
            <p className="text-xs text-gray-400 font-light">
              Restricted Access. Authorized CROF Personnel Only.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {loginError && (
              <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="font-semibold text-gray-300 block mb-1.5">Admin Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@crof.com"
                className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-300 block mb-1.5">Admin Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-white focus:outline-none focus:border-[#C9A227]"
              />
              <p className="text-[10px] text-gray-500 mt-1">Default Demo Password: <code className="text-[#C9A227]">crof2026</code></p>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#C9A227] text-[#111111] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" /> Authenticate & Access Portal
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center text-[10px] text-gray-500">
            256-Bit SSL Encrypted Admin Protocol • IP Logged
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-sans flex text-[#2B2B2B]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#111111] text-white flex flex-col justify-between p-6 shrink-0 min-h-screen border-r border-amber-900/20">
        <div className="space-y-8">
          <div className="space-y-1">
            <CrofLogo variant="light" size="sm" />
            <div className="inline-flex items-center gap-1 text-[9px] font-bold text-[#C9A227] bg-white/5 px-2 py-0.5 rounded border border-white/10">
              Admin Application
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'categories', label: 'Categories', icon: Tags },
              { id: 'collections', label: 'Collections', icon: Layers },
              { id: 'inventory', label: 'Inventory', icon: Warehouse },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'coupons', label: 'Coupons', icon: Percent },
              { id: 'wholesale', label: 'Wholesale', icon: Briefcase },
              { id: 'shipping', label: 'Shipping', icon: Truck },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'marketing', label: 'Marketing', icon: Megaphone },
              { id: 'media', label: 'Media Library', icon: ImageIcon },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'users', label: 'User Management', icon: ShieldCheck },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'activity', label: 'Activity Logs', icon: Activity },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#C9A227] text-[#111111] shadow-md font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C9A227] text-[#111111] font-bold text-xs flex items-center justify-center">
              MA
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Master Admin</p>
              <p className="text-[10px] text-gray-400">admin@crof.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout Session
          </button>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto relative">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="text-xs uppercase font-bold text-[#C9A227] tracking-widest">
              CROF Executive Suite
            </span>
            <h1 className="text-3xl font-bold font-serif-luxury text-gray-900 capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:border-gray-300 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-[#C9A227] transition-colors"
            >
              View Public Website →
            </a>
          </div>
        </div>

        {/* 1. DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-gray-400">Total Revenue</span>
                <p className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> Live Calculation
                </span>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-gray-400">Total Orders</span>
                <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                <span className="text-emerald-600 font-semibold">100% Tracked</span>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-gray-400">Registered Customers</span>
                <p className="text-3xl font-bold text-gray-900">Admin Only</p>
                <span className="text-emerald-600 font-semibold">Hidden Tab</span>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
                <span className="text-gray-400">Quality Certifications</span>
                <p className="text-3xl font-bold text-gray-900">100% NABL Pass</p>
                <span className="text-gray-500">Zero Contaminants</span>
              </div>
            </div>

            {/* Interactive Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-900 font-serif-luxury">Revenue Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C9A227" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#C9A227" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#C9A227" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-900 font-serif-luxury">Customer Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={customerGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                      <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="customers" fill="#111111" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Live Orders */}
            <div className="p-6 bg-white rounded-3xl border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold font-serif-luxury text-gray-900">Recent Customer Orders</h3>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-gray-400 font-bold uppercase">
                      <th className="py-2.5">Order ID</th>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Total</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {orders.map((ord) => (
                      <tr key={ord.id}>
                        <td className="py-3 font-bold text-gray-900">{ord.id}</td>
                        <td className="py-3 text-gray-500">{ord.date}</td>
                        <td className="py-3 font-bold text-gray-900">₹{ord.total}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button onClick={() => { setActiveTab('orders'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-[#C9A227] font-bold">
                            Manage →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. ORDERS */}
        {activeTab === 'orders' && (
          <div className="p-6 bg-white rounded-3xl border border-gray-200 space-y-4 text-xs">
            <h3 className="text-lg font-bold font-serif-luxury text-gray-900">Order Dispatch & Shipping Log</h3>
            <p className="text-gray-500">Manage order statuses, assign tracking numbers, and view customer addresses.</p>
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-2xl">
                  No orders have been placed yet.
                </div>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm">{o.id} — ₹{o.total}</h4>
                      <p className="text-gray-500 text-[11px]">Tracking: {o.trackingNo} | Date: {o.date}</p>
                      {o.customer && (
                        <div className="pt-1 pb-1 text-gray-600 text-[11px] space-y-0.5">
                          <p><span className="font-semibold text-gray-800">Customer:</span> {o.customer.name}</p>
                          <p><span className="font-semibold text-gray-800">Email:</span> {o.customer.email}</p>
                          <p><span className="font-semibold text-gray-800">Phone:</span> {o.customer.phone}</p>
                          {o.shippingAddress && (
                            <p><span className="font-semibold text-gray-800">Address:</span> {o.shippingAddress.address}, {o.shippingAddress.city}, {o.shippingAddress.state} - {o.shippingAddress.pincode}</p>
                          )}
                        </div>
                      )}
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-[10px] font-bold">
                        Current Status: {o.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Fresh Cold Milled">Fresh Cold Milled</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3. PRODUCTS */}
        {activeTab === 'products' && (
          <div className="p-6 bg-white rounded-3xl border border-gray-200 space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold font-serif-luxury text-gray-900">Products Catalog ({products.length})</h3>
              <div className="flex items-center gap-2">
                <button onClick={resetCatalog} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold flex items-center gap-1.5 transition-colors" title="Restore default premium spices">
                  Reset Catalog
                </button>
                <button onClick={openAddModal} className="px-4 py-2.5 bg-[#111111] hover:bg-[#C9A227] hover:text-[#111111] text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors">
                  <Plus className="w-4 h-4" /> Add Product SKU
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between hover:border-amber-300 transition-colors bg-white">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-12 h-12 object-cover rounded-xl border" />
                    <div>
                      <h4 className="font-bold text-gray-900">{p.name}</h4>
                      <p className="text-gray-400">{p.category.join(', ')} • ₹{p.variants?.[0]?.salePrice} <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded ml-1 font-bold">{p.variants?.[0]?.currentStock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => openEditModal(p)} className="p-2 text-gray-400 hover:text-gray-900" title="Edit Product">
                      <Edit className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => deleteProduct(p.id)} 
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                      title="Delete Product SKU"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="p-6 bg-white rounded-3xl border border-gray-200 space-y-6 text-xs">
            {!selectedReviewProduct ? (
              // 1. PRODUCT LIST VIEW
              <>
                <h3 className="text-lg font-bold font-serif-luxury text-gray-900">Select a Product to View Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((p) => {
                    const productReviews = reviews.filter(r => r.product === p.name);
                    const avgRating = productReviews.length 
                      ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
                      : '0.0';
                      
                    return (
                      <div 
                        key={p.id} 
                        onClick={() => setSelectedReviewProduct(p)}
                        className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between hover:border-[#C9A227] transition-all bg-white cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <img src={p.image} alt="" className="w-12 h-12 object-cover rounded-xl border group-hover:scale-105 transition-transform" />
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#C9A227] transition-colors">{p.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex text-green-700">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className={`w-3.5 h-3.5 ${i < Math.round(Number(avgRating)) ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-gray-500">{productReviews.length} Reviews</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#C9A227] transition-colors" />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              // 2. DETAILED REVIEW VIEW
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <button 
                    onClick={() => setSelectedReviewProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <img src={selectedReviewProduct.image} alt="" className="w-10 h-10 object-cover rounded-lg border" />
                  <h3 className="text-xl font-bold font-serif-luxury text-gray-900">{selectedReviewProduct.name} Reviews</h3>
                </div>

                {/* Rating Summary (Amazon Style) */}
                {(() => {
                  const pReviews = reviews.filter(r => r.product === selectedReviewProduct.name);
                  const avg = pReviews.length ? (pReviews.reduce((sum, r) => sum + r.rating, 0) / pReviews.length).toFixed(1) : '0.0';
                  
                  return (
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Left: Overall Avg */}
                      <div className="flex flex-col items-center justify-center min-w-[120px]">
                        <div className="flex text-green-700 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-5 h-5 ${i < Math.round(Number(avg)) ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-gray-500 font-medium">{pReviews.length} ratings and reviews</span>
                      </div>
                      
                      {/* Right: Star Bars */}
                      <div className="flex-1 w-full space-y-2 md:border-l border-gray-200 md:pl-8">
                        {[5, 4, 3, 2, 1].map(star => {
                          const count = pReviews.filter(r => r.rating === star).length;
                          const pct = pReviews.length ? Math.round((count / pReviews.length) * 100) : 0;
                          return (
                            <div key={star} className="flex items-center gap-3 text-xs">
                              <span className="font-bold min-w-[20px] text-right">{star} ★</span>
                              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-700 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-gray-400 min-w-[30px]">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                <hr className="border-gray-100" />

                {/* Sort Filters & Reviews List */}
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-gray-900">User reviews sorted by</h4>
                  <div className="flex flex-wrap gap-2">
                    {['helpful', 'latest', 'positive', 'negative'].map((sortType) => (
                      <button 
                        key={sortType}
                        onClick={() => setReviewSortBy(sortType as any)}
                        className={`px-4 py-1.5 rounded-full border transition-all text-xs capitalize ${
                          reviewSortBy === sortType 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {sortType === 'helpful' ? 'Most Helpful' : sortType}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 mt-6">
                    {(() => {
                      let pReviews = [...reviews.filter(r => r.product === selectedReviewProduct.name)];
                      
                      // Sort Logic
                      if (reviewSortBy === 'helpful') pReviews.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
                      if (reviewSortBy === 'positive') pReviews.sort((a, b) => b.rating - a.rating);
                      if (reviewSortBy === 'negative') pReviews.sort((a, b) => a.rating - b.rating);
                      if (reviewSortBy === 'latest') pReviews.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

                      if (pReviews.length === 0) return <p className="text-gray-400 italic">No reviews yet for this product.</p>;

                      return pReviews.map((r) => (
                        <div key={r.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 uppercase text-[10px]">
                                {r.author.charAt(0)}
                              </div>
                              <span className="font-bold text-gray-900">{r.author}</span>
                              <span className="text-gray-400 text-[10px]">• {r.date}</span>
                            </div>
                          </div>
                          
                          <div className="flex text-green-700">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          
                          <p className="text-gray-700 text-sm">{r.text}</p>
                          <div className="text-[10px] text-gray-500 flex items-center gap-1 pt-1">
                            <span className="font-medium text-gray-700">{r.helpful || 0}</span> people found this helpful
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. COUPONS */}
        {activeTab === 'coupons' && (
          <div className="p-6 bg-white rounded-3xl border border-gray-200 space-y-6 text-xs">
            <h3 className="text-lg font-bold font-serif-luxury text-gray-900">Manage Coupons</h3>
            
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <h4 className="font-bold mb-3">Add New Coupon</h4>
              <div className="flex flex-col sm:flex-row items-end gap-3">
                <div className="flex-1 w-full">
                  <label className="block text-gray-500 mb-1">Coupon Code</label>
                  <input type="text" value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())} placeholder="e.g. SUMMER20" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl uppercase" />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-gray-500 mb-1">Discount (e.g. 10%)</label>
                  <input type="text" value={newCouponDiscount} onChange={(e) => setNewCouponDiscount(e.target.value)} placeholder="10%" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl" />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-gray-500 mb-1">Min Order Value (₹)</label>
                  <input type="number" value={newCouponThreshold} onChange={(e) => setNewCouponThreshold(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl" />
                </div>
                <button 
                  onClick={() => {
                    if(!newCouponCode || !newCouponDiscount) return addToast('Code and Discount are required', 'warning');
                    addCoupon({ id: Date.now().toString(), code: newCouponCode, discount: newCouponDiscount, status: 'Active', minOrderValue: Number(newCouponThreshold) || 0 });
                    setNewCouponCode('');
                    setNewCouponDiscount('');
                    setNewCouponThreshold('');
                    addToast('Coupon created successfully', 'success');
                  }}
                  className="px-6 py-2 bg-[#111111] hover:bg-[#C9A227] hover:text-[#111111] text-white font-bold rounded-xl transition-colors h-[38px] w-full sm:w-auto"
                >
                  Create
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {coupons.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      {c.code}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>{c.status}</span>
                    </h4>
                    <p className="text-gray-500 mt-1">{c.discount} off {c.minOrderValue ? `on orders above ₹${c.minOrderValue}` : 'on all orders'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleCouponStatus(c.id)}
                      className={`px-4 py-1.5 rounded-lg font-bold border transition-colors ${c.status === 'Active' ? 'border-gray-200 text-gray-600 hover:bg-gray-100' : 'border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
                    >
                      {c.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => deleteCoupon(c.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete Coupon">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {coupons.length === 0 && <p className="text-gray-400 italic py-4">No coupons available.</p>}
            </div>
          </div>
        )}

        {/* 12.5 INVENTORY */}
        {activeTab === 'inventory' && (
          <InventoryTab products={products} updateVariantStock={updateVariantStock} stockHistory={stockHistory} updateProduct={updateProduct} />
        )}

        {/* 13. SETTINGS */}
        {activeTab === 'settings' && (
          <div className="p-6 bg-white rounded-3xl border border-gray-200 space-y-4 text-xs">
            <h3 className="text-lg font-bold font-serif-luxury text-gray-900">Store Settings</h3>
            <p className="text-gray-500">Currency: INR (₹) | FSSAI License: 10021022000891</p>
          </div>
        )}

        {/* ----------------------------------------------------
            INTERACTIVE ADD / EDIT PRODUCT MODAL (POPUP)
            ---------------------------------------------------- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden flex flex-col z-10 text-xs text-gray-700"
              >
                <div className="overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6 h-full w-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C9A227] tracking-widest">Product Catalog Editor</span>
                    <h3 className="text-xl font-bold font-serif-luxury text-gray-900">
                      {selectedProduct ? `Edit ${selectedProduct.name}` : 'Create New Spice SKU'}
                    </h3>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProduct} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Spice Product Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Organic Tellicherry Pepper"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Hindi / Regional Name</label>
                      <input
                        type="text"
                        required
                        value={hindiName}
                        onChange={(e) => setHindiName(e.target.value)}
                        placeholder="e.g. काली मिर्च"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Categories</label>
                      <div className="grid grid-cols-2 gap-2 border border-gray-200 p-3 rounded-xl bg-gray-50 max-h-40 overflow-y-auto">
                        {categories.map((cat, i) => (
                          <label key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={category.includes(cat)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCategory([...category, cat]);
                                } else {
                                  setCategory(category.filter(c => c !== cat));
                                }
                              }}
                              className="rounded border-gray-300 text-[#C9A227] focus:ring-[#C9A227]"
                            />
                            {cat}
                          </label>
                        ))}
                      </div>
                    </div>


                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Sale Price (₹)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={price || ''}
                        onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">MSRP / Original Price (₹)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={originalPrice || ''}
                        onChange={(e) => setOriginalPrice(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>


                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Origin of Harvest</label>
                      <input
                        type="text"
                        required
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="e.g. Wayanad Hills, Kerala"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Heat Pungency Rating</label>
                      <select
                        value={pungency}
                        onChange={(e) => setPungency(e.target.value as any)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      >
                        <option value="Mild">Mild</option>
                        <option value="Medium">Medium</option>
                        <option value="Hot">Hot</option>
                        <option value="Extra Hot">Extra Hot</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-900 block mb-1.5">Spice Image</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                      {preloadedImages.map((imgItem, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImage(imgItem.path)}
                          className={`p-1.5 border rounded-xl flex flex-col items-center gap-1 hover:border-[#C9A227] transition-all bg-gray-50 ${
                            image === imgItem.path ? 'border-[#C9A227] ring-1 ring-[#C9A227]/40' : 'border-gray-200'
                          }`}
                        >
                          <img src={imgItem.path} alt="" className="w-10 h-10 object-cover rounded-lg border" />
                          <input 
                            type="text"
                            value={customImageLabels[imgItem.path] ?? imgItem.label}
                            onChange={(e) => handleLabelChange(imgItem.path, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`text-[9px] font-semibold bg-transparent text-center w-full focus:outline-none focus:border-b truncate ${image === imgItem.path ? 'text-[#C9A227] focus:border-[#C9A227]' : 'text-gray-500 focus:border-gray-300'}`}
                          />
                        </button>
                      ))}
                      {customImages.map((imgUrl, idx) => (
                        <button
                          key={`custom-${idx}`}
                          type="button"
                          onClick={() => setImage(imgUrl)}
                          className={`p-1.5 border rounded-xl flex flex-col items-center gap-1 hover:border-[#C9A227] transition-all bg-gray-50 ${
                            image === imgUrl ? 'border-[#C9A227] ring-1 ring-[#C9A227]/40' : 'border-gray-200'
                          }`}
                        >
                          <img src={imgUrl} alt="Custom" className="w-10 h-10 object-cover rounded-lg border" />
                          <input 
                            type="text"
                            value={customImageLabels[imgUrl] ?? 'Custom'}
                            onChange={(e) => handleLabelChange(imgUrl, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className={`text-[9px] font-semibold bg-transparent text-center w-full focus:outline-none focus:border-b truncate ${image === imgUrl ? 'text-[#C9A227] focus:border-[#C9A227]' : 'text-gray-500 focus:border-gray-300'}`}
                          />
                        </button>
                      ))}
                      {image && !preloadedImages.some(img => img.path === image) && !customImages.includes(image) && (
                        <button
                          type="button"
                          onClick={() => {}}
                          className="p-1.5 border rounded-xl flex flex-col items-center gap-1 hover:border-[#C9A227] transition-all bg-gray-50 border-[#C9A227] ring-1 ring-[#C9A227]/40"
                        >
                          <img src={image} alt="Custom Upload" className="w-10 h-10 object-cover rounded-lg border" />
                          <input 
                            type="text"
                            value={customImageLabels[image] ?? 'New Upload'}
                            onChange={(e) => handleLabelChange(image, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[9px] font-semibold text-[#C9A227] bg-transparent text-center w-full focus:outline-none focus:border-b focus:border-[#C9A227] truncate"
                          />
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 mb-1">Upload an image from your device or paste URL:</p>
                      <div className="flex gap-2">
                        <label className="cursor-pointer flex-shrink-0 px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center">
                          Upload File
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setImage(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }} 
                          />
                        </label>
                        <input
                          type="text"
                          value={image.startsWith('data:image') ? '' : image}
                          onChange={(e) => setImage(e.target.value)}
                          placeholder={image.startsWith('data:image') ? "Custom image uploaded from device" : "Or paste Image URL"}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-900 block mb-1.5">Bottom Images (Gallery)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {gallery.map((imgUrl, idx) => (
                        <div key={`gal-${idx}`} className="relative p-1.5 border border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center group shrink-0">
                          <img src={imgUrl} alt="" className="w-10 h-10 object-cover rounded-lg border" />
                          <button 
                            type="button" 
                            onClick={() => setGallery(prev => (Array.isArray(prev) ? prev : []).filter((_, i) => i !== idx))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 mb-1">Upload an image from your device or paste URL:</p>
                      <div className="flex gap-2">
                        <label className="cursor-pointer flex-shrink-0 px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors flex items-center justify-center">
                          Upload File
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setGallery(prev => Array.isArray(prev) ? [...prev, reader.result as string] : [reader.result as string]);
                                };
                                reader.readAsDataURL(file);
                              }
                              e.target.value = '';
                            }} 
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="Paste Image URL and press Enter to add"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = e.currentTarget.value;
                              if (val) {
                                setGallery(prev => Array.isArray(prev) ? [...prev, val] : [val]);
                                e.currentTarget.value = '';
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-900 block mb-1.5">Luxury Tagline</label>
                    <input
                      type="text"
                      required
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Certified 4.25mm bold black peppercorns harvested at full maturity."
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-900 block mb-1.5">Detailed Description</label>
                    <textarea
                      rows={3}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Product story, flavor profiles, or health benefits..."
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 border-t pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#C9A227] hover:bg-amber-400 text-[#111111] font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      {selectedProduct ? 'Save Changes' : 'Create Product SKU'}
                    </button>
                  </div>
                </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
