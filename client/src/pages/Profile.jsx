import { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, FileText, Mail, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { LoadingState } from '../components/ui/States';
import UserAvatar, { getDisplayName } from '../components/UserAvatar';
import { useAuth } from '../contexts/AuthContext';
import { readStore } from '../utils/demoStorage';

/** Basic profile page: name, email and photo from the signed-in Firebase user. */
export default function Profile() {
  const auth = useAuth();
  const user = auth?.user ?? null;
  const authLoading = Boolean(auth?.loading);

  // Reports saved by the demo in THIS browser (not tied to the account yet)
  const awaitingCount = useMemo(() => readStore().pending.length, []);

  if (authLoading) return <LoadingState message="Loading your profile…" className="min-h-[50vh]" />;
  if (!user) return <Navigate to="/login" replace />;

  const name = getDisplayName(user);

  return (
    <section className="py-12 sm:py-16">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Account</p>
        <h1 className="mt-2 text-4xl font-bold text-midnight sm:text-5xl">My Profile</h1>

        <Card className="mt-8 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <UserAvatar user={user} className="h-24 w-24" textClassName="text-3xl" />
            <div className="min-w-0">
              <h2 className="truncate font-serif text-2xl font-bold text-midnight">{name}</h2>
              {user.email && (
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-muted">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span className="truncate">{user.email}</span>
                </p>
              )}
              <div className="mt-3">
                {user.emailVerified ? (
                  <Badge tone="green">Email verified</Badge>
                ) : (
                  <Badge tone="amber">Email not verified</Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card id="reports" className="mt-6 scroll-mt-24 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-electric" aria-hidden="true" />
            <h2 className="font-sans text-lg font-semibold text-midnight">My reports</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {awaitingCount > 0
              ? `You have ${awaitingCount} report${awaitingCount === 1 ? '' : 's'} awaiting moderation in this browser.`
              : 'You have no reports awaiting moderation in this browser.'}{' '}
            In this demo, reports are saved only in the browser you used and are not yet linked to
            your account.
          </p>
          <Button to="/community" variant="outline" size="sm" icon={ArrowRight} className="mt-4">
            Go to Community
          </Button>
        </Card>

        <Card id="settings" className="mt-6 scroll-mt-24 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-electric" aria-hidden="true" />
            <h2 className="font-sans text-lg font-semibold text-midnight">Account settings</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Your name, email and photo come from your sign-in account. Editing them from SATYA SETU
            is not available yet.
          </p>
        </Card>

        <p className="mt-8 text-xs leading-relaxed text-muted">
          SATYA SETU is independent and is not a government authority. To file an official
          complaint, use the{' '}
          <Link to="/resources" className="font-semibold text-electric hover:underline">
            official channels
          </Link>
          .
        </p>
      </div>
    </section>
  );
}