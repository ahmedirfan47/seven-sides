import Link from 'next/link';
import { Instagram, Facebook, MapPin, Clock, Phone, Mail, Flame } from 'lucide-react';
import { SITE, BRANCHES, SS_CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#050505', borderTop: '1px solid #1C1C1C' }}>
      <div className="container-px mx-auto max-w-7xl py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5" aria-label="Seven Sides">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-gold-500 group-hover:bg-gold-400 transition-colors shadow-gold">
                <span className="font-display text-[10px] tracking-[0.15em] text-dark-600 leading-none">SEVEN</span>
                <span className="font-display text-[10px] tracking-[0.15em] text-teal-800 leading-none mt-0.5">SIDES</span>
              </div>
              <div className="leading-none">
                <p className="font-display text-base tracking-widest text-white leading-none">SEVEN</p>
                <p className="font-display text-base tracking-widest text-teal-400 leading-none -mt-0.5">SIDES</p>
              </div>
            </Link>

            <p className="text-sm text-dark-100 leading-relaxed max-w-xs">
              {SITE.tagline}. {SITE.slogan} Lahore&apos;s home of bold, unapologetic hot chicken.
            </p>

            <div className="mt-5 flex gap-2.5">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram @sevensides.pk"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-400 text-dark-100 hover:bg-gold-500 hover:text-dark-600 transition-all">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-400 text-dark-100 hover:bg-teal-500 hover:text-white transition-all">
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-400 text-[10px] font-bold text-dark-100 hover:bg-green-600 hover:text-white transition-all">
                WA
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Menu</h3>
            <ul className="space-y-2.5">
              {SS_CATEGORIES.slice(0, 7).map(c => (
                <li key={c.slug}>
                  <Link href={`/menu?category=${c.slug}`}
                    className="text-sm text-dark-100 hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-xs">{c.emoji}</span> {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Branches</h3>
            <ul className="space-y-4">
              {BRANCHES.map(b => (
                <li key={b.id}>
                  <p className="text-sm font-semibold text-white">{b.name}</p>
                  <p className="text-xs text-gold-400 mt-0.5">{b.hours}</p>
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="text-xs text-dark-100 hover:text-white transition-colors mt-0.5 block">
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
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Contact</h3>
            <div className="space-y-3 text-sm">
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2.5 text-dark-100 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-dark-100 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} /> {SITE.email}
              </a>
              <div className="flex items-start gap-2.5 text-dark-100">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold-500" strokeWidth={1.5} />
                <span className="leading-relaxed text-xs">DHA Ph5 · Cantt · Lake City · Model Town — Lahore</span>
              </div>
            </div>

            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-700/80 border border-green-600/50 px-4 py-2 text-xs font-semibold text-white hover:bg-green-600 transition-all">
              WhatsApp Order
            </a>

            <Link href="/menu" className="btn-gold mt-3 inline-flex text-xs py-2.5 px-5">
              <Flame className="h-3.5 w-3.5" strokeWidth={2} /> Order Online
            </Link>
          </div>

        </div>
      </div>

      <div style={{ borderTop: '1px solid #1C1C1C' }}>
        <div className="container-px mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 py-5 text-xs text-dark-200">
          <p>© {new Date().getFullYear()} Seven Sides. All rights reserved. Prices exclusive of taxes.</p>
          <p>Made with 🔥 in Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}