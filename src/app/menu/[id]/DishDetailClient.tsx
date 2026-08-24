'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Flame, Leaf, Clock, Minus, Plus, AlertTriangle } from 'lucide-react';
import type { MenuItem, CartAddOn } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';
import { getPopularDishes } from '@/data/menu';
import { DishCard } from '@/components/menu/DishCard';

export function DishDetailClient({ dish }: { dish: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<CartAddOn[]>([]);
  const [notes, setNotes] = useState('');

  const related = getPopularDishes()
    .filter((d) => d.id !== dish.id)
    .slice(0, 3);

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
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container-page">
        <Link
          href="/menu"
          className="mb-6 inline-flex items-center gap-2 text-sm text-charcoal-muted transition hover:text-terracotta"
        >
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-card sm:aspect-[4/3] lg:aspect-square">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {dish.isSignature && (
                <span className="badge bg-terracotta text-white">Signature</span>
              )}
              {dish.isNew && <span className="badge bg-sage text-white">New</span>}
              {dish.isPopular && (
                <span className="badge bg-charcoal text-white">Popular</span>
              )}
            </div>
            <h1 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl">
              {dish.name}
            </h1>
            <p className="mt-2 font-display text-2xl text-terracotta">
              {formatPrice(dish.price)}
            </p>
            <p className="mt-4 leading-relaxed text-charcoal-muted">
              {dish.longDescription || dish.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-sm">
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
              {dish.calories && (
                <span className="text-charcoal-muted">{dish.calories} kcal</span>
              )}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-lg">Ingredients</h2>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {dish.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="rounded-full bg-beige px-2.5 py-1 text-xs"
                    >
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              {dish.allergens.length > 0 && (
                <div>
                  <h2 className="flex items-center gap-1.5 font-display text-lg">
                    <AlertTriangle className="h-4 w-4 text-terracotta" />
                    Allergens
                  </h2>
                  <p className="mt-2 text-sm text-charcoal-muted">
                    {dish.allergens.join(' · ')}
                  </p>
                </div>
              )}
            </div>

            {dish.addOns && dish.addOns.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-lg">Add-ons</h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
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
              <label htmlFor="notes" className="label-field">
                Any special request?
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="e.g. less spicy, no onion..."
                className="input-field resize-none"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-cream-300 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-3"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button onClick={handleAdd} size="lg" className="flex-1 sm:flex-none">
                Add to Cart · {formatPrice(lineTotal)}
              </Button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 font-display text-2xl md:text-3xl">
              You might also like
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((d, i) => (
                <DishCard key={d.id} dish={d} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
