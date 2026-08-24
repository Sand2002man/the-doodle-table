import type { Metadata } from 'next';
import { MenuBrowser } from '@/components/menu/MenuBrowser';
import { StarDoodle } from '@/components/doodles/Doodles';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore our full menu — contemporary Indian, fusion plates, desserts, and artisan drinks at The Doodle Table.',
};

export default function MenuPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        <header className="relative mb-10 max-w-2xl">
          <p className="font-hand text-lg text-terracotta">The full spread</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">Our Menu</h1>
          <p className="mt-3 text-charcoal-muted">
            Contemporary Indian, playful fusion, and plates made for sharing.
            Filter by mood, diet, or craving.
          </p>
          <div className="absolute -right-2 top-0 hidden sm:block md:-right-16">
            <StarDoodle className="h-10 w-10 rotate-12 opacity-70" />
          </div>
        </header>
        <MenuBrowser />
      </div>
    </div>
  );
}
