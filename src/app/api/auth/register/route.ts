import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth-token';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ error: 'All fields required' }, { status: 400 });

    const exists = await db.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

    const hashed = await bcrypt.hash(password, 12);
    const user   = await db.user.create({ data: { name, email, password: hashed, phone: phone || null } });
    const token  = await createToken({ userId: user.id, email: user.email, name: user.name, role: user.role });

    const res = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    res.cookies.set('ss-auth', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 24 * 30 });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 });
  }
}