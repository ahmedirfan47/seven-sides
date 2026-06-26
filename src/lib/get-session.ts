import { cookies } from 'next/headers';
import { verifyToken } from './auth-token';

export type SessionPayload = {
  user: {
    id:    string;
    email: string;
    name:  string;
    role:  'ADMIN' | 'CUSTOMER';
  };
};

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const store   = await cookies();
    const token   = store.get('ss-auth')?.value;
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload)  return null;
    return {
      user: {
        id:    payload.userId,
        email: payload.email,
        name:  payload.name,
        role:  payload.role,
      },
    };
  } catch {
    return null;
  }
}

// Alias — backward compatibility with copied WKND pages that import getServerSession
export const getServerSession = getSession;