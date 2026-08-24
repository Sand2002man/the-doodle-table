'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { restaurant } from '@/data/restaurant';
import { toast } from '@/store/toast';
import { isValidEmail } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail } from 'lucide-react';
import { HerbDoodle, StarDoodle } from '@/components/doodles/Doodles';

function SocialIcon({ type }: { type: 'instagram' | 'facebook' | 'twitter' | 'youtube' }) {
  const paths: Record<string, React.ReactNode> = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    twitter: <path d="M4 4l11.5 16h4.5L8.5 4H4zm11 0l-4 5.5M9 14.5L4.5 20" />,
    youtube: (
      <>
        <path d="M22.5 6.5a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.5 2.8 2.8 0 0 0 2 2C5.1 20 12 20 12 20s6.9 0 8.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.5z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      {paths[type]}
    </svg>
  );
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/events', label: 'Events' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact', label: 'Contact' },
];

const menuLinks = [
  { href: '/menu?category=starters', label: 'Starters' },
  { href: '/menu?category=mains', label: 'Mains' },
  { href: '/menu?category=indian-specials', label: 'Indian Specials' },
  { href: '/menu?category=desserts', label: 'Desserts' },
  { href: '/menu?category=drinks', label: 'Drinks' },
];

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (pathname.startsWith('/admin')) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast('Please enter a valid email address.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail('');
      toast('Welcome to the table! Check your inbox soon.', 'success');
    }, 600);
  };

  return (
    <footer className="relative mt-8 border-t border-cream-300 bg-charcoal text-cream-100">
      <div className="pointer-events-none absolute -top-6 right-12 opacity-40">
        <StarDoodle className="h-10 w-10" color="#E07A3D" />
      </div>

      <div className="container-page section-padding !pb-10 !pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl text-cream-50">
                The Doodle Table
              </span>
            </Link>
            <p className="mt-2 font-hand text-lg text-terracotta-soft">
              {restaurant.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-300/80">
              {restaurant.description}
            </p>
            <div className="mt-6 flex gap-3">
              {(
                [
                  { type: 'instagram' as const, href: restaurant.social.instagram, label: 'Instagram' },
                  { type: 'facebook' as const, href: restaurant.social.facebook, label: 'Facebook' },
                  { type: 'twitter' as const, href: restaurant.social.twitter, label: 'Twitter' },
                  { type: 'youtube' as const, href: restaurant.social.youtube, label: 'YouTube' },
                ]
              ).map(({ type, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-200 transition hover:border-terracotta hover:bg-terracotta hover:text-white"
                >
                  <SocialIcon type={type} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-lg text-cream-50">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream-300/75 transition hover:text-terracotta-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-lg text-cream-50">Menu</h3>
            <ul className="mt-4 space-y-2.5">
              {menuLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream-300/75 transition hover:text-terracotta-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-display text-lg text-cream-50">Visit Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream-300/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-soft" />
                <span>
                  {restaurant.address.street}
                  <br />
                  {restaurant.address.city}, {restaurant.address.state}{' '}
                  {restaurant.address.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-terracotta-soft" />
                <a href={`tel:${restaurant.phone}`} className="hover:text-terracotta-soft">
                  {restaurant.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-terracotta-soft" />
                <a href={`mailto:${restaurant.email}`} className="hover:text-terracotta-soft">
                  {restaurant.email}
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <p className="mb-1 font-hand text-base text-terracotta-soft">
                Get delicious updates.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="footer-email" className="sr-only">
                  Email for newsletter
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 rounded-full border border-cream-100/15 bg-white/5 px-4 py-2.5 text-sm text-cream-50 placeholder:text-cream-300/40 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                  required
                />
                <Button type="submit" size="sm" loading={loading} className="shrink-0">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 pt-8 text-xs text-cream-300/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {restaurant.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <HerbDoodle className="h-6 w-4 opacity-40" color="#7A9A7C" />
            <Link href="/privacy" className="hover:text-cream-200">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-cream-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
