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
    id: string; name: string; slug: string; price: number;
    compareAtPrice: number | null; images: string[];
    tags: string[]; isAvailable: boolean; hasHeatLevel: boolean;
  };
}

export default function ProductCard({ product }: Props) {
  const addItem              = useCartStore(s => s.addItem);
  const [added,    setAdded] = useState(false);
  const [showHeat, setHeat]  = useState(false);

  const isNew = product.tags.includes('new');
  const isSig = product.tags.includes('signature') || product.tags.includes('bestseller');
  const pct   = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const doAdd = (e: React.MouseEvent, heat: HeatLevel = 'none') => {
    e.preventDefault();
    if (!product.isAvailable) return;
    addItem({ productId:product.id, name:product.name, slug:product.slug, price:product.price, image:product.images[0]??null, heatLevel:heat });
    setAdded(true); setHeat(false);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.hasHeatLevel) { setHeat(v => !v); return; }
    doAdd(e);
  };

  return (
    <Link href={`/product/${product.slug}`}
      className="card-gold-hover group flex flex-col overflow-hidden rounded-2xl">

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-ink-700">
        {product.images[0] ? (
          <Image src={product.images[0]} alt={product.name} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Flame className="h-12 w-12 text-gold-500/20 animate-flame" strokeWidth={1} />
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {isNew  && <span className="badge-new">New</span>}
          {isSig && !isNew && <span className="badge-gold text-[10px] py-0.5 px-2.5">Signature</span>}
        </div>
        {pct && <span className="absolute top-2.5 right-2.5 badge-heat text-[10px]">-{pct}%</span>}

        {product.hasHeatLevel && product.isAvailable && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="flex items-center gap-1 rounded-full bg-ink-900/80 border border-heat/40 px-2 py-0.5 text-[10px] font-bold text-heat backdrop-blur-sm">
              <Flame className="h-2.5 w-2.5" strokeWidth={2.5} /> Heat
            </span>
          </div>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-900/75 backdrop-blur-sm">
            <span className="rounded-full border border-ink-400 bg-ink-700 px-4 py-1.5 text-xs font-bold text-ink-100">Sold Out</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-sm leading-tight text-white line-clamp-1 sm:text-base">
          {product.name}
        </h3>

        {showHeat ? (
          <div className="mt-2 space-y-1.5" onClick={e => e.preventDefault()}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-200 mb-1">Pick heat:</p>
            {HEAT_LEVELS.map(h => (
              <button key={h.id} type="button" onClick={e => doAdd(e, h.id as HeatLevel)}
                className={cn('w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-[11px] font-semibold border transition-all active:scale-[0.97]', h.border, h.bg)}>
                <span className="text-sm">{h.emoji}</span>
                <span className={h.color}>{h.label}</span>
              </button>
            ))}
            <button onClick={e => { e.preventDefault(); setHeat(false); }}
              className="w-full text-center text-[10px] text-ink-300 hover:text-white transition-colors pt-1">Cancel</button>
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-gold-400 text-sm sm:text-base">{formatPrice(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-[11px] text-ink-300 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
            <button onClick={handleBtn} disabled={!product.isAvailable}
              aria-label={`Add ${product.name}`}
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                added
                  ? 'bg-teal-500 text-white scale-110'
                  : product.hasHeatLevel
                    ? 'bg-heat/15 text-heat hover:bg-heat hover:text-white hover:scale-110 active:scale-95'
                    : 'bg-gold-500/15 text-gold-400 hover:bg-gold-500 hover:text-ink-900 hover:scale-110 active:scale-95',
                !product.isAvailable && 'opacity-30 cursor-not-allowed',
              )}>
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}