import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/get-session';
import { generateOrderNumber } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const body    = await req.json();

    const { customerName, customerEmail, customerPhone, deliveryType, address, area, city,
      branchId, paymentMethod, notes, couponCode, items } = body;

    if (!items?.length) return NextResponse.json({ error: 'No items in order' }, { status: 400 });

    const subtotal  = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
    let discount    = 0;

    if (couponCode) {
      const coupon = await db.coupon.findUnique({ where: { code: couponCode } });
      if (coupon?.isActive) {
        discount = coupon.type === 'PERCENTAGE'
          ? Math.floor(subtotal * coupon.value / 100)
          : coupon.value;
        await db.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } });
      }
    }

    const settings = await db.siteSettings.findUnique({ where: { id: 'settings' } });
    const delFee   = deliveryType === 'delivery'
      ? (subtotal >= (settings?.freeDeliveryMin ?? 2500) ? 0 : (settings?.deliveryFee ?? 200))
      : 0;
    const total    = Math.max(0, subtotal - discount) + delFee;

    const order = await db.order.create({
      data: {
        orderNumber:   generateOrderNumber(),
        userId:        session?.user.id ?? null,
        customerName, customerEmail, customerPhone,
        deliveryType,
        address:       address ?? null,
        area:          area    ?? null,
        city:          city    ?? null,
        branchId:      branchId ?? null,
        paymentMethod,
        notes:         notes ?? null,
        couponCode:    couponCode ?? null,
        subtotal, discount, deliveryFee: delFee, total,
        items: {
          create: items.map((i: any) => ({
            productId: i.productId, name: i.name, price: i.price,
            quantity:  i.quantity, heatLevel: i.heatLevel ?? null, image: i.image ?? null,
          })),
        },
      },
    });

    return NextResponse.json({ orderNumber: order.orderNumber, orderId: order.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Order failed' }, { status: 500 });
  }
}