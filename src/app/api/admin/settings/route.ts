import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    return NextResponse.json(await db.siteSettings.findUnique({ where: { id: 'settings' } }) ?? {});
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function PUT(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const body = await req.json();
    const data = { ...body, deliveryFee: parseInt(String(body.deliveryFee ?? 200), 10), freeDeliveryMin: parseInt(String(body.freeDeliveryMin ?? 2500), 10) };
    const s = await db.siteSettings.upsert({ where: { id: 'settings' }, create: { id: 'settings', ...data }, update: data });
    return NextResponse.json(s);
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}