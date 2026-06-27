import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/storefront/AddToCartButton';
import ProductCard from '@/components/storefront/ProductCard';
import HeatLevelSelector from './HeatLevelSelector';
import { ArrowLeft, Tag, Flame } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = await db.product.findUnique({
    where:  { slug },
    select: { name: true, description: true },
  });
  if (!p) return { title: 'Not Found' };
  return { title: p.name, description: p.description };
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where:   { slug },
    include: { category: true },
  });
  if (!product) notFound();

  const related = await db.product.findMany({
    where:   { categoryId: product.categoryId, isAvailable: true, NOT: { id: product.id } },
    include: { category: true },
    take:    4,
  });

  const isSig = product.tags.includes('signature') || product.tags.includes('bestseller');
  const isNew = product.tags.includes('new');

  return (
    <div className="bg-ink-900 min-h-screen pt-[68px]">
      <div className="site-px site-max py-10">

        {/* Back */}
        <Link href="/menu"
          className="inline-flex items-center gap-2 text-sm text-ink-200 hover:text-gold-400 transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

          {/* ── Image column ── */}
          <div className="space-y-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-ink-700">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill priority
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Flame className="h-24 w-24 text-gold-500/20 animate-flame" strokeWidth={1} />
                </div>
              )}

              {!product.isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center bg-ink-900/75 backdrop-blur-sm">
                  <span className="rounded-full border border-ink-400 bg-ink-700 px-8 py-3 text-sm font-bold text-ink-100">
                    Sold Out
                  </span>
                </div>
              )}

              {/* Top badge */}
              {(isSig || isNew) && (
                <div className="absolute top-4 left-4">
                  {isNew
                    ? <span className="badge-new">New</span>
                    : <span className="badge-gold text-xs">Signature</span>}
                </div>
              )}

              {/* Heat badge */}
              {product.hasHeatLevel && product.isAvailable && (
                <div className="absolute bottom-4 left-4">
                  <span className="flex items-center gap-1.5 rounded-full bg-ink-900/80 border border-heat/40 px-3 py-1.5 text-xs font-bold text-heat backdrop-blur-sm">
                    <Flame className="h-3.5 w-3.5" strokeWidth={2.5} /> Heat Levels Available
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {product.images.map((img, i) => (
                  <div key={i}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-ink-500 bg-ink-700">
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Details column ── */}
          <div className="flex flex-col gap-5">

            {/* Badges row */}
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/menu?category=${product.category.slug}`}
                className="badge-teal text-xs hover:opacity-80 transition-opacity">
                {product.category.name}
              </Link>
              {product.hasHeatLevel && (
                <span className="badge-heat text-xs flex items-center gap-1">
                  <Flame className="h-3 w-3" strokeWidth={2} /> Heat Levels
                </span>
              )}
              {isSig && !isNew && <span className="badge-gold text-xs">Signature</span>}
              {isNew && <span className="badge-new">New</span>}
            </div>

            {/* Name */}
            <h1
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem,8vw,4.5rem)' }}>
              {product.name.toUpperCase()}
            </h1>

            {/* Description */}
            <p className="text-base text-ink-200 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl text-gold-400">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-base text-ink-300 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-xs text-ink-300">excl. taxes</span>
            </div>

            <div className="border-t border-ink-600" />

            {/* Heat selector or direct add */}
            {product.hasHeatLevel && product.isAvailable ? (
              <HeatLevelSelector
                product={{
                  id:           product.id,
                  name:         product.name,
                  slug:         product.slug,
                  price:        product.price,
                  images:       product.images,
                  isAvailable:  product.isAvailable,
                  hasHeatLevel: product.hasHeatLevel,
                }}
              />
            ) : (
              <AddToCartButton
                product={{
                  id:           product.id,
                  name:         product.name,
                  slug:         product.slug,
                  price:        product.price,
                  images:       product.images,
                  isAvailable:  product.isAvailable,
                  hasHeatLevel: product.hasHeatLevel,
                }}
                selectedHeat="none"
                className="py-4 text-base w-full"
              />
            )}

            {/* SKU */}
            {product.sku && (
              <p className="flex items-center gap-2 text-xs text-ink-300">
                <Tag className="h-3.5 w-3.5" /> SKU: {product.sku}
              </p>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map(t => (
                  <span
                    key={t}
                    className="rounded-full border border-ink-500 bg-ink-700 px-3 py-0.5 text-xs text-ink-200 capitalize">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Nutritional note */}
            <p className="text-xs text-ink-400 border-t border-ink-600 pt-4">
              Prices exclusive of taxes. Product may vary slightly from images. All items are prepared fresh.
            </p>
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <section className="mt-20 pt-10 border-t border-ink-600">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="eyebrow-teal">More from {product.category.name}</span>
                <h2 className="font-display text-3xl text-white">YOU MIGHT ALSO LIKE</h2>
              </div>
              <Link
                href={`/menu?category=${product.category.slug}`}
                className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {related.map(p => (
                <ProductCard
                  key={p.id}
                  product={{ ...p, compareAtPrice: p.compareAtPrice ?? null }}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}