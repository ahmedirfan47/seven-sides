import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const s = await db.siteSettings.findUnique({ where: { id: 'settings' } });
    return NextResponse.json(s ?? { deliveryFee: 200, freeDeliveryMin: 2500 });
  } catch {
    return NextResponse.json({ deliveryFee: 200, freeDeliveryMin: 2500 });
  }
}