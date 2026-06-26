import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/storefront/AddToCartButton';
import ProductCard from '@/components/storefront/ProductCard';
import HeatLevelSelector from './HeatLevelSelector';
import { Flame, ArrowLeft, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug }   = await params;
  const product    = await db.product.findUnique({
    where:  { slug },
    select: { name: true, description: true },
  });
  if (!product) return { title: 'Product Not Found' };
  return { title: product.name, description: product.description };
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
    where: {
      categoryId:  product.categoryId,
      isAvailable: true,
      NOT:         { id: product.id },
    },
    include: { category: true },
    take:    4,
  });

  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', paddingTop: '5rem' }}>
      <div className="container-px mx-auto max-w-6xl py-10">

        {/* Back */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm text-dark-100 hover:text-gold-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Menu
        </Link>

        {/* Product */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-dark-400">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-6xl">🍗</div>
              )}
              {!product.isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-600/70 backdrop-blur-sm">
                  <span className="rounded-full border border-dark-300 bg-dark-500 px-6 py-2 text-sm font-bold text-dark-100">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-dark-300 bg-dark-400"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/menu?category=${product.category.slug}`}
                className="badge-teal text-xs hover:opacity-80 transition-opacity"
              >
                {product.category.name}
              </Link>
              {product.tags.includes('new') && (
                <span className="badge-new">New</span>
              )}
              {product.tags.includes('bestseller') && (
                <span className="badge-gold text-xs">Bestseller</span>
              )}
              {product.tags.includes('signature') && (
                <span className="badge-gold text-xs">Signature</span>
              )}
              {product.hasHeatLevel && (
                <span className="badge-heat text-xs flex items-center gap-1">
                  <Flame className="h-3 w-3" strokeWidth={2} /> Heat Levels Available
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl text-white sm:text-5xl leading-none">
              {product.name.toUpperCase()}
            </h1>

            <p className="text-base text-dark-100 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl text-gold-400">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-base text-dark-200 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-xs text-dark-200">Excl. taxes</span>
            </div>

            {/* Heat selector (client) or direct add (server-renderable) */}
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
                className="py-4 text-base"
              />
            )}

            {product.sku && (
              <p className="flex items-center gap-2 text-xs text-dark-200">
                <Tag className="h-3.5 w-3.5" /> SKU: {product.sku}
              </p>
            )}

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-dark-300 bg-dark-400 px-3 py-0.5 text-xs text-dark-100 capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <span className="eyebrow-teal">More from {product.category.name}</span>
              <h2 className="font-display text-3xl text-white">YOU MIGHT ALSO LIKE</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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