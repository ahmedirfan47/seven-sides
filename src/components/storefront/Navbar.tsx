'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag, Menu, X, User, LogOut,
  ClipboardList, ChevronRight, Home,
  UtensilsCrossed, MapPin,
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/session-context';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen,   setUserOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const pathname    = usePathname();
  const { session } = useSession();
  const count       = useCartStore(s => s.getCount());
  const initial     = session?.user.name.charAt(0).toUpperCase() ?? '';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!userOpen) return;
    const close = () => setUserOpen(false);
    const t = setTimeout(() => document.addEventListener('click', close), 0);
    return () => { clearTimeout(t); document.removeEventListener('click', close); };
  }, [userOpen]);

  return (
    <>
      {/* ── TOP NAVBAR ─────────────────────────────── */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-ss-500 backdrop-blur-xl'
            : 'bg-transparent',
        )}
        style={scrolled ? { backgroundColor: 'rgba(10,22,20,0.96)' } : undefined}
      >
        <div className="px-site max-site flex h-[68px] items-center justify-between gap-4">

          {/* LOGO — gold circle + SEVEN SIDES */}
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Seven Sides — Home">
            {/* The brand logo: gold circle with SEVEN/SIDES stacked */}
            <div
              className="relative flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105"
              style={{ background: '#F0A820' }}
            >
              <span
                className="font-display leading-none tracking-[0.18em]"
                style={{ fontSize: '9.5px', color: '#FFFFFF' }}
              >
                SEVEN
              </span>
              <span
                className="font-display leading-none tracking-[0.18em]"
                style={{ fontSize: '9.5px', color: '#1A6B68', marginTop: '2px' }}
              >
                SIDES
              </span>
            </div>
            <div className="hidden sm:block leading-none">
              <p className="font-display text-[15px] tracking-[0.2em] text-white leading-none group-hover:text-amber-400 transition-colors">
                SEVEN
              </p>
              <p className="font-display text-[15px] tracking-[0.2em] text-teal-400 leading-none group-hover:text-teal-300 transition-colors">
                SIDES
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main">
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-4 py-2 text-[13px] font-semibold rounded-full transition-all duration-200',
                  pathname === l.href
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-ss-100 hover:text-white hover:bg-ss-600/60',
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            <Link href="/menu" className="hidden sm:inline-flex btn-amber text-xs py-2.5 px-5">
              Order Now
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Cart — ${count} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ss-500 text-ss-100 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-200"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-ss-900">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* Account — desktop only */}
            <div className="relative hidden sm:block">
              <button
                onClick={e => { e.stopPropagation(); setUserOpen(v => !v); }}
                aria-label="Account"
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-ss-500 text-ss-100 hover:border-teal-500/50 hover:text-teal-400 transition-all duration-200"
              >
                {session
                  ? (
                    <span className="flex h-full w-full items-center justify-center bg-teal-600 text-sm font-bold text-white">
                      {initial}
                    </span>
                  )
                  : <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
                }
              </button>

              {userOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-ss-500 p-2 shadow-lg animate-scale-in z-50"
                  style={{ backgroundColor: '#132524' }}
                  onClick={e => e.stopPropagation()}
                >
                  {session ? (
                    <>
                      <div className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ backgroundColor: '#0E1F1D' }}>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{session.user.name}</p>
                          <p className="truncate text-xs text-ss-200">{session.user.email}</p>
                        </div>
                      </div>
                      <Link href="/account"        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ss-100 hover:bg-ss-600 hover:text-white transition-colors"><User className="h-4 w-4 text-teal-400" /> Account</Link>
                      <Link href="/account/orders" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ss-100 hover:bg-ss-600 hover:text-white transition-colors"><ClipboardList className="h-4 w-4 text-teal-400" /> Orders</Link>
                      {session.user.role === 'ADMIN' && (
                        <>
                          <div className="my-1 border-t border-ss-500" />
                          <Link href="/admin/dashboard" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-amber-400 hover:bg-ss-600 transition-colors">
                            Admin <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </>
                      )}
                      <div className="my-1 border-t border-ss-500" />
                      <button
                        onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/'; }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-ss-600 transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="space-y-1 p-1">
                      <Link href="/login"    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ss-100 hover:bg-ss-600 transition-colors">Sign In</Link>
                      <Link href="/register" className="block rounded-xl bg-amber-500 px-3 py-2.5 text-center text-sm font-semibold text-ss-900 hover:bg-amber-400 transition-colors">Create Account</Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ss-500 text-ss-100 hover:border-amber-500/50 hover:text-amber-400 transition-all lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ──────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-[68px] z-40 overflow-y-auto backdrop-blur-xl lg:hidden"
          style={{ backgroundColor: 'rgba(10,22,20,0.98)' }}
        >
          <div className="px-site py-6 space-y-1.5">
            {/* Brand identity in drawer */}
            <div
              className="flex items-center gap-4 rounded-2xl border border-ss-500 px-5 py-4 mb-5"
              style={{ backgroundColor: '#132524' }}
            >
              <div
                className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full"
                style={{ background: '#F0A820' }}
              >
                <span className="font-display leading-none tracking-[0.18em]" style={{ fontSize: '9px', color: '#fff' }}>SEVEN</span>
                <span className="font-display leading-none tracking-[0.18em]" style={{ fontSize: '9px', color: '#1A6B68', marginTop: '2px' }}>SIDES</span>
              </div>
              <div>
                <p className="font-display text-lg tracking-widest text-white leading-none">SEVEN SIDES</p>
                <p className="text-xs text-ss-200 mt-1">🔥 Home of Red Tenders</p>
              </div>
            </div>

            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold transition-colors',
                  pathname === l.href
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'text-white hover:bg-ss-700',
                )}
              >
                {l.label}
                <ChevronRight className={cn('h-4 w-4 shrink-0', pathname === l.href ? 'text-amber-400' : 'text-ss-300')} />
              </Link>
            ))}

            <div className="border-t border-ss-500 pt-4 mt-4 space-y-2">
              {session ? (
                <>
                  <div className="flex items-center gap-3 rounded-2xl border border-ss-500 px-4 py-3 mb-2" style={{ backgroundColor: '#132524' }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-bold text-white">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{session.user.name}</p>
                      <p className="truncate text-xs text-ss-200">{session.user.email}</p>
                    </div>
                  </div>
                  <Link href="/account"        className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-ss-100 hover:bg-ss-700 transition-colors"><User className="h-4 w-4 text-teal-400 shrink-0" /> Account</Link>
                  <Link href="/account/orders" className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-ss-100 hover:bg-ss-700 transition-colors"><ClipboardList className="h-4 w-4 text-teal-400 shrink-0" /> Orders</Link>
                  {session.user.role === 'ADMIN' && (
                    <Link href="/admin/dashboard" className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-amber-400 hover:bg-ss-700 transition-colors">
                      Admin <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                  <button
                    onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); window.location.href = '/'; }}
                    className="flex w-full items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-red-400 hover:bg-ss-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login"    className="rounded-2xl border-2 border-ss-400 px-4 py-3.5 text-center text-sm font-semibold text-white hover:bg-ss-700 transition-colors">Sign In</Link>
                  <Link href="/register" className="rounded-2xl bg-amber-500 px-4 py-3.5 text-center text-sm font-semibold text-ss-900 hover:bg-amber-400 transition-colors">Register</Link>
                </div>
              )}
              <Link href="/menu" className="btn-amber w-full justify-center py-4 text-sm mt-2">
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE BOTTOM NAVIGATION ─────────────── */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-ss-500 backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(10,22,20,0.97)' }}
        aria-label="Mobile tabs"
      >
        <div className="grid grid-cols-4 h-16">
          {[
            { href: '/',         Icon: Home,            label: 'Home'    },
            { href: '/menu',     Icon: UtensilsCrossed, label: 'Menu'    },
            { href: '/cart',     Icon: ShoppingBag,     label: 'Cart',   badge: count },
            { href: '/branches', Icon: MapPin,           label: 'Find Us' },
          ].map(tab => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 relative transition-colors duration-200',
                  active ? 'text-amber-400' : 'text-ss-300',
                )}
              >
                <tab.Icon className="h-[22px] w-[22px]" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold leading-none">{tab.label}</span>
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute top-2 right-1/2 translate-x-4 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-ss-900 px-1">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}