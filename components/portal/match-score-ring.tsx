import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface MatchScoreRingProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizes = {
  sm: { box: 'h-12 w-12', text: 'text-xs', stroke: 4, r: 18 },
  md: { box: 'h-16 w-16', text: 'text-sm', stroke: 5, r: 26 },
  lg: { box: 'h-24 w-24', text: 'text-lg', stroke: 6, r: 42 },
};

export function MatchScoreRing({ score, size = 'md', label }: MatchScoreRingProps) {
  const s = sizes[size];
  const clamped = Math.max(0, Math.min(100, score));
  const circumference = 2 * Math.PI * s.r;
  const offset = circumference - (clamped / 100) * circumference;

  const color =
    clamped >= 90 ? 'hsl(142 71% 45%)' : clamped >= 75 ? 'hsl(217 91% 45%)' : 'hsl(38 92% 50%)';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn('relative flex items-center justify-center', s.box)}>
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r={s.r}
            fill="none"
            stroke="hsl(214 32% 91%)"
            strokeWidth={s.stroke}
          />
          <circle
            cx="32"
            cy="32"
            r={s.r}
            fill="none"
            stroke={color}
            strokeWidth={s.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className={cn('font-bold text-foreground', s.text)}>{clamped}%</span>
      </div>
      {label ? (
        <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          {label}
        </span>
      ) : null}
    </div>
  );
}
