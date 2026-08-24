import type { Metadata } from 'next';
import { restaurant } from '@/data/restaurant';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20">
      <article className="container-page max-w-3xl">
        <h1 className="font-display text-4xl">Terms of Service</h1>
        <p className="mt-4 text-charcoal-muted">
          Last updated: August 24, 2026
        </p>
        <div className="mt-8 space-y-6 leading-relaxed text-charcoal-light">
          <p>
            By using the {restaurant.name} website and services, you agree to
            these terms. Please read them carefully.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Orders</h2>
          <p>
            All orders are subject to availability and confirmation. Prices are
            listed in Indian Rupees and include applicable display taxes as
            shown at checkout. We reserve the right to refuse or cancel orders
            in case of pricing errors, unavailability, or suspected fraud.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Reservations</h2>
          <p>
            Reservations are held for 15 minutes past the booked time. Please
            notify us of cancellations at least 2 hours in advance when
            possible. Large parties may require a deposit.
          </p>
          <h2 className="font-display text-2xl text-charcoal">
            Allergies & dietary needs
          </h2>
          <p>
            We take allergies seriously but cannot guarantee a completely
            allergen-free kitchen. Please inform us of any allergies when
            ordering or booking.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Contact</h2>
          <p>
            Questions about these terms: {restaurant.email} or{' '}
            {restaurant.phone}.
          </p>
        </div>
      </article>
    </div>
  );
}
