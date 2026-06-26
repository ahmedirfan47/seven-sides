import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth-token';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 },
      );
    }

    let user = await db.user.findUnique({ where: { email } });

    if (!user) {
      const adminEmail    = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const adminName     = process.env.ADMIN_NAME ?? 'Admin';

      if (
        adminEmail &&
        adminPassword &&
        email    === adminEmail &&
        password === adminPassword
      ) {
        const hashed = await bcrypt.hash(adminPassword, 12);
        user = await db.user.create({
          data: {
            name:     adminName,
            email:    adminEmail,
            password: hashed,
            role:     'ADMIN',
          },
        });
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    const token = await createToken({
      userId: user.id,
      email:  user.email,
      name:   user.name,
      role:   user.role,
    });

    const res = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });

    res.cookies.set('ss-auth', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   60 * 60 * 24 * 30,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Login failed' },
      { status: 500 },
    );
  }
}