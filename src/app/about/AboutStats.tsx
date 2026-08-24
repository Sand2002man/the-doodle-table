'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export function AboutStats({
  stats,
}: {
  stats: { label: string; value: number; suffix: string }[];
}) {
  return (
    <div className="mt-16 grid grid-cols-2 gap-6 rounded-[2rem] border border-cream-300 bg-charcoal px-6 py-10 text-center sm:grid-cols-4 sm:px-10">
      {stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setN(value);
      return;
    }
    const start = performance.now();
    const dur = 1500;
    const frame = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <p className="font-display text-3xl text-terracotta-soft md:text-4xl">
        {n}
        {suffix}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-cream-300/70">
        {label}
      </p>
    </div>
  );
}
