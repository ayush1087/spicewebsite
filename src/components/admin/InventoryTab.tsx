import React, { useState } from 'react';
import { Package, AlertCircle, RefreshCw, History, Plus, Minus, Settings2 } from 'lucide-react';
import type { Product } from '../../data/products';
import type { StockHistoryRecord } from '../../context/ShopContext';

interface InventoryTabProps {
  products: Product[];
  updateVariantStock: (productId: string, weight: string, delta: number, type: 'increase' | 'decrease' | 'set', reason: string, adminName?: string) => void;
  stockHistory: StockHistoryRecord[];
  updateProduct: (p: Product) => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ products, updateVariantStock, stockHistory, updateProduct }) => {
  const [activeSubTab, setActiveSubTab] = useState<'levels' | 'history'>('levels');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'low-stock' | 'out-of-stock'>('all');
  const [pendingChanges, setPendingChanges] = useState<Record<string, number | string>>({});
  const [pendingMRP, setPendingMRP] = useState<Record<string, number | string>>({});
  const [pendingDiscount, setPendingDiscount] = useState<Record<string, number | string>>({});

  // Expand variants into a flat list
  const variantList = products.flatMap(p => 
    (p.variants || []).map(v => ({
      productId: p.id,
      productName: p.name,
      image: p.image,
      ...v
    }))
  );

  let filteredVariants = variantList.filter(v => 
    v.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterMode === 'low-stock') {
    filteredVariants = filteredVariants.filter(v => v.currentStock > 0 && v.currentStock <= 20);
  } else if (filterMode === 'out-of-stock') {
    filteredVariants = filteredVariants.filter(v => v.currentStock === 0);
  }

  // Metrics
  const totalProducts = products.length;
  const lowStock = variantList.filter(v => v.currentStock > 0 && v.currentStock <= 20).length;
  const outOfStock = variantList.filter(v => v.currentStock === 0).length;
  const totalUnits = variantList.reduce((acc, v) => acc + v.currentStock, 0);

  const handleQuickAction = (productId: string, weight: string, current: number, delta: number) => {
    const key = `${productId}|${weight}`;
    const pendingVal = pendingChanges[key] !== undefined ? Number(pendingChanges[key]) || 0 : current;
    setPendingChanges(prev => ({ ...prev, [key]: Math.max(0, pendingVal + delta) }));
  };

  const handleSave = () => {
    // Save stock changes
    Object.entries(pendingChanges).forEach(([key, newStock]) => {
      const [productId, weight] = key.split('|');
      updateVariantStock(productId, weight, Number(newStock) || 0, 'set', 'Bulk Manual Adjustment');
    });

    // Save price changes
    if (Object.keys(pendingMRP).length > 0 || Object.keys(pendingDiscount).length > 0) {
      products.forEach(p => {
        let modified = false;
        const updatedVariants = (p.variants || []).map(v => {
          const key = `${p.id}|${v.weight}`;
          const newMRP = pendingMRP[key] !== undefined ? (Number(pendingMRP[key]) || 0) : v.price;
          const origDisc = Math.round(((v.price - v.salePrice) / v.price) * 100) || 0;
          const newDisc = pendingDiscount[key] !== undefined ? (Number(pendingDiscount[key]) || 0) : origDisc;
          const newSalePrice = Math.round(newMRP * (1 - newDisc / 100));
          
          if (newMRP !== v.price || newSalePrice !== v.salePrice) {
            modified = true;
            return { ...v, price: newMRP, salePrice: newSalePrice };
          }
          return v;
        });
        if (modified) {
          updateProduct({ ...p, variants: updatedVariants });
        }
      });
    }

    setPendingChanges({});
    setPendingMRP({});
    setPendingDiscount({});
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Inventory Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Manage stock levels across all product variants.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
          onClick={() => setFilterMode('all')}
          className={`bg-white p-5 rounded-2xl border ${filterMode === 'all' ? 'border-[#C9A227] ring-1 ring-[#C9A227] shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'} cursor-pointer flex items-center gap-4 transition-all`}
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalProducts}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Units in Stock</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalUnits}</h3>
          </div>
        </div>
        <div 
          onClick={() => setFilterMode('low-stock')}
          className={`bg-white p-5 rounded-2xl border ${filterMode === 'low-stock' ? 'border-[#C9A227] ring-1 ring-[#C9A227] shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'} cursor-pointer flex items-center gap-4 transition-all`}
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Low Stock Variants</p>
            <h3 className="text-2xl font-bold text-gray-900">{lowStock}</h3>
          </div>
        </div>
        <div 
          onClick={() => setFilterMode('out-of-stock')}
          className={`bg-white p-5 rounded-2xl border ${filterMode === 'out-of-stock' ? 'border-[#C9A227] ring-1 ring-[#C9A227] shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'} cursor-pointer flex items-center gap-4 transition-all`}
        >
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Out of Stock</p>
            <h3 className="text-2xl font-bold text-gray-900">{outOfStock}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveSubTab('levels')}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${
                activeSubTab === 'levels'
                  ? 'bg-[#111111] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Stock Levels
            </button>
            <button
              onClick={() => setActiveSubTab('history')}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors flex items-center gap-2 ${
                activeSubTab === 'history'
                  ? 'bg-[#111111] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History className="w-4 h-4" /> Stock History
            </button>
            {(Object.keys(pendingChanges).length > 0 || Object.keys(pendingMRP).length > 0 || Object.keys(pendingDiscount).length > 0) && (
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-bold rounded-xl bg-[#C9A227] text-white hover:bg-amber-500 transition-colors shadow-sm animate-fade-in"
              >
                Save Changes
              </button>
            )}
          </div>
          {activeSubTab === 'levels' && (
            <input
              type="text"
              placeholder="Search variants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#C9A227] min-w-[250px]"
            />
          )}
        </div>

        {activeSubTab === 'levels' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product & SKU</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Weight</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">MRP (₹)</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Discount (%)</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sale Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVariants.map((v, i) => {
                  const key = `${v.productId}|${v.weight}`;
                  const currentStock = pendingChanges[key] !== undefined ? pendingChanges[key] : v.currentStock;
                  const isModified = pendingChanges[key] !== undefined && pendingChanges[key] !== v.currentStock;
                  
                  const currentMRP = pendingMRP[key] !== undefined ? pendingMRP[key] : v.price;
                  const isMRPModified = pendingMRP[key] !== undefined && pendingMRP[key] !== v.price;
                  
                  const origDiscount = Math.round(((v.price - v.salePrice) / v.price) * 100) || 0;
                  const currentDiscount = pendingDiscount[key] !== undefined ? pendingDiscount[key] : origDiscount;
                  const isDiscountModified = pendingDiscount[key] !== undefined && pendingDiscount[key] !== origDiscount;
                  
                  const computedSalePrice = Math.round((Number(currentMRP) || 0) * (1 - (Number(currentDiscount) || 0) / 100));
                  
                  return (
                    <tr key={`${key}|${i}`} className={`hover:bg-gray-50 transition-colors ${(isModified || isMRPModified || isDiscountModified) ? 'bg-amber-50/30' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={v.image} alt={v.productName} className="w-10 h-10 rounded-lg object-cover border" />
                          <div>
                            <p className="font-bold text-gray-900">{v.productName}</p>
                            <p className="text-xs text-gray-500 font-mono mt-0.5">{v.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">{v.weight}</span>
                      </td>
                      <td className="p-4">
                        {currentStock === 0 || currentStock === '' ? (
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">Out of Stock</span>
                        ) : Number(currentStock) <= 20 ? (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Low Stock</span>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">In Stock</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-baseline gap-1">
                          <input
                            type="number"
                            min="0"
                            value={currentStock}
                            onChange={(e) => {
                              const rawVal = e.target.value;
                              const val = rawVal === '' ? '' : parseInt(rawVal);
                              setPendingChanges(prev => ({ ...prev, [key]: isNaN(val as number) && val !== '' ? 0 : val }));
                            }}
                            className={`w-20 text-lg font-bold bg-transparent border-b-2 focus:outline-none focus:border-[#C9A227] ${isModified ? 'text-[#C9A227] border-[#C9A227]' : 'text-gray-900 border-transparent hover:border-gray-200'} transition-colors px-1 py-0.5`}
                          />
                          <span className="text-xs text-gray-400">units</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-baseline gap-1">
                          <input
                            type="number"
                            min="0"
                            value={currentMRP}
                            onChange={(e) => {
                              const rawVal = e.target.value;
                              const val = rawVal === '' ? '' : parseInt(rawVal);
                              setPendingMRP(prev => ({ ...prev, [key]: isNaN(val as number) && val !== '' ? 0 : val }));
                            }}
                            className={`w-20 text-lg font-bold bg-transparent border-b-2 focus:outline-none focus:border-[#C9A227] ${isMRPModified ? 'text-[#C9A227] border-[#C9A227]' : 'text-gray-900 border-transparent hover:border-gray-200'} transition-colors px-1 py-0.5`}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-baseline gap-1">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={currentDiscount}
                            onChange={(e) => {
                              const rawVal = e.target.value;
                              const val = rawVal === '' ? '' : parseInt(rawVal);
                              setPendingDiscount(prev => ({ ...prev, [key]: isNaN(val as number) && val !== '' ? 0 : val }));
                            }}
                            className={`w-16 text-lg font-bold bg-transparent border-b-2 focus:outline-none focus:border-[#C9A227] ${isDiscountModified ? 'text-[#C9A227] border-[#C9A227]' : 'text-gray-900 border-transparent hover:border-gray-200'} transition-colors px-1 py-0.5`}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-gray-500">₹</span>
                          <span className={`text-lg font-bold ${(isMRPModified || isDiscountModified) ? 'text-[#C9A227]' : 'text-gray-900'} px-1 py-0.5`}>
                            {computedSalePrice}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filteredVariants.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No variants found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Change</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stockHistory.map((record) => {
                  const diff = record.newStock - record.oldStock;
                  return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(record.date).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{record.productName}</p>
                        <p className="text-xs text-gray-500">{record.variantWeight}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{record.oldStock}</span>
                          <span className="text-gray-300">→</span>
                          <span className="font-bold text-gray-900">{record.newStock}</span>
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${diff > 0 ? 'bg-emerald-50 text-emerald-600' : diff < 0 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                            {diff > 0 ? '+' : ''}{diff}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-700">{record.reason}</td>
                      <td className="p-4 text-sm font-medium text-gray-900">{record.adminName}</td>
                    </tr>
                  )
                })}
                {stockHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">No stock history recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
