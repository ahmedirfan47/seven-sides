import { NextResponse } from 'next/server';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

export async function POST(req: Request) {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  try {
    const formData = await req.formData();
    const file     = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });
    if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Images only' }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Max 5MB' }, { status: 400 });
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return NextResponse.json({ error: 'Vercel Blob not configured. Paste image URL instead.', setupRequired: true }, { status: 503 });
    const { put } = await import('@vercel/blob');
    const safeName = `7s-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,'_')}`;
    const blob = await put(safeName, file, { access: 'public', addRandomSuffix: false });
    return NextResponse.json({ url: blob.url });
  } catch (err: any) { return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 }); }
}