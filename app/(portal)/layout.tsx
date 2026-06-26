import { Sidebar } from '@/components/portal/sidebar';
import { TopHeader } from '@/components/portal/top-header';
import { ToastStack } from '@/components/portal/toast-stack';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="mx-auto w-full max-w-7xl px-6 py-8">{children}</div>
        </main>
      </div>
      <ToastStack />
    </div>
  );
}
