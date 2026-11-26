'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';

type LoginResponse = {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  message?: string;
};

type GoogleLoginResponse = {
  url?: string;
  message?: string;
};

type AuthTokenResponse = {
  token?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isGoogleReturn = new URLSearchParams(window.location.search).get('google') === 'success';
    if (!isGoogleReturn) return;

    async function finishGoogleLogin() {
      setIsLoading(true);

      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

      try {
        const response = await fetch(`${apiUrl}/auth/token`, {
          method: 'GET',
          credentials: 'include',
        });

        const result: AuthTokenResponse = await response.json();

        if (!response.ok || !result.token) {
          setError('Google login finished, but GearGrid could not get your access token. Please try again.');
          setIsLoading(false);
          return;
        }

        localStorage.setItem('geargridToken', result.token);
        window.history.replaceState({}, '', '/login');
        setMessage('Login successful. Opening the equipment catalog...');
        window.setTimeout(() => {
          router.push('/equipment');
        }, 700);
      } catch {
        setError('Could not connect to GearGrid. Check that the server is running.');
        setIsLoading(false);
      }
    }

    void finishGoogleLogin();
  }, [router]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

    try {
      const response = await fetch(`${apiUrl}/auth/sign-in/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const result: LoginResponse = await response.json();

      if (!response.ok) {
        setError(result.message || 'Email or password is incorrect.');
        setIsLoading(false);
        return;
      }

      if (!result.token) {
        setError('Login worked, but the server did not send an access token.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('geargridToken', result.token);
      if (result.user) {
        localStorage.setItem('geargridUser', JSON.stringify(result.user));
      }

      setMessage('Login successful. Opening the equipment catalog...');
      window.setTimeout(() => {
        router.push('/equipment');
      }, 700);
    } catch {
      setError('Could not connect to GearGrid. Check that the server is running.');
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError('');
    setMessage('');
    setIsLoading(true);

    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

    try {
      const response = await fetch(`${apiUrl}/auth/sign-in/social`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          provider: 'google',
          callbackURL: `${window.location.origin}/login?google=success`,
        }),
      });

      const result: GoogleLoginResponse = await response.json();

      if (!response.ok || !result.url) {
        setError(result.message || 'Google login is not ready. Check the server Google settings.');
        setIsLoading(false);
        return;
      }

      window.location.href = result.url;
    } catch {
      setError('Could not connect to GearGrid. Check that the server is running.');
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0b1020] px-5 py-14 text-white">
      <section className="w-full max-w-md rounded-2xl border border-[#202c42] bg-[#111a2e] p-6 sm:p-8">
        <p className="text-sm font-semibold text-[#ffad00]">WELCOME BACK</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Log in to GearGrid</h1>
        <p className="mt-3 text-sm leading-6 text-[#a0aec4]">
          Sign in to view equipment details and manage your rentals.
        </p>

        <form onSubmit={handleLogin} className="mt-7 space-y-5">
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-[#34425a] bg-[#0b1223] px-4 py-3 text-sm outline-none focus:border-[#ffad00]"
            />
          </div>

          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#ff9d00] px-5 py-3 font-semibold text-[#111827] transition-colors hover:bg-[#ffb52e] disabled:cursor-wait disabled:opacity-70"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-[#8391a8]">
          <span className="h-px flex-1 bg-[#34425a]" />
          <span>OR</span>
          <span className="h-px flex-1 bg-[#34425a]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#34425a] bg-[#0b1223] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#18243a] disabled:cursor-wait disabled:opacity-70"
        >
          <span className="text-xl font-bold text-[#4285f4]" aria-hidden="true">G</span>
          {isLoading ? 'Please wait...' : 'Continue with Google'}
        </button>

        <p className="mt-6 text-center text-sm text-[#a0aec4]">
          New to GearGrid?{' '}
          <Link href="/register" className="font-semibold text-[#ffad00] hover:text-[#ffc04d]">
            Create an account
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
