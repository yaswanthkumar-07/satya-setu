
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(
        err.message || 'Unable to sign in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-page flex min-h-[75vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-9">

        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-electric">
            SATYA SETU
          </p>

          <h1 className="mt-3 text-3xl font-bold text-midnight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your account.
          </p>
        </div>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-midnight">
              Email address
            </label>

            <div className="flex items-center rounded-xl border border-line px-3 focus-within:border-electric">
              <Mail className="h-4 w-4 text-slate-400" />

              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-midnight">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-line px-3 focus-within:border-electric">
              <Lock className="h-4 w-4 text-slate-400" />

              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-electric hover:underline">
            Create account
          </Link>
        </p>

      </div>
    </main>
  );
}
