import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    db.product.findMany({
      where:  { isAvailable: true },
      select: { slug: true, updatedAt: true },
    }).catch(() => []),
    db.category.findMany({
      where:  { isActive: true },
      select: { slug: true, updatedAt: true },
    }).catch(() => []),
  ]);

  const base = SITE.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base + '/',         changeFrequency: 'daily',   priority: 1.0, lastModified: new Date() },
    { url: base + '/menu',     changeFrequency: 'daily',   priority: 0.9, lastModified: new Date() },
    { url: base + '/branches', changeFrequency: 'weekly',  priority: 0.8, lastModified: new Date() },
    { url: base + '/about',    changeFrequency: 'monthly', priority: 0.6, lastModified: new Date() },
    { url: base + '/contact',  changeFrequency: 'monthly', priority: 0.5, lastModified: new Date() },
  ];

  const productPages: MetadataRoute.Sitemap = products.map(p => ({
    url:             base + '/product/' + p.slug,
    changeFrequency: 'weekly' as const,
    priority:        0.7,
    lastModified:    p.updatedAt,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map(c => ({
    url:             base + '/menu?category=' + c.slug,
    changeFrequency: 'weekly' as const,
    priority:        0.6,
    lastModified:    c.updatedAt,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}