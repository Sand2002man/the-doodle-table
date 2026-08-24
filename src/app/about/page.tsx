import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { chef, stats, restaurant } from '@/data/restaurant';
import { AboutStats } from './AboutStats';
import { Button } from '@/components/ui/Button';
import { HerbDoodle } from '@/components/doodles/Doodles';

export const metadata: Metadata = {
  title: 'About',
  description: `The story of ${restaurant.name} — local ingredients, seasonal cooking, and a table made for gathering.`,
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-hand text-lg text-terracotta">Our story</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl lg:text-6xl">
            More Than A Meal.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal-muted">
            {restaurant.description}
          </p>
        </header>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:col-span-7 md:aspect-auto md:min-h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=80"
              alt="Dining room at The Doodle Table"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center gap-6 md:col-span-5 md:pl-6">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80"
                alt="Signature plated dish"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
            <p className="font-display text-2xl leading-snug text-charcoal md:text-3xl">
              Local ingredients. Seasonal cooking. Community at the centre.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl space-y-6 text-base leading-relaxed text-charcoal-muted md:text-lg">
          <p>
            The Doodle Table began as a sketchbook of recipes — margins filled
            with spice notes, doodles of plates, and the quiet conviction that
            restaurants should feel like homes you dress up for.
          </p>
          <p>
            We partner with{' '}
            <strong className="font-medium text-charcoal">
              25 local suppliers
            </strong>{' '}
            across Odisha and beyond: farmers who grow what the season allows,
            fishers who know the coast, bakers who mill their own flour. Our
            menu shifts with the market, not a spreadsheet.
          </p>
          <p>
            Hospitality, for us, is craft. It is remembering a regular&apos;s
            order, celebrating birthdays with a handwritten note, and never
            rushing a table that wants to linger. Food is the excuse. Connection
            is the point.
          </p>
        </div>

        <AboutStats stats={stats} />

        {/* Values */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Local',
              text: 'We source within reach whenever we can — fresher flavour, fairer farms.',
            },
            {
              title: 'Seasonal',
              text: 'Menus that breathe with the weather. Mangoes in summer. Greens after rain.',
            },
            {
              title: 'Craft',
              text: 'Techniques honoured, recipes rewritten. Tradition with a curious twist.',
            },
            {
              title: 'Family',
              text: 'A room for first dates, reunions, solo lunches, and everything between.',
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-cream-300 bg-beige-light/50 p-6"
            >
              <h3 className="font-display text-xl text-terracotta">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                {v.text}
              </p>
            </div>
          ))}
        </div>

        {/* Chef */}
        <section className="mt-24 grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
            <Image
              src={chef.image}
              alt={chef.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="relative">
            <div className="absolute -left-4 -top-4 opacity-40">
              <HerbDoodle />
            </div>
            <p className="font-hand text-lg text-terracotta">{chef.title}</p>
            <h2 className="mt-1 font-display text-3xl md:text-4xl">
              {chef.name}
            </h2>
            <p className="mt-5 leading-relaxed text-charcoal-muted">{chef.bio}</p>
            <blockquote className="mt-6 border-l-2 border-terracotta pl-4 italic text-charcoal-light">
              “{chef.philosophy}”
            </blockquote>
            <p className="mt-4 font-hand text-lg text-terracotta">
              {chef.doodleNote}
            </p>
            <p className="mt-6 text-sm text-charcoal-muted">
              Signature dish:{' '}
              <span className="font-medium text-charcoal">
                {chef.signatureDish}
              </span>
            </p>
          </div>
        </section>

        <div className="mt-20 text-center">
          <Link href="/reservations">
            <Button size="lg">Reserve a Table</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
