'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  CalendarDays,
  Star,
  PartyPopper,
  Tag,
  Settings,
  LogOut,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { menuItems } from '@/data/menu';
import { formatPrice } from '@/lib/utils';
import { toast } from '@/store/toast';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin#menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/admin#orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin#reservations', label: 'Reservations', icon: CalendarDays },
  { href: '/admin#reviews', label: 'Reviews', icon: Star },
  { href: '/admin#events', label: 'Events', icon: PartyPopper },
  { href: '/admin#offers', label: 'Offers', icon: Tag },
  { href: '/admin#settings', label: 'Settings', icon: Settings },
];

export default function AdminPage() {
  const router = useRouter();
  const { user, orders, reservations, logout } = useAuthStore();

  useEffect(() => {
    if (!user) router.replace('/login');
    else if (user.role !== 'admin') router.replace('/account');
  }, [user, router]);

  const today = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter((o) => o.createdAt.startsWith(today));
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const todayRes = reservations.filter((r) => r.date === today);

  const popular = useMemo(
    () =>
      [...menuItems]
        .filter((m) => m.isPopular)
        .slice(0, 5)
        .map((m) => ({ name: m.name, price: m.price, rating: m.rating })),
    []
  );

  // Mock chart data
  const revenueWeek = [12400, 15800, 11200, 18900, 22100, 25600, todayRevenue || 8400];
  const maxRev = Math.max(...revenueWeek, 1);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white lg:block">
          <div className="border-b border-slate-200 px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Admin
            </p>
            <p className="mt-0.5 font-semibold">The Doodle Table</p>
          </div>
          <nav className="space-y-0.5 p-3">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900',
                  item.label === 'Dashboard' && 'bg-slate-100 text-slate-900'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </nav>
          <div className="absolute bottom-0 hidden w-60 border-t border-slate-200 p-3 lg:block">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
            >
              ← View site
            </Link>
          </div>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-8">
            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <p className="text-xs text-slate-500">
                Welcome, {user.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 lg:hidden"
              >
                Site
              </Link>
              <button
                onClick={() => {
                  logout();
                  toast('Signed out', 'info');
                  router.push('/');
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </header>

          <div className="p-4 sm:p-8">
            {/* KPI cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Today's Orders",
                  value: String(todayOrders.length || 12),
                  icon: ShoppingBag,
                  color: 'bg-blue-50 text-blue-600',
                },
                {
                  label: "Today's Revenue",
                  value: formatPrice(todayRevenue || 18420),
                  icon: TrendingUp,
                  color: 'bg-emerald-50 text-emerald-600',
                },
                {
                  label: 'Reservations',
                  value: String(todayRes.length || 8),
                  icon: CalendarDays,
                  color: 'bg-violet-50 text-violet-600',
                },
                {
                  label: 'Pending Orders',
                  value: String(
                    orders.filter((o) => o.status === 'pending').length || 3
                  ),
                  icon: Users,
                  color: 'bg-amber-50 text-amber-600',
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {card.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight">
                        {card.value}
                      </p>
                    </div>
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        card.color
                      )}
                    >
                      <card.icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Revenue chart */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
                <h2 className="text-sm font-semibold">Revenue this week</h2>
                <div className="mt-6 flex h-48 items-end gap-2 sm:gap-3">
                  {revenueWeek.map((v, i) => (
                    <div
                      key={days[i]}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <span className="text-[10px] text-slate-400">
                        {formatPrice(v).replace('₹', '₹')}
                      </span>
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-orange-600 to-orange-400 transition-all"
                        style={{ height: `${(v / maxRev) * 100}%`, minHeight: 8 }}
                      />
                      <span className="text-xs text-slate-500">{days[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular dishes */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-semibold">Popular dishes</h2>
                <ul className="mt-4 space-y-3">
                  {popular.map((d, i) => (
                    <li
                      key={d.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                          {i + 1}
                        </span>
                        <span className="max-w-[10rem] truncate">{d.name}</span>
                      </span>
                      <span className="text-slate-500">
                        {formatPrice(d.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent orders + reservations */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2" id="orders">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-semibold">Recent orders</h2>
                {orders.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-500">
                    No live orders yet. Demo data shown on cards above. Place an
                    order on the site to see it here.
                  </p>
                ) : (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-xs text-slate-500">
                          <th className="pb-2 font-medium">Order</th>
                          <th className="pb-2 font-medium">Customer</th>
                          <th className="pb-2 font-medium">Total</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 8).map((o) => (
                          <tr key={o.id} className="border-b border-slate-50">
                            <td className="py-2.5 font-medium">
                              {o.orderNumber}
                            </td>
                            <td className="py-2.5 text-slate-600">
                              {o.customer.name}
                            </td>
                            <td className="py-2.5">{formatPrice(o.total)}</td>
                            <td className="py-2.5">
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 capitalize">
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                id="reservations"
              >
                <h2 className="text-sm font-semibold">Reservations</h2>
                {reservations.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-500">
                    No reservations stored yet. Book one on the site to populate
                    this list.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {reservations.slice(0, 8).map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-sm"
                      >
                        <div>
                          <p className="font-medium">{r.name}</p>
                          <p className="text-xs text-slate-500">
                            {r.date} · {r.time} · {r.guests} guests
                          </p>
                        </div>
                        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 capitalize">
                          {r.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Menu management teaser */}
            <div
              id="menu"
              className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Menu items</h2>
                <span className="text-xs text-slate-500">
                  {menuItems.length} dishes · read-only demo
                </span>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs text-slate-500">
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 font-medium">Price</th>
                      <th className="pb-2 font-medium">Categories</th>
                      <th className="pb-2 font-medium">Flags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.slice(0, 10).map((m) => (
                      <tr key={m.id} className="border-b border-slate-50">
                        <td className="py-2.5 font-medium">{m.name}</td>
                        <td className="py-2.5">{formatPrice(m.price)}</td>
                        <td className="py-2.5 text-slate-500">
                          {m.category.slice(0, 2).join(', ')}
                        </td>
                        <td className="py-2.5">
                          <div className="flex gap-1">
                            {m.isPopular && (
                              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">
                                Popular
                              </span>
                            )}
                            {m.isSignature && (
                              <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] text-orange-700">
                                Signature
                              </span>
                            )}
                            {m.isNew && (
                              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-700">
                                New
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Full CRUD for menu, events, offers, and settings is structured
                for backend connection. Data currently lives in{' '}
                <code className="rounded bg-slate-100 px-1">src/data/*</code>.
              </p>
            </div>

            <div id="settings" className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold">Restaurant settings</h2>
              <p className="mt-2 text-sm text-slate-500">
                Brand info is centralized in{' '}
                <code className="rounded bg-slate-100 px-1">
                  src/data/restaurant.ts
                </code>
                . Connect a database to enable live editing of hours, tax rates,
                delivery fees, and contact details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
