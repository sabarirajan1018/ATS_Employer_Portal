'use client';

import { CheckCircle2, Info, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortal } from '@/lib/portal-context';

export function ToastStack() {
  const { toasts, dismissToast } = usePortal();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'animate-slide-up pointer-events-auto flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-lg ring-1 ring-black/5',
          )}
        >
          <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{t.title}</p>
            {t.description ? (
              <p className="mt-0.5 text-xs text-muted-foreground">{t.description}</p>
            ) : null}
          </div>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
