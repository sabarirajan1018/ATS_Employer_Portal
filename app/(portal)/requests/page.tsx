'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Mail,
  Phone,
  Download,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { AuthGate } from '@/components/portal/auth-gate';
import { PageHeader } from '@/components/portal/page-header';
import { StatusBadge } from '@/components/portal/status-badge';
import { MatchScoreRing } from '@/components/portal/match-score-ring';
import { usePortal } from '@/lib/portal-context';
import { getCandidate } from '@/lib/candidates';
import type { RequestStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tab = 'all' | RequestStatus;

function RequestsContent() {
  const { requests, savedIds } = usePortal();
  const [tab, setTab] = useState<Tab>('all');

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  const filtered = tab === 'all' ? requests : requests.filter((r) => r.status === tab);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'approved', label: 'Approved' },
    { id: 'rejected', label: 'Rejected' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Contact Requests"
        description="Manage your contact requests and unlock candidate information upon approval."
        actions={
          <Button asChild>
            <Link href="/candidates">
              <Users className="h-4 w-4" />
              Browse Candidates
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Total Requests" value={counts.all} icon={Send} accent="primary" />
        <StatTile label="Pending" value={counts.pending} icon={Clock} accent="warning" />
        <StatTile label="Approved" value={counts.approved} icon={CheckCircle2} accent="success" />
        <StatTile label="Rejected" value={counts.rejected} icon={XCircle} accent="destructive" />
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
              tab === t.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {t.label}
            <span className={cn('flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold', tab === t.id ? 'bg-white/20' : 'bg-muted text-muted-foreground')}>
              {counts[t.id]}
            </span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((r) => {
            const candidate = getCandidate(r.candidateId);
            const unlocked = r.status === 'approved' && candidate;
            return (
              <div key={r.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-4 lg:w-72">
                    <div className={cn('flex h-12 w-12 flex-none items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm', r.status === 'approved' ? 'bg-success' : 'bg-primary')}>
                      {r.candidateName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <Link href={`/candidates/${r.candidateId}`} className="text-sm font-semibold text-foreground hover:text-primary">
                        {r.candidateName}
                      </Link>
                      <p className="text-xs text-muted-foreground">{r.occupation} · {r.country}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{r.occupationCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 lg:w-48">
                    <MatchScoreRing score={r.matchScore} size="sm" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Request date</p>
                      <p className="text-sm font-medium text-foreground">{r.requestDate}</p>
                      {r.resolvedDate ? (
                        <p className="text-[11px] text-muted-foreground">Resolved {r.resolvedDate}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="mt-2 flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2">
                      <MessageSquare className="mt-0.5 h-3.5 w-3.5 flex-none text-muted-foreground" />
                      <p className="text-xs italic text-muted-foreground">&ldquo;{r.message}&rdquo;</p>
                    </div>
                    <p className="mt-2 text-xs font-medium">
                      {r.status === 'pending' && <span className="text-warning">Waiting for candidate approval</span>}
                      {r.status === 'approved' && <span className="text-success">Contact details unlocked</span>}
                      {r.status === 'rejected' && <span className="text-destructive">Request declined by candidate</span>}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 lg:w-40">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/candidates/${r.candidateId}`}>
                        View Profile
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    {unlocked ? (
                      <Button variant="secondary" size="sm" className="bg-success/10 text-success hover:bg-success/20">
                        <Mail className="h-3.5 w-3.5" />
                        Contact Unlocked
                      </Button>
                    ) : null}
                  </div>
                </div>

                {unlocked ? (
                  <div className="border-t border-success/20 bg-success/5 px-5 py-4">
                    <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Contact Information Unlocked
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <ContactField icon={Mail} label="Email" value={candidate!.contact.email} />
                      <ContactField icon={Phone} label="Phone" value={candidate!.contact.phone} />
                      <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10 text-success">
                          <Download className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Resume</p>
                          <Button variant="link" className="h-auto p-0 text-sm font-semibold text-primary" onClick={() => {}}>
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <Send className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-semibold text-foreground">No {tab !== 'all' ? tab : ''} requests yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {tab === 'pending' && 'Pending requests from candidates will appear here.'}
            {tab === 'approved' && 'Approved requests with unlocked contact details will appear here.'}
            {tab === 'rejected' && 'Declined requests will appear here.'}
            {tab === 'all' && 'Send a contact request from any candidate profile to get started.'}
          </p>
        </div>
      )}
    </div>
  );
}

function StatTile({ label, value, icon: Icon, accent }: { label: string; value: number; icon: React.ElementType; accent: 'primary' | 'success' | 'warning' | 'destructive' }) {
  const accentMap = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentMap[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function ContactField({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-success/10 text-success">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function RequestsPage() {
  return (
    <AuthGate>
      <RequestsContent />
    </AuthGate>
  );
}
