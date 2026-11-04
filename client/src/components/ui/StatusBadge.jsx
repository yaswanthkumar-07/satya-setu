import Badge from './Badge';
import { REPORT_STATUS, CASE_STATUS } from '../../utils/status';

/**
 * Badge for a report status (type="report") or a case status (type="case").
 * Hovering shows what the status means.
 */
export default function StatusBadge({ status, type = 'report', dark = false, className = '' }) {
  const config = (type === 'case' ? CASE_STATUS : REPORT_STATUS)[status];
  if (!config) return null;

  return (
    <Badge
      tone={config.tone}
      icon={config.icon}
      dark={dark}
      title={config.description}
      className={className}
    >
      {config.label}
    </Badge>
  );
}