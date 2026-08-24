'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Order, Reservation } from '@/types';

interface AuthState {
  user: User | null;
  orders: Order[];
  reservations: Reservation[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (name: string, email: string, password: string, phone?: string) => { ok: boolean; error?: string };
  logout: () => void;
  addOrder: (order: Order) => void;
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, data: Partial<Reservation>) => void;
}

// Demo accounts stored client-side for mock auth (never use in production)
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'guest@thedoodletable.in': {
    password: 'guest123',
    user: {
      id: 'u1',
      name: 'Demo Guest',
      email: 'guest@thedoodletable.in',
      phone: '+91 98765 00001',
      role: 'customer',
      favorites: [],
      createdAt: '2026-01-01',
    },
  },
  'admin@thedoodletable.in': {
    password: 'admin123',
    user: {
      id: 'admin1',
      name: 'Admin',
      email: 'admin@thedoodletable.in',
      role: 'admin',
      favorites: [],
      createdAt: '2026-01-01',
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      orders: [],
      reservations: [],

      login: (email, password) => {
        const key = email.toLowerCase().trim();
        const found = DEMO_USERS[key];
        if (!found || found.password !== password) {
          // Allow any email/password for demo customer accounts
          if (password.length >= 6 && email.includes('@')) {
            const user: User = {
              id: `u-${Date.now()}`,
              name: email.split('@')[0],
              email: key,
              role: key.includes('admin') ? 'admin' : 'customer',
              favorites: [],
              createdAt: new Date().toISOString(),
            };
            set({ user });
            return { ok: true };
          }
          return { ok: false, error: 'Invalid email or password.' };
        }
        set({ user: found.user });
        return { ok: true };
      },

      signup: (name, email, password, phone) => {
        if (!name.trim() || !email.includes('@') || password.length < 6) {
          return { ok: false, error: 'Please fill all fields. Password must be 6+ characters.' };
        }
        const user: User = {
          id: `u-${Date.now()}`,
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone,
          role: 'customer',
          favorites: [],
          createdAt: new Date().toISOString(),
        };
        DEMO_USERS[user.email] = { password, user };
        set({ user });
        return { ok: true };
      },

      logout: () => set({ user: null }),

      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),

      addReservation: (reservation) =>
        set((state) => ({
          reservations: [reservation, ...state.reservations],
        })),

      updateReservation: (id, data) =>
        set((state) => ({
          reservations: state.reservations.map((r) =>
            r.id === id ? { ...r, ...data } : r
          ),
        })),
    }),
    {
      name: 'doodle-table-auth',
      partialize: (state) => ({
        user: state.user,
        orders: state.orders,
        reservations: state.reservations,
      }),
    }
  )
);
