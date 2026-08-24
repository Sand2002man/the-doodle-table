'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Clock, Home, Utensils } from 'lucide-react';
import type { Order } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { restaurant } from '@/data/restaurant';
import { StarDoodle } from '@/components/doodles/Doodles';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('last-order');
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const orderNum = searchParams.get('order') || order?.orderNumber;

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-28 pb-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-sage-soft"
      >
        <Check className="h-12 w-12 text-sage" strokeWidth={2.5} />
        <motion.div
          className="absolute -right-2 -top-2"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 12 }}
          transition={{ delay: 0.4 }}
        >
          <StarDoodle className="h-8 w-8" color="#C45C26" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="font-hand text-xl text-terracotta">Order confirmed!</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">
          The kitchen is on it.
        </h1>
        {orderNum && (
          <p className="mt-3 text-charcoal-muted">
            Order number{' '}
            <span className="font-medium text-charcoal">{orderNum}</span>
          </p>
        )}
      </motion.div>

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 w-full max-w-md rounded-3xl border border-cream-300 bg-beige-light/60 p-6 text-left"
        >
          <div className="flex items-center gap-2 text-sm text-charcoal-muted">
            <Clock className="h-4 w-4" />
            Est. {order.estimatedTime} minutes
            {order.orderType === 'delivery' ? ' for delivery' : ''}
          </div>
          <ul className="mt-4 space-y-2 border-t border-cream-300 pt-4 text-sm">
            {order.items.map((item) => (
              <li key={item.cartId} className="flex justify-between">
                <span>
                  {item.quantity}× {item.name}
                </span>
                <span className="text-charcoal-muted">
                  {formatPrice(
                    (item.price +
                      item.addOns.reduce((s, a) => s + a.price, 0)) *
                      item.quantity
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-cream-300 pt-3 font-display text-lg">
            <span>Total</span>
            <span className="text-terracotta">{formatPrice(order.total)}</span>
          </div>
          <p className="mt-3 text-xs text-charcoal-soft">
            {formatDate(order.createdAt.split('T')[0])} ·{' '}
            {order.orderType.replace('-', ' ')} · {order.paymentMethod.toUpperCase()}
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <Link href="/">
          <Button leftIcon={<Home className="h-4 w-4" />}>Back home</Button>
        </Link>
        <Link href="/menu">
          <Button variant="secondary" leftIcon={<Utensils className="h-4 w-4" />}>
            Order more
          </Button>
        </Link>
      </motion.div>

      <p className="mt-8 max-w-sm text-xs text-charcoal-soft">
        Questions? Call us at {restaurant.phone} or email {restaurant.email}
      </p>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center pt-28">
          <div className="h-10 w-10 animate-pulse rounded-full bg-beige" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
