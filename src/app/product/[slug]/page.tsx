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
  const p = await db.product.findUnique({ where: { slug }, select: { name: true, description: true } });
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
    <div style={{ backgroundColor: '#0A1614', minHeight: '100vh', paddingTop: '68px' }}>
      <div className="px-site max-site py-10">

        {/* Back */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm text-ss-200 hover:text-amber-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

          {/* ── Image column ── */}
          <div className="space-y-3">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-3xl"
              style={{ backgroundColor: '#0E1F1D' }}
            >
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
                  <Flame className="h-24 w-24 text-amber-500/15 animate-fire" strokeWidth={1} />
                </div>
              )}

              {!product.isAvailable && (
                <div
                  className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
                  style={{ backgroundColor: 'rgba(10,22,20,0.78)' }}
                >
                  <span
                    className="rounded-full border border-ss-400 px-8 py-3 text-sm font-bold text-ss-100"
                    style={{ backgroundColor: '#132524' }}
                  >
                    Sold Out
                  </span>
                </div>
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {isNew  && <span className="badge-new">New</span>}
                {isSig && !isNew && <span className="badge-amber text-xs">Signature</span>}
              </div>

              {product.hasHeatLevel && product.isAvailable && (
                <div className="absolute bottom-4 left-4">
                  <span
                    className="flex items-center gap-1.5 rounded-full border border-fire/40 px-3 py-1.5 text-xs font-bold text-fire backdrop-blur-sm"
                    style={{ backgroundColor: 'rgba(214,59,46,0.12)' }}
                  >
                    <Flame className="h-3.5 w-3.5" strokeWidth={2.5} /> Heat Levels Available
                  </span>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-ss-500"
                    style={{ backgroundColor: '#0E1F1D' }}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Details column ── */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/menu?category=${product.category.slug}`}
                className="badge-teal text-xs hover:opacity-80 transition-opacity"
              >
                {product.category.name}
              </Link>
              {product.hasHeatLevel && (
                <span className="badge-fire text-xs flex items-center gap-1">
                  <Flame className="h-3 w-3" strokeWidth={2} /> Heat Levels
                </span>
              )}
              {isSig  && !isNew && <span className="badge-amber text-xs">Signature</span>}
              {isNew  && <span className="badge-new">New</span>}
            </div>

            <h1
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem,8vw,4.5rem)' }}
            >
              {product.name.toUpperCase()}
            </h1>

            <p className="text-base text-ss-100 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl text-amber-400">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-base text-ss-300 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-xs text-ss-300">excl. taxes</span>
            </div>

            <div className="border-t border-ss-500" />

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

            {product.sku && (
              <p className="flex items-center gap-2 text-xs text-ss-300">
                <Tag className="h-3.5 w-3.5" /> SKU: {product.sku}
              </p>
            )}

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map(t => (
                  <span
                    key={t}
                    className="rounded-full border border-ss-500 px-3 py-0.5 text-xs text-ss-200 capitalize"
                    style={{ backgroundColor: '#132524' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <p className="text-xs text-ss-400 border-t border-ss-500 pt-4">
              Prices exclusive of taxes. Product appearance may vary slightly from images.
            </p>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20 pt-10" style={{ borderTop: '1px solid #243838' }}>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="eyebrow-teal">More from {product.category.name}</span>
                <h2 className="font-display text-3xl text-white">YOU MIGHT ALSO LIKE</h2>
              </div>
              <Link
                href={`/menu?category=${product.category.slug}`}
                className="hidden sm:flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
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