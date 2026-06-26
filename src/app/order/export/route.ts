import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';
import { formatPrice, STATUS_LABELS } from '@/lib/utils';

function escapeCsv(val: unknown): string {
  const str = val == null ? '' : String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();

  try {
    const orders = await db.order.findMany({
      include:  { items: true, branch: true },
      orderBy:  { createdAt: 'desc' },
    });

    const header = [
      'Order Number', 'Date', 'Customer', 'Email', 'Phone',
      'Delivery Type', 'Address / Branch',
      'Payment', 'Status', 'Subtotal', 'Discount', 'Delivery Fee', 'Total',
      'Items',
    ].join(',');

    const rows = orders.map(o => [
      escapeCsv(o.orderNumber),
      escapeCsv(new Date(o.createdAt).toLocaleDateString('en-PK')),
      escapeCsv(o.customerName),
      escapeCsv(o.customerEmail),
      escapeCsv(o.customerPhone),
      escapeCsv(o.deliveryType),
      escapeCsv(
        o.deliveryType === 'pickup' || o.deliveryType === 'dine-in'
          ? (o.branch?.name ?? o.branchId ?? '')
          : [o.address, o.area, o.city].filter(Boolean).join(', '),
      ),
      escapeCsv(o.paymentMethod),
      escapeCsv(STATUS_LABELS[o.status] ?? o.status),
      escapeCsv(formatPrice(o.subtotal)),
      escapeCsv(o.discount > 0 ? formatPrice(o.discount) : ''),
      escapeCsv(formatPrice(o.deliveryFee)),
      escapeCsv(formatPrice(o.total)),
      escapeCsv(
        o.items
          .map(i =>
            `${i.name}${i.heatLevel && i.heatLevel !== 'none' ? ` (${i.heatLevel})` : ''} x${i.quantity}`,
          )
          .join(' | '),
      ),
    ].join(','));

    const csv = [header, ...rows].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type':        'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="seven-sides-orders-${Date.now()}.csv"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}