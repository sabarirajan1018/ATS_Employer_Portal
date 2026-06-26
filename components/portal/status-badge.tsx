import { cn } from '@/lib/utils';
import type { RequestStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

const config: Record<RequestStatus, { label: string; cls: string; dot: string }> = {
  pending: {
    label: 'Pending',
    cls: 'bg-warning/10 text-warning border-warning/20',
    dot: 'bg-warning',
  },
  approved: {
    label: 'Approved',
    cls: 'bg-success/10 text-success border-success/20',
    dot: 'bg-success',
  },
  rejected: {
    label: 'Rejected',
    cls: 'bg-destructive/10 text-destructive border-destructive/20',
    dot: 'bg-destructive',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        c.cls,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>
  );
}
