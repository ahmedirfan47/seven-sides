import { Mail, Phone, MapPin, MessageSquare, Instagram, Flame } from 'lucide-react';
import ContactForm from './ContactForm';
import { SITE, BRANCHES } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Contact',
  description: 'Get in touch with Seven Sides — WhatsApp, call, or email us across four Lahore locations.',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#0A1614', minHeight: '100vh', paddingTop: '68px' }}>

      <div style={{ backgroundColor: '#0E1F1D', borderBottom: '1px solid #243838' }} className="py-16">
        <div className="px-site max-site">
          <span className="eyebrow-amber">Get in Touch</span>
          <h1 className="font-display text-white leading-none" style={{ fontSize: 'clamp(3rem,10vw,6rem)' }}>
            CONTACT US
          </h1>
          <p className="text-ss-200 text-base mt-4 max-w-lg">
            Questions, catering, feedback, or just want to say the tenders are fire — we&apos;re here.
          </p>
        </div>
      </div>

      <div className="px-site max-site py-section grid gap-12 lg:grid-cols-[1fr_400px] items-start">

        {/* Form */}
        <div>
          <h2 className="font-display text-2xl text-white mb-6">SEND A MESSAGE</h2>
          <ContactForm />
        </div>

        {/* Info */}
        <div className="space-y-4">

          {/* WhatsApp — most important for Lahore */}
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border p-5 hover:-translate-y-0.5 transition-all group"
            style={{ backgroundColor: 'rgba(22,101,52,0.2)', borderColor: 'rgba(22,163,74,0.3)' }}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#166534' }}>
              <MessageSquare className="h-5 w-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-green-400 mb-0.5">Fastest Response</p>
              <p className="font-display text-xl text-white">WhatsApp Us</p>
              <p className="text-xs text-ss-200 mt-0.5">Quick orders & catering enquiries</p>
            </div>
          </a>

          {[
            { href: `tel:${SITE.phone}`, icon: Phone, label: 'Call Us', value: SITE.phone, sub: 'DHA Phase 5 main line', color: 'text-teal-400', bg: 'rgba(59,181,176,0.1)', border: 'rgba(59,181,176,0.2)' },
            { href: `mailto:${SITE.email}`, icon: Mail, label: 'Email', value: 'sevensides.pk', sub: SITE.email, color: 'text-amber-400', bg: 'rgba(240,168,32,0.08)', border: 'rgba(240,168,32,0.2)' },
            { href: SITE.instagram, icon: Instagram, label: 'Instagram', value: '@sevensides.pk', sub: '86K+ followers · DMs open', color: 'text-amber-400', bg: 'rgba(240,168,32,0.08)', border: 'rgba(240,168,32,0.2)' },
          ].map(item => (
            <a key={item.href}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 rounded-2xl border p-5 hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: item.bg, borderColor: item.border }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: item.bg }}>
                <item.icon className={`h-5 w-5 ${item.color}`} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ss-300 mb-0.5">{item.label}</p>
                <p className="font-display text-xl text-white">{item.value}</p>
                <p className="text-xs text-ss-200 mt-0.5">{item.sub}</p>
              </div>
            </a>
          ))}

          {/* Branches quick list */}
          <div className="rounded-2xl border border-ss-500 p-5" style={{ backgroundColor: '#132524' }}>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-amber-400" strokeWidth={2} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Our Branches</p>
            </div>
            <div className="space-y-3">
              {BRANCHES.map(b => (
                <div key={b.id} className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-teal-500/60" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-semibold text-white">{b.name}</p>
                    {b.phone && (
                      <a href={`tel:${b.phone}`} className="text-xs text-ss-200 hover:text-white transition-colors">
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
  );
}