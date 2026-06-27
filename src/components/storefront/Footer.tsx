import Link from 'next/link';
import { Instagram, Facebook, Flame, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE, BRANCHES, SS_CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-ink-900 border-t border-ink-600">
      <div className="site-px site-max py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full bg-gold-500 group-hover:bg-gold-400 transition-colors shadow-gold-sm">
                <span className="font-display text-[10px] tracking-[0.18em] text-ink-900 leading-none">SEVEN</span>
                <span className="font-display text-[10px] tracking-[0.18em] text-teal-800 leading-none mt-[2px]">SIDES</span>
              </div>
              <div>
                <p className="font-display text-sm tracking-[0.2em] text-white leading-none">SEVEN</p>
                <p className="font-display text-sm tracking-[0.2em] text-teal-400 leading-none -mt-px">SIDES</p>
              </div>
            </Link>
            <p className="text-sm text-ink-200 leading-relaxed mb-5 max-w-[220px]">
              {SITE.tagline}. {SITE.slogan} Lahore&apos;s home of bold hot chicken.
            </p>
            <div className="flex gap-2">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-600 text-ink-200 hover:bg-teal-500/30 hover:text-teal-400 transition-all" aria-label="Instagram">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-600 text-ink-200 hover:bg-teal-500/30 hover:text-teal-400 transition-all" aria-label="Facebook">
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-600 text-[11px] font-black text-ink-200 hover:bg-green-700/50 hover:text-green-400 transition-all" aria-label="WhatsApp">
                WA
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold-500">Menu</h3>
            <ul className="space-y-2.5">
              {SS_CATEGORIES.map(c => (
                <li key={c.slug}>
                  <Link href={`/menu?category=${c.slug}`}
                    className="flex items-center gap-2 text-sm text-ink-200 hover:text-white transition-colors">
                    <span className="text-xs w-4">{c.emoji}</span>{c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold-500">Branches</h3>
            <ul className="space-y-4">
              {BRANCHES.map(b => (
                <li key={b.id}>
                  <p className="text-sm font-semibold text-white">{b.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3 w-3 text-teal-500 shrink-0" strokeWidth={2} />
                    <p className="text-xs text-gold-400">{b.hours}</p>
                  </div>
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 text-xs text-ink-200 hover:text-white transition-colors mt-0.5">
                      <Phone className="h-3 w-3 text-ink-300 shrink-0" strokeWidth={2} />
                      {b.phone}
                    </a>
                  )}
                  {b.note && <p className="text-xs text-teal-400 mt-0.5">{b.note}</p>}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold-500">Contact</h3>
            <div className="space-y-3 text-sm">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2.5 text-ink-200 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5} />{SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-ink-200 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-teal-500" strokeWidth={1.5} />{SITE.email}
              </a>
              <div className="flex items-start gap-2.5 text-ink-200">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-teal-500" strokeWidth={1.5} />
                <span className="text-xs leading-relaxed">DHA Ph5 · Cantt · Lake City · Model Town — Lahore</span>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-green-800/60 border border-green-700/50 px-4 py-2.5 text-xs font-bold text-white hover:bg-green-700/60 transition-all">
                WhatsApp Order
              </a>
              <Link href="/menu" className="flex items-center justify-center gap-2 btn-gold w-full text-xs py-2.5">
                <Flame className="h-3.5 w-3.5" strokeWidth={2} /> Order Online
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-600">
        <div className="site-px site-max flex flex-col sm:flex-row items-center justify-between gap-2 py-5 text-xs text-ink-300">
          <p>© {new Date().getFullYear()} Seven Sides. All rights reserved. Prices exclusive of taxes.</p>
          <p>Made with <Flame className="inline h-3.5 w-3.5 text-heat" strokeWidth={2} /> in Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}