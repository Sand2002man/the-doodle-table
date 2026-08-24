'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  ArrowDoodle,
  ForkDoodle,
  SpoonDoodle,
  PlateDoodle,
  StarDoodle,
  HandwrittenNote,
  OrganicBlob,
} from '@/components/doodles/Doodles';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28">
      <OrganicBlob className="-left-20 top-20 h-72 w-72 md:h-96 md:w-96" color="terracotta" />
      <OrganicBlob className="-right-16 bottom-20 h-64 w-64" color="sage" />

      <div className="container-page relative grid min-h-[calc(100svh-6rem)] items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-12">
        <div className="relative z-10 order-2 lg:order-1">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream-300 bg-white/70 px-4 py-1.5 text-xs font-medium text-charcoal-light shadow-soft backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Fresh · Local · Made With Love
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-charcoal sm:text-6xl md:text-7xl"
          >
            Come Hungry.
            <br />
            <span className="relative inline-block text-terracotta">
              Leave Happy.
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M4 8c50-5 100-6 150 0s90 6 142-3"
                  stroke="#5C7A5E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-md text-base leading-relaxed text-charcoal-muted md:text-lg"
          >
            Seasonal ingredients, bold flavors, and a table made for good
            conversations.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/reservations">
              <Button size="lg">Reserve a Table</Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="secondary">
                Explore Menu
              </Button>
            </Link>
            <div className="relative ml-1 hidden sm:block">
              <ArrowDoodle className="h-8 w-14 rotate-[-10deg]" />
            </div>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6"
          >
            <HandwrittenNote rotate={-4}>made fresh daily!</HandwrittenNote>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto w-full max-w-lg lg:order-2 lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift md:rounded-[2.5rem]">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&q=85"
              alt="Beautifully plated signature dish at The Doodle Table"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent" />
          </div>

          {/* Floating doodles */}
          <motion.div
            className="absolute -left-4 top-8 md:-left-8"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ForkDoodle className="h-14 w-7 rotate-[-15deg] opacity-70" />
          </motion.div>
          <motion.div
            className="absolute -right-2 top-1/3 md:-right-6"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <SpoonDoodle className="h-14 w-7 rotate-[12deg] opacity-70" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 left-1/4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ delay: 0.8 }}
          >
            <PlateDoodle className="h-14 w-14" />
          </motion.div>
          <motion.div
            className="absolute -right-1 top-4 md:right-4"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{ delay: 0.7, type: 'spring' }}
          >
            <StarDoodle className="h-9 w-9" animated />
          </motion.div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-6 right-2 max-w-[11rem] rounded-2xl border border-cream-300 bg-white/95 p-3 shadow-card backdrop-blur sm:right-6 sm:max-w-[13rem] sm:p-4"
          >
            <p className="font-hand text-sm text-terracotta">Chef&apos;s pick today</p>
            <p className="mt-1 text-sm font-medium leading-snug text-charcoal">
              Tandoori Cauliflower Steak
            </p>
            <p className="mt-1 text-xs text-charcoal-muted">₹480 · Signature</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-widest text-charcoal-soft">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-8 w-5 rounded-full border border-charcoal/20 p-1"
        >
          <div className="mx-auto h-1.5 w-1 rounded-full bg-terracotta" />
        </motion.div>
      </motion.div>
    </section>
  );
}
