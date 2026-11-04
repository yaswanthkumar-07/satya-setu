import { useState } from 'react';
import Card from '../ui/Card';
import CreateReportForm from './CreateReportForm';

/**
 * Inline "Create a report" section at the bottom of the Community page.
 * Every create button scrolls here (see Community.jsx).
 *
 * `onFinished` runs after "Done" or "Cancel". The form is remounted with a new
 * key so it starts empty next time.
 */
export default function CreateReportSection({ onSubmit, onFinished }) {
  const [formKey, setFormKey] = useState(0);

  const handleClose = () => {
    setFormKey((k) => k + 1);
    onFinished?.();
  };

  return (
    <section id="create-report" className="scroll-mt-24 border-t border-line bg-white py-12 sm:py-16">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Create a report</p>
          <h2 className="mt-2 text-3xl font-bold text-midnight sm:text-4xl">
            Share a concern responsibly
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Reports are reviewed by moderators before anything is published. After you submit, your
            report appears under &ldquo;Awaiting moderation&rdquo; at the top of this page.
          </p>

          <Card className="mt-8 p-5 sm:p-8">
            <CreateReportForm key={formKey} onSubmit={onSubmit} onClose={handleClose} />
          </Card>
        </div>
      </div>
    </section>
  );
}