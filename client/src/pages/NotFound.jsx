import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section>
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-electric">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-6">Error 404</p>
        <h1 className="mt-2 text-4xl font-bold text-midnight sm:text-5xl">
          This bridge leads nowhere
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-electric px-5 py-3 text-sm font-semibold text-white transition hover:shadow-glow"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}