import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import { ArrowRight, Flame, Instagram, MapPin, Clock, Phone } from 'lucide-react';
import { BRANCHES, SITE, SS_CATEGORIES, HEAT_LEVELS, SAUCES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [cats, featured] = await Promise.all([
    db.category.findMany({ where:{isActive:true}, orderBy:{position:'asc'}, take:9 }).catch(()=>[]),
    db.product.findMany({ where:{isFeatured:true,isAvailable:true}, include:{category:true}, take:6 }).catch(()=>[]),
  ]);

  const marqueeText = '🔥 HOME OF RED TENDERS · THE OG SANDO · BOLD FLAVORS · MEMORIES WORTH SHARING · DHA PHASE 5 · CANTT · LAKE CITY · MODEL TOWN · ';

  return (
    <div className="overflow-x-hidden bg-ink-900">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-[68px]">
        {/* BG */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1920"
            alt="Seven Sides Red Tenders" fill priority className="object-cover opacity-20" sizes="100vw"
          />
          <div className="absolute inset-0" style={{background:'linear-gradient(110deg, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.88) 50%, rgba(10,10,10,0.5) 100%)'}} />
        </div>

        <div className="site-px site-max relative z-10 w-full py-20 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-teal-400 mb-8">
              <Flame className="h-3.5 w-3.5 animate-flame" strokeWidth={2} />
              Home of Red Tenders — Lahore
            </div>

            <h1 className="font-display text-white leading-none" style={{fontSize:'clamp(4.5rem,14vw,9rem)',letterSpacing:'-0.01em'}}>
              THE OG<br />
              <span className="text-gold-400">SANDO</span><br />
              &amp; TENDERS
            </h1>

            <p className="mt-6 text-ink-100 text-base sm:text-lg max-w-md leading-relaxed">
              Bold flavors. Three heat levels. Memories worth sharing — at DHA Phase 5, Cantt, Lake City &amp; Model Town.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-gold-lg">Order Online <ArrowRight className="h-4 w-4" /></Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline text-base px-8 py-4">WhatsApp Us</a>
            </div>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {HEAT_LEVELS.map(h => (
                <Link key={h.id} href="/menu?category=tenders"
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold backdrop-blur-sm transition-all hover:scale-105 ${h.border} ${h.bg}`}>
                  <span>{h.emoji}</span><span className={h.color}>{h.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right — food image */}
          <div className="hidden lg:block relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900"
              alt="The Sando — Seven Sides" fill className="object-cover" sizes="420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="badge-gold text-xs mb-2 inline-block">Signature #1</span>
              <p className="font-display text-white text-3xl">THE SANDO</p>
              <p className="text-gold-400 font-bold">{formatPrice(975)}</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-teal-500/50" />
          <div className="h-1.5 w-1.5 rounded-full bg-teal-500/60 animate-bounce-dot" />
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────── */}
      <div className="bg-teal-500 py-3.5 border-y border-teal-400 overflow-hidden">
        <div className="marquee-track">
          <div className="marquee-inner">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center">
                {marqueeText.split(' · ').map((t, j) => (
                  <span key={j} className="inline-flex items-center">
                    <span className="font-display text-white text-sm tracking-[0.18em] whitespace-nowrap">{t}</span>
                    <span className="mx-6 text-teal-300 font-bold">·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SIGNATURE DUET — The Sando + Red Tenders ────── */}
      <section className="grid lg:grid-cols-2 gap-0.5 bg-ink-800">
        {/* The Sando */}
        <Link href="/product/the-sando" className="group relative overflow-hidden block" style={{minHeight:'520px'}}>
          <Image
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900"
            alt="The Sando" fill className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:1024px) 100vw,50vw"
          />
          <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)'}} />
          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
            <span className="badge-gold text-xs mb-3 inline-block">Signature #1</span>
            <h2 className="font-display text-white leading-none" style={{fontSize:'clamp(3rem,7vw,5rem)'}}>THE SANDO</h2>
            <p className="text-white/65 text-sm mt-2 max-w-xs">House Bread · Hot Chicken · Cheese Fondue · Comeback Sauce</p>
            <div className="flex items-center gap-4 mt-5">
              <span className="font-display text-gold-400 text-3xl">{formatPrice(975)}</span>
              <span className="btn-gold text-xs py-2.5 px-5 pointer-events-none">Order Now</span>
            </div>
          </div>
        </Link>

        {/* Red Tenders */}
        <Link href="/product/red-tenders" className="group relative overflow-hidden block" style={{minHeight:'520px'}}>
          <Image
            src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=900"
            alt="Red Tenders" fill className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:1024px) 100vw,50vw"
          />
          <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)'}} />
          <div className="absolute top-5 right-5">
            <span className="badge-heat text-xs flex items-center gap-1 py-1 px-3">
              <Flame className="h-3 w-3" strokeWidth={2.5} /> 3 Heat Levels
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
            <span className="badge-heat text-xs mb-3 inline-block">Signature #2</span>
            <h2 className="font-display text-white leading-none" style={{fontSize:'clamp(3rem,7vw,5rem)'}}>RED TENDERS</h2>
            <p className="text-white/65 text-sm mt-2">5 Pcs · Fries · Comeback Sauce · Your heat level</p>
            <div className="flex items-center gap-4 mt-5">
              <span className="font-display text-gold-400 text-3xl">{formatPrice(1245)}</span>
              <span className="btn-outline text-xs py-2.5 px-5 pointer-events-none">Order Now</span>
            </div>
          </div>
        </Link>
      </section>

      {/* ── MENU CATEGORIES ─────────────────────────────────── */}
      <section className="site-section bg-ink-900">
        <div className="site-px site-max">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow-teal">Seven Sides</span>
              <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,7vw,4.5rem)'}}>EXPLORE EVERY SIDE</h2>
            </div>
            <Link href="/menu" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group">
              Full Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {(cats.length > 0 ? cats : SS_CATEGORIES).map((cat: any, i: number) => {
              const ss = SS_CATEGORIES.find(s => s.slug === cat.slug);
              return (
                <Link key={cat.slug||cat.id} href={`/menu?category=${cat.slug}`}
                  className="card-gold-hover group flex flex-col items-center justify-center gap-3 rounded-2xl p-5 min-h-[110px] text-center">
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{ss?.emoji??'🍽️'}</span>
                  <p className="font-display text-sm text-white tracking-wider">{cat.name||(cat as any).label}</p>
                </Link>
              );
            })}
            <Link href="/menu"
              className="flex flex-col items-center justify-center gap-3 rounded-2xl p-5 min-h-[110px] text-center group hover:-translate-y-1 transition-all duration-300"
              style={{background:'#F0A820'}}>
              <Flame className="h-8 w-8 text-ink-900 group-hover:animate-flame" strokeWidth={2} />
              <p className="font-display text-sm text-ink-900 tracking-wider">Full Menu</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PICKS ───────────────────────────────────── */}
      {(featured as any[]).length > 0 && (
        <section className="site-section bg-ink-800">
          <div className="site-px site-max">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow-gold">Must Try</span>
                <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,7vw,4.5rem)'}}>SIGNATURE PICKS</h2>
              </div>
              <Link href="/menu" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group">
                View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
              {(featured as any[]).map((p: any) => (
                <ProductCard key={p.id} product={{...p, compareAtPrice:p.compareAtPrice??null}} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HEAT LEVELS ─────────────────────────────────────── */}
      <section className="site-section bg-ink-900">
        <div className="site-px site-max">
          <div className="text-center mb-10">
            <span className="eyebrow-teal">The Heat</span>
            <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,7vw,4.5rem)'}}>HOW HOT CAN YOU GO?</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {HEAT_LEVELS.map((h, i) => (
              <Link key={h.id} href="/menu?category=tenders"
                className={`group relative overflow-hidden rounded-3xl border-2 p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-all duration-300 ${h.border} ${h.bg}`}>
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300 animate-flame">{h.emoji}</div>
                <div>
                  <p className={`font-display text-2xl ${h.color}`}>{h.label.toUpperCase()}</p>
                  <p className="text-sm text-ink-200 mt-1">{h.desc}</p>
                </div>
                {i === 2 && (
                  <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-wider text-heat bg-heat/20 border border-heat/30 rounded-full px-2 py-0.5">
                    Challenge
                  </span>
                )}
                <span className={`text-xs font-semibold ${h.color} flex items-center gap-1`}>
                  See Red Tenders <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAUCES ───────────────────────────────────────────── */}
      <section className="site-section bg-ink-800">
        <div className="site-px site-max">
          <div className="text-center mb-10">
            <span className="eyebrow-gold">Secret Weapons</span>
            <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,7vw,4.5rem)'}}>CHOOSE YOUR SAUCE</h2>
            <p className="text-ink-200 text-sm mt-3">Four dipping sauces — Rs. 120 each</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SAUCES.map(s => (
              <div key={s.id} className="card group flex flex-col items-center gap-3 p-6 text-center hover:-translate-y-1 transition-all duration-300">
                <div className={`h-14 w-14 rounded-full ${s.dot} group-hover:scale-110 transition-transform duration-300 ring-4 ring-offset-4 ring-offset-ink-700 ${s.ring}/40 flex items-center justify-center`}>
                  <span className="text-white font-display text-xl">{s.id.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-display text-lg text-white">{s.name.toUpperCase()}</p>
                  <p className="text-xs text-ink-200 mt-1 leading-snug">{s.desc}</p>
                </div>
                <span className="text-gold-400 text-sm font-bold">Rs. 120</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────────── */}
      <section className="site-section bg-ink-900">
        <div className="site-px site-max">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] col-span-1 row-span-2 overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600" alt="Seven Sides interior" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="25vw" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400" alt="Seven Sides tenders" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="15vw" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400" alt="Seven Sides slider" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="15vw" />
              </div>
            </div>
            <div>
              <span className="eyebrow-teal">About Seven Sides</span>
              <h2 className="font-display text-white leading-none" style={{fontSize:'clamp(2.5rem,6vw,4rem)'}}>
                BOLD FLAVORS.<br/><span className="text-teal-400">MEMORIES</span><br/>WORTH SHARING.
              </h2>
              <div className="mt-5 space-y-3 text-ink-200 text-base leading-relaxed">
                <p>Seven Sides started in DHA Phase 5 with one mission — make Lahore&apos;s boldest hot chicken. Louisiana-style, no shortcuts, three heat levels.</p>
                <p>From The Sando to Red Tenders, every item is built to be memorable. Four branches across Lahore, because the city demanded more.</p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[{n:'4',l:'Branches'},{n:'85K+',l:'Followers'},{n:'3',l:'Heat Levels'}].map(s=>(
                  <div key={s.l} className="card rounded-2xl p-4 text-center">
                    <p className="font-display text-2xl text-gold-400">{s.n}</p>
                    <p className="text-xs text-ink-200 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about" className="btn-teal">Our Story <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/branches" className="btn-outline-gold">Find Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANCHES ─────────────────────────────────────────── */}
      <section className="site-section bg-ink-800">
        <div className="site-px site-max">
          <div className="text-center mb-10">
            <span className="eyebrow-teal">Find Us</span>
            <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,7vw,4.5rem)'}}>FOUR LOCATIONS. ONE OBSESSION.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BRANCHES.map((b,i) => (
              <div key={b.id} className="card-hover group rounded-2xl p-5 space-y-3">
                {i===3 && <span className="badge-teal text-[10px]">New</span>}
                <h3 className="font-display text-xl text-white">{b.name}</h3>
                <div className="space-y-2 text-sm text-ink-200">
                  <div className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-teal-500" strokeWidth={1.5}/><span className="text-xs leading-snug">{b.address}</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5}/><span className="text-xs text-gold-400">{b.hours}</span></div>
                  {b.phone && <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-white transition-colors text-xs"><Phone className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5}/>{b.phone}</a>}
                  {b.note && <p className="text-xs text-teal-400">{b.note}</p>}
                </div>
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  Get Directions <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ────────────────────────────────────────── */}
      <section className="site-section bg-ink-900">
        <div className="site-px site-max">
          <div className="text-center mb-8">
            <span className="eyebrow-gold">@sevensides.pk</span>
            <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,7vw,4rem)'}}>FOLLOW THE FIRE</h2>
            <p className="text-ink-200 text-sm mt-2">85K+ followers. Daily drops.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
            {[
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400',
              'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400',
              'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400',
              'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400',
              'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400',
              'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400',
            ].map((src,i) => (
              <a key={i} href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl">
                <Image src={src} alt={`Post ${i+1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:640px) 33vw,16vw" />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/50 transition-colors flex items-center justify-center">
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
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="site-px site-max pb-10 sm:pb-16">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center" style={{background:'#F0A820'}}>
          <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-ink-900/10" />
          <div className="absolute -right-12 -bottom-12 h-56 w-56 rounded-full bg-ink-900/10" />
          <div className="relative">
            <Flame className="h-14 w-14 text-ink-900/30 mx-auto mb-4 animate-flame" strokeWidth={2} />
            <h2 className="font-display text-ink-900" style={{fontSize:'clamp(2.5rem,7vw,4.5rem)'}}>
              READY TO FEEL<br/>THE HEAT?
            </h2>
            <p className="mt-4 text-ink-800 text-sm sm:text-base max-w-sm mx-auto">
              Open daily from 12 PM. Order online, pick up, or dine in at all four Lahore locations.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/menu" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-4 text-sm font-bold text-white hover:bg-ink-800 transition-all">
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900/30 px-8 py-4 text-sm font-bold text-ink-900 hover:bg-ink-900/10 transition-all">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}