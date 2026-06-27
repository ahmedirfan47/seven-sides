import Image from 'next/image';
import Link from 'next/link';
import { Flame, Zap, Users, Target, ArrowRight, MapPin, Clock, Phone } from 'lucide-react';
import { BRANCHES, SITE } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'About',
  description: 'Seven Sides — Lahore\'s home of bold Louisiana-style hot chicken. Our story, our obsession, why The Sando hits different.',
};

const values = [
  { icon: Flame,  title: 'Heat First',       text: 'Three heat levels by design. No Heat for the crowd, Country Heat for the curious, Screamer for the brave. Heat is a choice, never an afterthought.' },
  { icon: Zap,    title: 'No Compromise',    text: 'House bread. Cheese fondue. Comeback Sauce from scratch. Every component of The Sando is built properly. No shortcuts leave this kitchen.' },
  { icon: Target, title: 'One Obsession',    text: 'Louisiana-style hot chicken, done right. We are not a full-service restaurant. We are specialists. That focus is the product.' },
  { icon: Users,  title: 'Built for Lahore', text: 'Bold, loud, unapologetic — just like this city. We make food that matches Lahore\'s energy. Every bite, every branch, every time.' },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', paddingTop: '5rem' }}>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1400"
            alt="Seven Sides Red Tenders"
            fill className="object-cover opacity-20" sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0A0A0A 55%, transparent 100%)' }} />
        </div>
        <div className="container-px relative mx-auto max-w-6xl">
          <span className="eyebrow-gold">Our Story</span>
          <h1 className="font-display text-white leading-none mt-2" style={{ fontSize: 'clamp(3.5rem, 11vw, 7.5rem)' }}>
            BOLD<br />FLAVORS.<br />
            <span className="text-teal-400">MEMORIES</span><br />
            WORTH<br />SHARING.
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/60 leading-relaxed sm:text-lg">
            Seven Sides started in DHA Phase 5 with a single obsession — make Lahore&apos;s boldest hot chicken. Four branches later, the obsession has not changed.
          </p>
        </div>
      </section>

      {/* Story + images */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800"
                alt="Seven Sides restaurant interior — bold art, industrial aesthetic"
                fill className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-600/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                  DHA Phase 5 — Original Location
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500"
                  alt="The Sando — Seven Sides signature"
                  fill className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500"
                  alt="Red Tenders — Seven Sides hot chicken"
                  fill className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
              </div>
            </div>
          </div>

          <div className="lg:pt-6">
            <span className="eyebrow-teal">Who We Are</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
              LAHORE&apos;S<br />HOT CHICKEN HQ
            </h2>
            <div className="mt-5 space-y-4 text-base text-dark-100 leading-relaxed">
              <p>
                Seven Sides is Lahore&apos;s home of Louisiana-style hot chicken — bold, crispy, and built to fire you up. We started in DHA Phase 5 and have since grown to four branches across the city because Lahore demanded more.
              </p>
              <p>
                Our restaurant interior sets the tone — bold statement art, industrial concrete, and a space that feels as confident as the food. The Sando kicked off a movement. Red Tenders gave people a reason to discover their heat tolerance. Four sauces let you make every order yours.
              </p>
              <p>
                Bold flavors. Memories worth sharing. That is Seven Sides.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { n: '2022',  l: 'Founded'    },
                { n: '4',     l: 'Branches'   },
                { n: '85K+',  l: 'Followers'  },
                { n: '3',     l: 'Heat Levels'},
              ].map(s => (
                <div key={s.l} className="card-dark rounded-2xl p-4 text-center">
                  <p className="font-display text-2xl text-gold-400">{s.n}</p>
                  <p className="text-xs text-dark-100 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ backgroundColor: '#050505', borderTop: '1px solid #1C1C1C' }} className="py-16">
        <div className="container-px mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="eyebrow-gold">What We Stand For</span>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
              THE SEVEN SIDES WAY
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(v => (
              <div key={v.title} className="card-dark rounded-2xl p-6 flex gap-5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/20">
                  <v.icon className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-dark-100 leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="mb-10 text-center">
          <span className="eyebrow-teal">Find Us</span>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }}>
            FOUR BRANCHES.<br />ONE OBSESSION.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {BRANCHES.map((b, i) => (
            <div key={b.id} className="card-dark rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300">
              {i === 3 && <span className="badge-teal text-xs mb-3 inline-block">Newest</span>}
              <h3 className="font-display text-2xl text-white">{b.name}</h3>
              {b.note && <p className="text-xs text-teal-400 mt-1">{b.note}</p>}
              <div className="mt-4 space-y-2 text-sm text-dark-100">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold-500" strokeWidth={1.5} />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                  <span className="text-gold-400 font-medium">{b.hours}</span>
                </div>
                {b.phone && (
                  <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                    <span>{b.phone}</span>
                  </a>
                )}
              </div>
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                Get Directions <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#050505', borderTop: '1px solid #1C1C1C' }} className="py-16 text-center">
        <div className="container-px mx-auto max-w-2xl">
          <Flame className="h-12 w-12 text-gold-500 mx-auto mb-6 animate-flame-pulse" strokeWidth={2} />
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
            FEEL THE HEAT<br />FOR YOURSELF
          </h2>
          <p className="mt-4 text-dark-100 text-sm">
            Four branches across Lahore. Open daily from 12 PM.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/menu"     className="btn-gold text-base px-8 py-4">Browse Menu <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/branches" className="btn-outline-gold text-base px-8 py-4">Find a Branch</Link>
          </div>
        </div>
      </section>

    </div>
  );
}