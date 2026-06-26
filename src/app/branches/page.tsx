import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { BRANCHES, SITE } from '@/lib/constants';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Branches',
  description: 'Find your nearest Seven Sides — DHA Phase 5, Girja Chowk Cantt, Lake City and Model Town, Lahore.',
};

export default function BranchesPage() {
  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>
      <div className="container-px mx-auto max-w-6xl py-12">

        <div className="mb-12 text-center">
          <span className="eyebrow-gold">Locations</span>
          <h1 className="font-display text-5xl text-white sm:text-6xl">FOUR<br/>BRANCHES</h1>
          <p className="mt-4 text-dark-100 text-sm max-w-md mx-auto">
            Open daily from 12 PM. Come dine in, take away, or get delivery — we serve all of Lahore.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {BRANCHES.map((b, i) => (
            <div key={b.id} className="card-dark rounded-2xl overflow-hidden">
              <div className="relative h-44 bg-dark-400">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-gold-500/30" strokeWidth={1} />
                </div>
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="badge-gold text-xs">{b.name}</span>
                  {i===3 && <span className="badge-teal text-xs">New</span>}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h2 className="font-display text-2xl text-white">{b.name}</h2>
                <div className="space-y-2 text-sm text-dark-100">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold-500" strokeWidth={1.5} />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                    <span>{b.hours}</span>
                  </div>
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                      <Phone className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                      <span>{b.phone}</span>
                    </a>
                  )}
                  {b.note && <p className="text-teal-400 text-xs mt-1 pl-6">{b.note}</p>}
                </div>
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  <MapPin className="h-4 w-4" strokeWidth={2} /> Get Directions <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-12 rounded-2xl border border-dark-300 bg-dark-500 p-8 text-center">
          <p className="font-display text-2xl text-white mb-3">WANT TO ORDER DIRECTLY?</p>
          <p className="text-sm text-dark-100 mb-6">WhatsApp us for quick orders, large groups or catering enquiries.</p>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-4 text-sm font-semibold text-white hover:bg-green-500 transition-all">
            WhatsApp Us Now
          </a>
        </div>

      </div>
    </div>
  );
}