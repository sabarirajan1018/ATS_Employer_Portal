'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePortal } from '@/lib/portal-context';
import { Loader2 } from 'lucide-react';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthed } = usePortal();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed) {
      router.replace('/login');
    }
  }, [isAuthed, router]);

  if (!isAuthed) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
