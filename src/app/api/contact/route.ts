import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const msg  = await db.message.create({ data: { name: body.name, email: body.email, phone: body.phone || null, subject: body.subject || null, message: body.message } });
    return NextResponse.json(msg);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to send' }, { status: 500 });
  }
}