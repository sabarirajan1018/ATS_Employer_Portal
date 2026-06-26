'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Heart,
  Send,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortal } from '@/lib/portal-context';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/candidates', label: 'Marketplace', icon: Users },
  { href: '/favourites', label: 'Shortlist', icon: Heart },
  { href: '/requests', label: 'Contact Requests', icon: Send },
  { href: '/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/settings', label: 'Profile & Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, subscription, unreadCount, savedIds } = usePortal();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="flex h-screen w-72 flex-none flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-accent text-white shadow-lg shadow-primary/20">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-semibold leading-tight">SkillBridge</p>
          <p className="text-xs text-sidebar-muted-foreground">Employer Portal</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            const badge =
              item.href === '/notifications'
                ? unreadCount
                : item.href === '/favourites'
                  ? savedIds.length
                  : 0;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                    active
                      ? 'bg-sidebar-accent text-white shadow-md shadow-primary/20'
                      : 'text-sidebar-muted-foreground hover:bg-sidebar-muted hover:text-sidebar-foreground',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4.5 w-4.5 flex-none',
                      active ? 'text-white' : 'text-sidebar-muted-foreground group-hover:text-sidebar-foreground',
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {badge > 0 ? (
                    <span
                      className={cn(
                        'flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
                        active
                          ? 'bg-white text-sidebar-accent'
                          : 'bg-sidebar-muted text-sidebar-foreground',
                      )}
                    >
                      {badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 rounded-xl border border-sidebar-border bg-sidebar-muted/50 p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-sidebar-accent" />
            <p className="text-xs font-semibold text-sidebar-foreground">
              {subscription.planName} Plan
            </p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-sidebar-muted-foreground">
            {subscription.requestsUsed} of {subscription.requestsLimit} contact
            requests used this month.
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-sidebar-border">
            <div
              className="h-full rounded-full bg-sidebar-accent transition-all"
              style={{
                width: `${Math.min(100, (subscription.requestsUsed / Math.max(1, subscription.requestsLimit)) * 100)}%`,
              }}
            />
          </div>
          <Link
            href="/subscription"
            className="mt-3 inline-flex text-[11px] font-semibold text-sidebar-accent hover:underline"
          >
            Manage subscription →
          </Link>
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-muted-foreground transition-colors hover:bg-sidebar-muted hover:text-sidebar-foreground"
        >
          <LogOut className="h-4.5 w-4.5" />
          Log out
        </button>
      </div>
    </aside>
  );
}
