import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { formatDate, formatPrice, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils';
import {
  MapPin, Clock, Package, CheckCircle2, Truck,
  ChefHat, CircleAlert,
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { HEAT_LEVELS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ orderNumber: string }> },
): Promise<Metadata> {
  const { orderNumber } = await params;
  return { title: `Order ${orderNumber}` };
}

const STEPS = [
  { status: 'PENDING',          label: 'Order Placed', icon: Package      },
  { status: 'CONFIRMED',        label: 'Confirmed',    icon: CheckCircle2 },
  { status: 'PREPARING',        label: 'Preparing',    icon: ChefHat      },
  { status: 'OUT_FOR_DELIVERY', label: 'On the Way',   icon: Truck        },
  { status: 'DELIVERED',        label: 'Delivered',    icon: CheckCircle2 },
];

export default async function OrderTrackingPage(
  { params }: { params: Promise<{ orderNumber: string }> },
) {
  const { orderNumber } = await params;

  const order = await db.order.findUnique({
    where:   { orderNumber },
    include: { items: true, branch: true },
  });

  if (!order) notFound();

  const isCancelled = order.status === 'CANCELLED';
  const currentStep = STEPS.findIndex(s => s.status === order.status);
  const heatLabel   = (h: string | null) =>
    h ? (HEAT_LEVELS.find(l => l.id === h)?.label ?? h) : null;

  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', paddingTop: '5rem' }}>
      <div className="container-px mx-auto max-w-3xl py-12">

        {/* Header */}
        <div className="mb-8">
          <span className="eyebrow-gold">Order Tracking</span>
          <h1 className="font-display text-4xl text-white">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-dark-100">Placed {formatDate(order.createdAt)}</p>
        </div>

        {/* Status stepper */}
        <div className="card-dark rounded-2xl p-6 mb-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl text-white">ORDER STATUS</h2>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
              {STATUS_LABELS[order.status]}
            </span>
          </div>

          {isCancelled ? (
            <div className="flex items-center gap-3 rounded-2xl border border-heat/30 bg-heat/10 p-4">
              <CircleAlert className="h-5 w-5 text-heat shrink-0" strokeWidth={1.5} />
              <p className="text-sm text-heat">This order has been cancelled.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-5 top-5 bottom-5 w-px bg-dark-300" />
              <div className="space-y-4">
                {STEPS.map((step, i) => {
                  const done   = i <= currentStep;
                  const active = i === currentStep;
                  const Icon   = step.icon;
                  return (
                    <div key={step.status} className="relative flex items-center gap-4">
                      <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                        active ? 'border-gold-500 bg-gold-500/20' :
                        done   ? 'border-teal-500 bg-teal-500/20' :
                                 'border-dark-300 bg-dark-500'
                      }`}>
                        <Icon
                          className={`h-4 w-4 ${active ? 'text-gold-400' : done ? 'text-teal-400' : 'text-dark-200'}`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${active ? 'text-gold-400' : done ? 'text-white' : 'text-dark-200'}`}>
                          {step.label}
                        </p>
                        {active && <p className="text-xs text-dark-100 mt-0.5">In progress</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="card-dark rounded-2xl p-6 mb-5">
          <h2 className="font-display text-xl text-white mb-4">YOUR ORDER</h2>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-white font-medium">{item.name}</span>
                  {item.heatLevel && item.heatLevel !== 'none' && (
                    <span className="ml-2 text-xs text-heat">
                      {heatLabel(item.heatLevel)}
                    </span>
                  )}
                  <span className="ml-2 text-dark-200">× {item.quantity}</span>
                </div>
                <span className="text-gold-400 font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-dark-300 pt-4 text-sm">
            <div className="flex justify-between text-dark-100">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-teal-400">
                <span>Discount</span>
                <span>−{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-dark-100">
              <span>Delivery</span>
              <span className="text-white">
                {order.deliveryFee === 0 ? 'Free' : formatPrice(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between border-t border-dark-300 pt-2 font-bold text-white">
              <span>Total</span>
              <span className="text-gold-400">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery details */}
        <div className="card-dark rounded-2xl p-6 mb-8">
          <h2 className="font-display text-xl text-white mb-4">DELIVERY DETAILS</h2>
          <div className="space-y-3 text-sm text-dark-100">
            <div className="flex items-center gap-2 capitalize">
              <Package className="h-4 w-4 text-gold-500 shrink-0" strokeWidth={1.5} />
              <span>{order.deliveryType}</span>
            </div>
            {order.deliveryType === 'delivery' && order.address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>{[order.address, order.area, order.city].filter(Boolean).join(', ')}</span>
              </div>
            )}
            {order.branch && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-white font-medium">{order.branch.name}</p>
                  <p className="text-xs text-dark-200">{order.branch.address}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-500 shrink-0" strokeWidth={1.5} />
              <span>Payment: {order.paymentMethod.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/menu" className="btn-gold">Order Again</Link>
        </div>
      </div>
    </div>
  );
}