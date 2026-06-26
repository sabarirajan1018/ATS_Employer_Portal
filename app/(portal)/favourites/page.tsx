'use client';

import Link from 'next/link';
import { Heart, Users, ArrowRight, ListFilter } from 'lucide-react';
import { AuthGate } from '@/components/portal/auth-gate';
import { PageHeader } from '@/components/portal/page-header';
import { CandidateCard } from '@/components/portal/candidate-card';
import { usePortal } from '@/lib/portal-context';
import { candidates } from '@/lib/candidates';
import { Button } from '@/components/ui/button';

function ShortlistContent() {
  const { savedIds } = usePortal();
  const saved = candidates.filter((c) => savedIds.includes(c.id));
  const approved = saved.filter((c) => c).length;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Shortlist"
        description="Candidates you've saved for review and follow-up."
        actions={
          <Button asChild variant="outline">
            <Link href="/candidates">
              <Users className="h-4 w-4" />
              Browse more
            </Link>
          </Button>
        }
      />

      {saved.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryTile label="Saved candidates" value={saved.length} icon={Heart} accent="primary" />
            <SummaryTile label="Contact requests approved" value={approved} icon={ArrowRight} accent="success" />
            <SummaryTile label="Avg AI match score" value={`${Math.round(saved.reduce((s, c) => s + c.matchScore, 0) / saved.length)}%`} icon={ListFilter} accent="chart" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {saved.map((c) => (
              <CandidateCard key={c.id} candidate={c} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Heart className="h-8 w-8" />
          </div>
          <p className="mt-4 text-base font-semibold text-foreground">Your shortlist is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Save candidates from the marketplace to compare them side-by-side here.
          </p>
          <Button asChild className="mt-5">
            <Link href="/candidates">
              <Users className="h-4 w-4" />
              Browse Candidates
            </Link>
          </Button>
        </div>
      )}
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
  value: string | number;
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
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentMap[accent]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export default function ShortlistPage() {
  return (
    <AuthGate>
      <ShortlistContent />
    </AuthGate>
  );
}
