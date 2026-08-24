'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  doodle?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  doodle,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative mb-12 md:mb-16',
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl text-left',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 font-hand text-lg text-terracotta">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-medium leading-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-charcoal-muted md:text-lg">
          {description}
        </p>
      )}
      {doodle && (
        <div className="pointer-events-none absolute -right-4 -top-6 opacity-70 md:-right-12">
          {doodle}
        </div>
      )}
    </motion.div>
  );
}
