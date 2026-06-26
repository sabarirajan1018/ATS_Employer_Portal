'use client';

import Link from 'next/link';
import {
  Users,
  Heart,
  Send,
  CheckCircle2,
  Clock,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Sparkles,
  UserPlus,
  Bell,
} from 'lucide-react';
import { AuthGate } from '@/components/portal/auth-gate';
import { PageHeader } from '@/components/portal/page-header';
import { AITag } from '@/components/portal/ai-badge';
import { usePortal } from '@/lib/portal-context';
import { candidates } from '@/lib/candidates';
import { employerProfile } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  accent,
  href,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  accent: 'primary' | 'success' | 'warning' | 'destructive' | 'chart';
  href: string;
}) {
  const accentMap = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
    chart: 'bg-chart-4/10 text-chart-4',
  };
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentMap[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </Link>
  );
}

function DashboardContent() {
  const { savedIds, requests, subscription, activities, notifications } = usePortal();

  const approvedCount = requests.filter((r) => r.status === 'approved').length;
  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  const quickActions = [
    { label: 'Browse Candidates', desc: 'Explore the AI-processed marketplace', icon: Users, href: '/candidates' },
    { label: 'View Saved Candidates', desc: `${savedIds.length} on your shortlist`, icon: Heart, href: '/favourites' },
    { label: 'View Requests', desc: `${pendingCount} pending approval`, icon: Send, href: '/requests' },
  ];

  const activityIcon = {
    new_profile: UserPlus,
    approved: CheckCircle2,
    favourite: Heart,
    request_sent: Send,
  };

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title={`Welcome back, ${employerProfile.contactPerson.split(' ')[0]}`}
        description={`${employerProfile.companyName} — ${employerProfile.industry}, ${employerProfile.location}`}
        actions={
          <Button asChild>
            <Link href="/candidates">
              <Users className="h-4 w-4" />
              Browse Candidates
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Available Candidates"
          value={candidates.length}
          icon={Users}
          trend="+3 this week"
          accent="primary"
          href="/candidates"
        />
        <StatCard
          label="Saved Candidates"
          value={savedIds.length}
          icon={Heart}
          accent="chart"
          href="/favourites"
        />
        <StatCard
          label="Requests Sent"
          value={requests.length}
          icon={Send}
          accent="primary"
          href="/requests"
        />
        <StatCard
          label="Approved"
          value={approvedCount}
          icon={CheckCircle2}
          accent="success"
          href="/requests"
        />
        <StatCard
          label="Pending"
          value={pendingCount}
          icon={Clock}
          accent="warning"
          href="/requests"
        />
        <StatCard
          label="Subscription"
          value={subscription.planName}
          icon={CreditCard}
          accent="chart"
          href="/subscription"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
                <p className="text-xs text-muted-foreground">Latest marketplace and request updates</p>
              </div>
              <AITag />
            </div>
            <div className="mt-5 space-y-1">
              {activities.slice(0, 6).map((a) => {
                const Icon = activityIcon[a.type];
                return (
                  <div
                    key={a.id}
                    className="flex items-start gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-muted/40"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.description}</p>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{a.date}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            <p className="text-xs text-muted-foreground">Jump to the most common employer tasks</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {quickActions.map((qa) => (
                <Link
                  key={qa.href}
                  href={qa.href}
                  className="group flex flex-col rounded-xl border border-border bg-gradient-to-b from-muted/40 to-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <qa.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">{qa.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{qa.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Open
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-gradient-to-br from-sidebar to-sidebar-muted p-6 text-sidebar-foreground shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sidebar-accent" />
              <p className="text-sm font-semibold">Subscription Status</p>
            </div>
            <p className="mt-3 text-3xl font-bold">{subscription.planName}</p>
            <p className="mt-1 text-xs text-sidebar-muted-foreground">Active until {subscription.renewalDate}</p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sidebar-muted-foreground">Contact requests</span>
                <span className="font-semibold text-sidebar-foreground">
                  {subscription.requestsUsed} / {subscription.requestsLimit}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-sidebar-border">
                <div
                  className="h-full rounded-full bg-sidebar-accent transition-all"
                  style={{
                    width: `${Math.min(100, (subscription.requestsUsed / Math.max(1, subscription.requestsLimit)) * 100)}%`,
                  }}
                />
              </div>
            </div>

            <Button asChild variant="secondary" className="mt-5 w-full bg-sidebar-accent text-white hover:bg-sidebar-accent/90">
              <Link href="/subscription">
                Manage Subscription
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Latest Notifications</h2>
              </div>
              <Link href="/notifications" className="text-xs font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className="flex items-start gap-2.5">
                  <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full ${n.read ? 'bg-muted-foreground/30' : 'bg-primary'}`} />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">{n.title}</p>
                    <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2">{n.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGate>
      <DashboardContent />
    </AuthGate>
  );
}
