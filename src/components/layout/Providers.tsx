'use client';

import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
      <ToastContainer />
    </>
  );
}
