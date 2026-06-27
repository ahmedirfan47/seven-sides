'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Check, Flame } from 'lucide-react';
import { useState } from 'react';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import { HEAT_LEVELS, type HeatLevel } from '@/lib/constants';

interface ProductCardProps {
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

export default function ProductCard({ product }: ProductCardProps) {
  const addItem              = useCartStore(s => s.addItem);
  const [added,    setAdded]    = useState(false);
  const [showHeat, setShowHeat] = useState(false);

  const isNew = product.tags.includes('new');
  const isSig = product.tags.includes('signature') || product.tags.includes('bestseller');

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.isAvailable) return;
    if (product.hasHeatLevel) { setShowHeat(v => !v); return; }
    addItem({ productId:product.id, name:product.name, slug:product.slug, price:product.price, image:product.images[0]??null, heatLevel:'none' });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleHeatSelect = (e: React.MouseEvent, heat: HeatLevel) => {
    e.preventDefault();
    addItem({ productId:product.id, name:product.name, slug:product.slug, price:product.price, image:product.images[0]??null, heatLevel:heat });
    setAdded(true); setShowHeat(false);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-dark-500 shadow-card-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-hover-dark hover:border-gold-500/40"
      style={{ borderColor: '#2A2A2A' }}>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-dark-400">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-dark-400">
            <Flame className="h-10 w-10 text-gold-500/20" strokeWidth={1} />
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {isNew && <span className="badge-new">New</span>}
          {isSig && !isNew && (
            <span className="inline-flex items-center rounded-full bg-gold-500/90 px-2.5 py-0.5 text-[10px] font-bold text-dark-600">
              Signature
            </span>
          )}
        </div>

        {discount && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-heat/90 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}

        {product.hasHeatLevel && product.isAvailable && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="flex items-center gap-1 rounded-full bg-dark-600/80 border border-heat/40 px-2.5 py-1 text-[10px] font-bold text-heat backdrop-blur-sm">
              <Flame className="h-3 w-3" strokeWidth={2} /> Heat Levels
            </span>
          </div>
        )}

        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-600/70 backdrop-blur-sm">
            <span className="rounded-full border border-dark-300 bg-dark-500 px-4 py-1.5 text-xs font-bold text-dark-100">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-display text-sm text-white leading-tight sm:text-base line-clamp-1">
          {product.name}
        </h3>

        {showHeat ? (
          <div className="mt-2.5 space-y-1.5" onClick={e => e.preventDefault()}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-dark-100 mb-2">Choose heat:</p>
            {HEAT_LEVELS.map(h => (
              <button key={h.id} type="button"
                onClick={e => handleHeatSelect(e, h.id as HeatLevel)}
                className={cn(
                  'w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-[11px] font-semibold transition-all border active:scale-[0.97]',
                  h.border, h.bg,
                )}>
                <span className="text-sm">{h.emoji}</span>
                <span className={h.color}>{h.label}</span>
              </button>
            ))}
            <button onClick={e => { e.preventDefault(); setShowHeat(false); }}
              className="w-full text-center text-[10px] text-dark-200 hover:text-white transition-colors py-1">
              Cancel
            </button>
          </div>
        ) : (
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-gold-400 text-sm sm:text-base">{formatPrice(product.price)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-[11px] text-dark-200 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
            <button
              onClick={handleAddClick}
              disabled={!product.isAvailable}
              aria-label={`Add ${product.name} to cart`}
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                added
                  ? 'bg-teal-500 text-white scale-110'
                  : product.hasHeatLevel
                    ? 'bg-heat/15 text-heat hover:bg-heat hover:text-white hover:scale-110 active:scale-95'
                    : 'bg-gold-500/15 text-gold-400 hover:bg-gold-500 hover:text-dark-600 hover:scale-110 active:scale-95',
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