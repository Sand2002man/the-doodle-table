import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { restaurant } from '@/data/restaurant';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `${restaurant.currencySymbol}${amount.toLocaleString('en-IN')}`;
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function generateOrderNumber(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `DT-${n}`;
}

export function generateReservationNumber(): string {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `RES-${n}`;
}

export function calcCartTotals(items: { price: number; quantity: number; addOns: { price: number }[] }[]) {
  const subtotal = items.reduce((sum, item) => {
    const addOnTotal = item.addOns.reduce((s, a) => s + a.price, 0);
    return sum + (item.price + addOnTotal) * item.quantity;
  }, 0);
  const tax = Math.round(subtotal * restaurant.taxRate);
  const serviceCharge = Math.round(subtotal * restaurant.serviceChargeRate);
  return { subtotal, tax, serviceCharge };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+()]/g, '');
  return /^[0-9]{10,12}$/.test(cleaned);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
