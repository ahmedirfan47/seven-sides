'use client';

import { useState } from 'react';
import { ShoppingBag, Check, Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { cn } from '@/lib/utils';
import type { HeatLevel } from '@/lib/constants';

interface AddToCartButtonProps {
  product: {
    id:           string;
    name:         string;
    slug:         string;
    price:        number;
    images:       string[];
    isAvailable:  boolean;
    hasHeatLevel: boolean;
  };
  selectedHeat?: HeatLevel;
  className?:    string;
}

export default function AddToCartButton({
  product,
  selectedHeat = 'none',
  className,
}: AddToCartButtonProps) {
  const addItem              = useCartStore(s => s.addItem);
  const [added,   setAdded]  = useState(false);
  const [loading, setLoading]= useState(false);

  const handleAdd = () => {
    if (!product.isAvailable || loading) return;
    setLoading(true);
    addItem({
      productId: product.id,
      name:      product.name,
      slug:      product.slug,
      price:     product.price,
      image:     product.images[0] ?? null,
      heatLevel: selectedHeat,
    });
    setLoading(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  if (!product.isAvailable) {
    return (
      <button
        disabled
        className={cn('btn-gold w-full opacity-50 cursor-not-allowed', className)}
      >
        Sold Out
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading || added}
      aria-label={`Add ${product.name} to cart`}
      className={cn(
        'btn-gold w-full transition-all',
        added && 'bg-teal-500 hover:bg-teal-500',
        className,
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : added ? (
        <><Check className="h-4 w-4" /> Added to Cart</>
      ) : (
        <><ShoppingBag className="h-4 w-4" /> Add to Cart</>
      )}
    </button>
  );
}