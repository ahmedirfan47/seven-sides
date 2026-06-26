import { getSession } from './get-session';
import { NextResponse } from 'next/server';

export async function requireAdminApi() {
  const session = await getSession();
  if (!session || session.user.role !== 'ADMIN') return null;
  return session;
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}