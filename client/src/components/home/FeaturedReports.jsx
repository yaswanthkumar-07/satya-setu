import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Building2, ChevronUp, MapPin, MessageSquare } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';
import DemoNotice from '../ui/DemoNotice';
import Reveal from '../ui/Reveal';
import { LoadingState, EmptyState, ErrorState } from '../ui/States';
import { FEATURED_REPORTS } from '../../data/homeData';

function ReportPreviewCard({ report }) {
  const SectorIcon = report.sector === 'Government' ? Building2 : Briefcase;

  return (
    <Card hover className="flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={report.status} />
        <Badge tone="neutral">{report.category}</Badge>
        {report.isDemo && <Badge tone="amber">Demo</Badge>}
      </div>

      <h3 className="mt-4 font-sans text-lg font-semibold leading-snug text-midnight">
        {report.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{report.summary}</p>

      <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <div className="inline-flex items-center gap-1.5">
          <dt className="sr-only">Location</dt>
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <dd>
            {report.district}, {report.state}
          </dd>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <dt className="sr-only">Sector</dt>
          <SectorIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <dd>{report.sector} sector</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
        <div className="flex items-center gap-4 text-muted">
          <span className="inline-flex items-center gap-1 font-semibold text-midnight">
            <ChevronUp className="h-4 w-4 text-electric" aria-hidden="true" />
            {report.upvotes}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            {report.comments}
          </span>
          <span className="text-xs">{report.posted}</span>
        </div>
        <Link
          to="/community"
          className="inline-flex items-center gap-1 font-semibold text-electric hover:underline"
        >
          Discuss
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

/**
 * Props are optional so the Home page works offline with demo data.
 * In Batch 6 the page can pass API results through reports/loading/error.
 */
export default function FeaturedReports({ reports = FEATURED_REPORTS, loading = false, error = null, onRetry }) {
  let body;

  if (loading) {
    body = <LoadingState message="Loading featured reports…" />;
  } else if (error) {
    body = <ErrorState message={error} onRetry={onRetry} />;
  } else if (!reports.length) {
    body = (
      <EmptyState
        title="No featured reports yet"
        description="Be the first to share a concern responsibly."
        action={<Button to="/community" size="sm">Go to Community</Button>}
      />
    );
  } else {
    body = (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, i) => (
          <Reveal key={report.id} delay={i * 0.08}>
            <ReportPreviewCard report={report} />
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="From the community"
              title="Featured community reports"
              description="Citizen-submitted concerns appear here with a clear verification label. A report is a claim, not a finding."
            />
          </Reveal>
          <Button to="/community" variant="outline" icon={ArrowRight}>
            View all reports
          </Button>
        </div>

        <DemoNotice className="mt-8">
          <strong>Demonstration data.</strong> The reports below are synthetic examples written for
          this prototype. They describe no real person, office or incident.
        </DemoNotice>

        <div className="mt-8">{body}</div>
      </div>
    </section>
  );
}