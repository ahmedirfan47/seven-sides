import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import MenuFilter from './MenuFilter';
import { CAT_EMOJI } from '@/lib/constants';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:       'Menu',
  description: 'The full Seven Sides menu — Red Tenders, The Sando, Sliders, Wraps, Fries and more in Lahore.',
};

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function MenuPage({ searchParams }: Props) {
  const { category, q } = await searchParams;

  const [categories, products] = await Promise.all([
    db.category.findMany({ where: { isActive: true }, orderBy: { position: 'asc' } }),
    db.product.findMany({
      where: {
        isAvailable: true,
        ...(category ? { category: { slug: category } } : {}),
        ...(q ? {
          OR: [
            { name:        { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        } : {}),
      },
      include: { category: true },
      orderBy: [{ category: { position: 'asc' } }, { name: 'asc' }],
    }),
  ]);

  const isFiltered     = !!(category || q);
  const activeCategory = categories.find(c => c.slug === category);

  /* Group by category when showing all — replicates the Instagram menu board layout */
  const grouped = !isFiltered
    ? categories.reduce((acc, cat) => {
        const items = products.filter(p => p.categoryId === cat.id);
        if (items.length > 0) acc.push({ cat, items });
        return acc;
      }, [] as { cat: typeof categories[0]; items: typeof products }[])
    : null;

  return (
    <div style={{ backgroundColor: '#0A1614', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Page header */}
      <div style={{ backgroundColor: '#0E1F1D', borderBottom: '1px solid #243838' }} className="py-14 sm:py-18">
        <div className="px-site max-site">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="eyebrow-amber">Seven Sides</span>
              <h1
                className="font-display text-white"
                style={{ fontSize: 'clamp(3rem,10vw,6rem)', lineHeight: 1 }}
              >
                THE MENU
              </h1>
              <p className="text-ss-200 text-sm mt-2">
                {activeCategory
                  ? activeCategory.name
                  : `${products.length} items across ${categories.length} categories`}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-ss-200">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                Open now
              </span>
              <span className="text-ss-400">12 PM – 12:30 AM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-site max-site py-8">
        <MenuFilter categories={categories} activeSlug={category} searchQuery={q} />

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <div className="text-6xl mb-4">🔥</div>
            <p className="font-display text-2xl text-white">Nothing Found</p>
            <p className="text-ss-200 text-sm mt-2">
              Try a different category or clear your search.
            </p>
          </div>
        ) : grouped ? (
          /* Grouped view — matches the Instagram menu board */
          <div className="space-y-14">
            {grouped.map(({ cat, items }) => (
              <div key={cat.id}>
                <div className="flex items-center gap-4 mb-6">
                  {/* Amber category chip — matches the brand menu board design */}
                  <div className="cat-chip">
                    <span className="text-base">{CAT_EMOJI[cat.slug] ?? '🍽️'}</span>
                    <span>{cat.name}</span>
                  </div>
                  <div className="flex-1 h-px" style={{ backgroundColor: '#243838' }} />
                  <span className="text-xs text-ss-300 shrink-0">
                    {items.length} item{items.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {items.map(p => (
                    <ProductCard key={p.id} product={{ ...p, compareAtPrice: p.compareAtPrice ?? null }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flat grid — filtered view */
          <div>
            {activeCategory && (
              <div className="flex items-center gap-4 mb-8">
                <div className="cat-chip">
                  <span className="text-base">{CAT_EMOJI[activeCategory.slug] ?? '🍽️'}</span>
                  <span>{activeCategory.name}</span>
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: '#243838' }} />
                <span className="text-xs text-ss-300 shrink-0">
                  {products.length} item{products.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map(p => (
                <ProductCard key={p.id} product={{ ...p, compareAtPrice: p.compareAtPrice ?? null }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}