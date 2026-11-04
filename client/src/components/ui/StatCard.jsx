import Card from './Card';

/** Single statistic tile: icon, big value, label and optional note. */
export default function StatCard({ icon: Icon, value, label, note, dark = false }) {
  return (
    <Card dark={dark} className="p-6">
      {Icon && (
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            dark ? 'bg-cyan/10 text-cyan' : 'bg-electric/10 text-electric'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      )}
      <p className={`mt-5 font-serif text-4xl font-bold ${dark ? 'text-white' : 'text-midnight'}`}>
        {value}
      </p>
      <p className={`mt-1 text-sm font-semibold ${dark ? 'text-slate-200' : 'text-ink'}`}>{label}</p>
      {note && (
        <p className={`mt-2 text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-muted'}`}>{note}</p>
      )}
    </Card>
  );
}