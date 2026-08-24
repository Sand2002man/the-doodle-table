'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';
import { restaurant } from '@/data/restaurant';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotals } =
    useCartStore();
  const totals = getTotals();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-charcoal/40 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-cream-50 shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-cream-300 px-5 py-4">
              <div>
                <h2 className="font-display text-xl">Your Order</h2>
                <p className="text-xs text-charcoal-muted">
                  {items.reduce((n, i) => n + i.quantity, 0)} item
                  {items.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="rounded-full p-2 hover:bg-beige"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-beige">
                  <ShoppingBag className="h-8 w-8 text-charcoal-soft" />
                </div>
                <p className="font-display text-2xl text-charcoal">
                  Your table is waiting.
                </p>
                <p className="mt-2 text-sm text-charcoal-muted">
                  Explore the menu and add something delicious.
                </p>
                <Link href="/menu" onClick={closeCart} className="mt-6">
                  <Button>Explore Menu</Button>
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                  {items.map((item) => {
                    const addOnSum = item.addOns.reduce((s, a) => s + a.price, 0);
                    return (
                      <li
                        key={item.cartId}
                        className="flex gap-3 rounded-2xl border border-cream-300/80 bg-white/70 p-3"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate font-medium text-charcoal">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => {
                                removeItem(item.cartId);
                                toast('Removed from cart', 'info');
                              }}
                              className="shrink-0 rounded p-1 text-charcoal-soft hover:text-terracotta"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          {item.addOns.length > 0 && (
                            <p className="mt-0.5 text-xs text-charcoal-muted">
                              + {item.addOns.map((a) => a.name).join(', ')}
                            </p>
                          )}
                          {item.specialInstructions && (
                            <p className="mt-0.5 truncate text-xs italic text-charcoal-soft">
                              “{item.specialInstructions}”
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-cream-300 bg-cream-50">
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartId, item.quantity - 1)
                                }
                                className="p-1.5"
                                aria-label="Decrease"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="min-w-[1.5rem] text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartId, item.quantity + 1)
                                }
                                className="p-1.5"
                                aria-label="Increase"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-terracotta">
                              {formatPrice(
                                (item.price + addOnSum) * item.quantity
                              )}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t border-cream-300 bg-beige-light/80 px-5 py-5">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-charcoal-muted">
                      <dt>Subtotal</dt>
                      <dd>{formatPrice(totals.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-charcoal-muted">
                      <dt>Tax ({Math.round(restaurant.taxRate * 100)}%)</dt>
                      <dd>{formatPrice(totals.tax)}</dd>
                    </div>
                    <div className="flex justify-between text-charcoal-muted">
                      <dt>
                        Service ({Math.round(restaurant.serviceChargeRate * 100)}%)
                      </dt>
                      <dd>{formatPrice(totals.serviceCharge)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-cream-300 pt-2 font-display text-lg text-charcoal">
                      <dt>Total</dt>
                      <dd className="text-terracotta">
                        {formatPrice(totals.total)}
                      </dd>
                    </div>
                  </dl>
                  <Link href="/checkout" onClick={closeCart} className="mt-4 block">
                    <Button className="w-full !py-3.5">Proceed to Checkout</Button>
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-2 w-full py-2 text-center text-sm text-charcoal-muted hover:text-charcoal"
                  >
                    Continue browsing
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
