import Link from 'next/link';
import { MapPin, Clock, Phone, ArrowRight, Flame } from 'lucide-react';
import { BRANCHES, SITE } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Branches',
  description: 'Find your nearest Seven Sides — DHA Phase 5, Girja Chowk Cantt, Lake City and Model Town, Lahore.',
};

export default function BranchesPage() {
  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', paddingTop: '5rem' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(to bottom, #141414, #0A0A0A)', borderBottom: '1px solid #1C1C1C' }} className="py-16 sm:py-20">
        <div className="container-px mx-auto max-w-6xl">
          <span className="eyebrow-gold">Locations</span>
          <h1 className="font-display text-white leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}>
            FOUR<br />BRANCHES
          </h1>
          <p className="mt-4 text-dark-100 text-base max-w-lg leading-relaxed">
            Open daily from 12 PM. Come dine in, take away, or get delivery — we serve all of Lahore.
          </p>
        </div>
      </div>

      {/* Branch cards */}
      <section className="container-px mx-auto max-w-6xl py-14">
        <div className="grid gap-6 sm:grid-cols-2">
          {BRANCHES.map((b, i) => (
            <div key={b.id} className="group card-dark rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gold-500" />

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {i === 3 && <span className="badge-teal text-xs">New</span>}
                      {b.note && <span className="badge-gold text-xs">{b.note}</span>}
                    </div>
                    <h2 className="font-display text-3xl text-white">{b.name}</h2>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20 group-hover:bg-gold-500/20 transition-colors">
                    <Flame className="h-6 w-6 text-gold-500 group-hover:animate-flame-pulse" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dark-400">
                      <MapPin className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-dark-200 mb-0.5">Address</p>
                      <p className="text-sm text-white/80 leading-snug">{b.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dark-400">
                      <Clock className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-dark-200 mb-0.5">Hours</p>
                      <p className="text-sm font-semibold text-gold-400">{b.hours}</p>
                    </div>
                  </div>

                  {b.phone && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dark-400">
                        <Phone className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-dark-200 mb-0.5">Phone</p>
                        <a href={`tel:${b.phone}`} className="text-sm text-white/80 hover:text-white transition-colors">
                          {b.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-gold text-xs py-2.5 px-5">
                    Get Directions <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  {b.phone && (
                    <a href={`tel:${b.phone}`}
                      className="btn-outline-gold text-xs py-2.5 px-5">
                      Call Branch
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section style={{ backgroundColor: '#050505', borderTop: '1px solid #1C1C1C' }} className="py-14">
        <div className="container-px mx-auto max-w-3xl text-center">
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>
            WANT TO ORDER DIRECTLY?
          </h2>
          <p className="mt-3 text-dark-100 text-sm leading-relaxed max-w-md mx-auto">
            WhatsApp us for quick orders, large groups, or catering enquiries. We&apos;re fast.
          </p>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-700 border border-green-600 px-8 py-4 text-sm font-semibold text-white hover:bg-green-600 transition-all">
            WhatsApp Us Now <ArrowRight className="h-4 w-4" />
          </a>

          <div className="mt-10 border-t border-dark-300 pt-8">
            <p className="text-xs text-dark-200 mb-4">Or order online for pickup or delivery</p>
            <Link href="/menu" className="btn-gold px-8 py-4 text-base">
              Browse Menu <Flame className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}