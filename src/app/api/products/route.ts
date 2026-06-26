import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const q        = searchParams.get('q');
    const featured = searchParams.get('featured');

    const products = await db.product.findMany({
      where: {
        isAvailable: true,
        ...(featured ? { isFeatured: true } : {}),
        ...(category ? { category: { slug: category } } : {}),
        ...(q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }] } : {}),
      },
      include: { category: true },
      orderBy: [{ category: { position: 'asc' } }, { name: 'asc' }],
    });
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}