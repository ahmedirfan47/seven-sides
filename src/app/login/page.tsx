'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations';
import { z } from 'zod';
import { Loader2, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState:{errors,isSubmitting} } = useForm<LoginForm>({ resolver:zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setError('');
    const res = await fetch('/api/auth/login',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
    const result = await res.json();
    if (!res.ok) { setError(result.error || 'Invalid email or password'); return; }
    if (result.user?.role === 'ADMIN') router.push('/admin/dashboard');
    else router.push('/account');
  };

  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh' }} className="flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 shadow-gold mb-4">
            <span className="font-display text-3xl text-dark-600 leading-none">7</span>
          </div>
          <h1 className="font-display text-3xl text-white">SIGN IN</h1>
          <p className="text-dark-100 text-sm mt-2">Welcome back to Seven Sides</p>
        </div>

        <div className="card-dark rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="label-dark">Email</label>
              <input {...register('email')} type="email" className="input-dark" placeholder="you@example.com" autoComplete="email" autoFocus />
              {errors.email && <p className="mt-1 text-xs text-heat">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label-dark">Password</label>
              <input {...register('password')} type="password" className="input-dark" placeholder="••••••••" autoComplete="current-password" />
              {errors.password && <p className="mt-1 text-xs text-heat">{errors.password.message}</p>}
            </div>
            {error && <div className="rounded-xl border border-heat/30 bg-heat/10 px-4 py-3 text-sm text-heat">{error}</div>}
            <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-4 text-base">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-dark-100">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-gold-400 hover:text-gold-300 transition-colors">Create one</Link>
        </p>
      </div>
    </div>
  );
}