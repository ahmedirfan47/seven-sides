'use client';

import { useState } from 'react';
import { Flame } from 'lucide-react';
import { HEAT_LEVELS, type HeatLevel } from '@/lib/constants';
import AddToCartButton from '@/components/storefront/AddToCartButton';

interface Props {
  product: {
    id: string; name: string; slug: string; price: number;
    images: string[]; isAvailable: boolean; hasHeatLevel: boolean;
  };
}

export default function HeatLevelSelector({ product }: Props) {
  const [selected, setSelected] = useState<HeatLevel>('none');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-fire animate-fire" strokeWidth={2} />
        <p className="text-sm font-bold text-white uppercase tracking-wider">
          Choose Your Heat Level
        </p>
      </div>

      <div className="grid gap-2.5">
        {HEAT_LEVELS.map(h => (
          <button
            key={h.id}
            type="button"
            onClick={() => setSelected(h.id as HeatLevel)}
            className={[
              'flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 active:scale-[0.98]',
              selected === h.id
                ? 'border-amber-500 shadow-amber-glow'
                : 'border-ss-500 hover:border-ss-400',
              h.bg,
            ].join(' ')}
            style={selected === h.id ? { backgroundColor: 'rgba(240,168,32,0.08)' } : undefined}
          >
            <span className="text-2xl shrink-0">{h.emoji}</span>
            <div className="flex-1">
              <p className={`text-sm font-bold ${h.color}`}>{h.label}</p>
              <p className="text-xs text-ss-200 mt-0.5">{h.desc}</p>
            </div>
            {selected === h.id && (
              <div className="h-5 w-5 shrink-0 rounded-full bg-amber-500 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: '#0A1614' }} />
              </div>
            )}
          </button>
        ))}
      </div>

      <AddToCartButton
        product={product}
        selectedHeat={selected}
        className="py-4 text-base w-full"
      />
    </div>
  );
}