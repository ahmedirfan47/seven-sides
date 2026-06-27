import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdminApi, unauthorized } from '@/lib/admin-guard';

const IMAGES: Record<string, string> = {
  'the-sando':             'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
  'hot-chicken-slider':    'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800',
  'honey-sriracha-slider': 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800',
  'hot-honey-ranch-slider':'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800',
  'caesar-chicken-slider': 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=800',
  'red-tenders':           'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800',
  'crunchy-tenders':       'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800',
  'crispy-chicken-wrap':   'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=800',
  'americana-chicken-wrap':'https://images.unsplash.com/photo-1561050501-38fecab65c0b?q=80&w=800',
  'sriracha-chicken-wrap': 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800',
  'loaded-waffle-fries':   'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800',
  'choco-berry-shake':     'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800',
  'chocolate-shake':       'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800',
  'strawberry-shake':      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=800',
  'cookies-cream-shake':   'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800',
  'vanilla-shake':         'https://images.unsplash.com/photo-1619474987890-910c3f9eab17?q=80&w=800',
  'salted-caramel-shake':  'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=800',
  'toastie':               'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800',
  'churros':               'https://images.unsplash.com/photo-1589093569870-82e6d2b1d1b3?q=80&w=800',
  'crinkle-fries':         'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=800',
  'waffle-fries':          'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800',
  'mac-cheese':            'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800',
  'pepsi':                 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=800',
  'diet-pepsi':            'https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=800',
  '7up':                   'https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=800',
  'mirinda':               'https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=800',
  'water':                 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800',
};

export async function POST() {
  const session = await requireAdminApi();
  if (!session) return unauthorized();
  const results = [];
  for (const [slug, img] of Object.entries(IMAGES)) {
    try {
      await db.product.update({ where:{ slug }, data:{ images:[img] } });
      results.push({ slug, ok: true });
    } catch (e: any) {
      results.push({ slug, ok: false, err: e.message });
    }
  }
  const ok = results.filter(r => r.ok).length;
  return NextResponse.json({ message:`Updated ${ok}/${results.length} products`, results });
}