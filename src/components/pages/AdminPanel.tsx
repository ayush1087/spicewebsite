import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../data/products';
import { useShop } from '../../context/ShopContext';
import { BarChart3, Package, Users, Tag, Download, Plus, Search, CheckCircle2, AlertCircle, Edit, Trash2, ArrowUpRight } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { addToast } = useShop();

  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'inventory' | 'coupons'>('analytics');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample admin metrics
  const totalRevenue = 489200;
  const totalOrders = 342;
  const activeCustomers = 1290;

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,ID,Name,Category,Price,Rating,InStock\n' +
      productsList.map((p) => `${p.id},"${p.name}",${p.category},${p.price},${p.rating},${p.inStock}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CROF_Inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    addToast('CROF Inventory CSV Exported Successfully!', 'success');
  };

  return (
    <div className="pt-32 pb-24 bg-[#F8F8F8] font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="p-8 bg-[#111111] text-white rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-[#C9A227] text-[10px] font-bold uppercase rounded-md mb-2">
              Super Admin Mode
            </div>
            <h1 className="text-3xl font-bold font-serif-luxury">CROF Operations & Executive Dashboard</h1>
            <p className="text-xs text-gray-400">Live store analytics, batch fulfillment, inventory management & reports.</p>
          </div>

          <button
            onClick={exportCSV}
            className="px-5 py-3 bg-[#C9A227] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV Data
          </button>
        </div>

        {/* Analytics Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span>Gross Revenue</span>
              <BarChart3 className="w-5 h-5 text-[#C9A227]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last month
            </span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span>Total Orders</span>
              <Package className="w-5 h-5 text-[#C9A227]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 98.2% Fulfillment Rate
            </span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span>Active Customers</span>
              <Users className="w-5 h-5 text-[#C9A227]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
            <span className="text-emerald-600 font-semibold">42% Repeat Buyer Rate</span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span>Stock Status</span>
              <AlertCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">All SKUs In Stock</p>
            <span className="text-gray-500">NABL Quality Passes: 100%</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-200 gap-6 overflow-x-auto">
          {[
            { id: 'analytics', label: 'Overview' },
            { id: 'inventory', label: 'Products & Inventory' },
            { id: 'orders', label: 'Order Fulfillment' },
            { id: 'coupons', label: 'Promotions & Coupons' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 text-xs uppercase font-bold tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#C9A227] text-[#C9A227]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inventory Manager */}
        {activeTab === 'inventory' && (
          <div className="p-8 bg-white rounded-3xl border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold font-serif-luxury text-gray-900">Catalog Inventory</h2>
              <button
                onClick={() => addToast('Product Creator Modal Triggered', 'info')}
                className="px-4 py-2.5 bg-[#111111] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#C9A227] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New Spice SKU
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Spice SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {productsList.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img src={p.image} alt="" className="w-10 h-10 object-cover rounded-lg border" />
                        <div>
                          <p className="font-bold text-gray-900">{p.name}</p>
                          <p className="text-[10px] text-gray-400">{p.sku}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{p.category}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900">₹{p.price}</td>
                      <td className="py-3.5 px-4 text-amber-500 font-bold">⭐ {p.rating}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-semibold rounded-md text-[10px]">
                          In Stock
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button onClick={() => addToast(`Editing ${p.name}`, 'info')} className="p-1.5 text-gray-400 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Overview Tab */}
        {activeTab === 'analytics' && (
          <div className="p-8 bg-white rounded-3xl border border-gray-200 space-y-6">
            <h2 className="text-xl font-bold font-serif-luxury text-gray-900">Top Performing Spice SKUs</h2>
            <div className="space-y-4">
              {PRODUCTS.slice(0, 4).map((p) => (
                <div key={p.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="w-12 h-12 object-cover rounded-xl" />
                    <div>
                      <h4 className="font-bold text-gray-900">{p.name}</h4>
                      <p className="text-gray-400">{p.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{(p.price * 140).toLocaleString()}</p>
                    <p className="text-emerald-600 font-semibold">140 Units Sold</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
