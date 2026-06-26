'use client';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { formatPrice, STATUS_LABELS, STATUS_COLORS, ORDER_STATUSES } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Order {
  id:string; orderNumber:string; customerName:string; customerEmail:string;
  total:number; subtotal:number; status:string; deliveryType:string;
  createdAt:string; items:any[];
}

export default function OrdersClient() {
  const [orders,  setOrders]  = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter,  setFilter]  = useState('ALL');
  const [updating, setUpdating] = useState<string|null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const url = filter !== 'ALL' ? `/api/admin/orders?status=${filter}` : '/api/admin/orders';
    const data = await fetch(url).then(r => r.json());
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/admin/orders/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ status }) });
    await fetchOrders();
    setUpdating(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {['ALL', ...ORDER_STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={cn('rounded-full px-4 py-2 text-xs font-semibold transition-all border',
              filter===s ? 'bg-gold-500 text-dark-600 border-gold-500' : 'bg-dark-400 text-dark-100 border-dark-300 hover:border-dark-200')}>
            {s === 'ALL' ? 'All' : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="card-dark rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-dark-400">
              <tr className="text-xs uppercase tracking-wide text-dark-100">
                <th className="px-4 py-3 text-left font-semibold">Order</th>
                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                <th className="px-4 py-3 text-left font-semibold">Items</th>
                <th className="px-4 py-3 text-left font-semibold">Total</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Update</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="py-14 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-gold-400" /></td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="py-14 text-center text-dark-100">No orders found.</td></tr>
              ) : orders.map(o => (
                <tr key={o.id} className="border-b border-dark-300 hover:bg-dark-400 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gold-400">{o.orderNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{o.customerName}</p>
                    <p className="text-xs text-dark-100">{o.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-dark-100">{o.items?.length ?? 0} items</td>
                  <td className="px-4 py-3 font-semibold text-white">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 text-dark-100 capitalize">{o.deliveryType}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[o.status]}`}>
                      {STATUS_LABELS[o.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                      disabled={updating===o.id}
                      className="rounded-xl border border-dark-300 bg-dark-400 px-2 py-1.5 text-xs text-white focus:border-gold-500 focus:outline-none disabled:opacity-50">
                      {ORDER_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}