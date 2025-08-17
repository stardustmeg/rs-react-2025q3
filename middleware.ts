import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  defaultLocale: 'en',
  localePrefix: 'always',
  locales: ['en', 'ru'],
});

export const config = {
  // matcher: String.raw`/((?!api|trpc|_next|_vercel|.*\..*).*)`
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
