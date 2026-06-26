import { Flame, ShoppingBag, Users, Package, TrendingUp } from 'lucide-react';
import { formatPrice, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils';
import { db } from '@/lib/db';
import { getSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || session.user.role !== 'ADMIN') redirect('/login');

  const today = new Date(); today.setHours(0,0,0,0);
  const [totalOrders, todayOrders, pendingOrders, totalCustomers, totalProducts, recentOrders, revenue] = await Promise.all([
    db.order.count(),
    db.order.count({ where: { createdAt: { gte: today } } }),
    db.order.count({ where: { status: 'PENDING' } }),
    db.user.count({ where: { role: 'CUSTOMER' } }),
    db.product.count({ where: { isAvailable: true } }),
    db.order.findMany({ include:{ items:true, branch:true }, orderBy:{ createdAt:'desc' }, take:8 }),
    db.order.aggregate({ _sum:{ total:true }, where:{ status:{ notIn:['CANCELLED'] } } }),
  ]);

  const stats = [
    { label:'Total Revenue',   value: formatPrice(revenue._sum.total ?? 0), icon:TrendingUp,  color:'text-gold-400'  },
    { label:"Today's Orders",  value: String(todayOrders),                   icon:ShoppingBag, color:'text-teal-400'  },
    { label:'Pending Orders',  value: String(pendingOrders),                 icon:Flame,       color:'text-heat'      },
    { label:'Total Customers', value: String(totalCustomers),                icon:Users,       color:'text-gold-400'  },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white">DASHBOARD</h1>
        <p className="text-sm text-dark-100 mt-1">{totalOrders} total orders · {totalProducts} products active</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="card-dark rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-100">{s.label}</p>
              <s.icon className={`h-5 w-5 ${s.color}`} strokeWidth={1.5} />
            </div>
            <p className={`font-display text-2xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-dark rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-dark-300">
          <h2 className="font-display text-lg text-white">RECENT ORDERS</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-dark-400">
              <tr className="text-xs uppercase tracking-wide text-dark-100">
                <th className="px-4 py-3 text-left font-semibold">Order</th>
                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                <th className="px-4 py-3 text-left font-semibold">Total</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id} className="border-b border-dark-300 hover:bg-dark-400 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gold-400">{o.orderNumber}</td>
                  <td className="px-4 py-3 text-white">{o.customerName}</td>
                  <td className="px-4 py-3 font-semibold text-white">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 text-dark-100 capitalize">{o.deliveryType}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[o.status]}`}>
                      {STATUS_LABELS[o.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-dark-100 text-xs">{new Date(o.createdAt).toLocaleString('en-PK', { hour:'2-digit', minute:'2-digit', day:'numeric', month:'short' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}