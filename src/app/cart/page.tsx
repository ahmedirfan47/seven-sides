'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Flame } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { HEAT_LEVELS } from '@/lib/constants';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal  = getSubtotal();
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>
        <div className="container-px mx-auto max-w-2xl py-24 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-dark-400">
            <ShoppingBag className="h-12 w-12 text-dark-200" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl text-white">CART IS EMPTY</h1>
          <p className="mt-2 text-sm text-dark-100">Add something from the menu to get started.</p>
          <Link href="/menu" className="btn-gold mt-8 inline-flex">Browse Menu <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    );
  }

  const heatLabel = (h: string) => HEAT_LEVELS.find(l => l.id === h)?.label ?? h;

  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>
      <div className="container-px mx-auto max-w-6xl py-8 sm:py-12">
        <h1 className="mb-6 font-display text-3xl text-white sm:text-4xl">
          YOUR CART <span className="font-sans text-base font-normal text-dark-100">({itemCount} item{itemCount!==1?'s':''})</span>
        </h1>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="space-y-3">
            {items.map(item => (
              <div key={`${item.productId}-${item.heatLevel}`}
                className="card-dark flex items-center gap-3 rounded-2xl p-3 sm:gap-4 sm:p-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-dark-400 sm:h-20 sm:w-20">
                  {item.image
                    ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    : <div className="flex h-full w-full items-center justify-center text-2xl">🍗</div>}
                </div>
                <div className="flex flex-1 min-w-0 flex-col gap-1.5">
                  <p className="font-semibold text-white text-sm leading-snug line-clamp-1 sm:text-base">{item.name}</p>
                  {item.heatLevel !== 'none' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-heat">
                      <Flame className="h-3 w-3" strokeWidth={2} /> {heatLabel(item.heatLevel)}
                    </span>
                  )}
                  <p className="text-sm font-bold text-gold-400">{formatPrice(item.price)}</p>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <div className="flex items-center overflow-hidden rounded-xl border border-dark-300">
                      <button aria-label="Decrease" onClick={() => item.quantity>1 ? updateQuantity(item.productId,item.heatLevel,item.quantity-1) : removeItem(item.productId,item.heatLevel)}
                        className="flex h-11 w-11 items-center justify-center text-white hover:bg-dark-400 active:bg-dark-300 transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-white select-none">{item.quantity}</span>
                      <button aria-label="Increase" onClick={() => updateQuantity(item.productId,item.heatLevel,item.quantity+1)}
                        className="flex h-11 w-11 items-center justify-center text-white hover:bg-dark-400 active:bg-dark-300 transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-white">{formatPrice(item.price*item.quantity)}</span>
                      <button aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.productId,item.heatLevel)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-dark-200 hover:bg-heat/10 hover:text-heat active:scale-95 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-dark-300 bg-dark-500 p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-xl text-white mb-5">ORDER SUMMARY</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-dark-100"><span>Subtotal ({itemCount} items)</span><span className="text-white font-medium">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-dark-100"><span>Delivery</span><span className="text-dark-200 text-xs">At checkout</span></div>
            </div>
            <div className="my-4 border-t border-dark-300" />
            <div className="flex justify-between">
              <span className="font-bold text-white">Subtotal</span>
              <span className="font-bold text-gold-400 text-lg">{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" className="btn-gold mt-5 w-full justify-center py-4 text-base">
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/menu" className="mt-3 flex items-center justify-center gap-1 text-sm font-medium text-dark-100 hover:text-white transition-colors py-2">
              ← Continue Ordering
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}