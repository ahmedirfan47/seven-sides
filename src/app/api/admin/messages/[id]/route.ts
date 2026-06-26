import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const { id }     = await params;
    const { isRead } = await req.json();
    const message    = await db.message.update({
      where: { id },
      data:  { isRead: Boolean(isRead) },
    });
    return NextResponse.json(message);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const { id } = await params;
    await db.message.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}