'use client';

import {
  Bell,
  Send,
  CheckCircle2,
  XCircle,
  UserPlus,
  CreditCard,
  Info,
  CheckCheck,
} from 'lucide-react';
import { AuthGate } from '@/components/portal/auth-gate';
import { PageHeader } from '@/components/portal/page-header';
import { usePortal } from '@/lib/portal-context';
import type { NotificationItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const typeConfig: Record<
  NotificationItem['type'],
  { icon: React.ElementType; accent: string; iconBg: string }
> = {
  request_sent: { icon: Send, accent: 'text-primary', iconBg: 'bg-primary/10' },
  request_approved: { icon: CheckCircle2, accent: 'text-success', iconBg: 'bg-success/10' },
  request_rejected: { icon: XCircle, accent: 'text-destructive', iconBg: 'bg-destructive/10' },
  new_candidate: { icon: UserPlus, accent: 'text-primary', iconBg: 'bg-primary/10' },
  subscription: { icon: CreditCard, accent: 'text-warning', iconBg: 'bg-warning/10' },
  system: { icon: Info, accent: 'text-muted-foreground', iconBg: 'bg-muted' },
};

function formatRelative(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

function NotificationsContent() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = usePortal();

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay up to date with contact requests, new candidates and subscription activity."
        actions={
          unread > 0 ? (
            <Button variant="outline" onClick={markAllRead}>
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          ) : null
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryTile label="Unread" value={unread} icon={Bell} accent="primary" />
        <SummaryTile label="Total" value={notifications.length} icon={Info} accent="chart" />
        <SummaryTile label="This week" value={notifications.length} icon={UserPlus} accent="success" />
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => {
            const cfg = typeConfig[n.type];
            const Icon = cfg.icon;
            return (
              <div
                key={n.id}
                className={cn(
                  'flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-all',
                  n.read ? 'border-border' : 'border-primary/20 ring-1 ring-primary/5',
                )}
              >
                <div className={cn('flex h-11 w-11 flex-none items-center justify-center rounded-xl', cfg.iconBg)}>
                  <Icon className={cn('h-5 w-5', cfg.accent)} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                    {!n.read ? (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{formatRelative(n.date)}</p>
                </div>
                {!n.read ? (
                  <Button variant="ghost" size="sm" onClick={() => markNotificationRead(n.id)}>
                    Mark read
                  </Button>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
            <Bell className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm font-semibold text-foreground">No notifications</p>
            <p className="mt-1 text-xs text-muted-foreground">You&apos;re all caught up.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: 'primary' | 'success' | 'chart';
}) {
  const accentMap = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    chart: 'bg-chart-4/10 text-chart-4',
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', accentMap[accent])}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <AuthGate>
      <NotificationsContent />
    </AuthGate>
  );
}
