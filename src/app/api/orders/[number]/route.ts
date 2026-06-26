import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(_: Request, { params }: { params: Promise<{ number: string }> }) {
  try {
    const { number } = await params;
    const order = await db.order.findUnique({
      where:   { orderNumber: number },
      include: { items: true, branch: true },
    });
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}