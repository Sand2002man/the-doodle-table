'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { restaurant } from '@/data/restaurant';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/Button';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/events', label: 'Events' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-cream-50/90 py-2 shadow-nav backdrop-blur-md'
            : 'bg-transparent py-4'
        )}
      >
        <nav className="container-page flex items-center justify-between gap-4" aria-label="Main">
          <Link
            href="/"
            className="group flex flex-col leading-none"
            aria-label={`${restaurant.name} home`}
          >
            <span className="font-display text-xl font-medium tracking-tight text-charcoal transition group-hover:text-terracotta md:text-2xl">
              The Doodle Table
            </span>
            <span className="hidden font-hand text-xs text-terracotta sm:block">
              gather around
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative rounded-full px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? 'text-terracotta'
                        : 'text-charcoal-light hover:text-charcoal'
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-terracotta"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={user ? (user.role === 'admin' ? '/admin' : '/account') : '/login'}
              className="hidden rounded-full p-2.5 text-charcoal-light transition hover:bg-beige hover:text-charcoal sm:inline-flex"
              aria-label={user ? 'Account' : 'Sign in'}
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={openCart}
              className="relative rounded-full p-2.5 text-charcoal-light transition hover:bg-beige hover:text-charcoal"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            <Link href="/reservations" className="hidden md:inline-flex">
              <Button size="sm" className="!py-2.5">
                Reserve Table
              </Button>
            </Link>

            <button
              className="rounded-full p-2.5 text-charcoal lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(100%,22rem)] flex-col bg-cream-50 shadow-lift lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-cream-300 px-5 py-4">
                <span className="font-display text-lg">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full p-2 hover:bg-beige"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {links.map((link, i) => {
                    const active =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            'block rounded-2xl px-4 py-3.5 text-base font-medium transition',
                            active
                              ? 'bg-terracotta-muted text-terracotta-dark'
                              : 'text-charcoal hover:bg-beige'
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              <div className="space-y-3 border-t border-cream-300 p-5">
                <Link href="/reservations" className="block">
                  <Button className="w-full">Reserve a Table</Button>
                </Link>
                <Link
                  href={user ? '/account' : '/login'}
                  className="block text-center text-sm text-charcoal-muted underline-offset-2 hover:underline"
                >
                  {user ? `Hi, ${user.name.split(' ')[0]}` : 'Sign in / Sign up'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
