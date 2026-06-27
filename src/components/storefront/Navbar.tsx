'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag, Menu, X, User, LogOut, ClipboardList,
  ChevronRight, Home, UtensilsCrossed, MapPin,
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/session-context';

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const pathname    = usePathname();
  const { session } = useSession();
  const count       = useCartStore(s => s.getCount());

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn(); window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); setUserMenu(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!userMenu) return;
    const h = () => setUserMenu(false);
    const t = setTimeout(() => document.addEventListener('click', h), 0);
    return () => { clearTimeout(t); document.removeEventListener('click', h); };
  }, [userMenu]);

  const initial = session?.user.name.charAt(0).toUpperCase() ?? '';

  return (
    <>
      {/* ─── Top Navbar ─────────────────────────────────────── */}
      <header className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ink-900/96 backdrop-blur-xl border-b border-ink-500'
          : 'bg-transparent',
      )}>
        <div className="site-px site-max flex h-[68px] items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0" aria-label="Seven Sides">
            <div className="relative flex h-[44px] w-[44px] shrink-0 flex-col items-center justify-center rounded-full bg-gold-500 transition-all group-hover:bg-gold-400 shadow-gold-sm">
              <span className="font-display text-[10px] tracking-[0.18em] text-ink-900 leading-none">SEVEN</span>
              <span className="font-display text-[10px] tracking-[0.18em] text-teal-800 leading-none mt-[2px]">SIDES</span>
            </div>
            <div className="hidden sm:block leading-none">
              <p className="font-display text-[15px] tracking-[0.2em] text-white leading-none group-hover:text-gold-400 transition-colors">SEVEN</p>
              <p className="font-display text-[15px] tracking-[0.2em] text-teal-400 leading-none group-hover:text-teal-300 transition-colors -mt-px">SIDES</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className={cn(
                  'px-4 py-2 text-[13px] font-semibold rounded-full transition-all duration-200',
                  pathname === l.href
                    ? 'text-gold-400 bg-gold-500/10'
                    : 'text-ink-100 hover:text-white hover:bg-white/5',
                )}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link href="/menu" className="hidden sm:inline-flex btn-gold py-2.5 px-5 text-xs">
              Order Now
            </Link>

            {/* Cart */}
            <Link href="/cart" aria-label={`Cart — ${count} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink-500 text-ink-100 hover:border-gold-500/60 hover:text-gold-400 transition-all">
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gold-500 text-[9px] font-black text-ink-900">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* Account (desktop) */}
            <div className="relative hidden sm:block">
              <button onClick={e => { e.stopPropagation(); setUserMenu(v => !v); }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-500 text-ink-100 hover:border-teal-500/60 hover:text-teal-400 transition-all overflow-hidden"
                aria-label="Account">
                {session
                  ? <span className="flex h-full w-full items-center justify-center bg-teal-600 text-sm font-bold text-white">{initial}</span>
                  : <User className="h-[18px] w-[18px]" strokeWidth={1.5} />}
              </button>

              {userMenu && (
                <div className="absolute right-0 mt-2 w-56 animate-scale-in rounded-2xl border border-ink-500 bg-ink-700 p-2 shadow-card-hover"
                  onClick={e => e.stopPropagation()}>
                  {session ? (
                    <>
                      <div className="mb-2 flex items-center gap-3 rounded-xl bg-ink-600 px-3 py-2.5">
                        <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">{initial}</div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{session.user.name}</p>
                          <p className="truncate text-xs text-ink-200">{session.user.email}</p>
                        </div>
                      </div>
                      <Link href="/account"        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink-100 hover:bg-ink-600 hover:text-white transition-colors"><User className="h-4 w-4 text-teal-400" /> Account</Link>
                      <Link href="/account/orders" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink-100 hover:bg-ink-600 hover:text-white transition-colors"><ClipboardList className="h-4 w-4 text-teal-400" /> Orders</Link>
                      {session.user.role === 'ADMIN' && (
                        <>
                          <div className="my-1 border-t border-ink-500" />
                          <Link href="/admin/dashboard" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-gold-400 hover:bg-ink-600 transition-colors">Admin<ChevronRight className="h-3.5 w-3.5" /></Link>
                        </>
                      )}
                      <div className="my-1 border-t border-ink-500" />
                      <button onClick={async () => { await fetch('/api/auth/logout',{method:'POST'}); window.location.href='/'; }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-ink-600 transition-colors">
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="p-1 space-y-1">
                      <Link href="/login"    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-100 hover:bg-ink-600 transition-colors">Sign In</Link>
                      <Link href="/register" className="block rounded-xl bg-gold-500 px-3 py-2.5 text-center text-sm font-semibold text-ink-900 hover:bg-gold-400 transition-colors">Create Account</Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hamburger (mobile/tablet) */}
            <button onClick={() => setOpen(v => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-500 text-ink-100 hover:border-gold-500/60 transition-all lg:hidden"
              aria-label="Open menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer ──────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-ink-900/98 backdrop-blur-xl lg:hidden">
          <div className="site-px py-6 space-y-1">
            <div className="flex items-center gap-4 rounded-2xl border border-ink-500 bg-ink-700 px-5 py-4 mb-5">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-gold-500 shadow-gold-sm">
                <span className="font-display text-[10px] tracking-[0.18em] text-ink-900 leading-none">SEVEN</span>
                <span className="font-display text-[10px] tracking-[0.18em] text-teal-800 leading-none mt-[2px]">SIDES</span>
              </div>
              <div>
                <p className="font-display text-lg text-white tracking-widest leading-none">SEVEN SIDES</p>
                <p className="text-xs text-ink-200 mt-1">🔥 Home of Red Tenders</p>
              </div>
            </div>

            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className={cn(
                  'flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-semibold',
                  pathname === l.href ? 'bg-gold-500/15 text-gold-400' : 'text-white hover:bg-ink-700',
                )}>
                {l.label}
                <ChevronRight className={cn('h-4 w-4 shrink-0', pathname===l.href?'text-gold-400':'text-ink-300')} />
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-ink-500 space-y-2">
              {session ? (
                <>
                  <div className="flex items-center gap-3 rounded-2xl border border-ink-500 bg-ink-700 px-4 py-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-600 font-bold text-white">{initial}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{session.user.name}</p>
                      <p className="truncate text-xs text-ink-200">{session.user.email}</p>
                    </div>
                  </div>
                  <Link href="/account"        className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-ink-100 hover:bg-ink-700"><User className="h-4 w-4 text-teal-400 shrink-0" /> Account</Link>
                  <Link href="/account/orders" className="flex items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-ink-100 hover:bg-ink-700"><ClipboardList className="h-4 w-4 text-teal-400 shrink-0" /> Orders</Link>
                  {session.user.role==='ADMIN' && <Link href="/admin/dashboard" className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-gold-400 hover:bg-ink-700">Admin<ChevronRight className="h-4 w-4" /></Link>}
                  <button onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});window.location.href='/';}}
                    className="flex w-full items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-red-400 hover:bg-ink-700"><LogOut className="h-4 w-4" /> Sign Out</button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/login"    className="rounded-2xl border-2 border-ink-400 px-4 py-3.5 text-center text-sm font-semibold text-white hover:bg-ink-700">Sign In</Link>
                  <Link href="/register" className="rounded-2xl bg-gold-500 px-4 py-3.5 text-center text-sm font-semibold text-ink-900 hover:bg-gold-400">Register</Link>
                </div>
              )}
              <Link href="/menu" className="btn-gold w-full justify-center py-4 text-sm mt-2">Order Now</Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── Mobile Bottom Navigation (KFC Pakistan style) ── */}
      <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-ink-600 bg-ink-900/96 backdrop-blur-xl"
        aria-label="Mobile navigation">
        <div className="grid grid-cols-4 h-16">
          {[
            { href:'/',         Icon:Home,             label:'Home'     },
            { href:'/menu',     Icon:UtensilsCrossed,  label:'Menu'     },
            { href:'/cart',     Icon:ShoppingBag,      label:'Cart',  badge:count },
            { href:'/branches', Icon:MapPin,            label:'Branches' },
          ].map(tab => {
            const active = pathname === tab.href;
            return (
              <Link key={tab.href} href={tab.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 relative transition-colors',
                  active ? 'text-gold-400' : 'text-ink-300',
                )}>
                <tab.Icon className="h-[22px] w-[22px]" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold leading-none">{tab.label}</span>
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute top-2 right-1/2 translate-x-4 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-gold-500 text-[9px] font-black text-ink-900 px-1">
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