import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import MenuFilter from './MenuFilter';
import { CATEGORY_EMOJI } from '@/lib/constants';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Menu',
  description: 'The full Seven Sides menu — Red Tenders, The Sando, Sliders, Wraps, Fries and more.',
};

interface Props { searchParams: Promise<{ category?: string; q?: string }> }

export default async function MenuPage({ searchParams }: Props) {
  const { category, q } = await searchParams;

  const [categories, products] = await Promise.all([
    db.category.findMany({ where:{isActive:true}, orderBy:{position:'asc'} }),
    db.product.findMany({
      where: {
        isAvailable: true,
        ...(category ? { category:{ slug:category } } : {}),
        ...(q ? { OR:[{ name:{ contains:q,mode:'insensitive' } },{ description:{ contains:q,mode:'insensitive' } }] } : {}),
      },
      include: { category:true },
      orderBy: [{ category:{ position:'asc' } },{ name:'asc' }],
    }),
  ]);

  const isFiltered = !!(category || q);
  const activeCategory = categories.find(c => c.slug === category);

  const grouped = !isFiltered
    ? categories.reduce((acc,cat) => {
        const items = products.filter(p => p.categoryId === cat.id);
        if (items.length) acc.push({ cat, items });
        return acc;
      }, [] as { cat: typeof categories[0]; items: typeof products }[])
    : null;

  return (
    <div className="bg-ink-900 min-h-screen pt-[68px]">
      {/* Header */}
      <div className="bg-ink-800 border-b border-ink-600 py-12 sm:py-16">
        <div className="site-px site-max flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="eyebrow-gold">Seven Sides</span>
            <h1 className="font-display text-white" style={{fontSize:'clamp(3rem,10vw,6rem)',lineHeight:1}}>THE MENU</h1>
            <p className="text-ink-200 text-sm mt-2">
              {activeCategory ? activeCategory.name : `${products.length} items · ${categories.length} categories`}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-ink-200">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" /> Open now
            </span>
            <span className="text-ink-400">12 PM – 12:30 AM</span>
          </div>
        </div>
      </div>

      <div className="site-px site-max py-8">
        <MenuFilter categories={categories} activeSlug={category} searchQuery={q} />

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <div className="text-6xl mb-4">🔥</div>
            <p className="font-display text-2xl text-white">Nothing Found</p>
            <p className="text-ink-200 text-sm mt-2">Try a different category or clear your search.</p>
          </div>
        ) : grouped ? (
          <div className="space-y-14">
            {grouped.map(({ cat, items }) => (
              <div key={cat.id}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="cat-chip">
                    <span className="text-base">{CATEGORY_EMOJI[cat.slug] ?? '🍽️'}</span>
                    <span>{cat.name}</span>
                  </div>
                  <div className="flex-1 h-px bg-ink-600" />
                  <span className="text-xs text-ink-400 shrink-0">{items.length} item{items.length!==1?'s':''}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {items.map(p => (
                    <ProductCard key={p.id} product={{...p, compareAtPrice:p.compareAtPrice??null}} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {activeCategory && (
              <div className="flex items-center gap-4 mb-8">
                <div className="cat-chip">
                  <span className="text-base">{CATEGORY_EMOJI[activeCategory.slug]??'🍽️'}</span>
                  <span>{activeCategory.name}</span>
                </div>
                <div className="flex-1 h-px bg-ink-600" />
                <span className="text-xs text-ink-400">{products.length} item{products.length!==1?'s':''}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map(p => (
                <ProductCard key={p.id} product={{...p, compareAtPrice:p.compareAtPrice??null}} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}