'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { cn, isValidEmail, isValidPhone } from '@/lib/utils';
import { toast } from '@/store/toast';
import { Button } from '@/components/ui/Button';

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = 'Name required';
    if (!isValidEmail(email)) err.email = 'Valid email required';
    if (phone && !isValidPhone(phone)) err.phone = 'Invalid phone';
    if (password.length < 6) err.password = 'Password must be 6+ characters';
    setErrors(err);
    if (Object.keys(err).length) return;

    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password, phone || undefined);
      setLoading(false);
      if (!result.ok) {
        toast(result.error || 'Signup failed', 'error');
        return;
      }
      toast('Account created. Welcome to the table!', 'success');
      router.push('/account');
    }, 500);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 pt-28 pb-20">
      <div className="w-full max-w-md rounded-[2rem] border border-cream-300 bg-beige-light/50 p-8 shadow-soft">
        <p className="font-hand text-lg text-terracotta">Join us</p>
        <h1 className="mt-1 font-display text-3xl">Create account</h1>

        <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="label-field">
              Full name
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
            <label htmlFor="phone" className="label-field">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              className={cn('input-field', errors.phone && 'border-red-400')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
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
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-charcoal-muted">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-terracotta hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
