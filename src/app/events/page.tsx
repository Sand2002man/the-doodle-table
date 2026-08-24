import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { events, offers } from '@/data/events';
import { formatDate, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Events & Offers',
  description:
    'Live music, chef’s table, weekend brunch, and special offers at The Doodle Table.',
};

export default function EventsPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        <header className="mb-12 max-w-xl">
          <p className="font-hand text-lg text-terracotta">Gatherings</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">
            Events & Offers
          </h1>
          <p className="mt-3 text-charcoal-muted">
            From intimate chef&apos;s tables to lively brunch socials — there is
            always a reason to pull up a chair.
          </p>
        </header>

        <section className="mb-20">
          <h2 className="mb-6 font-display text-2xl">Current offers</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {offers.map((offer) => (
              <article
                key={offer.id}
                className="group relative overflow-hidden rounded-3xl border border-cream-300 shadow-soft"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                  {offer.badge && (
                    <span className="absolute left-4 top-4 badge bg-white text-charcoal">
                      {offer.badge}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl text-white">
                      {offer.title}
                    </h3>
                    <p className="mt-1 font-hand text-terracotta-soft">
                      {offer.subtitle}
                    </p>
                    <p className="mt-2 text-sm text-cream-200/80 line-clamp-2">
                      {offer.description}
                    </p>
                    <Link href={offer.ctaLink} className="mt-4 inline-block">
                      <Button size="sm">{offer.cta}</Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-display text-2xl">Upcoming events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-cream-300 bg-cream-50 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 badge bg-white/95">
                    {event.category}
                  </span>
                  {event.isSoldOut && (
                    <span className="absolute right-3 top-3 badge bg-charcoal text-white">
                      Sold out
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl">{event.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-charcoal-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(event.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-muted">
                    {event.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-terracotta">
                      {event.price && event.price > 0
                        ? formatPrice(event.price)
                        : 'Free / on request'}
                    </span>
                    <Link href="/reservations">
                      <Button size="sm" disabled={event.isSoldOut}>
                        {event.isSoldOut ? 'Sold out' : 'Reserve'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
