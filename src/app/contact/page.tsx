import { Mail, Phone, MapPin, MessageSquare, Flame, Instagram } from 'lucide-react';
import ContactForm from './ContactForm';
import { SITE, BRANCHES } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Contact',
  description: 'Get in touch with Seven Sides — WhatsApp, call, or email. Find us across four Lahore branches.',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh', paddingTop: '5rem' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(to bottom, #141414, #0A0A0A)', borderBottom: '1px solid #1C1C1C' }} className="py-16">
        <div className="container-px mx-auto max-w-6xl">
          <span className="eyebrow-gold">Get in Touch</span>
          <h1 className="font-display text-white leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}>
            CONTACT US
          </h1>
          <p className="mt-4 text-dark-100 text-base max-w-lg">
            Questions, catering, feedback, or just want to say the tenders are fire — we&apos;re here.
          </p>
        </div>
      </div>

      <div className="container-px mx-auto max-w-6xl py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start">

          {/* Form */}
          <div>
            <h2 className="font-display text-2xl text-white mb-6">SEND A MESSAGE</h2>
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="space-y-5">

            {/* WhatsApp — prominent */}
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-green-700/50 bg-green-900/20 p-5 hover:bg-green-900/30 hover:border-green-600 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-700 group-hover:bg-green-600 transition-colors">
                <MessageSquare className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-0.5">Fastest Response</p>
                <p className="font-display text-xl text-white">WhatsApp Us</p>
                <p className="text-xs text-dark-100 mt-0.5">Quick orders & catering enquiries</p>
              </div>
            </a>

            {/* Phone */}
            <a href={`tel:${SITE.phone}`}
              className="flex items-center gap-4 rounded-2xl border border-dark-300 bg-dark-500 p-5 hover:border-gold-500/40 hover:bg-dark-400 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors">
                <Phone className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-dark-200 mb-0.5">Call Us</p>
                <p className="font-display text-xl text-white">{SITE.phone}</p>
                <p className="text-xs text-dark-100 mt-0.5">DHA Phase 5 main line</p>
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${SITE.email}`}
              className="flex items-center gap-4 rounded-2xl border border-dark-300 bg-dark-500 p-5 hover:border-teal-500/40 hover:bg-dark-400 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-500/20 group-hover:bg-teal-500/30 transition-colors">
                <Mail className="h-5 w-5 text-teal-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-dark-200 mb-0.5">Email</p>
                <p className="font-display text-xl text-white break-all">sevensides.pk</p>
                <p className="text-xs text-dark-100 mt-0.5">{SITE.email}</p>
              </div>
            </a>

            {/* Instagram */}
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-dark-300 bg-dark-500 p-5 hover:border-gold-500/40 hover:bg-dark-400 transition-all group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors">
                <Instagram className="h-5 w-5 text-gold-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-dark-200 mb-0.5">Instagram</p>
                <p className="font-display text-xl text-white">@sevensides.pk</p>
                <p className="text-xs text-dark-100 mt-0.5">85K+ followers · DMs open</p>
              </div>
            </a>

            {/* Branches quick list */}
            <div className="rounded-2xl border border-dark-300 bg-dark-500 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-4 w-4 text-gold-500" strokeWidth={2} />
                <p className="text-xs font-bold uppercase tracking-wider text-gold-500">Our Branches</p>
              </div>
              <div className="space-y-3">
                {BRANCHES.map(b => (
                  <div key={b.id} className="flex items-start gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold-500/60" strokeWidth={1.5} />
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-xs">{b.name}</p>
                      {b.phone && (
                        <a href={`tel:${b.phone}`} className="text-xs text-dark-100 hover:text-white transition-colors">
                          {b.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}