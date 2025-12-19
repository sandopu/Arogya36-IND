import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { useData } from '../../contexts/DataContext';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface StoreDashboardProps {
    activeTab: string;
}

export const StoreDashboard: React.FC<StoreDashboardProps> = ({ activeTab }) => {
  const { orders, updateOrderStatus } = useData();

  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing');
  const activeDeliveries = orders.filter(o => o.status === 'Packed' || o.status === 'Out for Delivery');

  if (activeTab === 'inventory') {
      return (
          <div className="text-center py-20 animate-fade-in">
              <Package className="h-16 w-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-300">Inventory Management</h3>
              <p className="text-slate-500">Stock tracking and alerts will appear here.</p>
          </div>
      )
  }

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-serif font-bold text-white">Pharmacy Orders</h1>
                <p className="text-slate-400">Manage prescriptions and delivery</p>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg shadow-sm border border-white/10">
                <span className="text-sm font-bold text-emerald-400">● Store Open</span>
            </div>
        </div>

        {/* New Orders Section */}
        <div>
            <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gold-500" /> New Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingOrders.length === 0 ? (
                    <p className="text-slate-500 col-span-full text-center py-8 bg-white/5 rounded-xl border border-dashed border-white/10">No new orders received</p>
                ) : (
                    pendingOrders.map(order => (
                        <Card key={order.id} className="border-l-4 border-l-gold-500 bg-white/5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-lg text-white">{order.patientName}</h3>
                                    <p className="text-xs text-slate-400">Order #{order.id.slice(-4)} • {order.date}</p>
                                </div>
                                <span className="px-2 py-1 bg-yellow-900/30 text-yellow-200 text-xs font-bold rounded border border-yellow-500/20">{order.status}</span>
                            </div>
                            <div className="bg-black/20 p-3 rounded-lg mb-4 border border-white/5">
                                <p className="text-xs text-slate-500 uppercase mb-1">Prescribed Items:</p>
                                <ul className="list-disc list-inside text-sm font-medium text-slate-300">
                                    {order.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-lg text-white">₹{order.totalAmount}</p>
                                <div className="space-x-2">
                                    {order.status === 'Pending' && (
                                        <Button size="sm" onClick={() => updateOrderStatus(order.id, 'Processing')}>Accept</Button>
                                    )}
                                    {order.status === 'Processing' && (
                                        <Button size="sm" onClick={() => updateOrderStatus(order.id, 'Packed')}>Mark Packed</Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>

        {/* Delivery Section */}
        <div>
            <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2 text-royal-400" /> Delivery Status
            </h2>
            <div className="glass-dark rounded-xl shadow-sm overflow-hidden border border-white/10">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th className="p-4 font-bold text-slate-400 text-sm">Order ID</th>
                            <th className="p-4 font-bold text-slate-400 text-sm">Customer</th>
                            <th className="p-4 font-bold text-slate-400 text-sm">Status</th>
                            <th className="p-4 font-bold text-slate-400 text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeDeliveries.map(order => (
                            <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                                <td className="p-4 text-sm font-medium text-white">#{order.id.slice(-4)}</td>
                                <td className="p-4 text-sm text-slate-300">{order.patientName}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        order.status === 'Out for Delivery' ? 'bg-blue-900/30 text-blue-300' : 'bg-purple-900/30 text-purple-300'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {order.status === 'Packed' ? (
                                        <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, 'Out for Delivery')}>
                                            Start Delivery
                                        </Button>
                                    ) : (
                                        <Button size="sm" variant="secondary" className="bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 border-emerald-500/30" onClick={() => updateOrderStatus(order.id, 'Delivered')}>
                                            <CheckCircle className="h-4 w-4 mr-1" /> Complete
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                         {activeDeliveries.length === 0 && (
                            <tr><td colSpan={4} className="p-8 text-center text-slate-500">No active deliveries</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};