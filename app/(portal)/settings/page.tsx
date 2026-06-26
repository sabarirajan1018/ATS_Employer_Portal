'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Users as UsersIcon,
  Briefcase,
  FileText,
  Save,
  LogOut,
  ShieldCheck,
  Pencil,
  Check,
} from 'lucide-react';
import { AuthGate } from '@/components/portal/auth-gate';
import { PageHeader } from '@/components/portal/page-header';
import { usePortal } from '@/lib/portal-context';
import { employerProfile } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function SettingsContent() {
  const { logout, pushToast } = usePortal();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(employerProfile);

  const handleSave = () => {
    setEditing(false);
    pushToast('Profile saved', 'Your company profile has been updated successfully.');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Profile & Settings"
        description="Manage your company profile, hiring requirements and account preferences."
        actions={
          editing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setProfile(employerProfile); setEditing(false); }}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setEditing(true)}>
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          )
        }
      />

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-md">
            {profile.companyName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{profile.companyName}</h2>
            <p className="text-sm text-muted-foreground">{profile.industry} · {profile.companySize}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{profile.location}</span>
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{profile.website}</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-success" />ABN {profile.abn}</span>
            </div>
          </div>
          {editing ? (
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
              <Pencil className="h-3 w-3" />
              Editing
            </span>
          ) : null}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            Company Information
          </h3>
          <div className="mt-5 space-y-4">
            <Field
              label="Company Name"
              icon={Building2}
              value={profile.companyName}
              editing={editing}
              onChange={(v) => setProfile((p) => ({ ...p, companyName: v }))}
            />
            <Field
              label="Contact Person"
              icon={User}
              value={profile.contactPerson}
              editing={editing}
              onChange={(v) => setProfile((p) => ({ ...p, contactPerson: v }))}
            />
            <Field
              label="Email"
              icon={Mail}
              value={profile.email}
              editing={editing}
              onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
            />
            <Field
              label="Phone"
              icon={Phone}
              value={profile.phone}
              editing={editing}
              onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
            />
            <Field
              label="Website"
              icon={Globe}
              value={profile.website}
              editing={editing}
              onChange={(v) => setProfile((p) => ({ ...p, website: v }))}
            />
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Briefcase className="h-4 w-4 text-primary" />
              Business Details
            </h3>
            <div className="mt-5 space-y-4">
              <Field
                label="Industry"
                icon={Briefcase}
                value={profile.industry}
                editing={editing}
                onChange={(v) => setProfile((p) => ({ ...p, industry: v }))}
              />
              <Field
                label="Company Size"
                icon={UsersIcon}
                value={profile.companySize}
                editing={editing}
                onChange={(v) => setProfile((p) => ({ ...p, companySize: v }))}
              />
              <Field
                label="Location"
                icon={MapPin}
                value={profile.location}
                editing={editing}
                onChange={(v) => setProfile((p) => ({ ...p, location: v }))}
              />
              <Field
                label="ABN"
                icon={ShieldCheck}
                value={profile.abn}
                editing={editing}
                onChange={(v) => setProfile((p) => ({ ...p, abn: v }))}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="h-4 w-4 text-primary" />
              Hiring Requirements
            </h3>
            {editing ? (
              <textarea
                value={profile.hiringRequirements}
                onChange={(e) => setProfile((p) => ({ ...p, hiringRequirements: e.target.value }))}
                rows={4}
                className="mt-4 w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            ) : (
              <p className="mt-3 rounded-lg bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground">
                {profile.hiringRequirements}
              </p>
            )}
          </section>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <User className="h-4 w-4 text-primary" />
          Account
        </h3>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Signed in as</p>
            <p className="text-xs text-muted-foreground">{profile.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => pushToast('Password updated', 'Mock password reset — no real credentials changed.')}>
              Change Password
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      {editing ? (
        <div className="sticky bottom-4 flex items-center justify-between rounded-2xl border border-primary/30 bg-card p-4 shadow-lg">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Pencil className="h-4 w-4 text-primary" />
            You have unsaved changes
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setProfile(employerProfile); setEditing(false); }}>Discard</Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  value,
  editing,
  onChange,
}: {
  label: string;
  icon: React.ElementType;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="h-3 w-3" />
        {label}
      </label>
      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20',
          )}
        />
      ) : (
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AuthGate>
      <SettingsContent />
    </AuthGate>
  );
}
