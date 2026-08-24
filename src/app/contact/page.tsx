'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { restaurant } from '@/data/restaurant';
import { isValidEmail, isValidPhone, cn } from '@/lib/utils';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = 'Name required';
    if (!isValidEmail(email)) err.email = 'Valid email required';
    if (phone && !isValidPhone(phone)) err.phone = 'Invalid phone';
    if (!message.trim() || message.trim().length < 10)
      err.message = 'Please write a short message';
    setErrors(err);
    if (Object.keys(err).length) {
      toast('Please fix the form errors.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      toast('Message sent! We will reply soon.', 'success');
    }, 700);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container-page">
        <header className="mb-12 max-w-xl">
          <p className="font-hand text-lg text-terracotta">Say hello</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">Contact</h1>
          <p className="mt-3 text-charcoal-muted">
            Questions, large parties, press — we read every note.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-3xl border border-cream-300 bg-beige-light/50 p-6">
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-terracotta-muted text-terracotta">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="mt-0.5 text-sm text-charcoal-muted">
                      {restaurant.address.street}
                      <br />
                      {restaurant.address.city}, {restaurant.address.state}{' '}
                      {restaurant.address.postalCode}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-terracotta-muted text-terracotta">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="mt-0.5 text-sm text-charcoal-muted hover:text-terracotta"
                    >
                      {restaurant.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-terracotta-muted text-terracotta">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${restaurant.email}`}
                      className="mt-0.5 text-sm text-charcoal-muted hover:text-terracotta"
                    >
                      {restaurant.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-terracotta-muted text-terracotta">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Opening hours</p>
                    <ul className="mt-1 space-y-0.5 text-sm text-charcoal-muted">
                      {restaurant.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-6">
                          <span>{h.day}</span>
                          <span>
                            {h.open} – {h.close}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-cream-300 bg-beige">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="mb-2 h-8 w-8 text-terracotta" />
                <p className="font-display text-xl">Find us on the map</p>
                <p className="mt-1 max-w-xs text-sm text-charcoal-muted">
                  {restaurant.address.street}, {restaurant.address.city}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${restaurant.address.street}, ${restaurant.address.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-4 !py-2.5 text-sm"
                >
                  Open in Google Maps
                </a>
              </div>
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 40%, #C45C26 0%, transparent 40%), radial-gradient(circle at 70% 60%, #5C7A5E 0%, transparent 35%)',
                }}
              />
            </div>
          </div>

          <form
            onSubmit={submit}
            className="rounded-3xl border border-cream-300 bg-cream-50 p-6 sm:p-8"
            noValidate
          >
            <h2 className="font-display text-2xl">Send a message</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="c-name" className="label-field">
                  Name *
                </label>
                <input
                  id="c-name"
                  className={cn('input-field', errors.name && 'border-red-400')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="c-email" className="label-field">
                  Email *
                </label>
                <input
                  id="c-email"
                  type="email"
                  className={cn('input-field', errors.email && 'border-red-400')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="c-phone" className="label-field">
                  Phone
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  className={cn('input-field', errors.phone && 'border-red-400')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="label-field">
                  Message *
                </label>
                <textarea
                  id="c-msg"
                  rows={5}
                  className={cn(
                    'input-field resize-none',
                    errors.message && 'border-red-400'
                  )}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>
              <Button type="submit" loading={loading} className="w-full sm:w-auto">
                Send message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
