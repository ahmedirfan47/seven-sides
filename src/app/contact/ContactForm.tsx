'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send } from 'lucide-react';

const schema = z.object({
  name:    z.string().min(2, 'At least 2 characters'),
  email:   z.string().email('Enter a valid email'),
  phone:   z.string().optional(),
  subject: z.string().min(3, 'Enter a subject'),
  message: z.string().min(10, 'At least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [done,  setDone]  = useState(false);
  const [err,   setErr]   = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setErr('');
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      if (!res.ok) {
        const r = await res.json();
        setErr(r.error || 'Something went wrong.');
        return;
      }
      setDone(true);
      reset();
    } catch {
      setErr('Something went wrong. Please try again.');
    }
  };

  if (done) {
    return (
      <div
        className="rounded-2xl border border-teal-500/30 p-8 text-center"
        style={{ backgroundColor: 'rgba(59,181,176,0.08)' }}
      >
        <div className="text-5xl mb-4">🔥</div>
        <h3 className="font-display text-2xl text-white mb-2">MESSAGE SENT!</h3>
        <p className="text-sm text-ss-200 mb-5">
          We received it and will respond soon. For faster help, WhatsApp us.
        </p>
        <button
          onClick={() => setDone(false)}
          className="btn-outline-teal text-sm px-5 py-2.5"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Full Name</label>
          <input {...register('name')} className="input" placeholder="Your name" autoComplete="name" />
          {errors.name && <p className="mt-1 text-xs text-fire">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Email</label>
          <input {...register('email')} type="email" className="input" placeholder="you@example.com" autoComplete="email" />
          {errors.email && <p className="mt-1 text-xs text-fire">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Phone <span className="font-normal text-ss-300">(optional)</span></label>
          <input {...register('phone')} type="tel" className="input" placeholder="03XX XXXXXXX" autoComplete="tel" />
        </div>
        <div>
          <label className="label">Subject</label>
          <input {...register('subject')} className="input" placeholder="What is this about?" />
          {errors.subject && <p className="mt-1 text-xs text-fire">{errors.subject.message}</p>}
        </div>
      </div>
      <div>
        <label className="label">Message</label>
        <textarea
          {...register('message')}
          rows={5}
          className="input resize-none"
          placeholder="Tell us what's on your mind…"
        />
        {errors.message && <p className="mt-1 text-xs text-fire">{errors.message.message}</p>}
      </div>
      {err && (
        <div className="rounded-xl border border-fire/30 px-4 py-3 text-sm text-fire" style={{ backgroundColor: 'rgba(214,59,46,0.08)' }}>
          {err}
        </div>
      )}
      <button type="submit" disabled={isSubmitting} className="btn-amber w-full py-4 text-base">
        {isSubmitting
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
          : <><Send className="h-4 w-4" /> Send Message</>
        }
      </button>
    </form>
  );
}