'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { cn, isValidEmail } from '@/lib/utils';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!isValidEmail(email)) err.email = 'Valid email required';
    if (password.length < 6) err.password = 'Password must be 6+ characters';
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (!result.ok) {
        toast(result.error || 'Login failed', 'error');
        return;
      }
      toast('Welcome back!', 'success');
      const user = useAuthStore.getState().user;
      router.push(user?.role === 'admin' ? '/admin' : '/account');
    }, 500);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 pt-28 pb-20">
      <div className="w-full max-w-md rounded-[2rem] border border-cream-300 bg-beige-light/50 p-8 shadow-soft">
        <p className="font-hand text-lg text-terracotta">Welcome back</p>
        <h1 className="mt-1 font-display text-3xl">Sign in</h1>
        <p className="mt-2 text-sm text-charcoal-muted">
          Demo: guest@thedoodletable.in / guest123 or admin@thedoodletable.in /
          admin123
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="label-field">
              Email
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
          <div>
            <label htmlFor="password" className="label-field">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={cn('input-field', errors.password && 'border-red-400')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-charcoal-muted">
          New here?{' '}
          <Link href="/signup" className="font-medium text-terracotta hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
