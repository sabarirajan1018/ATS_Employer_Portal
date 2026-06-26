'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Send,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Star,
  Briefcase,
  MapPin,
  Clock,
  Languages,
  Award,
  FileText,
  Sparkles,
  TrendingUp,
  Download,
  Mail,
  Phone,
  User,
  X,
  AlertCircle,
} from 'lucide-react';
import { AuthGate } from '@/components/portal/auth-gate';
import { PageHeader } from '@/components/portal/page-header';
import { AIBadge, AITag } from '@/components/portal/ai-badge';
import { MatchScoreRing } from '@/components/portal/match-score-ring';
import { StatusBadge } from '@/components/portal/status-badge';
import { usePortal } from '@/lib/portal-context';
import { getCandidate } from '@/lib/candidates';
import type { Candidate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function DetailContent() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const candidate = getCandidate(id);

  const { isSaved, toggleSaved, getRequestFor, requestContact, pushToast } = usePortal();
  const [showRequestModal, setShowRequestModal] = useState(
    searchParams.get('action') === 'request',
  );
  const [message, setMessage] = useState('');

  if (!candidate) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground/50" />
        <p className="mt-3 text-sm font-semibold text-foreground">Candidate not found</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/candidates">Back to marketplace</Link>
        </Button>
      </div>
    );
  }

  const saved = isSaved(candidate.id);
  const request = getRequestFor(candidate.id);
  const contactUnlocked = request?.status === 'approved';

  const handleSave = () => {
    toggleSaved(candidate.id);
    pushToast(
      saved ? 'Removed from shortlist' : 'Saved to shortlist',
      saved ? undefined : `${candidate.redactedName} (${candidate.occupation}) added to your favourites.`,
    );
  };

  const handleSendRequest = () => {
    requestContact(
      candidate.id,
      candidate.redactedName,
      candidate.occupation,
      candidate.occupationCode,
      candidate.country,
      candidate.matchScore,
      message || `We would like to discuss a ${candidate.occupation} opportunity. Please get in touch.`,
    );
    setShowRequestModal(false);
    setMessage('');
    pushToast('Contact request sent', `Your request to ${candidate.redactedName} has been sent for candidate approval.`);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to marketplace
        </button>
        <div className="flex items-center gap-2">
          <Button variant={saved ? 'outline' : 'secondary'} onClick={handleSave}>
            <Heart className={cn('h-4 w-4', saved && 'fill-current text-destructive')} />
            {saved ? 'Saved' : 'Save Candidate'}
          </Button>
          {request ? (
            <Button asChild variant="secondary">
              <Link href="/requests">
                <Send className="h-4 w-4" />
                View Request
              </Link>
            </Button>
          ) : (
            <Button onClick={() => setShowRequestModal(true)} disabled={contactUnlocked}>
              <Send className="h-4 w-4" />
              Request Contact
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className={cn('flex h-16 w-16 flex-none items-center justify-center rounded-2xl text-lg font-bold text-white shadow-md', contactUnlocked ? 'bg-success' : 'bg-primary')}>
                  {candidate.redactedName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">{candidate.redactedName}</h1>
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {candidate.occupation}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{candidate.country}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{candidate.yearsExperience} years experience</span>
                    <span className="flex items-center gap-1"><Languages className="h-3.5 w-3.5" />{candidate.languages.length} languages</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MatchScoreRing score={candidate.matchScore} size="lg" label="AI Match" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoTile icon={Briefcase} label="Occupation">{candidate.occupation}</InfoTile>
              <InfoTile icon={FileText} label="Occupation Code">
                <span className="font-mono">{candidate.occupationCode}</span>
              </InfoTile>
              <InfoTile icon={Clock} label="Availability">
                <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-semibold', candidate.availability === 'Immediate' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning')}>{candidate.availability}</span>
              </InfoTile>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <SectionHeader icon={Sparkles} title="AI Generated Professional Summary" tag />
            <div className="mt-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
              <p className="text-sm leading-relaxed text-foreground">&ldquo;{candidate.aiSummary}&rdquo;</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <AIBadge>AI Confidence Score</AIBadge>
              <span className="text-sm font-bold text-foreground">{candidate.aiConfidence}%</span>
              <div className="ml-2 h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${candidate.aiConfidence}%` }} />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <SectionHeader icon={Star} title="AI Extracted Skills" tag />
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.skills.map((s) => (
                <Badge key={s} variant="secondary" className="gap-1 py-1 pl-2.5">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  {s}
                </Badge>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <SectionHeader icon={Briefcase} title="AI Extracted Experience" tag />
            <div className="mt-4 space-y-4">
              {candidate.aiExperience.map((exp, i) => (
                <div key={i} className="relative border-l-2 border-border pl-5 pb-4 last:pb-0">
                  <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-foreground">{exp.role}</p>
                    <span className="text-xs text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="text-xs font-medium text-primary">{exp.company} · {exp.country}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <SectionHeader icon={Award} title="AI Extracted Certifications" tag />
            <div className="mt-3 space-y-2">
              {candidate.certifications.map((cert, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10 text-warning">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.year}</p>
                    </div>
                  </div>
                  {cert.verified ? (
                    <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 text-muted-foreground">
                      <AlertCircle className="h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <SectionHeader icon={FileText} title="Occupation Classification" tag />
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-xl border border-border bg-muted/30 px-4 py-3">
                <p className="text-xs text-muted-foreground">Occupation</p>
                <p className="text-sm font-semibold text-foreground">{candidate.occupation}</p>
              </div>
              <span className="hidden text-muted-foreground sm:block">→</span>
              <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
                <p className="text-xs text-muted-foreground">ANZSCO Classification</p>
                <p className="font-mono text-sm font-bold text-primary">{candidate.occupationCode}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Classification mapped by AI against the Australian and New Zealand Standard Classification of Occupations.
            </p>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <SectionHeader icon={FileText} title="Redacted Resume Preview" tag />
            <p className="mt-1 text-xs text-muted-foreground">
              Employer-safe version only. Personal contact details, passport and documents are removed.
            </p>
            <pre className="mt-4 max-h-96 overflow-y-auto scrollbar-thin whitespace-pre-wrap rounded-xl border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground">
{candidate.redactedResume}
            </pre>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <SectionHeader icon={Sparkles} title="AI Insights" tag compact />
            </div>
            <div className="mt-4 flex flex-col items-center gap-2">
              <MatchScoreRing score={candidate.matchScore} size="lg" label="AI Match Score" />
              <p className="text-xs text-muted-foreground">Based on your hiring profile and role requirements</p>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                  Strengths
                </p>
                <ul className="mt-2 space-y-1.5">
                  {getStrengths(candidate).map((s) => (
                    <li key={s} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                  Recommended Roles
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {getRecommendedRoles(candidate).map((r) => (
                    <Badge key={r} variant="outline" className="border-primary/30 text-primary">{r}</Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-success/20 bg-success/5 p-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-success">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Employment Readiness
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">Ready for Employer Contact</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  All required documents processed and AI-validated.
                </p>
              </div>
            </div>
          </section>

          <section className={cn('rounded-2xl border p-6 shadow-sm', contactUnlocked ? 'border-success/30 bg-gradient-to-br from-success/5 to-card' : 'border-border bg-card')}>
            <div className="flex items-center gap-2">
              {contactUnlocked ? (
                <ShieldCheck className="h-5 w-5 text-success" />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
              <h2 className="text-sm font-semibold text-foreground">
                {contactUnlocked ? 'Contact Information Unlocked' : 'Contact Information Locked'}
              </h2>
            </div>

            {contactUnlocked ? (
              <div className="mt-4 space-y-3">
                <ContactRow icon={User} label="Full Name" value={candidate.contact.fullName} />
                <ContactRow icon={Mail} label="Email" value={candidate.contact.email} />
                <ContactRow icon={Phone} label="Phone" value={candidate.contact.phone} />
                <Button variant="outline" className="mt-3 w-full" onClick={() => pushToast('Resume download started', 'The employer-safe resume PDF will download momentarily.')}>
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
                <p className="flex items-center gap-1 text-[11px] text-success">
                  <ShieldCheck className="h-3 w-3" />
                  Candidate approved this contact request on {request?.resolvedDate}.
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <div className="space-y-3 rounded-lg border border-dashed border-border bg-muted/30 p-4">
                  <LockedRow label="Full Name" />
                  <LockedRow label="Email" />
                  <LockedRow label="Phone" />
                  <LockedRow label="Resume Download" />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Contact details are unlocked only after the candidate approves your contact request.
                  This protects worker privacy at every stage.
                </p>
                {request ? (
                  <div className="mt-4 rounded-lg border border-border bg-card p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Request status</span>
                      <StatusBadge status={request.status} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {request.status === 'pending' && 'Waiting for candidate approval.'}
                      {request.status === 'rejected' && 'This candidate declined your request.'}
                    </p>
                  </div>
                ) : (
                  <Button className="mt-4 w-full" onClick={() => setShowRequestModal(true)}>
                    <Send className="h-4 w-4" />
                    Request Contact
                  </Button>
                )}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <SectionHeader icon={Languages} title="Languages" />
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.languages.map((l) => (
                <Badge key={l} variant="secondary">{l}</Badge>
              ))}
            </div>
            {candidate.ieltsScore ? (
              <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                <span className="text-xs text-muted-foreground">IELTS Score</span>
                <span className="text-sm font-bold text-foreground">{candidate.ieltsScore}</span>
              </div>
            ) : null}
            {candidate.regionExperience ? (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground">Regional experience</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {candidate.regionExperience.map((r) => (
                    <Badge key={r} variant="outline" className="text-muted-foreground">{r}</Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>

      {showRequestModal ? (
        <RequestContactModal
          candidateName={candidate.redactedName}
          occupation={candidate.occupation}
          message={message}
          setMessage={setMessage}
          onClose={() => setShowRequestModal(false)}
          onSend={handleSendRequest}
        />
      ) : null}
    </div>
  );
}

function getStrengths(c: Candidate): string[] {
  const strengths: string[] = [];
  if (c.yearsExperience >= 8) strengths.push(`${c.yearsExperience}+ years hands-on experience`);
  if (c.regionExperience?.includes('GCC Countries') || c.regionExperience?.includes('European Union')) strengths.push(`Extensive ${c.regionExperience?.[0]} experience`);
  const verified = c.certifications.filter((cert) => cert.verified).length;
  if (verified >= 2) strengths.push(`${verified} verified industry certifications`);
  if ((c.ieltsScore ?? 0) >= 6.5) strengths.push('Strong English communication');
  if (c.availability === 'Immediate' || c.availability === '2-4 Weeks') strengths.push(`${c.availability} availability`);
  if (c.matchScore >= 90) strengths.push('Top AI match for your hiring profile');
  return strengths.length ? strengths : ['Solid verified trade background'];
}

function getRecommendedRoles(c: Candidate): string[] {
  const map: Record<string, string[]> = {
    Welder: ['Structural Welder', 'Pipeline Welder', 'Fabrication Specialist'],
    Electrician: ['Industrial Electrician', 'Maintenance Electrician', 'Solar PV Installer'],
    Carpenter: ['Formwork Carpenter', 'Finishing Carpenter', 'Site Carpenter'],
    'Diesel Mechanic': ['Heavy Equipment Mechanic', 'Fleet Technician', 'Mining Equipment Mechanic'],
    'Registered Nurse': ['Acute Care Nurse', 'Emergency Department Nurse', 'Theatre Nurse'],
    Plumber: ['Commercial Plumber', 'Gas Fitter', 'Maintenance Plumber'],
    'Civil Engineer': ['Site Engineer', 'Project Engineer', 'Infrastructure Engineer'],
    Chef: ['Head Chef', 'Sous Chef', 'Banquet Chef'],
    'Automotive Electrician': ['Auto Electrical Technician', 'EV Specialist', 'Workshop Technician'],
    'Software Developer': ['Full-stack Developer', 'Backend Engineer', 'Cloud Developer'],
    Bricklayer: ['Heritage Restoration Mason', 'Refractory Mason', 'Residential Bricklayer'],
    'Painter & Decorator': ['Commercial Painter', 'Spray Painter', 'Finish Decorator'],
  };
  return map[c.occupation] ?? [c.occupation, 'Site Specialist'];
}

function SectionHeader({ icon: Icon, title, tag, compact }: { icon: React.ElementType; title: string; tag?: boolean; compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={cn('text-primary', compact ? 'h-4 w-4' : 'h-4.5 w-4.5')} />
      <h2 className={cn('font-semibold text-foreground', compact ? 'text-sm' : 'text-base')}>{title}</h2>
      {tag ? <AITag /> : null}
    </div>
  );
}

function InfoTile({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 px-3 py-2.5">
      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-foreground">{children}</p>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10 text-success">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function LockedRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Lock className="h-3.5 w-3.5" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="font-mono text-sm font-semibold tracking-wider text-muted-foreground/60">••••••••••</p>
      </div>
    </div>
  );
}

function RequestContactModal({
  candidateName,
  occupation,
  message,
  setMessage,
  onClose,
  onSend,
}: {
  candidateName: string;
  occupation: string;
  message: string;
  setMessage: (v: string) => void;
  onClose: () => void;
  onSend: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Send Contact Request</h3>
              <p className="text-xs text-muted-foreground">To {candidateName} ({occupation})</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-lg border border-warning/20 bg-warning/5 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-warning">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy protected
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              The candidate will review your request. Contact details are only shared after they approve.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Message to candidate</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder={`We have an opportunity that matches your ${occupation} skills. We'd like to discuss further...`}
              className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onSend}>
            <Send className="h-4 w-4" />
            Send Request
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CandidateDetailPage() {
  return (
    <AuthGate>
      <DetailContent />
    </AuthGate>
  );
}
