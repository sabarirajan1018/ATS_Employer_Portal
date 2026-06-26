import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PortalProvider } from '@/lib/portal-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkillBridge — Employer Portal',
  description:
    'Discover, evaluate, shortlist, and contact AI-processed skilled migrant candidates for Australian employment.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PortalProvider>{children}</PortalProvider>
      </body>
    </html>
  );
}
