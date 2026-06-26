import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try { const { id } = await params; const body = await req.json(); return NextResponse.json(await db.branch.update({ where:{ id }, data:{ ...body, position: Number(body.position ?? 0) } })); }
  catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try { const { id } = await params; await db.branch.delete({ where:{ id } }); return NextResponse.json({ ok: true }); }
  catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }
}