import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import MenuFilter from './MenuFilter';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse the full Seven Sides menu — Red Tenders, The Sando, Sliders, Wraps and more in Lahore.',
};

interface MenuPageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const { category, q } = await searchParams;

  const [categories, products] = await Promise.all([
    db.category.findMany({ where:{isActive:true}, orderBy:{position:'asc'} }),
    db.product.findMany({
      where: {
        isAvailable: true,
        ...(category ? { category:{slug:category} } : {}),
        ...(q ? { OR:[
          { name:        { contains:q, mode:'insensitive' } },
          { description: { contains:q, mode:'insensitive' } },
        ]} : {}),
      },
      include:  { category:true },
      orderBy:  [{ category:{position:'asc'} },{ name:'asc' }],
    }),
  ]);

  const activeCategory = categories.find(c => c.slug === category);

  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>
      <div className="container-px mx-auto max-w-7xl py-10">
        <div className="mb-8">
          <span className="eyebrow-gold">Our Menu</span>
          <h1 className="font-display text-4xl text-white sm:text-5xl">
            {activeCategory ? activeCategory.name.toUpperCase() : 'FULL MENU'}
          </h1>
          <p className="mt-2 text-sm text-dark-100">
            Tenders · Sliders · Wraps · Fries · Shakes — all made to order.
          </p>
        </div>

        <MenuFilter categories={categories} activeSlug={category} searchQuery={q} />

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <div className="text-5xl mb-4">🍗</div>
            <p className="font-display text-2xl text-white">Nothing Found</p>
            <p className="mt-2 text-sm text-dark-100">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map(p => (
              <ProductCard key={p.id} product={{ ...p, compareAtPrice: p.compareAtPrice ?? null }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}