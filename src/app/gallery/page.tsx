'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/data/gallery';
import { cn } from '@/lib/utils';
import type { GalleryImage } from '@/types';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'food', label: 'Food' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'people', label: 'People' },
  { value: 'events', label: 'Events' },
] as const;

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const images =
    filter === 'all'
      ? galleryImages
      : galleryImages.filter((g) => g.category === filter);

  const openAt = (img: GalleryImage) => {
    const idx = images.findIndex((g) => g.id === img.id);
    setLightbox(idx);
  };

  const prev = () =>
    setLightbox((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        <header className="mb-10 max-w-xl">
          <p className="font-hand text-lg text-terracotta">A visual feast</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">Gallery</h1>
          <p className="mt-3 text-charcoal-muted">
            Plates, people, and the room we share — captured in warm light.
          </p>
        </header>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setFilter(c.value)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition',
                filter === c.value
                  ? 'bg-charcoal text-cream-50'
                  : 'bg-beige text-charcoal-light hover:bg-beige-dark'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              onClick={() => openAt(img)}
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline-none"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: `${img.width} / ${img.height}`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && images[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              key={images[lightbox].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={images[lightbox].src}
                  alt={images[lightbox].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-sm text-cream-200">
                {images[lightbox].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
