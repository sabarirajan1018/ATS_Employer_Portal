'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Building2, ShieldCheck, Users, ArrowRight, Mail, Lock } from 'lucide-react';
import { usePortal } from '@/lib/portal-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = usePortal();
  const [email, setEmail] = useState('daniel.hayes@harbourline.com.au');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      login(email);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
        <div
          className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />

        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sidebar-accent text-white shadow-lg shadow-primary/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight">SkillBridge</p>
            <p className="text-xs text-sidebar-muted-foreground">AI Recruitment & Immigration</p>
          </div>
        </div>

        <div className="relative">
          <h1 className="max-w-md text-3xl font-bold leading-tight text-balance">
            Hire verified, AI-processed skilled migrants ready for Australian employment.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-sidebar-muted-foreground">
            SkillBridge matches Australian employers with pre-screened candidates whose skills,
            certifications and experience have been extracted and verified by AI — with full
            privacy controls for every worker.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              { icon: ShieldCheck, title: 'Privacy-first by design', desc: 'Contact details only unlock after candidate approval.' },
              { icon: Users, title: 'AI-processed profiles', desc: 'Skills, experience and certifications summarised automatically.' },
              { icon: Building2, title: 'Built for employers', desc: 'Shortlist, request contact and hire with confidence.' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3 rounded-xl border border-sidebar-border bg-sidebar-muted/30 p-3.5">
                <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-sidebar-accent/15 text-sidebar-accent">
                  <f.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-sidebar-foreground">{f.title}</p>
                  <p className="text-xs text-sidebar-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-sidebar-muted-foreground">
          Trusted by 320+ Australian employers across construction, healthcare, hospitality and engineering.
        </p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold leading-tight">SkillBridge</p>
                <p className="text-xs text-muted-foreground">Employer Portal</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Employer login</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to browse AI-processed candidates and manage your hiring pipeline.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Work email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com.au"
                  className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <button type="button" className="text-xs font-medium text-primary hover:underline">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Login'}
              {!loading ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 p-3.5 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Demo access</p>
            <p className="mt-1">Credentials are pre-filled. Click <span className="font-semibold">Login</span> to explore the portal with realistic mock data.</p>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an employer account?{' '}
            <button className="font-semibold text-primary hover:underline">
              Request access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
