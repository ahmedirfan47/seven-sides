import Link from 'next/link';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Flame } from 'lucide-react';
import { SITE, BRANCHES, SS_CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{ backgroundColor:'#050505', borderTop:'1px solid #1C1C1C' }}>
      <div className="container-px mx-auto max-w-7xl py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5" aria-label="Seven Sides">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 group-hover:bg-gold-400 transition-colors shadow-gold">
                <span className="font-display text-2xl text-dark-600 leading-none">7</span>
              </div>
              <div className="leading-none">
                <p className="font-display text-lg text-white leading-none">SEVEN</p>
                <p className="font-display text-lg text-gold-500 leading-none -mt-0.5">SIDES</p>
              </div>
            </Link>
            <p className="text-sm text-dark-100 leading-relaxed max-w-xs">
              {SITE.tagline}. Bold flavors, next level experiences — Lahore&apos;s hottest chicken spot.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
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

          {/* Menu categories */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Menu</h3>
            <ul className="space-y-2.5">
              {SS_CATEGORIES.slice(0,7).map(c => (
                <li key={c.slug}>
                  <Link href={`/menu?category=${c.slug}`} className="text-sm text-dark-100 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Branches</h3>
            <ul className="space-y-3">
              {BRANCHES.map(b => (
                <li key={b.id}>
                  <p className="text-sm font-semibold text-white">{b.name}</p>
                  <p className="text-xs text-dark-100 mt-0.5">{b.hours}</p>
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
                <Phone className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                <span>{SITE.phone}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-dark-100 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} />
                <span>{SITE.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-dark-100">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold-500" strokeWidth={1.5} />
                <span className="leading-relaxed">DHA Ph5, Cantt, Lake City, Model Town — Lahore</span>
              </div>
            </div>

            <Link href="/menu" className="mt-5 inline-flex btn-gold text-sm py-2.5 px-5">
              <Flame className="h-4 w-4" strokeWidth={2} /> Order Now
            </Link>
          </div>

        </div>
      </div>

      <div style={{ borderTop:'1px solid #1C1C1C' }}>
        <div className="container-px mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 py-5 text-xs text-dark-200">
          <p>© {new Date().getFullYear()} Seven Sides. All rights reserved. Prices exclusive of taxes.</p>
          <p>Made with 🔥 in Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}