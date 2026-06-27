import { Mail, Phone, MapPin, MessageSquare, Instagram, Flame } from 'lucide-react';
import ContactForm from './ContactForm';
import { SITE, BRANCHES } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Seven Sides — WhatsApp, call, or email us across four Lahore locations.',
};

export default function ContactPage() {
  return (
    <div className="bg-ink-900 min-h-screen pt-[68px]">

      <div className="bg-ink-800 border-b border-ink-600 py-16">
        <div className="site-px site-max">
          <span className="eyebrow-gold">Get in Touch</span>
          <h1 className="font-display text-white leading-none" style={{fontSize:'clamp(3rem,10vw,6rem)'}}>CONTACT US</h1>
          <p className="text-ink-200 text-base mt-4 max-w-lg">Questions, catering, feedback, or just want to say the tenders are fire — we&apos;re here.</p>
        </div>
      </div>

      <div className="site-px site-max site-section grid gap-12 lg:grid-cols-[1fr_400px] items-start">

        {/* Form */}
        <div>
          <h2 className="font-display text-2xl text-white mb-6">SEND A MESSAGE</h2>
          <ContactForm />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-green-700/40 bg-green-900/20 p-5 hover:bg-green-900/30 hover:border-green-600 transition-all group">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-700 group-hover:bg-green-600 transition-colors">
              <MessageSquare className="h-5 w-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-green-400 mb-0.5">Fastest Response</p>
              <p className="font-display text-xl text-white">WhatsApp Us</p>
              <p className="text-xs text-ink-200 mt-0.5">Quick orders & catering</p>
            </div>
          </a>

          {[
            { href:`tel:${SITE.phone}`, icon:Phone, label:'Call Us', value:SITE.phone, sub:'DHA Phase 5 main line', color:'text-teal-400', bg:'bg-teal-500/10' },
            { href:`mailto:${SITE.email}`, icon:Mail, label:'Email', value:'sevensides.pk', sub:SITE.email, color:'text-gold-400', bg:'bg-gold-500/10' },
            { href:SITE.instagram, icon:Instagram, label:'Instagram', value:'@sevensides.pk', sub:'85K+ followers · DMs open', color:'text-gold-400', bg:'bg-gold-500/10' },
          ].map(item => (
            <a key={item.href} href={item.href} target={item.href.startsWith('http')?'_blank':undefined}
              rel={item.href.startsWith('http')?'noopener noreferrer':undefined}
              className="flex items-center gap-4 card rounded-2xl p-5 hover:border-ink-400 transition-all group">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.bg}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-300 mb-0.5">{item.label}</p>
                <p className="font-display text-xl text-white">{item.value}</p>
                <p className="text-xs text-ink-200 mt-0.5">{item.sub}</p>
              </div>
            </a>
          ))}

          <div className="card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-gold-500" strokeWidth={2} />
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold-500">Our Branches</p>
            </div>
            <div className="space-y-3">
              {BRANCHES.map(b => (
                <div key={b.id} className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-teal-500/60" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-semibold text-white">{b.name}</p>
                    {b.phone && <a href={`tel:${b.phone}`} className="text-xs text-ink-300 hover:text-white transition-colors">{b.phone}</a>}
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