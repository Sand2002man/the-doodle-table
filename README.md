# The Doodle Table

Premium full-stack restaurant web application — contemporary Indian & fusion dining with a hand-drawn, editorial aesthetic.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Zustand** (cart, favorites, auth, toasts)
- **Lucide React** icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |

## Demo accounts

| Role | Email | Password |
|------|-------|----------|
| Guest | `guest@thedoodletable.in` | `guest123` |
| Admin | `admin@thedoodletable.in` | `admin123` |

Any email/password (6+ chars) also works for a demo customer session.

## Project structure

```
src/
  app/                 # Routes (pages)
  components/          # UI, layout, menu, cart, home, doodles…
  data/                # Centralized restaurant, menu, events, reviews
  store/               # Zustand stores (cart, auth, favorites, toast)
  types/               # Shared TypeScript types
  lib/                 # Utilities (formatPrice, validation, cn)
```

## Rebranding

Edit `src/data/restaurant.ts` for name, hours, address, tax rates, and social links. Menu lives in `src/data/menu.ts`.

## Features

- Premium responsive design with doodles & micro-interactions
- Full interactive menu (search, filters, sort, detail pages/modal)
- Cart with persistence, add-ons, notes, tax & service charge
- Multi-step checkout (dine-in / takeaway / delivery + mock payments)
- Table reservations with time slots & calendar export
- Customer accounts (orders, reservations, favorites)
- Admin dashboard (orders, reservations, menu overview, charts)
- Gallery lightbox, events, offers, reviews, contact
- SEO metadata + Restaurant JSON-LD
- Accessibility (focus states, reduced motion, semantic HTML)

## Notes

- Payments are **mock/demo** — no real charges.
- Cart & auth persist in `localStorage`.
- Images load from Unsplash; swap URLs or add local assets as needed.
- Admin CRUD is structured for a future API/database connection.
