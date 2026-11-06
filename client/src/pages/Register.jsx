
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Unable to create your account.');
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
            Create an account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join Satya Setu and become part of the community.
          </p>
        </div>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-midnight">
              Full name
            </label>

            <div className="flex items-center rounded-xl border border-line px-3 focus-within:border-electric">
              <User className="h-4 w-4 text-slate-400" />

              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

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
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-midnight">
              Confirm password
            </label>

            <div className="flex items-center rounded-xl border border-line px-3 focus-within:border-electric">
              <Lock className="h-4 w-4 text-slate-400" />

              <input
                id="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full bg-transparent px-3 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-electric hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </main>
  );
}
