'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
  CreditCard,
  Smartphone,
  Banknote,
  MapPin,
  Utensils,
  ShoppingBag,
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { restaurant } from '@/data/restaurant';
import {
  cn,
  formatPrice,
  generateOrderNumber,
  isValidEmail,
  isValidPhone,
} from '@/lib/utils';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';
import type { OrderType, PaymentMethod, Order } from '@/types';

const steps = ['Details', 'Order type', 'Payment', 'Confirm'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotals, clearCart, closeCart } = useCartStore();
  const addOrder = useAuthStore((s) => s.addOrder);
  const user = useAuthStore((s) => s.user);
  const totals = getTotals();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(restaurant.address.city);
  const [postalCode, setPostalCode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    closeCart();
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user, closeCart]);

  const deliveryFee =
    orderType === 'delivery'
      ? totals.subtotal >= restaurant.freeDeliveryMinimum
        ? 0
        : restaurant.deliveryFee
      : 0;
  const grandTotal = totals.total + deliveryFee;

  const validateStep = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!name.trim()) e.name = 'Name is required';
      if (!isValidPhone(phone)) e.phone = 'Enter a valid 10-digit phone';
      if (!isValidEmail(email)) e.email = 'Enter a valid email';
    }
    if (step === 1) {
      if (orderType === 'delivery') {
        if (!address.trim()) e.address = 'Address is required';
        if (!city.trim()) e.city = 'City is required';
        if (!postalCode.trim() || postalCode.length < 5)
          e.postalCode = 'Valid postal code required';
      }
      if (orderType === 'dine-in' && !tableNumber.trim()) {
        e.tableNumber = 'Table number or reservation ref required';
      }
    }
    if (step === 2) {
      if (payment === 'card') {
        if (cardNumber.replace(/\s/g, '').length < 16)
          e.cardNumber = 'Enter a valid card number';
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) e.cardExpiry = 'Use MM/YY';
        if (cardCvv.length < 3) e.cardCvv = 'Invalid CVV';
      }
      if (payment === 'upi' && !upiId.includes('@')) {
        e.upiId = 'Enter a valid UPI ID';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) {
      toast('Please fix the highlighted fields.', 'error');
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const placeOrder = () => {
    if (!validateStep()) return;
    setLoading(true);
    setTimeout(() => {
      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: generateOrderNumber(),
        items: [...items],
        customer: { name, phone, email },
        orderType,
        deliveryAddress:
          orderType === 'delivery'
            ? { address, city, postalCode, instructions: deliveryNotes }
            : undefined,
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        paymentMethod: payment,
        subtotal: totals.subtotal,
        tax: totals.tax,
        serviceCharge: totals.serviceCharge,
        deliveryFee,
        total: grandTotal,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        estimatedTime:
          orderType === 'delivery' ? 45 : orderType === 'takeaway' ? 25 : 20,
      };
      addOrder(order);
      clearCart();
      setLoading(false);
      toast('Order placed successfully!', 'success');
      sessionStorage.setItem('last-order', JSON.stringify(order));
      router.push(`/order-confirmation?order=${order.orderNumber}`);
    }, 1200);
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-10 w-10 animate-pulse rounded-full bg-beige" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
        <ShoppingBag className="mb-4 h-12 w-12 text-charcoal-soft" />
        <h1 className="font-display text-3xl">Your table is waiting.</h1>
        <p className="mt-2 text-charcoal-muted">
          Add something delicious before checking out.
        </p>
        <Link href="/menu" className="mt-6">
          <Button>Explore Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="container-page max-w-5xl">
        <h1 className="font-display text-3xl md:text-4xl">Checkout</h1>

        {/* Progress */}
        <ol className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition',
                  i < step
                    ? 'bg-sage text-white'
                    : i === step
                      ? 'bg-terracotta text-white'
                      : 'bg-beige text-charcoal-muted'
                )}
                aria-current={i === step ? 'step' : undefined}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </button>
              <span
                className={cn(
                  'hidden text-sm sm:inline',
                  i === step ? 'font-medium text-charcoal' : 'text-charcoal-muted'
                )}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <div className="mx-1 h-px w-6 bg-cream-300 sm:w-10" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {step === 0 && (
              <div className="space-y-4 rounded-3xl border border-cream-300 bg-beige-light/50 p-6">
                <h2 className="font-display text-xl">Customer Information</h2>
                <div>
                  <label htmlFor="name" className="label-field">
                    Full name *
                  </label>
                  <input
                    id="name"
                    className={cn('input-field', errors.name && 'border-red-400')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="label-field">
                    Phone *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={cn('input-field', errors.phone && 'border-red-400')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="label-field">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={cn('input-field', errors.email && 'border-red-400')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 rounded-3xl border border-cream-300 bg-beige-light/50 p-6">
                <h2 className="font-display text-xl">How would you like it?</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(
                    [
                      { value: 'dine-in', label: 'Dine In', icon: Utensils },
                      { value: 'takeaway', label: 'Takeaway', icon: ShoppingBag },
                      { value: 'delivery', label: 'Delivery', icon: MapPin },
                    ] as const
                  ).map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setOrderType(value)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-2xl border p-4 transition',
                        orderType === value
                          ? 'border-terracotta bg-terracotta-muted/40'
                          : 'border-cream-300 bg-white hover:border-terracotta/40'
                      )}
                    >
                      <Icon className="h-6 w-6 text-terracotta" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>

                {orderType === 'delivery' && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label htmlFor="address" className="label-field">
                        Address *
                      </label>
                      <input
                        id="address"
                        className={cn(
                          'input-field',
                          errors.address && 'border-red-400'
                        )}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && (
                        <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="city" className="label-field">
                          City *
                        </label>
                        <input
                          id="city"
                          className={cn(
                            'input-field',
                            errors.city && 'border-red-400'
                          )}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="postal" className="label-field">
                          Postal code *
                        </label>
                        <input
                          id="postal"
                          className={cn(
                            'input-field',
                            errors.postalCode && 'border-red-400'
                          )}
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="dnotes" className="label-field">
                        Delivery instructions
                      </label>
                      <textarea
                        id="dnotes"
                        className="input-field resize-none"
                        rows={2}
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="Landmark, gate code..."
                      />
                    </div>
                  </div>
                )}

                {orderType === 'dine-in' && (
                  <div className="mt-4">
                    <label htmlFor="table" className="label-field">
                      Table number / reservation ref *
                    </label>
                    <input
                      id="table"
                      className={cn(
                        'input-field',
                        errors.tableNumber && 'border-red-400'
                      )}
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. T12 or RES-12345"
                    />
                    {errors.tableNumber && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.tableNumber}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 rounded-3xl border border-cream-300 bg-beige-light/50 p-6">
                <h2 className="font-display text-xl">Payment</h2>
                <p className="text-xs text-charcoal-muted">
                  Demo mode — no real charges. Use any test details.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(
                    [
                      { value: 'upi', label: 'UPI', icon: Smartphone },
                      { value: 'card', label: 'Card', icon: CreditCard },
                      { value: 'cash', label: 'Pay at restaurant', icon: Banknote },
                    ] as const
                  ).map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPayment(value)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-2xl border p-4 transition',
                        payment === value
                          ? 'border-terracotta bg-terracotta-muted/40'
                          : 'border-cream-300 bg-white hover:border-terracotta/40'
                      )}
                    >
                      <Icon className="h-6 w-6 text-terracotta" />
                      <span className="text-center text-xs font-medium sm:text-sm">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                {payment === 'upi' && (
                  <div>
                    <label htmlFor="upi" className="label-field">
                      UPI ID *
                    </label>
                    <input
                      id="upi"
                      className={cn(
                        'input-field',
                        errors.upiId && 'border-red-400'
                      )}
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="name@upi"
                    />
                    {errors.upiId && (
                      <p className="mt-1 text-xs text-red-600">{errors.upiId}</p>
                    )}
                  </div>
                )}

                {payment === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="card" className="label-field">
                        Card number *
                      </label>
                      <input
                        id="card"
                        className={cn(
                          'input-field',
                          errors.cardNumber && 'border-red-400'
                        )}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 1111 1111 1111"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="exp" className="label-field">
                          Expiry *
                        </label>
                        <input
                          id="exp"
                          className={cn(
                            'input-field',
                            errors.cardExpiry && 'border-red-400'
                          )}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="label-field">
                          CVV *
                        </label>
                        <input
                          id="cvv"
                          className={cn(
                            'input-field',
                            errors.cardCvv && 'border-red-400'
                          )}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          type="password"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {payment === 'cash' && (
                  <p className="rounded-2xl bg-sage-soft/50 p-4 text-sm text-sage-dark">
                    Pay when you collect or at your table. Please have exact
                    change if possible.
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 rounded-3xl border border-cream-300 bg-beige-light/50 p-6">
                <h2 className="font-display text-xl">Review & place order</h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-charcoal-muted">Name</dt>
                    <dd className="font-medium">{name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal-muted">Phone</dt>
                    <dd>{phone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal-muted">Type</dt>
                    <dd className="capitalize">{orderType.replace('-', ' ')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-charcoal-muted">Payment</dt>
                    <dd className="uppercase">{payment}</dd>
                  </div>
                </dl>
                <p className="text-xs text-charcoal-muted">
                  By placing this order you agree to our terms. This is a demo
                  checkout — no payment will be processed.
                </p>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {step > 0 && (
                <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={next} className="flex-1 sm:flex-none">
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={placeOrder}
                  loading={loading}
                  className="flex-1 sm:flex-none"
                >
                  Place Order · {formatPrice(grandTotal)}
                </Button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-28 rounded-3xl border border-cream-300 bg-white/80 p-5 shadow-soft">
              <h2 className="font-display text-lg">Order summary</h2>
              <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                {items.map((item) => {
                  const addOn = item.addOns.reduce((s, a) => s + a.price, 0);
                  return (
                    <li key={item.cartId} className="flex gap-3 text-sm">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                          {item.quantity}× {item.name}
                        </p>
                        <p className="text-terracotta">
                          {formatPrice((item.price + addOn) * item.quantity)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <dl className="mt-4 space-y-1.5 border-t border-cream-300 pt-4 text-sm">
                <div className="flex justify-between text-charcoal-muted">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <dt>Tax</dt>
                  <dd>{formatPrice(totals.tax)}</dd>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <dt>Service</dt>
                  <dd>{formatPrice(totals.serviceCharge)}</dd>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-charcoal-muted">
                    <dt>Delivery</dt>
                    <dd>{formatPrice(deliveryFee)}</dd>
                  </div>
                )}
                {orderType === 'delivery' && deliveryFee === 0 && (
                  <div className="flex justify-between text-sage">
                    <dt>Delivery</dt>
                    <dd>Free</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-cream-300 pt-2 font-display text-lg">
                  <dt>Total</dt>
                  <dd className="text-terracotta">{formatPrice(grandTotal)}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
