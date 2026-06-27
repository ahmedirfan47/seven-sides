import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import { MapPin, Clock, Phone, ArrowRight, Flame, Instagram } from 'lucide-react';
import { BRANCHES, SITE, SS_CATEGORIES, HEAT_LEVELS, SAUCES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    db.category.findMany({ where: { isActive: true }, orderBy: { position: 'asc' }, take: 9 }).catch(() => []),
    db.product.findMany({
      where:   { isFeatured: true, isAvailable: true },
      include: { category: true },
      take:    6,
    }).catch(() => []),
  ]);

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor: '#0A0A0A' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1920"
            alt="Seven Sides Red Tenders — Home of Red Tenders Lahore"
            fill priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.75) 55%, rgba(10,10,10,0.45) 100%)' }} />
        </div>

        <div className="container-px relative z-10 mx-auto max-w-6xl w-full pt-36 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 mb-8 backdrop-blur-sm">
              <Flame className="h-3.5 w-3.5 animate-flame-pulse" strokeWidth={2} />
              {SITE.tagline} — Lahore
            </div>

            <h1 className="font-display leading-none text-white" style={{ fontSize: 'clamp(3.5rem, 13vw, 8rem)', letterSpacing: '0.02em' }}>
              HOME OF<br />
              <span className="text-gold-500">RED</span><br />
              TENDERS
            </h1>

            <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg max-w-xl">
              The OG Sando. The Screamer Tenders. Bold flavors, memories worth sharing — at DHA Phase 5, Cantt, Lake City & Model Town.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-gold text-base py-4 px-8">
                Order Online <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="btn-outline-white text-base py-4 px-8">
                WhatsApp Us
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              {HEAT_LEVELS.map(h => (
                <Link key={h.id} href="/menu?category=tenders"
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-sm transition-all hover:scale-105 ${h.border} ${h.bg}`}>
                  <span>{h.emoji}</span>
                  <span className={h.color}>{h.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-gold-500/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-gold-500/60 animate-bounce" />
        </div>
      </section>

      {/* ── THE SANDO ── */}
      <section style={{ backgroundColor: '#050505', borderTop: '1px solid #1C1C1C' }}>
        <div className="container-px mx-auto max-w-6xl py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000"
                alt="The Sando — Seven Sides signature sandwich"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-600/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-dark-600">
                  The OG
                </span>
              </div>
            </div>
            <div>
              <span className="eyebrow-teal">Signature #1</span>
              <h2 className="font-display text-white leading-none" style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)' }}>
                THE SANDO
              </h2>
              <p className="mt-4 text-dark-100 text-base leading-relaxed">
                House Bread · Hot Chicken Tenders · Cheese Fondue · Comeback Sauce.
                The item that started everything. The reason people come back.
              </p>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-4xl text-gold-400">Rs. 975</span>
                <span className="text-xs text-dark-200">+ taxes</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {HEAT_LEVELS.map(h => (
                  <span key={h.id} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${h.border} ${h.bg} ${h.color}`}>
                    {h.emoji} {h.label}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex gap-3">
                <Link href="/product/the-sando" className="btn-gold">
                  Order The Sando <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/menu?category=bird-menu" className="btn-outline-gold text-sm px-5">
                  Bird Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RED TENDERS ── */}
      <section className="container-px mx-auto max-w-6xl py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <span className="eyebrow-gold">Signature #2</span>
            <h2 className="font-display text-white leading-none" style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)' }}>
              RED<br /><span className="text-heat">TENDERS</span>
            </h2>
            <p className="mt-4 text-dark-100 text-base leading-relaxed">
              5 hand-battered tenders. Served with Fries and Comeback Sauce.
              Three heat levels. Zero apologies. Choose yours.
            </p>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-4xl text-gold-400">Rs. 1,245</span>
              <span className="text-xs text-dark-200">incl. fries & sauce</span>
            </div>
            <div className="mt-5 grid gap-2.5">
              {HEAT_LEVELS.map(h => (
                <div key={h.id} className={`flex items-center gap-3 rounded-2xl border p-4 ${h.border} ${h.bg}`}>
                  <span className="text-xl">{h.emoji}</span>
                  <div>
                    <p className={`text-sm font-bold ${h.color}`}>{h.label}</p>
                    <p className="text-xs text-dark-100">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/product/red-tenders" className="btn-gold mt-7 inline-flex">
              Order Red Tenders <Flame className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1000"
              alt="Red Tenders — Seven Sides hot fried chicken"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 right-4">
              <span className="badge-heat text-xs flex items-center gap-1 py-1 px-3">
                <Flame className="h-3 w-3" strokeWidth={2} /> 3 Heat Levels
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAUCES ── */}
      <section style={{ backgroundColor: '#050505', borderTop: '1px solid #1C1C1C', borderBottom: '1px solid #1C1C1C' }}>
        <div className="container-px mx-auto max-w-6xl py-14">
          <div className="mb-10 text-center">
            <span className="eyebrow-teal">The Secret Weapons</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
              CHOOSE YOUR SAUCE
            </h2>
            <p className="mt-3 text-dark-100 text-sm">Four dipping sauces — Rs. 120 each.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SAUCES.map((s) => (
              <div key={s.name} className="card-dark rounded-2xl p-5 text-center flex flex-col items-center gap-3 hover:-translate-y-1 transition-all duration-300 group">
                <div className={`h-14 w-14 rounded-full ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className="font-display text-xl text-white">{s.num}</span>
                </div>
                <div>
                  <p className="font-display text-lg text-white">{s.name.toUpperCase()}</p>
                  <p className="text-xs text-dark-100 mt-1 leading-snug">{s.desc}</p>
                </div>
                <span className="text-gold-400 text-sm font-bold">Rs. 120</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU CATEGORIES ── */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="eyebrow-gold">Seven Sides</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
              THE MENU
            </h2>
          </div>
          <Link href="/menu" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group">
            Full Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {(categories.length > 0 ? categories : SS_CATEGORIES).map((cat: any, i: number) => {
            const ss = SS_CATEGORIES.find(s => s.slug === cat.slug);
            return (
              <Link key={cat.slug || cat.id} href={`/menu?category=${cat.slug}`}
                className="group card-dark flex flex-col items-center justify-center rounded-2xl p-5 min-h-[110px] text-center hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {ss?.emoji ?? '🍽️'}
                </span>
                <p className="font-display text-sm text-white leading-tight">{cat.name || (cat as any).label}</p>
              </Link>
            );
          })}
          <Link href="/menu"
            className="group flex flex-col items-center justify-center rounded-2xl p-5 min-h-[110px] text-center hover:-translate-y-1 transition-all duration-300"
            style={{ background: '#E8A020' }}>
            <Flame className="h-7 w-7 text-dark-600 mb-2 group-hover:animate-flame-pulse" strokeWidth={2} />
            <p className="font-display text-sm text-dark-600">Full Menu</p>
          </Link>
        </div>
      </section>

      {/* ── SIGNATURES ── */}
      {(featured as any[]).length > 0 && (
        <section style={{ backgroundColor: '#050505' }}>
          <div className="container-px mx-auto max-w-6xl py-16">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="eyebrow-teal">Must Try</span>
                <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
                  SIGNATURE<br />PICKS
                </h2>
              </div>
              <Link href="/menu" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group">
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

      {/* ── ABOUT TEASER ── */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square overflow-hidden rounded-2xl row-span-2">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=700"
                alt="Seven Sides restaurant interior"
                fill className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="25vw"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=500"
                alt="Seven Sides fried chicken tenders"
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
          <div>
            <span className="eyebrow-gold">About Seven Sides</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
              BOLD FLAVORS.<br />
              <span className="text-teal-400">MEMORIES</span><br />
              WORTH SHARING.
            </h2>
            <div className="mt-5 space-y-3 text-base text-dark-100 leading-relaxed">
              <p>Seven Sides started in DHA Phase 5 with one mission — make Lahore&apos;s boldest hot chicken. Louisiana-style, no shortcuts, three heat levels.</p>
              <p>From The Sando to Red Tenders to our loaded waffle fries, we&apos;ve built a menu that hits different every time.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[{ n:'4', l:'Branches' }, { n:'85K+', l:'Followers' }, { n:'3', l:'Heat Levels' }].map(s => (
                <div key={s.l} className="card-dark rounded-2xl p-4 text-center">
                  <p className="font-display text-2xl text-gold-400">{s.n}</p>
                  <p className="text-xs text-dark-100 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about"    className="btn-gold">Our Story <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/branches" className="btn-outline-gold">Find Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANCHES ── */}
      <section style={{ backgroundColor: '#050505', borderTop: '1px solid #1C1C1C' }}>
        <div className="container-px mx-auto max-w-6xl py-16">
          <div className="mb-10 text-center">
            <span className="eyebrow-gold">Find Us</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>
              FOUR LOCATIONS.<br />ONE OBSESSION.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BRANCHES.map((b, i) => (
              <div key={b.id} className="card-dark rounded-2xl p-5 space-y-3 group hover:-translate-y-1 transition-all duration-300">
                {i === 3 && <span className="badge-teal text-xs">New</span>}
                <h3 className="font-display text-xl text-white">{b.name}</h3>
                <div className="space-y-2 text-sm text-dark-100">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold-500" strokeWidth={1.5} />
                    <span className="leading-snug text-xs">{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                    <span className="text-xs">{b.hours}</span>
                  </div>
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-white transition-colors text-xs">
                      <Phone className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                      <span>{b.phone}</span>
                    </a>
                  )}
                  {b.note && <p className="text-teal-400 text-xs">{b.note}</p>}
                </div>
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  Get Directions <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="mb-8 text-center">
          <span className="eyebrow-teal">@sevensides.pk</span>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
            FOLLOW THE FIRE
          </h2>
          <p className="mt-3 text-dark-100 text-sm">85K+ followers. Bold content daily.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 mb-8">
          {[
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400',
            'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400',
            'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400',
            'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400',
            'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400',
            'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400',
          ].map((img, i) => (
            <a key={i} href={SITE.instagram} target="_blank" rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl">
              <Image src={img} alt={`Seven Sides post ${i + 1}`} fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width:640px) 33vw, 16vw" />
              <div className="absolute inset-0 bg-dark-600/0 group-hover:bg-dark-600/50 transition-colors flex items-center justify-center">
                <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
        <div className="text-center">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold-500/50 px-7 py-3 text-sm font-semibold text-gold-400 hover:bg-gold-500/10 transition-all">
            <Instagram className="h-4 w-4" /> Follow @sevensides.pk
          </a>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="container-px mx-auto max-w-6xl pb-16">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center" style={{ background: '#E8A020' }}>
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-dark-600/10" />
          <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-dark-600/10" />
          <div className="relative">
            <Flame className="h-12 w-12 text-dark-600/40 mx-auto mb-4 animate-flame-pulse" strokeWidth={2} />
            <h2 className="font-display text-dark-600" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
              READY TO FEEL<br />THE HEAT?
            </h2>
            <p className="mt-4 text-dark-500 text-sm sm:text-base max-w-sm mx-auto">
              Open daily from 12 PM. Order online, pick up, or dine in at all four Lahore locations.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-dark-600 px-8 py-4 text-sm font-semibold text-white hover:bg-dark-500 transition-all">
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-dark-600/40 px-8 py-4 text-sm font-semibold text-dark-600 hover:bg-dark-600/10 transition-all">
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}