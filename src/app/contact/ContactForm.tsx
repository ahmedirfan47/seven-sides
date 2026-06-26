'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validations';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted,   setSubmitted]   = useState(false);
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setServerError('');
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed');
      setSubmitted(true); reset();
    } catch (err: any) { setServerError(err.message || 'Something went wrong.'); }
  };

  if (submitted) {
    return (
      <div className="card-dark rounded-2xl flex flex-col items-center py-16 px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-900 text-teal-400 mb-4">
          <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-2xl text-white">Message Sent!</h2>
        <p className="mt-2 text-sm text-dark-100">We&apos;ll get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="btn-outline-gold mt-6 text-sm px-6 py-2.5">Send Another</button>
      </div>
    );
  }

  return (
    <div className="card-dark rounded-2xl p-6 sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-dark">Full Name</label>
            <input {...register('name')} className="input-dark" placeholder="Your name" autoComplete="name" />
            {errors.name && <p className="mt-1 text-xs text-heat">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label-dark">Email</label>
            <input {...register('email')} type="email" className="input-dark" placeholder="you@example.com" autoComplete="email" />
            {errors.email && <p className="mt-1 text-xs text-heat">{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-dark">Phone <span className="font-normal text-dark-200">(optional)</span></label>
            <input {...register('phone')} type="tel" className="input-dark" placeholder="03XX XXXXXXX" autoComplete="tel" />
          </div>
          <div>
            <label className="label-dark">Subject</label>
            <input {...register('subject')} className="input-dark" placeholder="e.g. Catering enquiry" />
          </div>
        </div>
        <div>
          <label className="label-dark">Message</label>
          <textarea {...register('message')} rows={5} className="input-dark resize-none" placeholder="How can we help?" />
          {errors.message && <p className="mt-1 text-xs text-heat">{errors.message.message}</p>}
        </div>
        {serverError && <div className="rounded-xl border border-heat/30 bg-heat/10 px-4 py-3 text-sm text-heat">{serverError}</div>}
        <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-4 text-base">
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send Message</>}
        </button>
      </form>
    </div>
  );
}