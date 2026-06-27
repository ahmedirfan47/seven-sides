'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useCallback, useRef, useState, useTransition } from 'react';
import { CAT_EMOJI } from '@/lib/constants';

interface Category { id: string; name: string; slug: string }
interface Props { categories: Category[]; activeSlug?: string; searchQuery?: string }

export default function MenuFilter({ categories, activeSlug, searchQuery }: Props) {
  const router    = useRouter();
  const pathname  = usePathname();
  const [q, setQ] = useState(searchQuery ?? '');
  const [, start] = useTransition();
  const timer     = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const navigate = useCallback((slug?: string, query?: string) => {
    const p = new URLSearchParams();
    if (slug)  p.set('category', slug);
    if (query) p.set('q', query);
    const qs = p.toString();
    start(() => router.push(qs ? `${pathname}?${qs}` : pathname));
  }, [pathname, router]);

  const handleSearch = (val: string) => {
    setQ(val);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => navigate(activeSlug, val || undefined), 380);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ss-300" />
        <input
          value={q}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search tenders, sliders, shakes…"
          className="input pl-11 pr-11"
          aria-label="Search menu"
        />
        {q && (
          <button
            onClick={() => { setQ(''); navigate(activeSlug, undefined); }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors"
            style={{ backgroundColor: '#243838' }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar"
          role="group"
          aria-label="Filter by category"
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <button
            onClick={() => navigate(undefined, q || undefined)}
            aria-pressed={!activeSlug}
            className="shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all border"
            style={!activeSlug
              ? { backgroundColor: '#F0A820', color: '#0A1614', borderColor: '#F0A820' }
              : { backgroundColor: '#132524', color: '#A5C8C5', borderColor: '#243838' }
            }
          >
            All Items
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.slug, q || undefined)}
              aria-pressed={activeSlug === cat.slug}
              className="shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all border"
              style={activeSlug === cat.slug
                ? { backgroundColor: '#F0A820', color: '#0A1614', borderColor: '#F0A820' }
                : { backgroundColor: '#132524', color: '#A5C8C5', borderColor: '#243838' }
              }
            >
              <span className="text-xs">{CAT_EMOJI[cat.slug] ?? '🍽️'}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {(q || activeSlug) && (
        <div className="flex items-center gap-2 text-xs text-ss-300">
          <span>
            {q
              ? `Results for "${q}"`
              : `Showing ${categories.find(c => c.slug === activeSlug)?.name ?? 'all'}`
            }
          </span>
          <button
            onClick={() => { setQ(''); navigate(); }}
            className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}