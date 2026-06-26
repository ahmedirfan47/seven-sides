'use client';

import { useState } from 'react';
import { HEAT_LEVELS, type HeatLevel } from '@/lib/constants';
import AddToCartButton from '@/components/storefront/AddToCartButton';

interface Props {
  product: {
    id:           string;
    name:         string;
    slug:         string;
    price:        number;
    images:       string[];
    isAvailable:  boolean;
    hasHeatLevel: boolean;
  };
}

export default function HeatLevelSelector({ product }: Props) {
  const [selected, setSelected] = useState<HeatLevel>('none');

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-dark-50">Choose Your Heat Level</p>
      <div className="grid gap-2">
        {HEAT_LEVELS.map(h => (
          <button
            key={h.id}
            type="button"
            onClick={() => setSelected(h.id as HeatLevel)}
            className={`flex items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-all ${
              selected === h.id
                ? 'border-gold-500 bg-gold-500/10'
                : 'border-dark-300 hover:border-dark-200'
            }`}
          >
            <span className="text-xl">{h.emoji}</span>
            <div className="flex-1">
              <p className={`text-sm font-semibold ${h.color}`}>{h.label}</p>
              <p className="text-xs text-dark-100">{h.desc}</p>
            </div>
            {selected === h.id && (
              <div className="h-4 w-4 shrink-0 rounded-full bg-gold-500 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-dark-600" />
              </div>
            )}
          </button>
        ))}
      </div>
      <AddToCartButton
        product={product}
        selectedHeat={selected}
        className="py-4 text-base"
      />
    </div>
  );
}