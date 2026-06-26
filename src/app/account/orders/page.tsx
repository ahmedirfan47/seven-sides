import Link from 'next/link';
import { Package } from 'lucide-react';
import { getSession } from '@/lib/get-session';
import { db } from '@/lib/db';
import { formatDate, formatPrice, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AccountOrdersPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const orders = await db.order.findMany({
    where:   { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>
      <div className="container-px mx-auto max-w-4xl py-12">
        <div className="mb-8">
          <span className="eyebrow-gold">My Account</span>
          <h1 className="font-display text-4xl text-white">ORDER HISTORY</h1>
          <p className="mt-2 text-sm text-dark-100">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>

        {orders.length === 0 ? (
          <div className="card-dark rounded-2xl p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-400">
              <Package className="h-8 w-8 text-dark-200" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl text-white">NO ORDERS YET</h2>
            <p className="mt-2 text-sm text-dark-100">Your order history will appear here.</p>
            <Link href="/menu" className="btn-gold mt-6 inline-flex">Browse Menu</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="card-dark rounded-2xl p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="font-mono text-sm text-gold-400">{order.orderNumber}</p>
                    <p className="text-xs text-dark-100 mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                    <p className="font-bold text-gold-400">{formatPrice(order.total)}</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-dark-300 pt-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-dark-100">
                        {item.name}
                        {item.heatLevel && item.heatLevel !== 'none' && (
                          <span className="ml-2 text-xs text-heat">
                            {item.heatLevel === 'screamer' ? '🔥🔥🔥' : item.heatLevel === 'country' ? '🔥' : ''}
                          </span>
                        )}
                        <span className="ml-2 text-dark-200">× {item.quantity}</span>
                      </span>
                      <span className="text-white font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dark-300 pt-4">
                  <div className="text-xs text-dark-100 capitalize">
                    {order.deliveryType} · {order.paymentMethod.replace('_', ' ')}
                  </div>
                  <Link href={`/order/${order.orderNumber}`}
                    className="text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                    Track Order →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}