import React, { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  Pill, 
  Cylinder, 
  Wind, 
  PlusCircle, 
  CheckCircle2, 
  Search, 
  ShoppingCart,
  TrendingDown,
  X
} from 'lucide-react';
import { InventoryItem } from '../types';
import { mockInventory } from '../data/mockData';

interface InventoryViewProps {
  darkMode: boolean;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ darkMode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderModalItem, setOrderModalItem] = useState<InventoryItem | null>(null);
  const [orderQty, setOrderQty] = useState<number>(100);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  const categories = ['ALL', 'Medicines', 'Oxygen & Gas', 'Equipment', 'PPE & Consumables', 'Mobility'];

  const filteredItems = inventory.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const criticalCount = inventory.filter((i) => i.status === 'critical').length;
  const lowCount = inventory.filter((i) => i.status === 'low').length;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderModalItem) return;

    setInventory((prev) =>
      prev.map((i) =>
        i.id === orderModalItem.id
          ? {
              ...i,
              currentStock: i.currentStock + orderQty,
              status: i.currentStock + orderQty >= i.minThreshold ? 'optimal' : 'low',
              predictedDaysLeft: Number(((i.currentStock + orderQty) / i.burnRatePerDay).toFixed(1))
            }
          : i
      )
    );

    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setOrderModalItem(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className={`p-6 rounded-2xl border transition-all ${
        darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Supply Chain Intelligence
              </span>
              <span className="text-xs text-slate-400">Automated Shortage Detection</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <Package className="w-7 h-7 text-emerald-500" />
              Medical Inventory & Supply Optimization
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Track medicines, oxygen cylinders, ventilators, PPE, masks, gloves, wheelchairs, and stretchers with automated burn-rate prediction.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex gap-4">
              <div>
                <span className="text-slate-400 block text-[10px]">Critical Shortages</span>
                <span className="text-lg font-black text-rose-400">{criticalCount} Items</span>
              </div>
              <div className="border-l border-slate-700 pl-4">
                <span className="text-slate-400 block text-[10px]">Low Stock Warning</span>
                <span className="text-lg font-black text-amber-400">{lowCount} Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search medical supplies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border bg-slate-800 border-slate-700 text-slate-200 outline-none focus:border-emerald-500"
          />
        </div>

      </div>

      {/* Inventory Items Table */}
      <div className={`p-5 rounded-2xl border ${
        darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="pb-3">Item Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3 text-center">Current Stock</th>
                <th className="pb-3 text-center">Burn Rate / Day</th>
                <th className="pb-3 text-center">Predicted Days Left</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {filteredItems.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-3 font-bold text-slate-200">
                      {item.name}
                      <span className="block text-[10px] text-slate-400 font-normal">Supplier: {item.supplier}</span>
                    </td>
                    <td className="py-3 text-slate-300">{item.category}</td>
                    <td className="py-3 text-center font-mono font-bold text-slate-100">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="py-3 text-center font-mono text-slate-400">
                      {item.burnRatePerDay} / day
                    </td>
                    <td className="py-3 text-center font-mono font-bold text-amber-400">
                      {item.predictedDaysLeft} days
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'critical'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                          : item.status === 'low'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => { setOrderModalItem(item); setOrderQty(item.minThreshold); }}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 ml-auto transition-all"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Reorder
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Modal */}
      {orderModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-700">
              <h2 className="text-base font-bold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                Purchase Reorder Directive
              </h2>
              <button onClick={() => setOrderModalItem(null)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-bold text-xs space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p>Purchase Order Generated & Stock Dispatched!</p>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-bold">Supply Item</label>
                  <div className="p-2.5 rounded-xl bg-slate-800 font-bold text-slate-200">
                    {orderModalItem.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Current Stock</label>
                    <div className="p-2 rounded-xl bg-slate-800 font-mono text-slate-300">
                      {orderModalItem.currentStock} {orderModalItem.unit}
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Order Quantity</label>
                    <input 
                      type="number" min={10} max={5000}
                      value={orderQty}
                      onChange={(e) => setOrderQty(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-bold"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700 flex justify-end gap-2">
                  <button
                    type="button" onClick={() => setOrderModalItem(null)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    Confirm Purchase Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
