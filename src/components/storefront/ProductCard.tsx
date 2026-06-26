'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Check, Flame } from 'lucide-react';
import { useState } from 'react';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
import type { HeatLevel } from '@/lib/constants';

interface ProductCardProps {
  product: {
    id: string; name: string; slug: string; price: number;
    compareAtPrice: number | null; images: string[];
    tags: string[]; isAvailable: boolean; hasHeatLevel: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(s => s.addItem);
  const [added, setAdded]           = useState(false);
  const [heat,  setHeat]            = useState<HeatLevel>('none');
  const [showHeat, setShowHeat]     = useState(false);

  const isNew = product.tags.includes('new');
  const isSig = product.tags.includes('signature') || product.tags.includes('bestseller');

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.isAvailable) return;
    if (product.hasHeatLevel && !showHeat) { setShowHeat(true); return; }
    addItem({ productId: product.id, name: product.name, slug: product.slug, price: product.price, image: product.images[0] ?? null, heatLevel: heat });
    setAdded(true); setShowHeat(false);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-dark-500 shadow-card-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-hover-dark"
      style={{ borderColor:'#2A2A2A' }}>

      <div className="relative aspect-square w-full overflow-hidden bg-dark-400">
        {product.images[0] ? (
          <Image src={product.images[0]} alt={product.name} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl">🍗</div>
        )}

        {isNew && (
          <span className="absolute left-2 top-2 badge-new">NEW</span>
        )}
        {isSig && !isNew && (
          <span className="absolute left-2 top-2 rounded-full bg-gold-500/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-gold-400">
            Signature
          </span>
        )}
        {discount && (
          <span className="absolute right-2 top-2 rounded-full bg-heat/80 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-600/70 backdrop-blur-sm">
            <span className="rounded-full bg-dark-500 px-4 py-1.5 text-xs font-bold text-dark-100 border border-dark-300">Sold Out</span>
          </div>
        )}
        {product.hasHeatLevel && product.isAvailable && (
          <div className="absolute bottom-2 left-2">
            <span className="flex items-center gap-1 rounded-full bg-heat/20 border border-heat/30 px-2 py-0.5 text-[10px] font-bold text-heat">
              <Flame className="h-3 w-3" strokeWidth={2} /> Heat Level
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-base text-white leading-tight line-clamp-1 sm:text-lg">
          {product.name}
        </h3>
        <div className="mt-auto pt-3">
          {showHeat && product.hasHeatLevel ? (
            <div className="space-y-1.5" onClick={e => e.preventDefault()}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-dark-100 mb-2">Choose heat:</p>
              {(['none','country','screamer'] as HeatLevel[]).map(h => (
                <button key={h} type="button"
                  onClick={e => { e.preventDefault(); setHeat(h); handleAdd(e); }}
                  className={cn(
                    'w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all border',
                    h === 'none'     && 'border-blue-700 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40',
                    h === 'country'  && 'border-amber-700 bg-amber-900/20 text-amber-300 hover:bg-amber-900/40',
                    h === 'screamer' && 'border-heat/50 bg-heat/10 text-heat hover:bg-heat/20',
                  )}>
                  {h==='none' ? '☁️ No Heat' : h==='country' ? '🔥 Country Heat' : '🔥🔥🔥 Screamer'}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-gold-400 sm:text-lg">{formatPrice(product.price)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-xs text-dark-100 line-through">{formatPrice(product.compareAtPrice)}</span>
                )}
              </div>
              <button onClick={handleAdd} disabled={!product.isAvailable} aria-label={`Add ${product.name} to cart`}
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                  added
                    ? 'bg-teal-500 text-white scale-110'
                    : 'bg-gold-500/20 text-gold-400 hover:bg-gold-500 hover:text-dark-600 hover:scale-110 active:scale-95',
                  !product.isAvailable && 'opacity-30 cursor-not-allowed',
                )}>
                {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}