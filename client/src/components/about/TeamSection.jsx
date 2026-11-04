import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import DemoNotice from '../ui/DemoNotice';
import { TEAM } from '../../data/aboutData';

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function TeamSection() {
  const hasPlaceholders = TEAM.some((m) => m.placeholder);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="The people"
            title="Project team"
            description="The people building and maintaining SATYA SETU."
          />
        </Reveal>

        {hasPlaceholders && (
          <DemoNotice className="mt-6">
            <strong>Placeholder team details.</strong> Replace the entries in{' '}
            <code className="rounded bg-amber/20 px-1">src/data/aboutData.js</code> with real names,
            roles and bios before launch.
          </DemoNotice>
        )}

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <li key={member.id}>
              <Reveal delay={i * 0.06} className="h-full">
                <Card className="h-full p-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-electric to-cyan font-serif text-xl font-bold text-white">
                    {initials(member.name)}
                  </span>
                  <h3 className="mt-4 font-sans text-base font-semibold text-midnight">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-electric">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
                  {member.placeholder && (
                    <Badge tone="amber" className="mt-4">
                      Placeholder
                    </Badge>
                  )}
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}