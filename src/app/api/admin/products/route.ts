import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function GET(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') ?? '';
    const products = await db.product.findMany({
      where: q ? { OR: [{ name: { contains: q, mode:'insensitive' } }, { slug: { contains: q, mode:'insensitive' } }] } : {},
      include: { category: true },
      orderBy: [{ category: { position:'asc' } }, { name:'asc' }],
    });
    return NextResponse.json(products);
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const body = await req.json();
    const p = await db.product.create({ data: { ...body, price: Number(body.price), compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null, stock: Number(body.stock) }, include: { category: true } });
    return NextResponse.json(p);
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}