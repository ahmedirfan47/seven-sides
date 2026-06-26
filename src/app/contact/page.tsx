import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { BRANCHES, SITE } from '@/lib/constants';
import ContactForm from './ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Seven Sides — order enquiries, catering, feedback or just say hi.',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh', paddingTop:'5rem' }}>
      <div className="container-px mx-auto max-w-6xl py-12">
        <div className="mb-10">
          <span className="eyebrow-gold">Get in Touch</span>
          <h1 className="font-display text-5xl text-white sm:text-6xl">CONTACT US</h1>
          <p className="mt-3 text-dark-100 text-sm max-w-lg">
            Questions, feedback, catering, or large orders — drop us a message.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ContactForm />

          <div className="space-y-5">
            {/* WhatsApp */}
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
              className="card-dark flex items-center gap-4 rounded-2xl p-5 hover:border-green-700 transition-all">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-800 text-white font-bold text-sm">WA</div>
              <div>
                <p className="text-sm font-semibold text-white">WhatsApp — Fastest Way</p>
                <p className="text-xs text-dark-100 mt-0.5">Quick replies for orders &amp; enquiries</p>
              </div>
            </a>

            {/* Email */}
            <div className="card-dark flex items-center gap-4 rounded-2xl p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-900">
                <Mail className="h-5 w-5 text-teal-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Email</p>
                <a href={`mailto:${SITE.email}`} className="text-sm text-gold-400 hover:text-gold-300 transition-colors">{SITE.email}</a>
              </div>
            </div>

            {/* Branches quick view */}
            {BRANCHES.slice(0,2).map(b => (
              <div key={b.id} className="card-dark rounded-2xl p-5">
                <p className="text-sm font-semibold text-gold-400 mb-3">{b.name}</p>
                <div className="space-y-2 text-sm text-dark-100">
                  <div className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold-500" strokeWidth={1.5} /><span>{b.address}</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} /><span>{b.hours}</span></div>
                  {b.phone && <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-white transition-colors"><Phone className="h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.5} /><span>{b.phone}</span></a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}