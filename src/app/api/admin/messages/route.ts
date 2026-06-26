import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try { return NextResponse.json(await db.message.findMany({ orderBy:{ createdAt:'desc' } })); }
  catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}