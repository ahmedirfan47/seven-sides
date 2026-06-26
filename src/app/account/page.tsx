import Link from 'next/link';
import { User, Mail, Phone, ClipboardList, ArrowRight } from 'lucide-react';
import { getSession } from '@/lib/get-session';
import { db } from '@/lib/db';
import { formatDate, formatPrice, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const [user, recentOrders] = await Promise.all([
    db.user.findUnique({ where: { id: session.user.id } }),
    db.order.findMany({
      where:   { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take:    5,
      include: { items: true },
    }),
  ]);

  if (!user) redirect('/login');

  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>
      <div className="container-px mx-auto max-w-4xl py-12">
        <div className="mb-8">
          <span className="eyebrow-gold">Welcome back</span>
          <h1 className="font-display text-4xl text-white">{user.name.toUpperCase()}</h1>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_300px] lg:items-start">

          {/* Recent orders */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl text-white">RECENT ORDERS</h2>
              <Link href="/account/orders" className="text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="card-dark rounded-2xl p-10 text-center">
                <ClipboardList className="mx-auto mb-3 h-10 w-10 text-dark-200" strokeWidth={1.5} />
                <p className="font-display text-lg text-white">NO ORDERS YET</p>
                <p className="mt-1 text-sm text-dark-100">Start ordering to see your history here.</p>
                <Link href="/menu" className="btn-gold mt-5 inline-flex text-sm">Browse Menu</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map(order => (
                  <div key={order.id} className="card-dark rounded-2xl p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-mono text-sm text-gold-400">{order.orderNumber}</p>
                        <p className="text-xs text-dark-100 mt-0.5">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                          {STATUS_LABELS[order.status]}
                        </span>
                        <span className="font-bold text-gold-400 text-sm">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-dark-100">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {order.deliveryType}
                    </p>
                    <Link href={`/order/${order.orderNumber}`}
                      className="mt-2 inline-flex text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                      Track Order →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account details */}
          <div className="space-y-4">
            <div className="card-dark rounded-2xl p-5">
              <h2 className="font-display text-lg text-white mb-4">ACCOUNT DETAILS</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-dark-400">
                    <User className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-dark-200">Name</p>
                    <p className="text-white font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-dark-400">
                    <Mail className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-dark-200">Email</p>
                    <p className="text-white font-medium break-all">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-dark-400">
                      <Phone className="h-4 w-4 text-gold-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-dark-200">Phone</p>
                      <p className="text-white font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card-dark rounded-2xl p-5">
              <h2 className="font-display text-lg text-white mb-4">QUICK LINKS</h2>
              <div className="space-y-1">
                {[
                  { href:'/account/orders', label:'Order History'  },
                  { href:'/menu',           label:'Browse Menu'    },
                  { href:'/branches',       label:'Find a Branch'  },
                  { href:'/contact',        label:'Contact Us'     },
                ].map(l => (
                  <Link key={l.href} href={l.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-dark-100 hover:bg-dark-400 hover:text-white transition-colors">
                    {l.label} <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/';
              }}
              className="w-full rounded-2xl border border-dark-300 bg-dark-500 px-4 py-3 text-sm font-semibold text-dark-100 hover:border-heat/50 hover:text-heat transition-all"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}