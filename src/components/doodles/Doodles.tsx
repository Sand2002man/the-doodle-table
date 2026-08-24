'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface DoodleProps {
  className?: string;
  animated?: boolean;
  color?: string;
}

export function StarDoodle({ className, animated, color = '#C45C26' }: DoodleProps) {
  const Comp = animated ? motion.svg : 'svg';
  const animProps = animated
    ? {
        initial: { scale: 0, rotate: -20, opacity: 0 },
        animate: { scale: 1, rotate: 0, opacity: 1 },
        transition: { delay: 0.6, type: 'spring' as const, stiffness: 200 },
      }
    : {};

  return (
    <Comp
      viewBox="0 0 40 40"
      fill="none"
      className={cn('h-8 w-8', className)}
      aria-hidden
      {...animProps}
    >
      <path
        d="M20 2 L23 15 L36 15 L25.5 23 L29.5 36 L20 28 L10.5 36 L14.5 23 L4 15 L17 15 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
    </Comp>
  );
}

export function ForkDoodle({ className, color = '#2C2420' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 32 64"
      fill="none"
      className={cn('h-16 w-8', className)}
      aria-hidden
    >
      <path
        d="M8 4 V22 M16 4 V22 M24 4 V22 M8 22 Q16 28 24 22 M16 26 V58"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function SpoonDoodle({ className, color = '#2C2420' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 32 64"
      fill="none"
      className={cn('h-16 w-8', className)}
      aria-hidden
    >
      <ellipse
        cx="16"
        cy="12"
        rx="10"
        ry="12"
        stroke={color}
        strokeWidth="2"
        opacity="0.55"
      />
      <path
        d="M16 24 V58"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function PlateDoodle({ className, color = '#C45C26' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={cn('h-16 w-16', className)}
      aria-hidden
    >
      <circle cx="40" cy="40" r="34" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="40" cy="40" r="22" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <circle cx="40" cy="40" r="6" stroke={color} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

export function ArrowDoodle({ className, color = '#C45C26' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 80 40"
      fill="none"
      className={cn('h-8 w-16', className)}
      aria-hidden
    >
      <path
        d="M4 28 C20 8, 50 8, 68 22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M58 14 L70 24 L56 30"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function HeartDoodle({ className, color = '#C45C26', filled }: DoodleProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 30"
      fill={filled ? color : 'none'}
      className={cn('h-6 w-6', className)}
      aria-hidden
    >
      <path
        d="M16 26 C16 26 4 18 4 10 C4 5.5 7.5 3 11 3 C13.5 3 15.2 4.5 16 6 C16.8 4.5 18.5 3 21 3 C24.5 3 28 5.5 28 10 C28 18 16 26 16 26 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CircleDoodle({ className, color = '#C45C26' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      className={cn('h-10 w-20', className)}
      aria-hidden
    >
      <ellipse
        cx="50"
        cy="30"
        rx="46"
        ry="24"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="4 2"
        opacity="0.7"
        transform="rotate(-3 50 30)"
      />
    </svg>
  );
}

export function CoffeeDoodle({ className, color = '#2C2420' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn('h-10 w-10', className)}
      aria-hidden
    >
      <path
        d="M10 16 H32 V34 C32 38 28 42 22 42 H20 C14 42 10 38 10 34 V16 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M32 20 H36 C40 20 42 24 42 28 C42 32 40 34 36 34 H32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M16 8 C16 8 14 12 16 14 M22 6 C22 6 20 11 22 14 M28 8 C28 8 26 12 28 14"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function HerbDoodle({ className, color = '#5C7A5E' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 56"
      fill="none"
      className={cn('h-12 w-8', className)}
      aria-hidden
    >
      <path
        d="M20 52 V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M20 40 C10 36 6 28 8 20 C14 24 18 30 20 36"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M20 34 C30 30 34 22 32 14 C26 18 22 24 20 30"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M20 22 C14 18 12 12 14 6 C18 10 20 14 20 18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

export function LemonDoodle({ className, color = '#E07A3D' }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn('h-10 w-10', className)}
      aria-hidden
    >
      <ellipse
        cx="24"
        cy="26"
        rx="16"
        ry="14"
        stroke={color}
        strokeWidth="2"
        opacity="0.6"
        transform="rotate(-20 24 26)"
      />
      <path
        d="M30 12 C32 8 36 8 38 12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M18 22 C20 24 22 28 20 32 M24 20 C26 24 28 28 26 34 M28 24 C30 26 30 30 28 34"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export function HandwrittenNote({
  children,
  className,
  rotate = -6,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={cn(
        'inline-block font-hand text-terracotta text-lg md:text-xl',
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

export function OrganicBlob({
  className,
  color = 'terracotta',
}: {
  className?: string;
  color?: 'terracotta' | 'sage' | 'cream';
}) {
  const fills = {
    terracotta: 'fill-terracotta/10',
    sage: 'fill-sage/10',
    cream: 'fill-cream-300/40',
  };
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn('absolute', className)}
      aria-hidden
    >
      <path
        className={fills[color]}
        d="M44.7,-67.3C57.9,-59.2,68.5,-46.5,75.4,-31.8C82.3,-17.1,85.5,-0.3,81.8,14.5C78.1,29.3,67.5,42.1,54.8,52.4C42.1,62.7,27.3,70.5,11.2,74.2C-4.9,77.9,-22.3,77.5,-37.4,70.8C-52.5,64.1,-65.3,51.1,-73.2,35.4C-81.1,19.7,-84.1,1.3,-79.8,-14.8C-75.5,-30.9,-63.9,-44.7,-50.1,-52.8C-36.3,-60.9,-20.3,-63.3,-4.2,-67.8C11.9,-72.3,31.5,-75.4,44.7,-67.3Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function SketchUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      className={cn('mx-auto mt-1 h-3 w-40', className)}
      aria-hidden
    >
      <path
        d="M2 8c40-6 80-6 120 0s40 6 76-2"
        stroke="#C45C26"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}
