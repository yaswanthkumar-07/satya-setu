
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

import {
  loginUser,
  loginWithGoogle,
  resetUserPassword,
} from '../firebase/auth';

import Button from '../components/ui/Button';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await loginUser(email, password);
      navigate('/');
    } catch (err) {
      setError(getAuthError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError(getAuthError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Enter your email address first.');
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    try {
      await resetUserPassword(email);
      setMessage('Password reset email sent. Check your inbox.');
    } catch (err) {
      setError(getAuthError(err.code));
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

        {message && (
          <p role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {message}
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

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="mt-2 text-sm font-semibold text-electric hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={loading}
          onClick={handleGoogleLogin}
        >
          <span className="font-bold text-lg">G</span>
          Continue with Google
        </Button>

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

function getAuthError(code) {
  const errors = {
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-email': 'Please enter a valid email.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };

  return errors[code] || 'Unable to sign in. Please try again.';
}
