'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';

type RegisterResponse = {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  message?: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

    try {
      const response = await fetch(`${apiUrl}/auth/sign-up/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const result: RegisterResponse = await response.json();

      if (!response.ok) {
        setError(result.message || 'Could not create your account. Please try again.');
        setIsLoading(false);
        return;
      }

      if (!result.token) {
        setError('Account created, but the server did not send an access token. Please log in.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('geargridToken', result.token);
      if (result.user) {
        localStorage.setItem('geargridUser', JSON.stringify(result.user));
      }

      setMessage('Account created. Opening the equipment catalog...');
      window.setTimeout(() => {
        router.push('/equipment');
      }, 700);
    } catch {
      setError('Could not connect to GearGrid. Check that the server is running.');
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0b1020] px-5 py-14 text-white">
      <section className="w-full max-w-md rounded-2xl border border-[#202c42] bg-[#111a2e] p-6 sm:p-8">
        <p className="text-sm font-semibold text-[#ffad00]">JOIN GEARGRID</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-3 text-sm leading-6 text-[#a0aec4]">
          Create an account to view equipment details and book a rental.
        </p>

        <form onSubmit={handleRegister} className="mt-7 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-[#34425a] bg-[#0b1223] px-4 py-3 text-sm outline-none focus:border-[#ffad00]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-[#34425a] bg-[#0b1223] px-4 py-3 text-sm outline-none focus:border-[#ffad00]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-[#34425a] bg-[#0b1223] px-4 py-3 text-sm outline-none focus:border-[#ffad00]"
            />
            <p className="mt-2 text-xs text-[#a0aec4]">Use at least 8 characters.</p>
          </div>

          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#ff9d00] px-5 py-3 font-semibold text-[#111827] transition-colors hover:bg-[#ffb52e] disabled:cursor-wait disabled:opacity-70"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#a0aec4]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#ffad00] hover:text-[#ffc04d]">
            Log in
          </Link>
        </p>
      </section>

      {message && (
        <div
          role="status"
          className="fixed bottom-5 right-5 rounded-lg border border-emerald-500/50 bg-[#10271f] px-5 py-3 text-sm text-emerald-200 shadow-lg"
        >
          {message}
        </div>
      )}
    </main>
  );
}
