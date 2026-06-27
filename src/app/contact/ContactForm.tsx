'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send } from 'lucide-react';

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email'),
  phone:   z.string().optional(),
  subject: z.string().min(3, 'Please enter a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ContactFormData) => {
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      if (!res.ok) {
        const r = await res.json();
        setError(r.error || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-8 text-center">
        <div className="text-4xl mb-4">🔥</div>
        <h3 className="font-display text-2xl text-white mb-2">MESSAGE SENT!</h3>
        <p className="text-sm text-dark-100 mb-5">
          We received your message and will get back to you soon. For faster responses, try WhatsApp.
        </p>
        <button onClick={() => setSubmitted(false)}
          className="btn-outline-gold text-sm px-5 py-2.5">
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-dark">Full Name</label>
          <input
            {...register('name')}
            className="input-dark"
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && <p className="mt-1 text-xs text-heat">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label-dark">Email</label>
          <input
            {...register('email')}
            type="email"
            className="input-dark"
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-heat">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-dark">
            Phone <span className="font-normal text-dark-200">(optional)</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="input-dark"
            placeholder="03XX XXXXXXX"
            autoComplete="tel"
          />
        </div>
        <div>
          <label className="label-dark">Subject</label>
          <input
            {...register('subject')}
            className="input-dark"
            placeholder="What is this about?"
          />
          {errors.subject && <p className="mt-1 text-xs text-heat">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <label className="label-dark">Message</label>
        <textarea
          {...register('message')}
          rows={5}
          className="input-dark resize-none"
          placeholder="Tell us what's on your mind..."
        />
        {errors.message && <p className="mt-1 text-xs text-heat">{errors.message.message}</p>}
      </div>

      {error && (
        <div className="rounded-xl border border-heat/30 bg-heat/10 px-4 py-3 text-sm text-heat">
          {error}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-4 text-base">
        {isSubmitting ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="h-4 w-4" /> Send Message</>
        )}
      </button>
    </form>
  );
}