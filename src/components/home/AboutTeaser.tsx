'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/data/restaurant';
import { Button } from '@/components/ui/Button';
import { HandwrittenNote, HerbDoodle } from '@/components/doodles/Doodles';

function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      start = Math.round(value * eased);
      setDisplay(start);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl text-terracotta md:text-4xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-charcoal-muted md:text-sm">
        {label}
      </p>
    </div>
  );
}

export function AboutTeaser() {
  return (
    <section className="section-padding relative overflow-hidden bg-beige-light/60">
      <div className="pointer-events-none absolute right-8 top-12 opacity-40">
        <HerbDoodle className="h-16 w-10" />
      </div>
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
                alt="Warm dining room at The Doodle Table"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-40 overflow-hidden rounded-2xl border-4 border-cream-50 shadow-card sm:block md:-right-8">
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80"
                  alt="Hands plating a dish"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="font-hand text-lg text-terracotta">Our story</p>
            <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
              More Than A Meal.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-muted md:text-lg">
              We believe a restaurant is a gathering place first — a room where
              local ingredients, seasonal cooking, and genuine hospitality turn
              strangers into regulars. Every plate is a small act of craft.
              Every table, an invitation to linger.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal-muted">
              From family recipes reimagined to fusion dishes born of curiosity,
              The Doodle Table is built on community, care, and the joy of
              feeding people well.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 rounded-3xl border border-cream-300 bg-cream-50/80 p-6 sm:grid-cols-4">
              {stats.map((s) => (
                <AnimatedStat key={s.label} {...s} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button>Our Full Story</Button>
              </Link>
              <HandwrittenNote rotate={-3}>est. 2014</HandwrittenNote>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
