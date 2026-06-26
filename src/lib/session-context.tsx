'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface SessionUser {
  id:    string;
  name:  string;
  email: string;
  role:  'ADMIN' | 'CUSTOMER';
}

interface SessionContextValue {
  session: { user: SessionUser } | null;
  loading: boolean;
  signOut: (opts?: { callbackUrl?: string }) => Promise<void>;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  loading: true,
  signOut: async () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<{ user: SessionUser } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setSession(data?.user ? { user: data.user } : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const signOut = async (opts?: { callbackUrl?: string }) => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setSession(null);
    window.location.href = opts?.callbackUrl ?? '/';
  };

  return (
    <SessionContext.Provider value={{ session, loading, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

// Standalone export — for components that import signOut directly
// e.g. import { signOut } from '@/lib/session-context'
export async function signOut(opts?: { callbackUrl?: string }) {
  await fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = opts?.callbackUrl ?? '/';
}