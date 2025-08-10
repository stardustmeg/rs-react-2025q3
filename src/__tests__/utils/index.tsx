import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, type RenderHookResult } from '@testing-library/react';

const createQueryWrapper = (): React.FC<{ children: ReactNode }> => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

export const renderHookWithQuery = <T,>(hook: () => T): RenderHookResult<T, unknown> => {
  return renderHook(hook, { wrapper: createQueryWrapper() });
};
