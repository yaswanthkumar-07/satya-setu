import { ExternalLink, Phone } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';
import { HELPLINES } from '../../data/resourcesData';

const telHref = (number) => `tel:${number.replace(/[^\d]/g, '')}`;

export default function HelplineList() {
  return (
    <section id="helplines" className="scroll-mt-20 py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Helplines"
            title="Numbers worth saving"
            description="Tap a number to call from your phone. If a number does not connect, check the official website for the current one."
          />
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HELPLINES.map((h, i) => (
            <li key={h.number}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <Card hover className="flex h-full flex-col p-6">
                  <a
                    href={telHref(h.number)}
                    className="inline-flex items-center gap-2 self-start rounded-xl bg-electric/10 px-3 py-2 font-serif text-2xl font-bold text-electric transition hover:bg-electric hover:text-white"
                    aria-label={`Call ${h.name} on ${h.number}`}
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    {h.number}
                  </a>
                  <h3 className="mt-4 font-sans text-base font-semibold text-midnight">{h.name}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{h.use}</p>
                  <a
                    href={h.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-electric hover:underline"
                  >
                    Official site
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}