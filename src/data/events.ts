import type { Event, Offer } from '@/types';

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Live Acoustic Evenings',
    description:
      'Local musicians, warm lights, and a special tasting menu. Every Friday from 8 PM. Come for the music, stay for the dessert.',
    date: '2026-09-05',
    time: '8:00 PM',
    price: 0,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    category: 'Live Music',
    capacity: 60,
  },
  {
    id: 'e2',
    title: 'Wine & Dine Pairing Night',
    description:
      'Five courses paired with carefully chosen wines and zero-proof alternatives. Hosted by our sommelier and Chef Ananya.',
    date: '2026-09-12',
    time: '7:30 PM',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    category: 'Wine & Dine',
    capacity: 30,
  },
  {
    id: 'e3',
    title: "Chef's Table Experience",
    description:
      'An intimate eight-seat counter facing the open kitchen. A multi-course journey with stories behind every plate.',
    date: '2026-09-20',
    time: '7:00 PM',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    category: "Chef's Table",
    capacity: 8,
  },
  {
    id: 'e4',
    title: 'Weekend Brunch Social',
    description:
      'Unlimited small plates, bottomless filter coffee, live dosa counter, and a playlist worth lingering for. Saturdays & Sundays.',
    date: '2026-08-30',
    time: '10:30 AM',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80',
    category: 'Brunch',
    capacity: 80,
  },
  {
    id: 'e5',
    title: 'Private Dining — Monsoon Room',
    description:
      'Book our glass-walled private room for birthdays, board meetings, or quiet celebrations. Custom menus available.',
    date: '2026-09-01',
    time: 'Flexible',
    price: 0,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    category: 'Private Dining',
    capacity: 16,
  },
  {
    id: 'e6',
    title: 'Festival of Flavours — Onam Special',
    description:
      'A festive sadya-inspired tasting menu celebrating Kerala’s harvest. Limited seatings across three evenings.',
    date: '2026-09-15',
    time: '7:00 PM',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    category: 'Festival',
    capacity: 50,
  },
  {
    id: 'e7',
    title: 'Kids Cook Saturday',
    description:
      'Little hands in the kitchen — pizza bases, cookie decorating, and a proud parade of their creations. Ages 6–12.',
    date: '2026-09-06',
    time: '11:00 AM',
    price: 799,
    image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&q=80',
    category: 'Family',
    capacity: 20,
  },
];

export const offers: Offer[] = [
  {
    id: 'o1',
    title: 'Weekend Brunch',
    subtitle: 'Unlimited good vibes. Unlimited brunch possibilities.',
    description:
      'A leisurely spread of small plates, live counters, fresh juices, and bottomless filter coffee every Saturday and Sunday from 10:30 AM to 3:30 PM.',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80',
    cta: 'Reserve Brunch',
    ctaLink: '/reservations',
    badge: 'Sat & Sun',
  },
  {
    id: 'o2',
    title: 'Date Night',
    subtitle: 'Two plates. One table. Zero distractions.',
    description:
      'A curated three-course menu for two with complimentary dessert and a reserved corner table. Available Tuesday to Thursday.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    cta: 'Book Date Night',
    ctaLink: '/reservations',
    badge: '₹2,499 for two',
  },
  {
    id: 'o3',
    title: "Chef's Special",
    subtitle: 'Something new is cooking.',
    description:
      'Every week Chef Ananya debuts a limited dish that may never return. Ask your server — or follow us to catch it first.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    cta: 'View Menu',
    ctaLink: '/menu',
    badge: 'Weekly',
  },
  {
    id: 'o4',
    title: 'Happy Hour',
    subtitle: 'Small plates & coolers, big smiles.',
    description:
      'Select starters and house coolers at special prices, weekdays 4:30 PM to 6:30 PM. Perfect for after-work unwinding.',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80',
    cta: 'See Offers',
    ctaLink: '/menu',
    badge: 'Weekdays 4:30–6:30',
  },
];
