import Link from 'next/link';
import { Instagram, Facebook, Flame, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE, BRANCHES, CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#060E0D', borderTop: '1px solid #243838' }}>
      <div className="px-site max-site py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group" aria-label="Seven Sides">
              <div
                className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full group-hover:scale-105 transition-transform"
                style={{ background: '#F0A820' }}
              >
                <span className="font-display leading-none tracking-[0.18em]" style={{ fontSize: '9px', color: '#fff' }}>SEVEN</span>
                <span className="font-display leading-none tracking-[0.18em]" style={{ fontSize: '9px', color: '#1A6B68', marginTop: '2px' }}>SIDES</span>
              </div>
              <div className="leading-none">
                <p className="font-display text-sm tracking-[0.2em] text-white group-hover:text-amber-400 transition-colors">SEVEN</p>
                <p className="font-display text-sm tracking-[0.2em] text-teal-400 group-hover:text-teal-300 transition-colors">SIDES</p>
              </div>
            </Link>

            <p className="text-sm text-ss-200 leading-relaxed mb-5 max-w-[220px]">
              {SITE.tagline}. {SITE.slogan}
              {' '}Lahore&apos;s home of bold Louisiana-style hot chicken.
            </p>

            <div className="flex gap-2.5">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ss-500 text-ss-200 hover:border-teal-500/50 hover:text-teal-400 transition-all"
                aria-label="Instagram">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ss-500 text-ss-200 hover:border-teal-500/50 hover:text-teal-400 transition-all"
                aria-label="Facebook">
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ss-500 text-[11px] font-black text-ss-200 hover:border-green-600/50 hover:text-green-400 transition-all"
                aria-label="WhatsApp">
                WA
              </a>
            </div>
          </div>

          {/* MENU CATEGORIES */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Menu</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map(c => (
                <li key={c.slug}>
                  <Link href={`/menu?category=${c.slug}`}
                    className="flex items-center gap-2 text-sm text-ss-200 hover:text-white transition-colors">
                    <span className="text-xs w-4 text-center">{c.emoji}</span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BRANCHES */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Branches</h3>
            <ul className="space-y-4">
              {BRANCHES.map(b => (
                <li key={b.id}>
                  <p className="text-sm font-semibold text-white">{b.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3 w-3 text-teal-500 shrink-0" strokeWidth={2} />
                    <p className="text-xs text-amber-400 font-medium">{b.hours}</p>
                  </div>
                  {b.phone && (
                    <a href={`tel:${b.phone}`}
                      className="flex items-center gap-1.5 text-xs text-ss-200 hover:text-white transition-colors mt-0.5">
                      <Phone className="h-3 w-3 text-ss-300 shrink-0" strokeWidth={2} />
                      {b.phone}
                    </a>
                  )}
                  {b.note && <p className="text-xs text-teal-400 mt-0.5">{b.note}</p>}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Contact</h3>
            <div className="space-y-3 text-sm mb-5">
              <a href={`tel:${SITE.phone}`}
                className="flex items-center gap-2.5 text-ss-200 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5} />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 text-ss-200 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5} />
                {SITE.email}
              </a>
              <div className="flex items-start gap-2.5 text-ss-200">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-teal-500" strokeWidth={1.5} />
                <span className="text-xs leading-relaxed">
                  DHA Ph5 · Cantt · Lake City · Model Town — Lahore
                </span>
              </div>
            </div>

            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-green-700/50 px-4 py-2.5 text-xs font-bold text-white hover:bg-green-800/40 transition-all mb-2"
              style={{ backgroundColor: 'rgba(21,128,61,0.25)' }}>
              WhatsApp Order
            </a>
            <Link href="/menu" className="btn-amber w-full justify-center text-xs py-2.5">
              <Flame className="h-3.5 w-3.5" strokeWidth={2} /> Order Online
            </Link>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #243838' }}>
        <div className="px-site max-site flex flex-col sm:flex-row items-center justify-between gap-2 py-5 text-xs text-ss-300">
          <p>© {new Date().getFullYear()} Seven Sides. All rights reserved. Prices exclusive of taxes.</p>
          <p>Made with <Flame className="inline h-3.5 w-3.5 text-fire align-[-3px]" strokeWidth={2} /> in Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}