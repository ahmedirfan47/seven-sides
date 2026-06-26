import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();
    if (!code) return NextResponse.json({ error: 'Code required' }, { status: 400 });

    const coupon = await db.coupon.findUnique({ where: { code: code.toUpperCase() } });
    if (!coupon || !coupon.isActive) return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return NextResponse.json({ error: 'Coupon has expired' }, { status: 400 });
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return NextResponse.json({ error: 'Coupon limit reached' }, { status: 400 });
    if (subtotal < coupon.minOrderAmount) return NextResponse.json({ error: `Minimum order is Rs. ${coupon.minOrderAmount}` }, { status: 400 });

    const discount = coupon.type === 'PERCENTAGE'
      ? Math.floor(subtotal * coupon.value / 100)
      : coupon.value;

    return NextResponse.json({ discount, message: `${coupon.type === 'PERCENTAGE' ? coupon.value + '% off' : `Rs. ${coupon.value} off`} applied!` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}