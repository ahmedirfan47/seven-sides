import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import {
  ArrowRight, Flame, Instagram, MapPin, Clock, Phone,
} from 'lucide-react';
import {
  BRANCHES, SITE, CATEGORIES, HEAT_LEVELS, SAUCES, CAT_EMOJI,
} from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [dbCats, featured] = await Promise.all([
    db.category.findMany({ where: { isActive: true }, orderBy: { position: 'asc' }, take: 9 }).catch(() => []),
    db.product.findMany({
      where:   { isFeatured: true, isAvailable: true },
      include: { category: true },
      take:    6,
    }).catch(() => []),
  ]);

  const marquee = '🔥 HOME OF RED TENDERS · THE OG SANDO · BOLD FLAVORS · MEMORIES WORTH SHARING · DHA PHASE 5 · CANTT · LAKE CITY · MODEL TOWN · ';

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: '#0A1614' }}>

      {/* ══════════════════════════════════════════════
          HERO — full viewport, split layout
      ══════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-[68px]">
        {/* Ambient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(59,181,176,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="px-site max-site relative z-10 w-full py-16 lg:py-20 grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center">

          {/* LEFT — content */}
          <div>
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-400 backdrop-blur-sm"
              style={{ borderColor: 'rgba(59,181,176,0.3)', backgroundColor: 'rgba(59,181,176,0.08)' }}
            >
              <Flame className="h-3.5 w-3.5 animate-fire" strokeWidth={2} />
              Home of Red Tenders — Lahore
            </div>

            <h1
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(4.5rem,14vw,9.5rem)', letterSpacing: '-0.01em' }}
            >
              HOME<br />OF<br />
              <span style={{ color: '#F0A820' }}>RED</span><br />
              TENDERS
            </h1>

            <p className="mt-6 text-ss-100 text-base sm:text-lg max-w-md leading-relaxed">
              Louisiana-style hot chicken. Three heat levels. Memories worth sharing —
              four branches across Lahore.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-amber-lg">
                Order Online <ArrowRight className="h-5 w-5" />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="btn-outline-white text-base px-8 py-4">
                WhatsApp Us
              </a>
            </div>

            {/* Heat level pills */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {HEAT_LEVELS.map(h => (
                <Link
                  key={h.id}
                  href="/menu?category=tenders"
                  className={cn_inline(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-semibold transition-all hover:scale-105',
                    h.border, h.bg,
                  )}
                >
                  <span>{h.emoji}</span>
                  <span className={h.color}>{h.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT — food image */}
          <div className="hidden lg:block relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl" style={{ border: '1px solid rgba(59,181,176,0.15)' }}>
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=960"
                alt="The Sando — Seven Sides signature sandwich"
                fill priority
                className="object-cover"
                sizes="480px"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,22,20,0.8) 0%, transparent 50%)' }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="badge-amber text-xs mb-3 inline-block">Signature #1</span>
                <p className="font-display text-white" style={{ fontSize: '2.5rem', lineHeight: 1 }}>THE SANDO</p>
                <p className="font-display text-amber-400 text-2xl mt-1">{formatPrice(975)}</p>
              </div>
            </div>
            {/* Teal accent ring */}
            <div
              className="absolute -inset-2 rounded-3xl pointer-events-none"
              style={{ border: '1px solid rgba(59,181,176,0.08)' }}
            />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, transparent, rgba(240,168,32,0.5))' }} />
          <div className="h-1.5 w-1.5 rounded-full bg-amber-400/60 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MARQUEE — brand energy strip
      ══════════════════════════════════════════════ */}
      <div style={{ backgroundColor: '#3BB5B0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="marquee-track py-3.5">
          <div className="marquee-inner">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center">
                {marquee.split(' · ').map((t, j) => (
                  <span key={j} className="flex items-center whitespace-nowrap">
                    <span className="font-display text-sm tracking-[0.18em] text-white">{t}</span>
                    <span className="mx-6 text-white/40 font-bold">·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SIGNATURE DUET — The Sando + Red Tenders
          Portrait feature cards with full-bleed photography
      ══════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid #243838' }}>
        <div className="grid lg:grid-cols-2 gap-0.5" style={{ backgroundColor: '#0E1F1D' }}>

          {/* The Sando */}
          <Link
            href="/product/the-sando"
            className="group relative overflow-hidden block"
            style={{ minHeight: '520px' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=960"
              alt="The Sando — Seven Sides signature"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,22,20,0.97) 0%, rgba(10,22,20,0.4) 45%, transparent 100%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <span className="badge-amber text-xs mb-3 inline-block">Signature #1 · Bird Menu</span>
              <h2
                className="font-display text-white leading-none"
                style={{ fontSize: 'clamp(2.8rem,6vw,4.5rem)' }}
              >
                THE SANDO
              </h2>
              <p className="text-ss-100 text-sm mt-2 max-w-xs">
                House Bread · Hot Chicken · Cheese Fondue · Comeback Sauce
              </p>
              <div className="flex items-center gap-4 mt-5">
                <span className="font-display text-amber-400" style={{ fontSize: '2rem' }}>
                  {formatPrice(975)}
                </span>
                <span className="btn-amber text-xs py-2.5 px-5 pointer-events-none">
                  Order Now
                </span>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 border-b-2 border-amber-500/0 group-hover:border-amber-500/30 transition-all duration-500" />
          </Link>

          {/* Red Tenders */}
          <Link
            href="/product/red-tenders"
            className="group relative overflow-hidden block"
            style={{ minHeight: '520px' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=960"
              alt="Red Tenders — Seven Sides hot chicken"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(10,22,20,0.97) 0%, rgba(10,22,20,0.4) 45%, transparent 100%)' }}
            />
            <div className="absolute top-5 right-5">
              <span className="badge-fire text-xs flex items-center gap-1 py-1 px-3">
                <Flame className="h-3 w-3" strokeWidth={2.5} /> 3 Heat Levels
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <span className="badge-fire text-xs mb-3 inline-block">Signature #2 · Tenders</span>
              <h2
                className="font-display text-white leading-none"
                style={{ fontSize: 'clamp(2.8rem,6vw,4.5rem)' }}
              >
                RED<br />TENDERS
              </h2>
              <p className="text-ss-100 text-sm mt-2 max-w-xs">
                5 Pcs · Fries · Comeback Sauce · Your heat level
              </p>
              <div className="flex items-center gap-4 mt-5">
                <span className="font-display text-amber-400" style={{ fontSize: '2rem' }}>
                  {formatPrice(1245)}
                </span>
                <span className="btn-outline-white text-xs py-2.5 px-5 pointer-events-none">
                  Order Now
                </span>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 border-b-2 border-fire/0 group-hover:border-fire/30 transition-all duration-500" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MENU CATEGORIES — Instagram menu board style
      ══════════════════════════════════════════════ */}
      <section className="py-section" style={{ backgroundColor: '#0A1614' }}>
        <div className="px-site max-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow-teal">Seven Sides</span>
              <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,7vw,4.5rem)' }}>
                EXPLORE EVERY SIDE
              </h2>
            </div>
            <Link href="/menu"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group">
              Full Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {(dbCats.length > 0 ? dbCats : CATEGORIES).map((cat: any, i: number) => {
              const emoji = CAT_EMOJI[cat.slug] ?? '🍽️';
              return (
                <Link
                  key={cat.slug || cat.id}
                  href={`/menu?category=${cat.slug}`}
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-ss-500 min-h-[110px] text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-amber-glow"
                  style={{ backgroundColor: '#132524', animationDelay: `${i * 30}ms` }}
                >
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                    {emoji}
                  </span>
                  <p className="font-display text-sm text-white tracking-wider px-2">
                    {cat.name || (cat as any).label}
                  </p>
                </Link>
              );
            })}
            <Link
              href="/menu"
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl min-h-[110px] text-center transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#F0A820' }}
            >
              <Flame className="h-8 w-8 text-ss-900 group-hover:animate-fire" strokeWidth={2} />
              <p className="font-display text-sm text-ss-900 tracking-wider">Full Menu</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SIGNATURE PICKS — featured products
      ══════════════════════════════════════════════ */}
      {(featured as any[]).length > 0 && (
        <section className="py-section" style={{ backgroundColor: '#0E1F1D', borderTop: '1px solid #243838' }}>
          <div className="px-site max-site">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow-amber">Must Try</span>
                <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,7vw,4.5rem)' }}>
                  SIGNATURE PICKS
                </h2>
              </div>
              <Link href="/menu"
                className="hidden sm:flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group">
                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
              {(featured as any[]).map((p: any) => (
                <ProductCard key={p.id} product={{ ...p, compareAtPrice: p.compareAtPrice ?? null }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          HEAT LEVELS — brand identity section
      ══════════════════════════════════════════════ */}
      <section className="py-section" style={{ backgroundColor: '#0A1614', borderTop: '1px solid #243838' }}>
        <div className="px-site max-site">
          <div className="text-center mb-10">
            <span className="eyebrow-teal">The Heat</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,7vw,4.5rem)' }}>
              HOW HOT CAN YOU GO?
            </h2>
            <p className="text-ss-200 text-sm mt-3 max-w-md mx-auto">
              Every Red Tender and Sando comes in three heat levels. Choose yours.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {HEAT_LEVELS.map((h, i) => (
              <Link
                key={h.id}
                href="/menu?category=tenders"
                className={cn_inline(
                  'group relative flex flex-col items-center text-center gap-4 rounded-3xl border-2 p-8',
                  'hover:-translate-y-1 transition-all duration-300',
                  h.border, h.bg,
                )}
              >
                <span className="text-6xl group-hover:animate-fire">{h.emoji}</span>
                <div>
                  <p className={cn_inline('font-display text-2xl', h.color)}>
                    {h.label.toUpperCase()}
                  </p>
                  <p className="text-sm text-ss-200 mt-1">{h.desc}</p>
                </div>
                {i === 2 && (
                  <span className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-wider text-fire bg-fire/20 border border-fire/30 rounded-full px-2 py-0.5">
                    Challenge
                  </span>
                )}
                <span className={cn_inline('text-xs font-semibold flex items-center gap-1', h.color)}>
                  Order Tenders <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SAUCES — brand differentiator
      ══════════════════════════════════════════════ */}
      <section className="py-section" style={{ backgroundColor: '#0E1F1D', borderTop: '1px solid #243838' }}>
        <div className="px-site max-site">
          <div className="text-center mb-10">
            <span className="eyebrow-amber">Secret Weapons</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,7vw,4.5rem)' }}>
              CHOOSE YOUR SAUCE
            </h2>
            <p className="text-ss-200 text-sm mt-3">
              Four dipping sauces — Rs. 120 each
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SAUCES.map(s => (
              <div
                key={s.id}
                className={cn_inline(
                  'group flex flex-col items-center gap-3 p-6 text-center rounded-2xl border border-ss-500',
                  'hover:-translate-y-1 transition-all duration-300 hover:border-ss-400',
                )}
                style={{ backgroundColor: '#132524' }}
              >
                <div
                  className={cn_inline(
                    'h-14 w-14 rounded-full flex items-center justify-center',
                    'ring-2 group-hover:scale-110 transition-transform duration-300',
                    s.dot, s.ring,
                  )}
                >
                  <span className="font-display text-white text-xl">
                    {s.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg text-white tracking-wider">
                    {s.name.toUpperCase()}
                  </p>
                  <p className="text-xs text-ss-200 mt-1 leading-snug">{s.desc}</p>
                </div>
                <span className="text-amber-400 text-sm font-bold">Rs. 120</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BRAND STORY — about teaser
      ══════════════════════════════════════════════ */}
      <section className="py-section" style={{ backgroundColor: '#0A1614', borderTop: '1px solid #243838' }}>
        <div className="px-site max-site">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Image collage */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] col-span-1 row-span-2 overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=700"
                  alt="Seven Sides restaurant interior"
                  fill className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500"
                  alt="Red Tenders"
                  fill className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="15vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=500"
                  alt="Seven Sides slider"
                  fill className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="15vw"
                />
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="eyebrow-teal">About Seven Sides</span>
              <h2 className="font-display text-white leading-none" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
                BOLD<br />FLAVORS.<br />
                <span style={{ color: '#3BB5B0' }}>MEMORIES</span><br />
                WORTH<br />SHARING.
              </h2>
              <div className="mt-5 space-y-3 text-ss-100 text-base leading-relaxed">
                <p>
                  Seven Sides started in DHA Phase 5 with one obsession — make
                  Lahore&apos;s boldest hot chicken. Louisiana-style, no shortcuts,
                  three heat levels.
                </p>
                <p>
                  From The Sando to Red Tenders, every item is built to be
                  memorable. Four branches across Lahore, because the city demanded more.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { n: '4',    l: 'Branches'   },
                  { n: '86K+', l: 'Followers'  },
                  { n: '3',    l: 'Heat Levels' },
                ].map(s => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-ss-500 p-4 text-center"
                    style={{ backgroundColor: '#132524' }}
                  >
                    <p className="font-display text-2xl text-amber-400">{s.n}</p>
                    <p className="text-xs text-ss-200 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about" className="btn-teal">
                  Our Story <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/branches" className="btn-outline-amber">Find Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BRANCHES
      ══════════════════════════════════════════════ */}
      <section className="py-section" style={{ backgroundColor: '#0E1F1D', borderTop: '1px solid #243838' }}>
        <div className="px-site max-site">
          <div className="text-center mb-10">
            <span className="eyebrow-teal">Find Us</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,7vw,4.5rem)' }}>
              FOUR LOCATIONS.<br />ONE OBSESSION.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BRANCHES.map((b, i) => (
              <div
                key={b.id}
                className="group flex flex-col rounded-2xl border border-ss-500 overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-ss-400 hover:shadow-lg"
                style={{ backgroundColor: '#132524' }}
              >
                <div className="h-1 w-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-5 flex-1 space-y-3">
                  {b.tag && <span className="badge-teal text-[10px]">{b.tag}</span>}
                  <h3 className="font-display text-xl text-white">{b.name}</h3>
                  <div className="space-y-2 text-sm text-ss-200">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-teal-500" strokeWidth={1.5} />
                      <span className="text-xs leading-snug">{b.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5} />
                      <span className="text-xs font-semibold text-amber-400">{b.hours}</span>
                    </div>
                    {b.phone && (
                      <a href={`tel:${b.phone}`}
                        className="flex items-center gap-2 hover:text-white transition-colors text-xs">
                        <Phone className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5} />
                        {b.phone}
                      </a>
                    )}
                    {b.note && <p className="text-xs text-teal-400">{b.note}</p>}
                  </div>
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                    Get Directions <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INSTAGRAM
      ══════════════════════════════════════════════ */}
      <section className="py-section" style={{ backgroundColor: '#0A1614', borderTop: '1px solid #243838' }}>
        <div className="px-site max-site">
          <div className="text-center mb-8">
            <span className="eyebrow-amber">@sevensides.pk</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,7vw,4rem)' }}>
              FOLLOW THE FIRE
            </h2>
            <p className="text-ss-200 text-sm mt-2">86K+ followers. Bold content daily.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
            {[
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400',
              'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400',
              'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400',
              'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400',
              'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400',
              'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400',
            ].map((src, i) => (
              <a key={i} href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl">
                <Image src={src} alt={`Seven Sides post ${i + 1}`} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width:640px) 33vw, 16vw" />
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'rgba(10,22,20,0)', transition: 'background-color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(10,22,20,0.55)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(10,22,20,0)')}
                >
                  <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-amber-500/40 px-8 py-3 text-sm font-semibold text-amber-400 hover:bg-amber-500/10 transition-all">
              <Instagram className="h-4 w-4" />
              Follow @sevensides.pk
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA — amber brand banner
      ══════════════════════════════════════════════ */}
      <section className="px-site max-site pb-16">
        <div
          className="relative overflow-hidden rounded-3xl p-12 sm:p-16 text-center"
          style={{ backgroundColor: '#F0A820' }}
        >
          <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full opacity-10" style={{ backgroundColor: '#0A1614' }} />
          <div className="absolute -right-12 -bottom-12 h-56 w-56 rounded-full opacity-10" style={{ backgroundColor: '#0A1614' }} />
          <div className="relative">
            <Flame className="h-14 w-14 mx-auto mb-5 animate-fire" style={{ color: 'rgba(10,22,20,0.3)' }} strokeWidth={2} />
            <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem,7vw,4.5rem)', color: '#0A1614' }}>
              READY TO FEEL<br />THE HEAT?
            </h2>
            <p className="mt-4 text-sm sm:text-base max-w-sm mx-auto" style={{ color: 'rgba(10,22,20,0.7)' }}>
              Open daily from 12 PM. Order online, pick up, or dine in —
              all four Lahore locations.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/menu"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white hover:opacity-90 transition-all"
                style={{ backgroundColor: '#0A1614' }}>
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-4 text-sm font-bold transition-all"
                style={{ borderColor: 'rgba(10,22,20,0.3)', color: '#0A1614' }}>
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* Tiny inline classnames helper to avoid importing cn() in JSX expressions */
function cn_inline(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}