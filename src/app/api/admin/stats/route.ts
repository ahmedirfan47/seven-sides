import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const today = new Date(); today.setHours(0,0,0,0);
    const [totalOrders, todayOrders, pendingOrders, totalCustomers, totalProducts, recentOrders, revenue] = await Promise.all([
      db.order.count(),
      db.order.count({ where: { createdAt: { gte: today } } }),
      db.order.count({ where: { status: 'PENDING' } }),
      db.user.count({ where: { role: 'CUSTOMER' } }),
      db.product.count({ where: { isAvailable: true } }),
      db.order.findMany({ include: { items: true, branch: true }, orderBy: { createdAt: 'desc' }, take: 10 }),
      db.order.aggregate({ _sum: { total: true }, where: { status: { notIn: ['CANCELLED'] } } }),
    ]);
    return NextResponse.json({ totalOrders, todayOrders, pendingOrders, totalCustomers, totalProducts, recentOrders, totalRevenue: revenue._sum.total ?? 0 });
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}