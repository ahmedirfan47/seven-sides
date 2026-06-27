'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useCallback, useRef, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { CATEGORY_EMOJI } from '@/lib/constants';

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
    timer.current = setTimeout(() => navigate(activeSlug, val || undefined), 400);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-200" />
        <input
          value={q}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search tenders, sliders, shakes…"
          className="input-dark pl-11 pr-11"
          aria-label="Search menu"
        />
        {q && (
          <button onClick={() => { setQ(''); navigate(activeSlug, undefined); }} aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-dark-300 text-white hover:bg-dark-200 transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Category pills — gold when active, matching brand menu board */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-hide"
          role="group" aria-label="Filter by category"
          style={{ WebkitOverflowScrolling: 'touch' }}>

          <button
            onClick={() => navigate(undefined, q || undefined)}
            aria-pressed={!activeSlug}
            className={cn(
              'shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all border',
              !activeSlug
                ? 'bg-gold-500 text-dark-600 border-gold-500 shadow-gold'
                : 'bg-dark-400 text-white/80 border-dark-300 hover:border-dark-200 hover:text-white',
            )}>
            All Items
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.slug, q || undefined)}
              aria-pressed={activeSlug === cat.slug}
              className={cn(
                'shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all border',
                activeSlug === cat.slug
                  ? 'bg-gold-500 text-dark-600 border-gold-500 shadow-gold'
                  : 'bg-dark-400 text-white/80 border-dark-300 hover:border-dark-200 hover:text-white',
              )}>
              <span className="text-xs">{CATEGORY_EMOJI[cat.slug] ?? '🍽️'}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active filter indicator */}
      {(q || activeSlug) && (
        <div className="flex items-center gap-2 text-xs text-dark-100">
          <span>
            {q
              ? `Results for "${q}"`
              : `Showing ${categories.find(c => c.slug === activeSlug)?.name ?? 'all'}`}
          </span>
          <button
            onClick={() => { setQ(''); navigate(); }}
            className="text-gold-400 hover:text-gold-300 font-semibold hover:underline transition-colors">
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}