'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { offers } from '@/data/events';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

export function OffersSection() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeader
          eyebrow="Something special"
          title="Offers & Occasions"
          description="Reasons to gather — from lazy brunches to candlelit dates."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {offers.map((offer, i) => (
            <motion.article
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-cream-300 shadow-soft"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                {offer.badge && (
                  <span className="absolute left-4 top-4 badge bg-white/95 text-charcoal">
                    {offer.badge}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <h3 className="font-display text-2xl text-white sm:text-3xl">
                    {offer.title}
                  </h3>
                  <p className="mt-1 font-hand text-base text-terracotta-soft sm:text-lg">
                    {offer.subtitle}
                  </p>
                  <p className="mt-2 max-w-md text-sm text-cream-200/80 line-clamp-2">
                    {offer.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={offer.ctaLink}>
                      <Button size="sm">{offer.cta}</Button>
                    </Link>
                    <Link href="/reservations">
                      <Button size="sm" variant="secondary" className="!border-white/30 !text-white hover:!border-white hover:!bg-white hover:!text-charcoal">
                        Reserve Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
