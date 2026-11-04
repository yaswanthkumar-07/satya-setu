import {
  Ban,
  Check,
  ExternalLink,
  FileSearch,
  Landmark,
  Laptop,
  Lightbulb,
  MapPin,
  MessagesSquare,
  Phone,
  Scale,
  ShieldAlert,
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const ICONS = { ShieldAlert, Landmark, MessagesSquare, FileSearch, MapPin, Scale, Laptop };

const telHref = (number) => `tel:${number.replace(/[^\d]/g, '')}`;

function ListBlock({ title, items, icon: Icon, tone }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-electric">{title}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((text) => (
          <li key={text} className="flex gap-2.5 text-sm leading-snug text-ink">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tone}`} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ChannelCard({ channel }) {
  const Icon = ICONS[channel.icon] ?? Landmark;

  return (
    <Card as="article" id={`channel-${channel.id}`} className="flex h-full scroll-mt-24 flex-col p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-cyan text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-sans text-lg font-semibold leading-snug text-midnight">
            {channel.name}
          </h3>
          <div className="mt-2">
            <Badge tone={channel.level === 'state' ? 'blue' : 'violet'}>{channel.levelLabel}</Badge>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-electric">Jurisdiction</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink">{channel.jurisdiction}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-electric">Purpose</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted">{channel.purpose}</p>
        </div>

        <ListBlock title="Good for" items={channel.goodFor} icon={Check} tone="text-emerald-600" />
        <ListBlock title="Not the right place for" items={channel.notFor} icon={Ban} tone="text-red-500" />
        <ListBlock title="Tips" items={channel.tips} icon={Lightbulb} tone="text-amber" />
      </div>

      <div className="mt-6 flex-1" />

      {channel.helplines.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2">
          {channel.helplines.map((h) => (
            <li key={h.number}>
              <a
                href={telHref(h.number)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-midnight transition hover:border-electric hover:text-electric"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {h.number}
                <span className="font-normal text-muted">· {h.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-3 border-t border-line pt-4">
        {channel.actionUrl && (
          <Button href={channel.actionUrl} size="sm" icon={ExternalLink}>
            {channel.actionLabel}
          </Button>
        )}
        <Button
          href={channel.website}
          size="sm"
          variant={channel.actionUrl ? 'outline' : 'primary'}
          icon={ExternalLink}
        >
          Official website
        </Button>
      </div>
    </Card>
  );
}