import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import ProductCard from '@/components/storefront/ProductCard';
import { MapPin, Clock, Phone, ArrowRight, Flame, Instagram } from 'lucide-react';
import { BRANCHES, SITE, SS_CATEGORIES, HEAT_LEVELS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    db.category.findMany({ where:{isActive:true}, orderBy:{position:'asc'}, take:7 }).catch(()=>[]),
    db.product.findMany({ where:{isFeatured:true,isAvailable:true}, include:{category:true}, take:8 }).catch(()=>[]),
  ]);

  return (
    <div className="overflow-x-hidden" style={{ backgroundColor:'#0A0A0A' }}>

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1920"
            alt="Seven Sides chicken" fill priority className="object-cover opacity-30"
            sizes="100vw" />
          <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.8) 80%, #0A0A0A 100%)' }} />
        </div>

        <div className="container-px relative z-10 mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 mb-8 backdrop-blur-sm">
            <Flame className="h-3 w-3 animate-flame-pulse" strokeWidth={2} />
            Lahore&apos;s Home of Hot Chicken
          </div>

          <h1 className="font-display text-6xl leading-none text-white sm:text-7xl lg:text-9xl" style={{ letterSpacing:'0.02em' }}>
            HOME OF<br />
            <span className="text-gold-500">RED</span><br />
            TENDERS
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Bold flavors. Next level heat. DHA Phase 5, Cantt, Lake City and Model Town — Lahore.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/menu" className="btn-gold text-base py-4 px-8">
              Order Online <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-white text-base py-4 px-8">
              WhatsApp Order
            </a>
          </div>

          {/* Heat level pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {HEAT_LEVELS.map(h => (
              <div key={h.id} className="flex items-center gap-2 rounded-full border border-dark-300 bg-dark-500/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                <span>{h.emoji}</span> {h.label}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-8 w-px bg-gradient-to-b from-gold-500/0 to-gold-500/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-gold-500/60 animate-bounce" />
        </div>
      </section>

      {/* HEAT LEVELS */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="mb-10 text-center">
          <span className="eyebrow-gold">Choose Your Weapon</span>
          <h2 className="font-display text-4xl text-white sm:text-5xl">HOW HOT<br/>CAN YOU GO?</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {HEAT_LEVELS.map((h, i) => (
            <Link key={h.id} href={`/menu?category=tenders`}
              className={`group card-dark rounded-2xl p-6 text-center transition-all hover:-translate-y-1 ${h.bg} border`}
              style={{ borderColor: i===2?'#D63B2E33':i===1?'#F5A80033':'#3A3A3A' }}>
              <div className="text-5xl mb-4">{h.emoji}</div>
              <h3 className={`font-display text-2xl ${h.color}`}>{h.label}</h3>
              <p className="text-sm text-dark-100 mt-2">{h.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-dark-100 group-hover:text-white transition-colors">
                See menu <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16" style={{ backgroundColor:'#050505' }}>
        <div className="container-px mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow-teal">The Menu</span>
              <h2 className="font-display text-4xl text-white sm:text-5xl">EXPLORE<br/>EVERY SIDE</h2>
            </div>
            <Link href="/menu" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors group">
              Full Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {(categories.length > 0 ? categories : SS_CATEGORIES).map((cat: any, i: number) => (
              <Link key={cat.slug || cat.id}
                href={`/menu?category=${cat.slug}`}
                style={{ animationDelay:`${i*50}ms` }}
                className="group card-dark flex flex-col items-center justify-center rounded-2xl p-5 min-h-[120px] text-center hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl mb-2">{(cat as any).emoji || '🍗'}</span>
                <p className="font-display text-base text-white leading-tight">{cat.name || (cat as any).label}</p>
              </Link>
            ))}
            <Link href="/menu"
              className="group flex flex-col items-center justify-center rounded-2xl p-5 min-h-[120px] text-center transition-all duration-300 hover:-translate-y-1"
              style={{ background:'#E8A020', border:'none' }}>
              <Flame className="h-8 w-8 text-dark-600 mb-2 group-hover:animate-flame-pulse" strokeWidth={2} />
              <p className="font-display text-base text-dark-600 leading-tight">Full Menu</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED / SIGNATURES */}
      {(featured as any[]).length > 0 && (
        <section className="container-px mx-auto max-w-6xl py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow-gold">Must Try</span>
              <h2 className="font-display text-4xl text-white sm:text-5xl">SIGNATURE<br/>PICKS</h2>
            </div>
            <Link href="/menu" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors group">
              View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {(featured as any[]).map((p: any) => (
              <ProductCard key={p.id} product={{ ...p, compareAtPrice: p.compareAtPrice ?? null }} />
            ))}
          </div>
        </section>
      )}

      {/* ABOUT TEASER */}
      <section className="py-16" style={{ backgroundColor:'#050505' }}>
        <div className="container-px mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative h-[380px] sm:h-[460px]">
              <div className="absolute left-0 top-0 h-60 w-[58%] overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=700"
                  alt="Seven Sides Red Tenders" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="35vw" />
              </div>
              <div className="absolute bottom-0 right-0 h-60 w-[58%] overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1585325701956-60dd9c8399f0?q=80&w=700"
                  alt="Seven Sides burger" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="35vw" />
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full bg-gold-500 shadow-gold">
                <span className="font-display text-4xl text-dark-600 leading-none">7</span>
              </div>
            </div>
            <div>
              <span className="eyebrow-teal">About Seven Sides</span>
              <h2 className="font-display text-4xl text-white sm:text-5xl">BOLD FLAVORS.<br/>NEXT LEVEL.</h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-dark-100">
                <p>Seven Sides is Lahore&apos;s home of bold, unapologetic chicken. Louisiana-style hot chicken done right — crispy, juicy, and built to fire you up.</p>
                <p>From The Sando to Red Tenders to our loaded waffle fries, everything is crafted to hit different. Three heat levels, zero compromises.</p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[{ n:'4', l:'Branches' }, { n:'3', l:'Heat Levels' }, { n:'85K+', l:'Followers' }].map(s => (
                  <div key={s.l} className="rounded-2xl border border-dark-300 bg-dark-500 p-4 text-center">
                    <p className="font-display text-2xl text-gold-400">{s.n}</p>
                    <p className="text-xs text-dark-100 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/about" className="btn-gold">Our Story <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/branches" className="btn-outline-gold">Find a Branch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="mb-10 text-center">
          <span className="eyebrow-gold">Find Us</span>
          <h2 className="font-display text-4xl text-white sm:text-5xl">FOUR LOCATIONS.<br/>ONE OBSESSION.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRANCHES.map((b, i) => (
            <div key={b.id} className="card-dark rounded-2xl p-5 space-y-3">
              {i === 3 && <span className="badge-teal text-xs">New</span>}
              <h3 className="font-display text-xl text-white">{b.name}</h3>
              <div className="space-y-2 text-sm text-dark-100">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold-500" strokeWidth={1.5} />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                  <span>{b.hours}</span>
                </div>
                {b.phone && (
                  <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
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
      </section>

      {/* INSTAGRAM */}
      <section className="py-16" style={{ backgroundColor:'#050505' }}>
        <div className="container-px mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="eyebrow-teal">Instagram</span>
            <h2 className="font-display text-4xl text-white sm:text-5xl">FOLLOW THE FIRE</h2>
            <p className="mt-3 text-dark-100 text-sm"><strong className="text-gold-400">@sevensides.pk</strong> · 85.5K followers</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 mb-8">
            {[
              'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400',
              'https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?q=80&w=400',
              'https://images.unsplash.com/photo-1585325701956-60dd9c8399f0?q=80&w=400',
              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400',
              'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400',
              'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400',
            ].map((img,i) => (
              <a key={i} href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl">
                <Image src={img} alt={`Seven Sides post ${i+1}`} fill
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
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gold-500 p-10 sm:p-14 text-center">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-dark-600/10" />
          <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-dark-600/10" />
          <div className="relative">
            <Flame className="h-12 w-12 text-dark-600/50 mx-auto mb-4 animate-flame-pulse" strokeWidth={2} />
            <h2 className="font-display text-4xl text-dark-600 sm:text-5xl">READY TO FEEL<br/>THE HEAT?</h2>
            <p className="mt-4 text-dark-500 text-sm sm:text-base max-w-sm mx-auto">Order online, pick up, or come dine in. Open daily from 12 PM.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/menu" className="inline-flex items-center gap-2 rounded-full bg-dark-600 px-8 py-4 text-sm font-semibold text-white hover:bg-dark-500 transition-all">
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/branches" className="inline-flex items-center gap-2 rounded-full border-2 border-dark-600/40 px-8 py-4 text-sm font-semibold text-dark-600 hover:bg-dark-600/10 transition-all">
                Find Branch
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}