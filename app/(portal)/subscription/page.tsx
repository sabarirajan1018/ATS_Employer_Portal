'use client';

import { CreditCard, Check, Download, Sparkles, Receipt, TrendingUp } from 'lucide-react';
import { AuthGate } from '@/components/portal/auth-gate';
import { PageHeader } from '@/components/portal/page-header';
import { usePortal } from '@/lib/portal-context';
import { subscriptionPlans, billingHistory } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function SubscriptionContent() {
  const { subscription, setSubscriptionPlan, pushToast } = usePortal();

  const handleSelect = (planId: string) => {
    setSubscriptionPlan(planId);
    const plan = subscriptionPlans.find((p) => p.id === planId);
    pushToast('Subscription updated', `You're now on the ${plan?.name} plan. Changes apply immediately.`);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        title="Subscription & Billing"
        description="Manage your plan, contact request quota and billing history."
      />

      <section className="rounded-2xl border border-border bg-gradient-to-br from-sidebar to-sidebar-muted p-6 text-sidebar-foreground shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sidebar-accent" />
              <p className="text-sm font-semibold text-sidebar-muted-foreground">Current Plan</p>
            </div>
            <p className="mt-2 text-3xl font-bold">{subscription.planName}</p>
            <p className="mt-1 text-sm text-sidebar-muted-foreground">
              Status: <span className="font-semibold capitalize text-sidebar-foreground">{subscription.status}</span> · Renews {subscription.renewalDate}
            </p>
          </div>
          <div className="lg:w-80">
            <div className="flex items-center justify-between text-sm">
              <span className="text-sidebar-muted-foreground">Contact requests this month</span>
              <span className="font-bold text-sidebar-foreground">{subscription.requestsUsed} / {subscription.requestsLimit}</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-sidebar-border">
              <div
                className="h-full rounded-full bg-sidebar-accent transition-all"
                style={{ width: `${Math.min(100, (subscription.requestsUsed / Math.max(1, subscription.requestsLimit)) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-sidebar-muted-foreground">
              {subscription.requestsLimit - subscription.requestsUsed} requests remaining this billing cycle.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">Available Plans</h2>
        <p className="text-sm text-muted-foreground">Upgrade or downgrade at any time. Changes apply immediately.</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {subscriptionPlans.map((plan) => {
            const current = subscription.planId === plan.id;
            return (
              <div
                key={plan.id}
                className={cn(
                  'relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all',
                  plan.highlighted ? 'border-primary shadow-md ring-1 ring-primary/20' : 'border-border',
                )}
              >
                {plan.highlighted ? (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    Most popular
                  </span>
                ) : null}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2 text-sm">
                      {f.included ? (
                        <Check className="h-4 w-4 flex-none text-success" />
                      ) : (
                        <span className="flex h-4 w-4 flex-none items-center justify-center text-muted-foreground/40">×</span>
                      )}
                      <span className={cn(f.included ? 'text-foreground' : 'text-muted-foreground/60 line-through')}>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelect(plan.id)}
                  variant={current ? 'outline' : plan.highlighted ? 'default' : 'secondary'}
                  className="mt-6 w-full"
                  disabled={current}
                >
                  {current ? 'Current Plan' : plan.cta}
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">Billing History</h2>
        <p className="text-sm text-muted-foreground">All amounts in AUD. Invoices are emailed automatically.</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Invoice</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Amount</th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/30">
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-2 font-mono text-xs font-medium text-foreground">
                        <Receipt className="h-3.5 w-3.5 text-muted-foreground" />
                        {b.invoice}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{b.date}</td>
                    <td className="px-5 py-3.5 text-foreground">{b.description}</td>
                    <td className="px-5 py-3.5 font-semibold text-foreground">${b.amount}.00</td>
                    <td className="px-5 py-3.5">
                      <span className={cn('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                        b.status === 'paid' ? 'border-success/20 bg-success/10 text-success' :
                        b.status === 'pending' ? 'border-warning/20 bg-warning/10 text-warning' :
                        'border-border bg-muted text-muted-foreground')}>
                        <span className={cn('h-1.5 w-1.5 rounded-full', b.status === 'paid' ? 'bg-success' : b.status === 'pending' ? 'bg-warning' : 'bg-muted-foreground')} />
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => pushToast('Invoice downloaded', `${b.invoice} is ready to view.`)}
                      >
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CreditCard className="h-5 w-5" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-foreground">Payment method</h3>
          <p className="mt-1 text-xs text-muted-foreground">Visa ending 4242 · Expires 08/27</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => pushToast('Payment method updated', 'Mock update — no real card processed.')}>
            Update card
          </Button>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-foreground">Year-to-date spend</h3>
          <p className="mt-1 text-2xl font-bold text-foreground">${billingHistory.reduce((s, b) => s + b.amount, 0)}.00</p>
          <p className="text-xs text-muted-foreground">Across {billingHistory.length} invoices in 2025.</p>
        </div>
      </section>
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <AuthGate>
      <SubscriptionContent />
    </AuthGate>
  );
}
