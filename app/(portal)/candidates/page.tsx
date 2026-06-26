'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, Users, Sparkles, ChevronDown } from 'lucide-react';
import { AuthGate } from '@/components/portal/auth-gate';
import { PageHeader } from '@/components/portal/page-header';
import { CandidateCard } from '@/components/portal/candidate-card';
import { AITag } from '@/components/portal/ai-badge';
import { candidates, occupations, countries, allSkills, allLanguages } from '@/lib/candidates';
import type { Availability } from '@/lib/types';
import { cn } from '@/lib/utils';

const availabilityOptions: Availability[] = [
  'Immediate',
  '2-4 Weeks',
  '1-2 Months',
  '3-6 Months',
];

const expRanges = [
  { label: 'Any experience', min: 0 },
  { label: '3+ years', min: 3 },
  { label: '5+ years', min: 5 },
  { label: '8+ years', min: 8 },
  { label: '10+ years', min: 10 },
];

function MarketplaceContent() {
  const [query, setQuery] = useState('');
  const [occupation, setOccupation] = useState('all');
  const [country, setCountry] = useState('all');
  const [language, setLanguage] = useState('all');
  const [skill, setSkill] = useState('all');
  const [expRange, setExpRange] = useState(0);
  const [availability, setAvailability] = useState('all');
  const [sortBy, setSortBy] = useState<'match' | 'experience' | 'recent'>('match');
  const [showFilters, setShowFilters] = useState(true);
  const [minMatch, setMinMatch] = useState(0);

  const filtered = useMemo(() => {
    let list = candidates.filter((c) => {
      const q = query.trim().toLowerCase();
      if (q) {
        const haystack = [
          c.redactedName,
          c.occupation,
          c.country,
          c.occupationCode,
          ...c.skills,
          ...c.certifications.map((cert) => cert.name),
          c.aiSummary,
        ].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (occupation !== 'all' && c.occupation !== occupation) return false;
      if (country !== 'all' && c.country !== country) return false;
      if (language !== 'all' && !c.languages.some((l) => l.toLowerCase().startsWith(language.toLowerCase()))) return false;
      if (skill !== 'all' && !c.skills.includes(skill)) return false;
      if (c.yearsExperience < expRange) return false;
      if (availability !== 'all' && c.availability !== availability) return false;
      if (c.matchScore < minMatch) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [query, occupation, country, language, skill, expRange, availability, minMatch, sortBy]);

  const hasActiveFilters =
    occupation !== 'all' ||
    country !== 'all' ||
    language !== 'all' ||
    skill !== 'all' ||
    expRange !== 0 ||
    availability !== 'all' ||
    minMatch !== 0 ||
    query !== '';

  const clearAll = () => {
    setQuery('');
    setOccupation('all');
    setCountry('all');
    setLanguage('all');
    setSkill('all');
    setExpRange(0);
    setAvailability('all');
    setMinMatch(0);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Candidate Marketplace"
        description="Browse AI-processed skilled migrant candidates ready for Australian employment."
        actions={<AITag className="px-3 py-1 text-xs">AI Smart Search</AITag>}
      />

      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: welder, electrician, IELTS, ANZSCO 322313, GCC experience..."
              className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-11 rounded-lg border border-input bg-background pl-3 pr-9 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                <option value="match">Sort: AI Match Score</option>
                <option value="experience">Sort: Experience</option>
                <option value="recent">Sort: Recently Added</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={cn(
                'inline-flex h-11 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors',
                showFilters
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-input bg-background text-foreground hover:bg-accent',
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {showFilters ? (
          <div className="mt-4 grid gap-4 border-t border-border pt-4 md:grid-cols-2 xl:grid-cols-4">
            <FilterSelect label="Occupation" value={occupation} onChange={setOccupation} options={['all', ...occupations]} allLabel="All occupations" />
            <FilterSelect label="Country" value={country} onChange={setCountry} options={['all', ...countries]} allLabel="All countries" />
            <FilterSelect label="Language" value={language} onChange={setLanguage} options={['all', ...allLanguages]} allLabel="All languages" />
            <FilterSelect label="Skill" value={skill} onChange={setSkill} options={['all', ...allSkills]} allLabel="All skills" />

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Years of experience</label>
              <div className="flex flex-wrap gap-1.5">
                {expRanges.map((r) => (
                  <button
                    key={r.min}
                    onClick={() => setExpRange(r.min)}
                    className={cn(
                      'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                      expRange === r.min
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-input bg-background text-muted-foreground hover:bg-accent',
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <FilterSelect label="Availability" value={availability} onChange={setAvailability} options={['all', ...availabilityOptions]} allLabel="Any availability" />

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Minimum AI match score: <span className="font-bold text-primary">{minMatch}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={minMatch}
                onChange={(e) => setMinMatch(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>

            {hasActiveFilters ? (
              <div className="flex items-end">
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear all filters
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {candidates.length} candidates
        </p>
        {hasActiveFilters ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            Filtered by AI match
          </span>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <CandidateCard key={c.id} candidate={c} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 py-16 text-center">
          <Users className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-semibold text-foreground">No candidates match your filters</p>
          <p className="mt-1 text-xs text-muted-foreground">Try widening your search or clearing filters.</p>
          <button
            onClick={clearAll}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full appearance-none rounded-lg border border-input bg-background pl-3 pr-9 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'all' ? allLabel : opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <AuthGate>
      <MarketplaceContent />
    </AuthGate>
  );
}
