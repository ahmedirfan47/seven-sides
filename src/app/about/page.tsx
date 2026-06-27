import Image from 'next/image';
import Link from 'next/link';
import { Flame, Zap, Users, Target, ArrowRight, MapPin, Clock, Phone } from 'lucide-react';
import { BRANCHES } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Seven Sides — Lahore\'s home of Louisiana-style hot chicken. Bold Flavors. Memories Worth Sharing.',
};

const values = [
  {icon:Flame,  title:'Heat First',       body:'Three heat levels by design. No Heat for the crowd, Country Heat for the curious, Screamer for the brave. Heat is never an afterthought.'},
  {icon:Zap,    title:'No Compromise',    body:'House bread. Cheese fondue. Comeback Sauce from scratch. Every component of The Sando is built properly. No shortcuts leave our kitchen.'},
  {icon:Target, title:'One Obsession',    body:'Louisiana-style hot chicken, done right. We are specialists. That focus is the product. That focus is why people come back.'},
  {icon:Users,  title:'Built for Lahore', body:'Bold, loud, unapologetic — just like this city. We make food that matches Lahore\'s energy. Every bite, every branch, every time.'},
];

export default function AboutPage() {
  return (
    <div className="bg-ink-900 min-h-screen pt-[68px]">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1400" alt="Seven Sides" fill className="object-cover opacity-20" sizes="100vw" />
          <div className="absolute inset-0" style={{background:'linear-gradient(to right, #0A0A0A 55%, transparent 100%)'}} />
        </div>
        <div className="site-px site-max relative">
          <span className="eyebrow-gold">Our Story</span>
          <h1 className="font-display text-white leading-none mt-2" style={{fontSize:'clamp(3.5rem,11vw,7.5rem)'}}>
            BOLD FLAVORS.<br/><span className="text-teal-400">MEMORIES</span><br/>WORTH SHARING.
          </h1>
          <p className="mt-6 max-w-lg text-ink-200 text-base leading-relaxed sm:text-lg">
            Seven Sides started in DHA Phase 5 with a single obsession — make Lahore&apos;s boldest hot chicken. Four branches later, the obsession has not changed.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="site-section bg-ink-900">
        <div className="site-px site-max grid gap-12 lg:grid-cols-2 items-start">
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800" alt="Seven Sides restaurant" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width:1024px) 100vw,50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4"><span className="text-xs font-bold tracking-widest text-gold-400">DHA Phase 5 — Original Location</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400" alt="The Sando" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="20vw" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400" alt="Red Tenders" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="20vw" />
              </div>
            </div>
          </div>
          <div className="lg:pt-6">
            <span className="eyebrow-teal">Who We Are</span>
            <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,6vw,4rem)'}}>LAHORE&apos;S HOT CHICKEN HQ</h2>
            <div className="mt-5 space-y-4 text-ink-200 text-base leading-relaxed">
              <p>Seven Sides is Lahore&apos;s home of Louisiana-style hot chicken — bold, crispy, and built to fire you up. We started in DHA Phase 5 and have since grown to four branches across the city because Lahore demanded more.</p>
              <p>Our restaurant space sets the tone — bold statement art, industrial concrete, and an environment as confident as the food. The Sando kicked off a movement. Red Tenders gave people a reason to discover their heat tolerance.</p>
              <p>Bold flavors. Memories worth sharing. That is Seven Sides.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[{n:'2022',l:'Founded'},{n:'4',l:'Branches'},{n:'85K+',l:'Followers'},{n:'3',l:'Heat Levels'}].map(s=>(
                <div key={s.l} className="card rounded-2xl p-4 text-center">
                  <p className="font-display text-2xl text-gold-400">{s.n}</p>
                  <p className="text-xs text-ink-200 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="site-section bg-ink-800">
        <div className="site-px site-max">
          <div className="text-center mb-10">
            <span className="eyebrow-gold">What We Stand For</span>
            <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,6vw,4rem)'}}>THE SEVEN SIDES WAY</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(v => (
              <div key={v.title} className="card-hover rounded-2xl p-6 flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15">
                  <v.icon className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-200 leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className="site-section bg-ink-900">
        <div className="site-px site-max">
          <div className="text-center mb-10">
            <span className="eyebrow-teal">Find Us</span>
            <h2 className="font-display text-white" style={{fontSize:'clamp(2.5rem,6vw,4rem)'}}>FOUR BRANCHES. ONE OBSESSION.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {BRANCHES.map((b,i) => (
              <div key={b.id} className="card-hover rounded-2xl p-6">
                {i===3 && <span className="badge-teal text-[10px] mb-3 inline-block">Newest</span>}
                <h3 className="font-display text-2xl text-white">{b.name}</h3>
                {b.note && <p className="text-xs text-teal-400 mt-1">{b.note}</p>}
                <div className="mt-4 space-y-2 text-sm text-ink-200">
                  <div className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-teal-500" strokeWidth={1.5}/><span>{b.address}</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5}/><span className="text-gold-400 font-medium">{b.hours}</span></div>
                  {b.phone && <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-white transition-colors"><Phone className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5}/>{b.phone}</a>}
                </div>
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  Get Directions <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="site-section bg-ink-800 text-center">
        <div className="site-px site-max">
          <Flame className="h-14 w-14 text-gold-500 mx-auto mb-6 animate-flame" strokeWidth={2} />
          <h2 className="font-display text-white" style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>FEEL THE HEAT FOR YOURSELF</h2>
          <p className="text-ink-200 text-sm mt-4">Four branches across Lahore. Open daily from 12 PM.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/menu" className="btn-gold-lg">Browse Menu <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/branches" className="btn-outline-gold text-base px-8 py-4">Find a Branch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}