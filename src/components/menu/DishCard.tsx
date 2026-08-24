'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Flame, Leaf, Plus } from 'lucide-react';
import type { MenuItem } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import { toast } from '@/store/toast';
import { useState } from 'react';

interface DishCardProps {
  dish: MenuItem;
  index?: number;
  onOpen?: (dish: MenuItem) => void;
}

export function DishCard({ dish, index = 0, onOpen }: DishCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isFavorite } = useFavoritesStore();
  const fav = isFavorite(dish.id);
  const [heartBeat, setHeartBeat] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      menuItemId: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: 1,
      addOns: [],
    });
    toast(`${dish.name} added to your order`, 'success');
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(dish.id);
    setHeartBeat(true);
    setTimeout(() => setHeartBeat(false), 450);
    toast(
      fav ? 'Removed from favorites' : 'Saved to favorites',
      'info'
    );
  };

  const open = () => onOpen?.(dish);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.06, 0.3), duration: 0.5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream-300/70 bg-beige-light shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-beige">
        <Link href={`/menu/${dish.slug}`} onClick={open} className="block h-full w-full">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {dish.isSignature && (
            <span className="badge bg-terracotta text-white">Signature</span>
          )}
          {dish.isNew && (
            <span className="badge bg-sage text-white">New</span>
          )}
          {dish.isPopular && !dish.isSignature && (
            <span className="badge bg-charcoal/80 text-white">Popular</span>
          )}
        </div>
        <button
          onClick={handleFav}
          className={cn(
            'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition hover:scale-110',
            heartBeat && 'animate-heartbeat'
          )}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={cn(
              'h-4 w-4 transition',
              fav ? 'fill-terracotta text-terracotta' : 'text-charcoal-muted'
            )}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link href={`/menu/${dish.slug}`} onClick={open}>
            <h3 className="font-display text-lg leading-snug text-charcoal transition group-hover:text-terracotta sm:text-xl">
              {dish.name}
            </h3>
          </Link>
          <span className="shrink-0 font-medium text-terracotta">
            {formatPrice(dish.price)}
          </span>
        </div>

        <p className="mb-3 line-clamp-2 flex-1 text-sm leading-relaxed text-charcoal-muted">
          {dish.description}
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {dish.dietary.includes('vegetarian') && (
            <span className="inline-flex items-center gap-1 text-xs text-sage">
              <Leaf className="h-3 w-3" /> Veg
            </span>
          )}
          {dish.dietary.includes('vegan') && (
            <span className="badge bg-sage-soft text-sage-dark">Vegan</span>
          )}
          {dish.spiceLevel > 0 && (
            <span className="inline-flex items-center gap-0.5 text-xs text-terracotta">
              {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                <Flame key={i} className="h-3 w-3 fill-current" />
              ))}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="btn-primary flex-1 !py-2.5 text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            Add to order
          </button>
          <Link
            href={`/menu/${dish.slug}`}
            onClick={open}
            className="btn-ghost !px-3 !py-2.5 text-xs"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
