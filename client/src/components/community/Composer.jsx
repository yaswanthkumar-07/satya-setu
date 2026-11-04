import { ImagePlus, User } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

/** Reddit-style "start a post" bar. Opens the report form. */
export default function Composer({ onCreate }) {
  return (
    <Card className="flex items-center gap-3 p-3 sm:p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
        <User className="h-5 w-5" aria-hidden="true" />
      </span>
      <button
        type="button"
        onClick={onCreate}
        className="flex-1 rounded-xl border border-line bg-paper px-4 py-2.5 text-left text-sm text-muted transition hover:border-electric/50"
      >
        Share a concern responsibly…
      </button>
      <Button
        variant="outline"
        size="sm"
        icon={ImagePlus}
        iconPosition="left"
        onClick={onCreate}
        className="hidden sm:inline-flex"
      >
        Add media
      </Button>
    </Card>
  );
}