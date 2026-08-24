'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'soft';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-terracotta text-white shadow-soft hover:bg-terracotta-dark hover:shadow-card hover:-translate-y-0.5',
  secondary:
    'border-2 border-charcoal/15 bg-transparent text-charcoal hover:border-terracotta hover:text-terracotta hover:-translate-y-0.5',
  ghost: 'bg-transparent text-charcoal-light hover:bg-beige hover:text-charcoal',
  outline:
    'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white',
  soft: 'bg-terracotta-muted text-terracotta-dark hover:bg-terracotta hover:text-white',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
  icon: 'p-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
