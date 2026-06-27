import Image from 'next/image';
import Link from 'next/link';
import { Flame, Zap, Users, Target, ArrowRight, MapPin, Clock, Phone } from 'lucide-react';
import { BRANCHES } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'About',
  description: "Seven Sides — Lahore's home of bold Louisiana-style hot chicken. Bold Flavors. Memories Worth Sharing.",
};

const values = [
  {
    icon:  Flame,
    title: 'Heat First',
    body:  'Three heat levels by design. No Heat for the crowd, Country Heat for the curious, Screamer for the brave. Heat is never an afterthought.',
  },
  {
    icon:  Zap,
    title: 'No Compromise',
    body:  'House bread. Cheese fondue. Comeback Sauce from scratch. Every component of The Sando is built properly. No shortcuts leave the kitchen.',
  },
  {
    icon:  Target,
    title: 'One Obsession',
    body:  "Louisiana-style hot chicken, done right. We're specialists. That focus is the product. That focus is why people come back.",
  },
  {
    icon:  Users,
    title: 'Built for Lahore',
    body:  "Bold, loud, unapologetic — just like this city. We make food that matches Lahore's energy. Every bite, every branch, every time.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#0A1614', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1600"
            alt="Seven Sides Red Tenders"
            fill className="object-cover opacity-15" sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0A1614 55%, transparent 100%)' }} />
        </div>
        <div className="px-site max-site relative">
          <span className="eyebrow-amber">Our Story</span>
          <h1
            className="font-display text-white leading-none mt-2"
            style={{ fontSize: 'clamp(3.5rem,11vw,8rem)' }}
          >
            BOLD<br />FLAVORS.<br />
            <span style={{ color: '#3BB5B0' }}>MEMORIES</span><br />
            WORTH<br />SHARING.
          </h1>
          <p className="mt-6 max-w-lg text-ss-100 text-base leading-relaxed sm:text-lg">
            Seven Sides started in DHA Phase 5 with one obsession — make
            Lahore&apos;s boldest hot chicken. Four branches later, the obsession
            has not changed.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-section" style={{ backgroundColor: '#0A1614' }}>
        <div className="px-site max-site grid gap-12 lg:grid-cols-2 items-start">
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800"
                alt="Seven Sides restaurant — bold interior, art mural"
                fill className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,20,0.65) 0%, transparent 60%)' }} />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold tracking-widest text-amber-400">
                  DHA Phase 5 — Original Location
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500" alt="The Sando" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="20vw" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500" alt="Red Tenders" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="20vw" />
              </div>
            </div>
          </div>

          <div className="lg:pt-6">
            <span className="eyebrow-teal">Who We Are</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
              LAHORE&apos;S<br />HOT CHICKEN HQ
            </h2>
            <div className="mt-5 space-y-4 text-ss-100 text-base leading-relaxed">
              <p>
                Seven Sides is Lahore&apos;s home of Louisiana-style hot chicken —
                bold, crispy, and built to fire you up. We started in DHA Phase 5
                and expanded to four branches because Lahore demanded more.
              </p>
              <p>
                Our restaurant space — bold statement art, industrial concrete, a
                space as confident as the food — sets the tone before you take your
                first bite. The Sando kicked off a movement. Red Tenders gave
                people a reason to discover their heat tolerance.
              </p>
              <p>
                Bold flavors. Memories worth sharing. That is Seven Sides.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[{ n: '2022', l: 'Founded' }, { n: '4', l: 'Branches' }, { n: '86K+', l: 'Followers' }, { n: '3', l: 'Heat Levels' }].map(s => (
                <div key={s.l} className="rounded-2xl border border-ss-500 p-4 text-center" style={{ backgroundColor: '#132524' }}>
                  <p className="font-display text-2xl text-amber-400">{s.n}</p>
                  <p className="text-xs text-ss-200 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section" style={{ backgroundColor: '#0E1F1D', borderTop: '1px solid #243838' }}>
        <div className="px-site max-site">
          <div className="text-center mb-10">
            <span className="eyebrow-amber">What We Stand For</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
              THE SEVEN SIDES WAY
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(v => (
              <div
                key={v.title}
                className="flex gap-5 rounded-2xl border border-ss-500 p-6 hover:-translate-y-1 transition-all duration-300 hover:border-ss-400"
                style={{ backgroundColor: '#132524' }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: 'rgba(240,168,32,0.12)' }}>
                  <v.icon className="h-6 w-6 text-amber-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-ss-200 leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="py-section" style={{ backgroundColor: '#0A1614', borderTop: '1px solid #243838' }}>
        <div className="px-site max-site">
          <div className="text-center mb-10">
            <span className="eyebrow-teal">Find Us</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
              FOUR BRANCHES.<br />ONE OBSESSION.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {BRANCHES.map((b, i) => (
              <div
                key={b.id}
                className="rounded-2xl border border-ss-500 p-6 hover:-translate-y-1 transition-all duration-300 hover:border-ss-400"
                style={{ backgroundColor: '#132524' }}
              >
                {i === 3 && <span className="badge-teal text-[10px] mb-3 inline-block">Newest</span>}
                <h3 className="font-display text-2xl text-white">{b.name}</h3>
                {b.note && <p className="text-xs text-teal-400 mt-1">{b.note}</p>}
                <div className="mt-4 space-y-2 text-sm text-ss-200">
                  <div className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-teal-500" strokeWidth={1.5} /><span>{b.address}</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5} /><span className="text-amber-400 font-medium">{b.hours}</span></div>
                  {b.phone && <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-white transition-colors"><Phone className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5} />{b.phone}</a>}
                </div>
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                  Get Directions <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section text-center" style={{ backgroundColor: '#0E1F1D', borderTop: '1px solid #243838' }}>
        <div className="px-site max-site">
          <Flame className="h-14 w-14 mx-auto mb-6 animate-fire" style={{ color: '#F0A820' }} strokeWidth={2} />
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            FEEL THE HEAT FOR YOURSELF
          </h2>
          <p className="text-ss-200 text-sm mt-4">Four branches across Lahore. Open daily from 12 PM.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/menu" className="btn-amber-lg">Browse Menu <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/branches" className="btn-outline-amber text-base px-8 py-4">Find a Branch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}