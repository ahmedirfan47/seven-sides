import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function GET(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const orders = await db.order.findMany({
      where: status ? { status: status as any } : {},
      include: { items: true, branch: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json(orders);
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}