'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, LogOut, Package, CalendarDays } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useFavoritesStore } from '@/store/favorites';
import { getMenuItemById } from '@/data/menu';
import { formatPrice, formatDate } from '@/lib/utils';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';

export default function AccountPage() {
  const router = useRouter();
  const { user, orders, reservations, logout } = useAuthStore();
  const favIds = useFavoritesStore((s) => s.ids);
  const favorites = favIds
    .map((id) => getMenuItemById(id))
    .filter(Boolean);

  useEffect(() => {
    if (!user) router.replace('/login');
    else if (user.role === 'admin') router.replace('/admin');
  }, [user, router]);

  if (!user || user.role === 'admin') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pt-28">
        <div className="h-8 w-8 animate-pulse rounded-full bg-beige" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-4xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-hand text-lg text-terracotta">Your table</p>
            <h1 className="font-display text-3xl md:text-4xl">
              Hi, {user.name.split(' ')[0]}
            </h1>
            <p className="mt-1 text-sm text-charcoal-muted">{user.email}</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<LogOut className="h-4 w-4" />}
            onClick={() => {
              logout();
              toast('Signed out', 'info');
              router.push('/');
            }}
          >
            Sign out
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-cream-300 bg-beige-light/40 p-6">
            <h2 className="flex items-center gap-2 font-display text-xl">
              <Package className="h-5 w-5 text-terracotta" />
              Order history
            </h2>
            {orders.length === 0 ? (
              <p className="mt-4 text-sm text-charcoal-muted">
                No orders yet. Let&apos;s fix that.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {orders.slice(0, 5).map((o) => (
                  <li
                    key={o.id}
                    className="rounded-2xl border border-cream-300 bg-white/70 p-3 text-sm"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{o.orderNumber}</span>
                      <span className="text-terracotta">
                        {formatPrice(o.total)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-charcoal-muted">
                      {o.items.length} item(s) · {o.status} ·{' '}
                      {formatDate(o.createdAt.split('T')[0])}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/menu" className="mt-4 inline-block">
              <Button size="sm" variant="ghost">
                Order again
              </Button>
            </Link>
          </section>

          <section className="rounded-3xl border border-cream-300 bg-beige-light/40 p-6">
            <h2 className="flex items-center gap-2 font-display text-xl">
              <CalendarDays className="h-5 w-5 text-terracotta" />
              Reservations
            </h2>
            {reservations.length === 0 ? (
              <p className="mt-4 text-sm text-charcoal-muted">
                No reservations yet. Let&apos;s fix that.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {reservations.slice(0, 5).map((r) => (
                  <li
                    key={r.id}
                    className="rounded-2xl border border-cream-300 bg-white/70 p-3 text-sm"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{r.reservationNumber}</span>
                      <span className="capitalize text-sage">{r.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-charcoal-muted">
                      {formatDate(r.date)} · {r.time} · {r.guests} guests
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/reservations" className="mt-4 inline-block">
              <Button size="sm" variant="ghost">
                Book a table
              </Button>
            </Link>
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-cream-300 bg-beige-light/40 p-6">
          <h2 className="flex items-center gap-2 font-display text-xl">
            <Heart className="h-5 w-5 text-terracotta" />
            Saved dishes
          </h2>
          {favorites.length === 0 ? (
            <p className="mt-4 text-sm text-charcoal-muted">
              Tap the heart on any dish to save it here.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {favorites.map(
                (d) =>
                  d && (
                    <li key={d.id}>
                      <Link
                        href={`/menu/${d.slug}`}
                        className="flex items-center justify-between rounded-2xl border border-cream-300 bg-white/70 px-4 py-3 text-sm transition hover:border-terracotta/40"
                      >
                        <span className="font-medium">{d.name}</span>
                        <span className="text-terracotta">
                          {formatPrice(d.price)}
                        </span>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
