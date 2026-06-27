'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Check, Flame } from 'lucide-react';
import { useState } from 'react';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { HEAT_LEVELS, type HeatLevel } from '@/lib/constants';

interface Props {
  product: {
    id:             string;
    name:           string;
    slug:           string;
    price:          number;
    compareAtPrice: number | null;
    images:         string[];
    tags:           string[];
    isAvailable:    boolean;
    hasHeatLevel:   boolean;
  };
}

export default function ProductCard({ product }: Props) {
  const addItem              = useCartStore(s => s.addItem);
  const [added,    setAdded] = useState(false);
  const [showHeat, setHeat]  = useState(false);

  const isNew = product.tags.includes('new');
  const isSig = product.tags.includes('signature') || product.tags.includes('bestseller');
  const disc  = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const doAdd = (e: React.MouseEvent, heat: HeatLevel = 'none') => {
    e.preventDefault();
    if (!product.isAvailable) return;
    addItem({
      productId: product.id, name: product.name, slug: product.slug,
      price: product.price, image: product.images[0] ?? null, heatLevel: heat,
    });
    setAdded(true);
    setHeat(false);
    setTimeout(() => setAdded(false), 1400);
  };

  const onBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.hasHeatLevel) { setHeat(v => !v); return; }
    doAdd(e);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-ss-500 transition-all duration-300',
        'hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-amber-glow',
      )}
      style={{ backgroundColor: '#132524' }}
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: '#0E1F1D' }}>
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Flame className="h-10 w-10 text-amber-500/20 animate-fire" strokeWidth={1} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {isNew && !isSig && <span className="badge-new">New</span>}
          {isSig && (
            <span className="badge-amber text-[10px] py-0.5 px-2.5">Signature</span>
          )}
        </div>
        {disc && (
          <span className="absolute top-2.5 right-2.5 badge-fire text-[10px]">
            -{disc}%
          </span>
        )}
        {product.hasHeatLevel && product.isAvailable && (
          <div className="absolute bottom-2.5 left-2.5">
            <span
              className="flex items-center gap-1 rounded-full border border-fire/40 px-2 py-1 text-[10px] font-bold text-fire backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(214,59,46,0.12)' }}
            >
              <Flame className="h-2.5 w-2.5" strokeWidth={2.5} /> Heat
            </span>
          </div>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(10,22,20,0.75)' }}>
            <span className="rounded-full border border-ss-400 px-4 py-1.5 text-xs font-bold text-ss-100" style={{ backgroundColor: '#132524' }}>
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-sm text-white leading-tight line-clamp-1 sm:text-base">
          {product.name}
        </h3>

        {showHeat ? (
          <div className="mt-2 space-y-1.5" onClick={e => e.preventDefault()}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ss-200 mb-1.5">Choose heat:</p>
            {HEAT_LEVELS.map(h => (
              <button
                key={h.id}
                type="button"
                onClick={e => doAdd(e, h.id as HeatLevel)}
                className={cn(
                  'w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-[11px] font-semibold border transition-all active:scale-[0.97]',
                  h.border, h.bg,
                )}
              >
                <span className="text-sm">{h.emoji}</span>
                <span className={h.color}>{h.label}</span>
              </button>
            ))}
            <button
              onClick={e => { e.preventDefault(); setHeat(false); }}
              className="w-full text-center text-[10px] text-ss-300 hover:text-white transition-colors pt-0.5"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-amber-400 text-sm sm:text-base">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-[11px] text-ss-300 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <button
              onClick={onBtn}
              disabled={!product.isAvailable}
              aria-label={`Add ${product.name} to cart`}
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                added
                  ? 'bg-teal-500 text-white scale-110'
                  : product.hasHeatLevel
                    ? 'text-fire hover:bg-fire hover:text-white hover:scale-110 active:scale-95'
                    : 'text-amber-400 hover:bg-amber-500 hover:text-ss-900 hover:scale-110 active:scale-95',
                !product.isAvailable && 'opacity-30 pointer-events-none',
              )}
              style={
                !added
                  ? { backgroundColor: product.hasHeatLevel ? 'rgba(214,59,46,0.15)' : 'rgba(240,168,32,0.15)' }
                  : undefined
              }
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}