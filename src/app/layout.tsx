import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Caveat } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/layout/Providers';
import { restaurant } from '@/data/restaurant';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hand',
  display: 'swap',
});

const siteUrl = 'https://thedoodletable.in';

export const metadata: Metadata = {
  title: {
    default: `${restaurant.name} | Modern Restaurant & Dining Experience`,
    template: `%s | ${restaurant.name}`,
  },
  description: restaurant.description,
  keywords: [
    'restaurant',
    'Bhubaneswar',
    'Indian fusion',
    'fine dining',
    'reservations',
    'The Doodle Table',
    'contemporary Indian',
  ],
  authors: [{ name: restaurant.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: restaurant.name,
    title: `${restaurant.name} | Modern Restaurant & Dining Experience`,
    description: restaurant.description,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: restaurant.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: restaurant.name,
    description: restaurant.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: restaurant.name,
  description: restaurant.description,
  url: siteUrl,
  telephone: restaurant.phone,
  email: restaurant.email,
  servesCuisine: ['Indian', 'Fusion', 'Contemporary'],
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: restaurant.address.street,
    addressLocality: restaurant.address.city,
    addressRegion: restaurant.address.state,
    postalCode: restaurant.address.postalCode,
    addressCountry: 'IN',
  },
  openingHoursSpecification: restaurant.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.day,
    opens: h.open,
    closes: h.close,
  })),
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${hand.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
