import React, { useState } from 'react';
import type { Product } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { CrofLogo } from '../ui/CrofLogo';
import {
  LayoutDashboard, ShoppingCart, Package, Tags, Warehouse, Users, Percent,
  Star, BarChart3, Truck, Image as ImageIcon, ShieldCheck, Settings, LogOut, Lock, Key,
  Plus, Edit, Trash2, AlertTriangle, ArrowUpRight, Download, X, Layers, Briefcase, CreditCard,
  Megaphone, FileText, Activity
} from 'lucide-react';
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
  const { addToast, orders, products, deleteProduct, addProduct, updateProduct, resetCatalog, updateOrderStatus } = useShop();

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
    'Essential Spices',
    'Chilli & Pepper',
    'Artisanal Blends',
    'Whole Spices',
    'Exotic Reserve'
  ]);
  const [coupons, setCoupons] = useState([
    { code: 'PURECROF', discount: '10%', status: 'Active', usageCount: 142 },
    { code: 'GOLDEN20', discount: '20%', status: 'Active', usageCount: 89 },
    { code: 'FARMDIRECT', discount: '₹150 OFF', status: 'Expired', usageCount: 45 }
  ]);
  const [reviewsList, setReviewsList] = useState([
    { id: 1, author: 'Chef Ranveer', product: 'Lakadong Turmeric', rating: 5, text: 'Vibrant golden hue and unmatched aroma!', status: 'Approved' },
    { id: 2, author: 'Kavita S.', product: 'Kashmiri Red Chilli', rating: 5, text: 'Deep natural crimson without high heat.', status: 'Approved' },
    { id: 3, author: 'Rahul M.', product: 'Royal Garam Masala', rating: 4, text: 'Very aromatic whole spices.', status: 'Pending' }
  ]);
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
  const [category, setCategory] = useState('Essential Spices');
  const [price, setPrice] = useState<number>(299);
  const [originalPrice, setOriginalPrice] = useState<number>(350);
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/images/lakadong-turmeric.png');
  const [sku, setSku] = useState('');
  const [origin, setOrigin] = useState('');
  const [pungency, setPungency] = useState<'Mild' | 'Medium' | 'Hot' | 'Extra Hot'>('Mild');
  const [inStock, setInStock] = useState(true);

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

  const openAddModal = () => {
    setSelectedProduct(null);
    setName('');
    setHindiName('');
    setCategory('Essential Spices');
    setPrice(299);
    setOriginalPrice(350);
    setTagline('Pure handpicked aroma.');
    setDescription('Farmed organically and cold milled under 30°C to preserve top notes.');
    setImage('/images/lakadong-turmeric.png');
    setSku('CROF-NEW-100');
    setOrigin('Pristine Farms, India');
    setPungency('Mild');
    setInStock(true);
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
    setSku(p.sku);
    setOrigin(p.origin);
    setPungency(p.pungency);
    setInStock(p.inStock);
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
      gallery: [image],
      weightOptions: selectedProduct ? selectedProduct.weightOptions : ['100g', '250g', '500g'],
      discount: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      origin,
      pungency,
      ingredients: selectedProduct ? selectedProduct.ingredients : [`100% Pure ${name}`],
      nutrition: selectedProduct ? selectedProduct.nutrition : { calories: '300 kcal', protein: '10g', carbs: '60g', fat: '8g', fiber: '20g' },
      storage: selectedProduct ? selectedProduct.storage : 'Store in a cool, dry place.',
      inStock,
      sku
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
      'data:text/csv;charset=utf-8,SKU,Name,Category,Price,Rating,InStock\n' +
      products.map((p) => `${p.sku},"${p.name}",${p.category},${p.price},${p.rating},${p.inStock}`).join('\n');
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
                      <p className="text-gray-400">{p.category} • ₹{p.price} <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded ml-1 font-bold">{p.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
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
                className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 z-10 text-xs text-gray-700"
              >
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
                      <label className="font-bold text-gray-900 block mb-1.5">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      >
                        {categories.map((cat, i) => (
                          <option key={i} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Product SKU</label>
                      <input
                        type="text"
                        required
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        placeholder="e.g. CROF-LKT-100"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Sale Price (₹)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">MSRP / Original Price (₹)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-900 block mb-1.5">Stock Status</label>
                      <select
                        value={inStock ? 'true' : 'false'}
                        onChange={(e) => setInStock(e.target.value === 'true')}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      >
                        <option value="true">In Stock & Ready</option>
                        <option value="false">Out of Stock</option>
                      </select>
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
                          <span className="text-[9px] font-semibold text-gray-500 truncate w-full text-center">{imgItem.label}</span>
                        </button>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 mb-1">Or paste a custom image URL below:</p>
                      <input
                        type="text"
                        required
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Image URL"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227]"
                      />
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
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
