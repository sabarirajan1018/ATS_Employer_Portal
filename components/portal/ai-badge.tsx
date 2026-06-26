import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export function AIBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary',
        className,
      )}
    >
      <Sparkles className="h-3 w-3" />
      {children}
    </span>
  );
}

export function AITag({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-primary/10 to-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary',
        className,
      )}
    >
      <Sparkles className="h-3 w-3" />
      {children ?? 'AI'}
    </span>
  );
}
