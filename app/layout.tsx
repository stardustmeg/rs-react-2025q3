import type { Metadata } from 'next';
import type { JSX } from 'react';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';

export const metadata: Metadata = {
  description: 'Search Rick and Morty characters using their public API',
  keywords: ['Rick and Morty', 'characters', 'search', 'API', 'React', 'Next.js'],
  title: 'Rick and Morty Search',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange={false} enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
