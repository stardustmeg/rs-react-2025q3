import type { Metadata } from 'next';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { type JSX } from 'react';

import { routing } from '@/i18n/routing';
import Header from '@/src/components/Header';

interface LocaleLayoutProps {
  children: React.ReactNode;
  detailed: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    description: 'Search Rick and Morty characters',
    title: 'Rick and Morty Search',
  };
}

export default async function LocaleLayout({ children, detailed, params }: LocaleLayoutProps): Promise<JSX.Element> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <div className="min-h-screen bg-custom-pistachio transition-colors duration-300 dark:bg-dark-bg">
        <Header />
        <main>{children}</main>
        {detailed}
      </div>
    </NextIntlClientProvider>
  );
}
