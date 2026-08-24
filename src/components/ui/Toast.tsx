'use client';

import { useToastStore } from '@/store/toast';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X, AlertTriangle } from 'lucide-react';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const styles = {
  success: 'border-sage/30 bg-sage-soft text-sage-dark',
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-cream-300 bg-cream-100 text-charcoal',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
      aria-live="polite"
      aria-relevant="additions"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-card backdrop-blur-sm',
                styles[t.type]
              )}
              role="status"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 rounded-full p-1 opacity-60 transition hover:opacity-100"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
