import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { store } from '@/store';

const TestWrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <Provider store={store}>{children}</Provider>
);

describe('Redux Hooks', () => {
  describe('useAppDispatch', () => {
    it('returns a dispatch function', () => {
      const { result } = renderHook(() => useAppDispatch(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeDefined();
      expect(typeof result.current).toBe('function');
    });

    it('can dispatch actions', () => {
      const { result } = renderHook(() => useAppDispatch(), {
        wrapper: TestWrapper,
      });

      expect(() => {
        result.current({ type: 'TEST_ACTION' });
      }).not.toThrow();
    });
  });

  describe('useAppSelector', () => {
    it('returns the correct state slice', () => {
      const { result } = renderHook(() => useAppSelector((state) => state.form), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeDefined();
      expect(typeof result.current).toBe('object');
    });

    it('returns the entire state when no selector provided', () => {
      const { result } = renderHook(() => useAppSelector((state) => state), {
        wrapper: TestWrapper,
      });

      expect(result.current).toHaveProperty('form');
      expect(result.current).toHaveProperty('countries');
    });

    it('can select specific form properties', () => {
      const { result } = renderHook(() => useAppSelector((state) => state.form.submissions), {
        wrapper: TestWrapper,
      });

      expect(Array.isArray(result.current)).toBe(true);
    });

    it('can select countries state', () => {
      const { result } = renderHook(() => useAppSelector((state) => state.countries), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeDefined();
    });
  });

  describe('Hook Integration', () => {
    it('hooks work together correctly', () => {
      const { result: dispatchResult } = renderHook(() => useAppDispatch(), {
        wrapper: TestWrapper,
      });

      const { result: selectorResult } = renderHook(() => useAppSelector((state) => state.form), {
        wrapper: TestWrapper,
      });

      expect(dispatchResult.current).toBeDefined();
      expect(selectorResult.current).toBeDefined();
      expect(typeof dispatchResult.current).toBe('function');
      expect(typeof selectorResult.current).toBe('object');
    });
  });
});
