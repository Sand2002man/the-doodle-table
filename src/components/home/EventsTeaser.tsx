'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { events } from '@/data/events';
import { formatDate, formatPrice } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

export function EventsTeaser() {
  const featured = events.slice(0, 3);

  return (
    <section className="section-padding bg-beige-light/40">
      <div className="container-page">
        <SectionHeader
          eyebrow="On the calendar"
          title="Upcoming Events"
          description="Live music, chef's tables, brunches — pull up a chair."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
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
                <span className="absolute left-3 top-3 badge bg-white/95 text-charcoal">
                  {event.category}
                </span>
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
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-muted line-clamp-3">
                  {event.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-terracotta">
                    {event.price && event.price > 0
                      ? formatPrice(event.price)
                      : 'Complimentary'}
                  </span>
                  <Link href="/reservations">
                    <Button size="sm">Reserve</Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/events">
            <Button variant="secondary">All Events</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
