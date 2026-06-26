import Image from 'next/image';
import Link from 'next/link';
import { Flame, Zap, Users, Star, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Seven Sides — Lahore\'s home of bold Louisiana-style hot chicken. Our story, values, and what makes our food hit different.',
};

const values = [
  { icon: Flame, title: 'Heat First', text: 'Every item starts with heat as a design choice, not an afterthought. We respect the fire.' },
  { icon: Zap,   title: 'No Compromise', text: 'Fresh chicken, proper technique, real ingredients. No shortcuts, no freezer shortcuts.' },
  { icon: Star,  title: 'The Sando Standard', text: 'The Sando is our north star — if it doesn\'t hit like The Sando, it doesn\'t leave the kitchen.' },
  { icon: Users, title: 'Built for Lahore', text: 'Bold, loud, unapologetic — just like Lahore. We make food that matches the city\'s energy.' },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>

      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1400"
            alt="Seven Sides Red Tenders" fill className="object-cover opacity-20" sizes="100vw" />
          <div className="absolute inset-0" style={{ background:'linear-gradient(to right, #0A0A0A 40%, transparent 100%)' }} />
        </div>
        <div className="container-px relative mx-auto max-w-6xl">
          <span className="eyebrow-gold">Our Story</span>
          <h1 className="font-display text-6xl text-white sm:text-7xl lg:text-8xl mt-2 leading-none">
            BOLD<br />FLAVORS.<br /><span className="text-gold-500">NEXT LEVEL.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-dark-100 leading-relaxed sm:text-lg">
            Seven Sides started with a single obsession — making Lahore&apos;s boldest hot chicken. We&apos;re not here to play it safe.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative h-[420px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1585325701956-60dd9c8399f0?q=80&w=900"
                alt="Seven Sides restaurant" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="absolute -bottom-4 -right-4 h-36 w-36 rounded-2xl overflow-hidden border-4 border-dark-600">
              <Image src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=300"
                alt="Seven Sides burger" fill className="object-cover" sizes="144px" />
            </div>
          </div>
          <div>
            <span className="eyebrow-teal">Who We Are</span>
            <h2 className="font-display text-4xl text-white sm:text-5xl">LAHORE&apos;S<br/>HOT CHICKEN<br/>HQ</h2>
            <div className="mt-5 space-y-4 text-base text-dark-100 leading-relaxed">
              <p>Seven Sides is Lahore&apos;s home of Louisiana-style hot chicken — bold, crispy, and built to fire you up. We started in DHA Phase 5 and have since expanded to four branches across the city.</p>
              <p>Our Red Tenders put Lahore on the hot chicken map. From The Sando to our loaded waffle fries, every item is crafted with one mission: make food that hits different.</p>
              <p>Three heat levels. Comeback sauce. That&apos;s Seven Sides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ backgroundColor:'#050505' }}>
        <div className="container-px mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="eyebrow-gold">What We Stand For</span>
            <h2 className="font-display text-4xl text-white sm:text-5xl">THE SEVEN SIDES<br/>WAY</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(v => (
              <div key={v.title} className="card-dark rounded-2xl p-6 flex gap-5">
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

      {/* CTA */}
      <section className="container-px mx-auto max-w-6xl py-16 text-center">
        <h2 className="font-display text-4xl text-white sm:text-5xl">FEEL THE FIRE<br/>FOR YOURSELF</h2>
        <p className="mt-4 text-dark-100 text-sm">Four branches across Lahore. Open daily from 12 PM.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/menu"     className="btn-gold text-base px-8 py-4">Browse Menu <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/branches" className="btn-outline-gold text-base px-8 py-4">Find Us</Link>
        </div>
      </section>

    </div>
  );
}