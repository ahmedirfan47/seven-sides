'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validations';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState:{errors,isSubmitting} } = useForm<RegisterForm>({ resolver:zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    const res = await fetch('/api/auth/register',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
    const result = await res.json();
    if (!res.ok) { setError(result.error || 'Registration failed'); return; }
    router.push('/account');
  };

  return (
    <div style={{ backgroundColor:'#0A0A0A', minHeight:'100vh' }} className="flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 shadow-gold mb-4">
            <span className="font-display text-3xl text-dark-600 leading-none">7</span>
          </div>
          <h1 className="font-display text-3xl text-white">CREATE ACCOUNT</h1>
          <p className="text-dark-100 text-sm mt-2">Join Seven Sides for faster ordering</p>
        </div>

        <div className="card-dark rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="label-dark">Full Name</label>
              <input {...register('name')} className="input-dark" placeholder="Your name" autoComplete="name" autoFocus />
              {errors.name && <p className="mt-1 text-xs text-heat">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label-dark">Email</label>
              <input {...register('email')} type="email" className="input-dark" placeholder="you@example.com" autoComplete="email" />
              {errors.email && <p className="mt-1 text-xs text-heat">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label-dark">Phone <span className="font-normal text-dark-200">(optional)</span></label>
              <input {...register('phone')} type="tel" className="input-dark" placeholder="03XX XXXXXXX" autoComplete="tel" />
            </div>
            <div>
              <label className="label-dark">Password</label>
              <input {...register('password')} type="password" className="input-dark" placeholder="Min. 8 characters" autoComplete="new-password" />
              {errors.password && <p className="mt-1 text-xs text-heat">{errors.password.message}</p>}
            </div>
            {error && <div className="rounded-xl border border-heat/30 bg-heat/10 px-4 py-3 text-sm text-heat">{error}</div>}
            <button type="submit" disabled={isSubmitting} className="btn-gold w-full py-4 text-base">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</> : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-dark-100">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-gold-400 hover:text-gold-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}