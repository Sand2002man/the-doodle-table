import type { Metadata } from 'next';
import { restaurant } from '@/data/restaurant';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20">
      <article className="container-page prose-custom max-w-3xl">
        <h1 className="font-display text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-charcoal-muted">
          Last updated: August 24, 2026
        </p>
        <div className="mt-8 space-y-6 text-charcoal-light leading-relaxed">
          <p>
            {restaurant.name} (&quot;we&quot;, &quot;us&quot;) respects your
            privacy. This policy explains what information we collect when you
            use our website, place orders, or make reservations, and how we use
            it.
          </p>
          <h2 className="font-display text-2xl text-charcoal">
            Information we collect
          </h2>
          <p>
            We may collect your name, email address, phone number, delivery
            address, order history, reservation details, and any messages you
            send us. Payment details are processed by secure third-party
            providers and are not stored on our servers in full.
          </p>
          <h2 className="font-display text-2xl text-charcoal">How we use it</h2>
          <p>
            We use your information to fulfil orders and reservations, improve
            our service, send optional marketing (only with consent), and meet
            legal obligations.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Your rights</h2>
          <p>
            You may request access, correction, or deletion of your personal
            data by contacting us at {restaurant.email}.
          </p>
          <h2 className="font-display text-2xl text-charcoal">Contact</h2>
          <p>
            {restaurant.name}
            <br />
            {restaurant.address.street}, {restaurant.address.city}
            <br />
            {restaurant.email} · {restaurant.phone}
          </p>
        </div>
      </article>
    </div>
  );
}
