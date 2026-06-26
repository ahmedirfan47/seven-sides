import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const customers = await db.user.findMany({ where:{ role:'CUSTOMER' }, select:{ id:true, name:true, email:true, phone:true, createdAt:true, orders:{ select:{ total:true, status:true, createdAt:true } } }, orderBy:{ createdAt:'desc' } });
    return NextResponse.json(customers);
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}