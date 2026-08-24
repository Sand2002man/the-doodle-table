'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Users, Clock } from 'lucide-react';
import { timeSlots, occasions, restaurant } from '@/data/restaurant';
import { useAuthStore } from '@/store/auth';
import {
  cn,
  generateReservationNumber,
  isValidEmail,
  isValidPhone,
  formatDate,
} from '@/lib/utils';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';
import { StarDoodle, HandwrittenNote } from '@/components/doodles/Doodles';
import type { Occasion, Reservation } from '@/types';

export default function ReservationsPage() {
  const addReservation = useAuthStore((s) => s.addReservation);
  const user = useAuthStore((s) => s.user);

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState<Occasion | ''>('');
  const [requests, setRequests] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState<Reservation | null>(null);

  const minDate = new Date().toISOString().split('T')[0];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!isValidPhone(phone)) e.phone = 'Valid phone required';
    if (!isValidEmail(email)) e.email = 'Valid email required';
    if (!date) e.date = 'Select a date';
    else if (date < minDate) e.date = 'Date cannot be in the past';
    if (!time) e.time = 'Select a time slot';
    if (guests < 1 || guests > 20) e.guests = 'Guests must be 1–20';
    if (!occasion) e.occasion = 'Select an occasion';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast('Please complete all required fields.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const reservation: Reservation = {
        id: `res-${Date.now()}`,
        reservationNumber: generateReservationNumber(),
        name: name.trim(),
        phone,
        email,
        date,
        time,
        guests,
        occasion: occasion as Occasion,
        specialRequests: requests || undefined,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      addReservation(reservation);
      setConfirmed(reservation);
      setLoading(false);
      toast('Reservation confirmed!', 'success');
    }, 900);
  };

  const addToCalendar = () => {
    if (!confirmed) return;
    const start = new Date(`${confirmed.date}T${convertTime(confirmed.time)}`);
    const end = new Date(start.getTime() + 90 * 60000);
    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set(
      'text',
      `Dinner at ${restaurant.name}`
    );
    url.searchParams.set('dates', `${fmt(start)}/${fmt(end)}`);
    url.searchParams.set(
      'details',
      `Reservation ${confirmed.reservationNumber}\nGuests: ${confirmed.guests}\nOccasion: ${confirmed.occasion}`
    );
    url.searchParams.set(
      'location',
      `${restaurant.address.street}, ${restaurant.address.city}`
    );
    window.open(url.toString(), '_blank');
  };

  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-4xl">
        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <header className="relative mb-10 text-center">
                <p className="font-hand text-lg text-terracotta">Save your seat</p>
                <h1 className="mt-1 font-display text-4xl md:text-5xl">
                  Reserve a Table
                </h1>
                <p className="mx-auto mt-3 max-w-md text-charcoal-muted">
                  Tell us when you&apos;re coming — we&apos;ll set a beautiful
                  table.
                </p>
                <div className="absolute right-0 top-0 hidden md:block">
                  <StarDoodle className="h-10 w-10 rotate-12 opacity-60" />
                </div>
              </header>

              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-cream-300 bg-beige-light/40 p-6 sm:p-10"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-5">
                    <Field
                      id="r-name"
                      label="Full name *"
                      error={errors.name}
                      value={name}
                      onChange={setName}
                      autoComplete="name"
                    />
                    <Field
                      id="r-phone"
                      label="Phone *"
                      error={errors.phone}
                      value={phone}
                      onChange={setPhone}
                      type="tel"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      id="r-email"
                      label="Email *"
                      error={errors.email}
                      value={email}
                      onChange={setEmail}
                      type="email"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="r-date" className="label-field">
                      Date *
                    </label>
                    <input
                      id="r-date"
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={cn(
                        'input-field',
                        errors.date && 'border-red-400'
                      )}
                    />
                    {errors.date && (
                      <p className="mt-1 text-xs text-red-600">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="r-guests" className="label-field">
                      Guests *
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cream-300 bg-white text-lg"
                        aria-label="Fewer guests"
                      >
                        −
                      </button>
                      <span className="min-w-[3rem] text-center font-display text-2xl">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(20, g + 1))}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cream-300 bg-white text-lg"
                        aria-label="More guests"
                      >
                        +
                      </button>
                    </div>
                    {errors.guests && (
                      <p className="mt-1 text-xs text-red-600">{errors.guests}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <p className="label-field">Time slot *</p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={cn(
                            'rounded-xl border px-2 py-2.5 text-sm transition',
                            time === slot
                              ? 'border-terracotta bg-terracotta text-white'
                              : 'border-cream-300 bg-white hover:border-terracotta/50'
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.time && (
                      <p className="mt-1 text-xs text-red-600">{errors.time}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="r-occasion" className="label-field">
                      Occasion *
                    </label>
                    <select
                      id="r-occasion"
                      value={occasion}
                      onChange={(e) =>
                        setOccasion(e.target.value as Occasion | '')
                      }
                      className={cn(
                        'input-field',
                        errors.occasion && 'border-red-400'
                      )}
                    >
                      <option value="">Select occasion</option>
                      {occasions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {errors.occasion && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.occasion}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="r-requests" className="label-field">
                      Special requests
                    </label>
                    <textarea
                      id="r-requests"
                      rows={3}
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      className="input-field resize-none"
                      placeholder="High chair, window seat, allergies..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                  <Button type="submit" size="lg" loading={loading} className="w-full sm:w-auto">
                    Confirm Reservation
                  </Button>
                  <HandwrittenNote rotate={-3} className="text-base">
                    we can&apos;t wait to host you
                  </HandwrittenNote>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage-soft">
                <Check className="h-10 w-10 text-sage" strokeWidth={2.5} />
              </div>
              <p className="font-hand text-xl text-terracotta">You&apos;re booked!</p>
              <h1 className="mt-2 font-display text-3xl md:text-4xl">
                See you soon.
              </h1>
              <div className="mt-8 rounded-3xl border border-cream-300 bg-beige-light/60 p-6 text-left">
                <p className="text-center font-mono text-sm text-terracotta">
                  {confirmed.reservationNumber}
                </p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-terracotta" />
                    <span>{formatDate(confirmed.date)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-terracotta" />
                    <span>{confirmed.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-terracotta" />
                    <span>
                      {confirmed.guests} guest
                      {confirmed.guests > 1 ? 's' : ''} ·{' '}
                      {occasions.find((o) => o.value === confirmed.occasion)
                        ?.label}
                    </span>
                  </div>
                </dl>
                <p className="mt-5 border-t border-cream-300 pt-4 text-xs text-charcoal-muted">
                  {restaurant.name}
                  <br />
                  {restaurant.address.street}, {restaurant.address.city}
                  <br />
                  {restaurant.phone}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button onClick={addToCalendar}>Add to Calendar</Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setConfirmed(null);
                    setTime('');
                    setDate('');
                  }}
                >
                  Modify Reservation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  value,
  onChange,
  type = 'text',
  autoComplete,
}: {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-field">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={cn('input-field', error && 'border-red-400')}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function convertTime(slot: string): string {
  // "7:30 PM" -> "19:30:00"
  const match = slot.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return '19:00:00';
  let h = parseInt(match[1], 10);
  const m = match[2];
  const ap = match[3].toUpperCase();
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m}:00`;
}
