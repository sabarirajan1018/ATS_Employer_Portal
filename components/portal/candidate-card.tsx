'use client';

import Link from 'next/link';
import { Heart, Send, MapPin, Briefcase, Clock, CheckCircle2, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIBadge } from '@/components/portal/ai-badge';
import { MatchScoreRing } from '@/components/portal/match-score-ring';
import { StatusBadge } from '@/components/portal/status-badge';
import { usePortal } from '@/lib/portal-context';
import type { Candidate } from '@/lib/types';
import { cn } from '@/lib/utils';

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const { toggleSaved, isSaved, getRequestFor } = usePortal();
  const saved = isSaved(candidate.id);
  const request = getRequestFor(candidate.id);
  const contactUnlocked = request?.status === 'approved';

  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-12 w-12 flex-none items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm',
              contactUnlocked ? 'bg-success' : 'bg-primary',
            )}
          >
            {candidate.redactedName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">
              {candidate.redactedName}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Briefcase className="h-3 w-3" />
              {candidate.occupation}
            </p>
          </div>
        </div>
        <MatchScoreRing score={candidate.matchScore} size="sm" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {candidate.country}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {candidate.yearsExperience} yrs exp
        </div>
      </div>

      <div className="mt-3">
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] font-medium text-foreground">
          {candidate.occupationCode}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {candidate.aiSummary}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {candidate.skills.slice(0, 4).map((skill) => (
          <Badge key={skill} variant="secondary" className="font-normal">
            {skill}
          </Badge>
        ))}
        {candidate.skills.length > 4 ? (
          <span className="inline-flex items-center px-2 text-[11px] text-muted-foreground">
            +{candidate.skills.length - 4} more
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <AIBadge>AI Match</AIBadge>
        {candidate.certifications.filter((c) => c.verified).length > 0 ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success">
            <CheckCircle2 className="h-3 w-3" />
            {candidate.certifications.filter((c) => c.verified).length} verified certs
          </span>
        ) : null}
      </div>

      {request ? (
        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
          <StatusBadge status={request.status} />
          <span className="text-[11px] text-muted-foreground">
            {request.status === 'approved'
              ? 'Contact details unlocked'
              : request.status === 'rejected'
                ? 'Request declined by candidate'
                : 'Waiting for candidate approval'}
          </span>
        </div>
      ) : (
        contactUnlocked === false && (
          <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            Contact information locked until candidate approval
          </div>
        )
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button asChild className="flex-1">
          <Link href={`/candidates/${candidate.id}`}>View Profile</Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleSaved(candidate.id)}
          aria-label={saved ? 'Remove from shortlist' : 'Save to shortlist'}
          className={cn(saved && 'border-destructive/30 text-destructive hover:bg-destructive/10')}
        >
          <Heart className={cn('h-4 w-4', saved && 'fill-current')} />
        </Button>
        {request ? (
          <Button asChild variant="secondary" size="icon" aria-label="View contact request">
            <Link href="/requests">
              <Send className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="secondary" size="icon" aria-label="Send contact request">
            <Link href={`/candidates/${candidate.id}?action=request`}>
              <Send className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
