'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router       = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setError('');
    try {
      const res    = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || 'Invalid email or password');
        return;
      }
      if (result.user?.role === 'ADMIN') router.push('/admin/dashboard');
      else router.push('/account');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label className="label-dark">Email</label>
        <input
          {...register('email')}
          type="email"
          className="input-dark"
          placeholder="you@example.com"
          autoComplete="email"
          autoFocus
        />
        {errors.email && (
          <p className="mt-1 text-xs text-heat">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="label-dark">Password</label>
        <input
          {...register('password')}
          type="password"
          className="input-dark"
          placeholder="••••••••"
          autoComplete="current-password"
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
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</>
          : 'Sign In'}
      </button>
    </form>
  );
}