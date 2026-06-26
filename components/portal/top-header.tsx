'use client';

import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { usePortal } from '@/lib/portal-context';
import { employerProfile } from '@/lib/mock-data';

export function TopHeader() {
  const { unreadCount, employerEmail } = usePortal();
  const initials = employerProfile.contactPerson
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-xl">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search occupations, skills, countries..."
          className="h-10 w-full rounded-lg border border-input bg-muted/40 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20"
          onFocus={(e) => e.target.blur()}
          onClick={() => (window.location.href = '/candidates')}
          readOnly
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 ? (
            <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          ) : null}
        </Link>

        <div className="ml-2 flex items-center gap-3 border-l border-border pl-4">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-foreground">
              {employerProfile.contactPerson}
            </p>
            <p className="text-xs text-muted-foreground">
              {employerEmail || employerProfile.email}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
