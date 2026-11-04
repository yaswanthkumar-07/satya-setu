import { FileWarning, FolderOpen, Gavel, Scale, Search } from 'lucide-react';
import StatCard from '../ui/StatCard';
import { CASE_STATUS } from '../../utils/status';
import { countStatuses } from '../../utils/intelligence';

const ICONS = {
  allegation: FileWarning,
  investigation: Search,
  court: Scale,
  conviction: Gavel,
};

const NOTES = {
  allegation: 'Unproven claims live in Community reports, not in this register.',
  investigation: 'Under examination. No finding of guilt.',
  court: 'A ruling, order or acquittal. Read the judgment.',
  conviction: 'Found guilty by a court. Appeals may be pending.',
};

export default function KpiRow({ cases, totalCases }) {
  const counts = countStatuses(cases);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        dark
        icon={FolderOpen}
        value={cases.length}
        label="Cases in view"
        note={`Out of ${totalCases} in the register.`}
      />
      {Object.keys(CASE_STATUS).map((key) => (
        <StatCard
          key={key}
          dark
          icon={ICONS[key]}
          value={counts[key]}
          label={CASE_STATUS[key].label}
          note={NOTES[key]}
        />
      ))}
    </div>
  );
}