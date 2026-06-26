import SettingsClient from './SettingsClient';
import { getSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getSession();
  if (!session || session.user.role !== 'ADMIN') redirect('/login');
  return (
    <div>
      <h1 className="font-display text-3xl text-white mb-6">SETTINGS</h1>
      <SettingsClient />
    </div>
  );
}