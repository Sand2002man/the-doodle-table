'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { reviews } from '@/data/reviews';
import { formatDate } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 768) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, reviews.length - perView);

  const next = useCallback(
    () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
    [maxIndex]
  );
  const prev = useCallback(
    () => setIndex((i) => (i <= 0 ? maxIndex : i - 1)),
    [maxIndex]
  );

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const visible = reviews.slice(index, index + perView);
  // wrap if needed
  while (visible.length < perView && reviews.length > 0) {
    visible.push(reviews[visible.length % reviews.length]);
  }

  return (
    <section className="section-padding bg-beige-light/50">
      <div className="container-page">
        <SectionHeader
          eyebrow="Kind words"
          title="What Guests Are Saying"
          description="Real notes from tables around the room."
        />

        <div className="relative">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((review, i) => (
                <motion.blockquote
                  key={`${review.id}-${index}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col rounded-3xl border border-cream-300 bg-cream-50 p-6 shadow-soft"
                >
                  <div className="mb-3 flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${
                          s < review.rating
                            ? 'fill-terracotta text-terracotta'
                            : 'text-cream-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-[15px] leading-relaxed text-charcoal-light">
                    “{review.text}”
                  </p>
                  <footer className="mt-5 border-t border-cream-300 pt-4">
                    <cite className="not-italic">
                      <span className="font-medium text-charcoal">
                        {review.name}
                      </span>
                      {review.dish && (
                        <span className="mt-0.5 block text-xs text-charcoal-muted">
                          ordered {review.dish}
                        </span>
                      )}
                      <time
                        dateTime={review.date}
                        className="mt-1 block text-xs text-charcoal-soft"
                      >
                        {formatDate(review.date)}
                      </time>
                    </cite>
                  </footer>
                </motion.blockquote>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-white transition hover:border-terracotta hover:text-terracotta"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-terracotta' : 'w-2 bg-cream-300'
                  }`}
                  aria-label={`Go to review set ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-white transition hover:border-terracotta hover:text-terracotta"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
