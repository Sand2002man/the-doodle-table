'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSignatureDishes } from '@/data/menu';
import { DishCard } from '@/components/menu/DishCard';
import { DishModal } from '@/components/menu/DishModal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { StarDoodle } from '@/components/doodles/Doodles';
import type { MenuItem } from '@/types';

export function SignatureDishes() {
  const dishes = getSignatureDishes().slice(0, 6);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <section className="section-padding relative">
      <div className="container-page">
        <SectionHeader
          eyebrow="From our kitchen"
          title="Signature Dishes"
          description="The plates guests ask for by name — crafted with seasonal produce and a little bit of play."
          doodle={<StarDoodle className="h-10 w-10 rotate-12" />}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, i) => (
            <DishCard
              key={dish.id}
              dish={dish}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/menu">
            <Button variant="secondary" size="lg">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>

      <DishModal
        dish={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
