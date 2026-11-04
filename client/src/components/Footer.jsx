import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Logo from './Logo';
import { NAV_LINKS, SITE, DISCLAIMER_SHORT } from '../utils/constants';

const EXPLORE = [
  { label: 'Community Reports', to: '/community' },
  { label: 'Historical Intelligence', to: '/intelligence' },
  { label: 'Citizen Resources', to: '/resources' },
];

const PROJECT = [
  { label: 'About the Project', to: '/about' },
  { label: 'Contact & Feedback', to: '/about#contact' },
  { label: 'Disclaimer', to: '/about#disclaimer' },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-cyan">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-midnight text-slate-300">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo variant="dark" />
            <p className="mt-4 font-serif text-lg italic text-white/90">{SITE.tagline}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              A citizen-powered platform for corruption awareness, transparency and
              accountability. {SITE.meaning}.
            </p>
          </div>

          <FooterColumn title="Explore" links={EXPLORE} />
          <FooterColumn title="Project" links={PROJECT} />
        </div>

        {/* Safety / independence notice */}
        <div className="mt-12 flex items-start gap-3 rounded-xl border border-amber/30 bg-amber/5 p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
            {DISCLAIMER_SHORT} For official complaints, use the verified government
            channels listed on the{' '}
            <Link to="/resources" className="font-semibold text-cyan hover:underline">
              Citizen Resources
            </Link>{' '}
            page.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. Educational prototype. All demonstration data is synthetic.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}