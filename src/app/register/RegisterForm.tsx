'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validations';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router        = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    try {
      const res    = await fetch('/api/auth/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || 'Registration failed');
        return;
      }
      router.push('/account');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label-dark">Full Name</label>
        <input
          {...register('name')}
          className="input-dark"
          placeholder="Your name"
          autoComplete="name"
          autoFocus
        />
        {errors.name && (
          <p className="mt-1 text-xs text-heat">{errors.name.message}</p>
        )}
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
        {errors.email && (
          <p className="mt-1 text-xs text-heat">{errors.email.message}</p>
        )}
      </div>

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
        <label className="label-dark">Password</label>
        <input
          {...register('password')}
          type="password"
          className="input-dark"
          placeholder="Min. 8 characters"
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-heat">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-heat/30 bg-heat/10 px-4 py-3 text-sm text-heat">
          {error}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-4 text-base">
        {isSubmitting
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</>
          : 'Create Account'}
      </button>
    </form>
  );
}