'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { StarDoodle, OrganicBlob } from '@/components/doodles/Doodles';
import { restaurant } from '@/data/restaurant';

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <OrganicBlob className="-left-10 top-0 h-64 w-64" color="terracotta" />
      <OrganicBlob className="right-0 bottom-0 h-72 w-72" color="sage" />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-[2rem] border border-cream-300 bg-gradient-to-br from-terracotta to-terracotta-dark px-6 py-14 text-center shadow-lift sm:px-12"
        >
          <StarDoodle className="mx-auto mb-4 h-8 w-8" color="#F5D4C0" />
          <h2 className="font-display text-3xl text-white md:text-4xl lg:text-5xl">
            Your table is ready.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream-100/85">
            Book a seat, order ahead, or just drop by. {restaurant.tagline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/reservations">
              <Button
                size="lg"
                className="!bg-white !text-terracotta hover:!bg-cream-100"
              >
                Reserve a Table
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                size="lg"
                variant="secondary"
                className="!border-white/40 !text-white hover:!bg-white hover:!text-terracotta"
              >
                Order Online
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
