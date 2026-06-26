import ProductsClient from './ProductsClient';
import { getSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const session = await getSession();
  if (!session || session.user.role !== 'ADMIN') redirect('/login');
  return (
    <div>
      <h1 className="font-display text-3xl text-white mb-6">PRODUCTS</h1>
      <ProductsClient />
    </div>
  );
}