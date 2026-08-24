import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
      <p className="font-hand text-2xl text-terracotta">404</p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">
        This plate left the kitchen.
      </h1>
      <p className="mt-4 max-w-md text-charcoal-muted">
        Something went wrong in the kitchen — or that page simply doesn&apos;t
        exist. Let&apos;s get you back to something delicious.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button>Back home</Button>
        </Link>
        <Link href="/menu">
          <Button variant="secondary">Browse menu</Button>
        </Link>
      </div>
    </div>
  );
}
