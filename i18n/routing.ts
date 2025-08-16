import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'en',
  localePrefix: 'always',
  locales: ['en', 'ru'],
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
