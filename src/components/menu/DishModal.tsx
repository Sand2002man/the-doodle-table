'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Flame, Leaf, Clock, AlertTriangle } from 'lucide-react';
import type { MenuItem, CartAddOn } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';

interface DishModalProps {
  dish: MenuItem | null;
  open: boolean;
  onClose: () => void;
}

export function DishModal({ dish, open, onClose }: DishModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<CartAddOn[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (open) {
      setQty(1);
      setSelectedAddOns([]);
      setNotes('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, dish?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!dish) return null;

  const toggleAddOn = (addon: { id: string; name: string; price: number }) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((a) => a.id === addon.id);
      if (exists) return prev.filter((a) => a.id !== addon.id);
      return [...prev, addon];
    });
  };

  const addOnTotal = selectedAddOns.reduce((s, a) => s + a.price, 0);
  const lineTotal = (dish.price + addOnTotal) * qty;

  const handleAdd = () => {
    addItem({
      menuItemId: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: qty,
      addOns: selectedAddOns,
      specialInstructions: notes || undefined,
    });
    toast(`${dish.name} added to your order`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-4xl bg-cream-50 shadow-lift sm:rounded-4xl"
          >
            <div className="relative h-56 shrink-0 sm:h-72">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition hover:bg-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <h2
                  id="dish-modal-title"
                  className="font-display text-2xl text-white sm:text-3xl"
                >
                  {dish.name}
                </h2>
                <p className="mt-1 text-lg font-medium text-terracotta-soft">
                  {formatPrice(dish.price)}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8">
              <p className="leading-relaxed text-charcoal-muted">
                {dish.longDescription || dish.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {dish.dietary.includes('vegetarian') && (
                  <span className="inline-flex items-center gap-1 text-sage">
                    <Leaf className="h-4 w-4" /> Vegetarian
                  </span>
                )}
                {dish.dietary.includes('vegan') && (
                  <span className="badge bg-sage-soft text-sage-dark">Vegan</span>
                )}
                {dish.spiceLevel > 0 && (
                  <span className="inline-flex items-center gap-1 text-terracotta">
                    Spice{' '}
                    {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                      <Flame key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-charcoal-muted">
                  <Clock className="h-4 w-4" /> {dish.prepTime} min
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-display text-base">Ingredients</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {dish.ingredients.map((ing) => (
                      <li
                        key={ing}
                        className="rounded-full bg-beige px-2.5 py-1 text-xs text-charcoal-light"
                      >
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                {dish.allergens.length > 0 && (
                  <div>
                    <h3 className="mb-2 flex items-center gap-1.5 font-display text-base">
                      <AlertTriangle className="h-4 w-4 text-terracotta" />
                      Allergens
                    </h3>
                    <p className="text-sm text-charcoal-muted">
                      {dish.allergens.join(' · ')}
                    </p>
                  </div>
                )}
              </div>

              {dish.addOns && dish.addOns.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 font-display text-base">Add-ons</h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {dish.addOns.map((addon) => {
                      const checked = selectedAddOns.some((a) => a.id === addon.id);
                      return (
                        <label
                          key={addon.id}
                          className={cn(
                            'flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition',
                            checked
                              ? 'border-terracotta bg-terracotta-muted/40'
                              : 'border-cream-300 bg-white/60 hover:border-terracotta/40'
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleAddOn(addon)}
                              className="accent-terracotta"
                            />
                            {addon.name}
                          </span>
                          <span className="text-charcoal-muted">
                            +{formatPrice(addon.price)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <label htmlFor="special-notes" className="label-field">
                  Any special request?
                </label>
                <textarea
                  id="special-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. less spicy, no onion..."
                  className="input-field resize-none"
                />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 border-t border-cream-300 bg-cream-50/95 px-5 py-4 backdrop-blur sm:px-8">
              <div className="flex items-center rounded-full border border-cream-300 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-charcoal-muted transition hover:text-charcoal"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2.5 text-charcoal-muted transition hover:text-charcoal"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button onClick={handleAdd} className="flex-1 !py-3.5">
                Add · {formatPrice(lineTotal)}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
