'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, Package, Tag, ClipboardList, Users,
  Settings, MessageSquare, MapPin, Percent, Menu, X, Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href:'/admin/dashboard', label:'Dashboard',  icon:LayoutDashboard },
  { href:'/admin/orders',    label:'Orders',      icon:ClipboardList   },
  { href:'/admin/products',  label:'Products',    icon:Package         },
  { href:'/admin/categories',label:'Categories',  icon:Tag             },
  { href:'/admin/branches',  label:'Branches',    icon:MapPin          },
  { href:'/admin/customers', label:'Customers',   icon:Users           },
  { href:'/admin/coupons',   label:'Coupons',     icon:Percent         },
  { href:'/admin/messages',  label:'Messages',    icon:MessageSquare   },
  { href:'/admin/settings',  label:'Settings',    icon:Settings        },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-dark-300">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500">
          <span className="font-display text-lg text-dark-600 leading-none">7</span>
        </div>
        <div>
          <p className="font-display text-sm text-white leading-none">SEVEN SIDES</p>
          <p className="text-[10px] text-dark-200 mt-0.5">Admin Panel</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto admin-scroll">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
            className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
              pathname === href || pathname.startsWith(href+'/') ? 'bg-gold-500/20 text-gold-400' : 'text-dark-100 hover:bg-dark-400 hover:text-white')}>
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} /> {label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-dark-300 p-3">
        <Link href="/" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-dark-100 hover:text-white hover:bg-dark-400 transition-colors">← Back to Site</Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor:'#0A0A0A' }}>
      {/* Sidebar desktop */}
      <aside className="hidden w-56 shrink-0 border-r border-dark-300 bg-dark-500 lg:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-56 bg-dark-500 border-r border-dark-300 flex flex-col"><SidebarContent /></div>
          <div className="flex-1 bg-dark-600/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center border-b border-dark-300 bg-dark-500 px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-dark-300 text-white hover:bg-dark-400 mr-3 lg:hidden"><Menu className="h-5 w-5" /></button>
          <div className="flex-1" />
          <div className="flex items-center gap-1 rounded-full border border-dark-300 bg-dark-400 px-3 py-1.5">
            <Flame className="h-3.5 w-3.5 text-gold-400" strokeWidth={2} />
            <span className="text-xs font-semibold text-white">Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto admin-scroll p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}