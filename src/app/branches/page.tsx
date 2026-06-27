import Link from 'next/link';
import { MapPin, Clock, Phone, ArrowRight, Flame } from 'lucide-react';
import { BRANCHES, SITE } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Branches',
  description: 'Find your nearest Seven Sides — DHA Phase 5, Girja Chowk Cantt, Lake City and Model Town.',
};

export default function BranchesPage() {
  return (
    <div className="bg-ink-900 min-h-screen pt-[68px]">

      {/* Header */}
      <div className="bg-ink-800 border-b border-ink-600 py-16 sm:py-20">
        <div className="site-px site-max">
          <span className="eyebrow-gold">Locations</span>
          <h1 className="font-display text-white leading-none" style={{fontSize:'clamp(3rem,10vw,6rem)'}}>FOUR BRANCHES</h1>
          <p className="text-ink-200 text-base mt-4 max-w-lg">Open daily from 12 PM. Dine in, take away, or delivery across Lahore.</p>
        </div>
      </div>

      {/* Cards */}
      <section className="site-section bg-ink-900">
        <div className="site-px site-max grid gap-6 sm:grid-cols-2">
          {BRANCHES.map((b,i) => (
            <div key={b.id} className="card-hover group rounded-3xl overflow-hidden">
              <div className="h-1 w-full bg-teal-500" />
              <div className="p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {i===3 && <span className="badge-teal text-[10px]">New</span>}
                      {b.note && <span className="badge-gold text-[10px]">{b.note}</span>}
                    </div>
                    <h2 className="font-display text-3xl text-white">{b.name}</h2>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors">
                    <Flame className="h-6 w-6 text-teal-400 group-hover:animate-flame" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-600">
                      <MapPin className="h-4 w-4 text-teal-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-ink-300 mb-0.5">Address</p>
                      <p className="text-sm text-white/80 leading-snug">{b.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-600">
                      <Clock className="h-4 w-4 text-teal-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-ink-300 mb-0.5">Hours</p>
                      <p className="text-sm font-bold text-gold-400">{b.hours}</p>
                    </div>
                  </div>
                  {b.phone && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink-600">
                        <Phone className="h-4 w-4 text-teal-400" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-300 mb-0.5">Phone</p>
                        <a href={`tel:${b.phone}`} className="text-sm text-white/80 hover:text-white transition-colors">{b.phone}</a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs py-2.5 px-5">
                    Get Directions <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  {b.phone && <a href={`tel:${b.phone}`} className="btn-outline-teal text-xs py-2.5 px-5">Call Branch</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp */}
      <section className="site-section bg-ink-800 text-center">
        <div className="site-px site-max max-w-2xl mx-auto">
          <h2 className="font-display text-white" style={{fontSize:'clamp(2rem,5vw,3rem)'}}>WANT TO ORDER DIRECTLY?</h2>
          <p className="text-ink-200 text-sm mt-3 max-w-md mx-auto">WhatsApp us for quick orders, large groups, or catering. We respond fast.</p>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-800/60 border border-green-700/50 px-8 py-4 text-sm font-bold text-white hover:bg-green-700/60 transition-all">
            WhatsApp Us Now <ArrowRight className="h-4 w-4" />
          </a>
          <div className="mt-10 border-t border-ink-600 pt-8">
            <Link href="/menu" className="btn-gold-lg">Browse Menu <Flame className="h-4 w-4" strokeWidth={2} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}