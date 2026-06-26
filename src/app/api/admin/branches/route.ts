import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function GET() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try { return NextResponse.json(await db.branch.findMany({ orderBy: { position: 'asc' } })); }
  catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try { const body = await req.json(); return NextResponse.json(await db.branch.create({ data: { ...body, position: Number(body.position ?? 0) } })); }
  catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}