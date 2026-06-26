import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {

const session = await requireAdminApi();

if (!session) return unauthorized();

try {

const { id } = await params; const { status } = await req.json();

const o = await db.order.update({ where: { id }, data: { status }, include: { items: true, branch: true } });

return NextResponse.json(o);

} catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }); }

}