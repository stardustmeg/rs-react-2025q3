import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const GC_TIME_MIN = 10;
const STALE_TIME_MIN = 5;
const MINUTE_S = 60;
const SECOND_MS = 1000;
const GC_TIME_MS = GC_TIME_MIN * MINUTE_S * SECOND_MS;
const STALE_TIME_MS = STALE_TIME_MIN * MINUTE_S * SECOND_MS;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: GC_TIME_MS,
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: STALE_TIME_MS,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
