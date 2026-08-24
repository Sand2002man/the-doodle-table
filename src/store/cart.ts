'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartAddOn } from '@/types';
import { calcCartTotals } from '@/lib/utils';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'cartId'>) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  updateNotes: (cartId: string, notes: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemCount: () => number;
  getTotals: () => { subtotal: number; tax: number; serviceCharge: number; total: number };
}

function makeCartId(menuItemId: string, addOns: CartAddOn[], notes?: string) {
  const addOnKey = addOns
    .map((a) => a.id)
    .sort()
    .join('-');
  return `${menuItemId}__${addOnKey}__${notes || ''}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const cartId = makeCartId(item.menuItemId, item.addOns, item.specialInstructions);
        set((state) => {
          const existing = state.items.find((i) => i.cartId === cartId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartId === cartId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, cartId }],
            isOpen: true,
          };
        });
      },

      removeItem: (cartId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartId !== cartId),
        }));
      },

      updateQuantity: (cartId, quantity) => {
        if (quantity < 1) {
          get().removeItem(cartId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, quantity } : i
          ),
        }));
      },

      updateNotes: (cartId, notes) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.cartId === cartId ? { ...i, specialInstructions: notes } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotals: () => {
        const { subtotal, tax, serviceCharge } = calcCartTotals(get().items);
        return {
          subtotal,
          tax,
          serviceCharge,
          total: subtotal + tax + serviceCharge,
        };
      },
    }),
    {
      name: 'doodle-table-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
