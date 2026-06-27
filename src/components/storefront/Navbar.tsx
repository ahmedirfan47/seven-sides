'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag, Menu, X, User, LogOut, ClipboardList, ChevronRight,
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/session-context';

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const pathname    = usePathname();
  const { session } = useSession();
  const count       = useCartStore(s => s.getCount());

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); setUserOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!userOpen) return;
    const h = () => setUserOpen(false);
    const t = setTimeout(() => document.addEventListener('click', h), 0);
    return () => { clearTimeout(t); document.removeEventListener('click', h); };
  }, [userOpen]);

  return (
    <>
      <header className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-dark-300 bg-dark-600/95 backdrop-blur-xl' : 'bg-transparent',
      )}>
        <div className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between gap-4">

          {/* Logo — gold circle + SEVEN/SIDES matching brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Seven Sides">
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-gold-500 group-hover:bg-gold-400 transition-all shadow-gold">
              <span className="font-display text-[10px] tracking-[0.15em] text-dark-600 leading-none">SEVEN</span>
              <span className="font-display text-[10px] tracking-[0.15em] text-teal-800 leading-none mt-0.5">SIDES</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-base tracking-widest text-white leading-none group-hover:text-gold-400 transition-colors">SEVEN</span>
              <span className="font-display text-base tracking-widest text-teal-400 leading-none group-hover:text-teal-300 transition-colors -mt-0.5">SIDES</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className={cn(
                  'px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200',
                  pathname === l.href
                    ? 'bg-gold-500/20 text-gold-400'
                    : 'text-white/80 hover:text-white hover:bg-white/5',
                )}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link href="/menu" className="hidden sm:inline-flex btn-gold py-2.5 px-5 text-xs">
              Order Now
            </Link>

            {/* Cart */}
            <Link href="/cart" aria-label={`Cart — ${count} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-dark-300 text-white hover:border-gold-500 hover:text-gold-400 transition-all duration-200">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-dark-600 animate-bounce-sm">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="relative hidden sm:block">
              <button onClick={e => { e.stopPropagation(); setUserOpen(v => !v); }} aria-label="Account"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-300 text-white hover:border-teal-500 hover:text-teal-400 transition-all">
                {session
                  ? <span className="flex h-full w-full items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">{session.user.name.charAt(0).toUpperCase()}</span>
                  : <User className="h-5 w-5" strokeWidth={1.5} />}
              </button>

              {userOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-dark-300 bg-dark-500 p-2 shadow-hover-dark animate-scale-in"
                  onClick={e => e.stopPropagation()}>
                  {session ? (
                    <>
                      <div className="flex items-center gap-3 rounded-xl bg-dark-400 px-3 py-3 mb-2">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white shrink-0">{session.user.name.charAt(0).toUpperCase()}</div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{session.user.name}</p>
                          <p className="truncate text-xs text-dark-100">{session.user.email}</p>
                        </div>
                      </div>
                      <Link href="/account"        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-dark-400 hover:text-white transition-colors"><User className="h-4 w-4 text-teal-400" /> My Account</Link>
                      <Link href="/account/orders" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-dark-400 hover:text-white transition-colors"><ClipboardList className="h-4 w-4 text-teal-400" /> Orders</Link>
                      {session.user.role === 'ADMIN' && (
                        <>
                          <div className="my-1 border-t border-dark-300" />
                          <Link href="/admin/dashboard" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-gold-400 hover:bg-dark-400 transition-colors">Admin <ChevronRight className="h-3.5 w-3.5" /></Link>
                        </>
                      )}
                      <div className="my-1 border-t border-dark-300" />
                      <button onClick={async () => { await fetch('/api/auth/logout',{method:'POST'}); window.location.href='/'; }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-dark-400 transition-colors">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="space-y-1 p-1">
                      <Link href="/login"    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-dark-400 transition-colors">Sign In</Link>
                      <Link href="/register" className="block rounded-xl bg-gold-500 px-3 py-2.5 text-center text-sm font-semibold text-dark-600 hover:bg-gold-400 transition-colors">Create Account</Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-dark-300 text-white hover:border-gold-500 transition-all lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-20 z-40 overflow-y-auto bg-dark-600/98 backdrop-blur-xl lg:hidden">
          <div className="container-px py-6 space-y-1.5">
            <div className="flex items-center gap-4 rounded-2xl bg-dark-400 border border-dark-300 px-5 py-4 mb-5">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-gold-500 shadow-gold">
                <span className="font-display text-[10px] tracking-[0.15em] text-dark-600 leading-none">SEVEN</span>
                <span className="font-display text-[10px] tracking-[0.15em] text-teal-800 leading-none mt-0.5">SIDES</span>
              </div>
              <div>
                <p className="font-display text-lg text-white leading-tight">SEVEN SIDES</p>
                <p className="text-xs text-dark-100 mt-0.5">Home of Red Tenders 🔥</p>
              </div>
            </div>

            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className={cn(
                  'flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold transition-colors',
                  pathname === l.href ? 'bg-gold-500/20 text-gold-400' : 'text-white hover:bg-dark-400',
                )}>
                {l.label} <ChevronRight className={cn('h-4 w-4 shrink-0', pathname===l.href?'text-gold-400':'text-dark-100')} />
              </Link>
            ))}

            <div className="border-t border-dark-300 pt-4 mt-4 space-y-2">
              {session ? (
                <>
                  <div className="flex items-center gap-3 rounded-2xl bg-dark-400 border border-dark-300 px-4 py-3 mb-2">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-600 font-bold text-white">{session.user.name.charAt(0).toUpperCase()}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{session.user.name}</p>
                      <p className="truncate text-xs text-dark-100">{session.user.email}</p>
                    </div>
                  </div>
                  <Link href="/account"        className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-white/80 hover:bg-dark-400 transition-colors"><User className="h-4 w-4 text-teal-400 shrink-0" /> My Account</Link>
                  <Link href="/account/orders" className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-white/80 hover:bg-dark-400 transition-colors"><ClipboardList className="h-4 w-4 text-teal-400 shrink-0" /> Orders</Link>
                  {session.user.role === 'ADMIN' && <Link href="/admin/dashboard" className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-gold-400 hover:bg-dark-400 transition-colors">Admin <ChevronRight className="h-4 w-4" /></Link>}
                  <button onClick={async () => { await fetch('/api/auth/logout',{method:'POST'}); window.location.href='/'; }}
                    className="flex w-full items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-red-400 hover:bg-dark-400 transition-colors">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login"    className="rounded-2xl border-2 border-dark-200 px-4 py-3.5 text-center text-sm font-semibold text-white hover:bg-dark-400 transition-colors">Sign In</Link>
                  <Link href="/register" className="rounded-2xl bg-gold-500 px-4 py-3.5 text-center text-sm font-semibold text-dark-600 hover:bg-gold-400 transition-colors">Register</Link>
                </div>
              )}
              <Link href="/menu" className="btn-gold w-full justify-center mt-2 py-4 text-base">Order Now</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}