import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it } from 'vitest';

import type { RootState } from '@/store';
import type { Country } from '@/types/form';

import { mockCountries } from '@/__mocks__/mockCountries';
import { mockValidFormData } from '@/__mocks__/mockValidFormData';
import countriesReducer, { setCountries } from '@/store/slices/countriesSlice';
import formReducer, { addSubmission, clearNewSubmission, clearSubmissions } from '@/store/slices/formSlice';

describe('Redux Store Testing', () => {
  describe('Actions and Action Creators', () => {
    describe('Countries Actions', () => {
      it('should create setCountries action', () => {
        const action = setCountries(mockCountries);

        expect(action).toEqual({
          payload: mockCountries,
          type: 'countries/setCountries',
        });
      });

      it('should create setCountries action with empty array', () => {
        const action = setCountries([]);

        expect(action).toEqual({
          payload: [],
          type: 'countries/setCountries',
        });
      });
    });

    describe('Form Actions', () => {
      it('should create addSubmission action', () => {
        const action = addSubmission(mockValidFormData);

        expect(action).toEqual({
          payload: mockValidFormData,
          type: 'form/addSubmission',
        });
      });

      it('should create clearNewSubmission action', () => {
        const action = clearNewSubmission();

        expect(action).toEqual({
          type: 'form/clearNewSubmission',
        });
      });

      it('should create clearSubmissions action', () => {
        const action = clearSubmissions();

        expect(action).toEqual({
          type: 'form/clearSubmissions',
        });
      });
    });
  });

  describe('Reducers', () => {
    describe('Countries Reducer', () => {
      it('should return initial state', () => {
        const result = countriesReducer(undefined, { type: '@@INIT' });
        expect(result).toEqual(mockCountries);
      });

      it('should handle setCountries action', () => {
        const newCountries: Country[] = [
          { code: 'FR', name: 'France' },
          { code: 'DE', name: 'Germany' },
        ];

        const result = countriesReducer(mockCountries, setCountries(newCountries));
        expect(result).toEqual(newCountries);
      });

      it('should replace state completely with setCountries', () => {
        const result = countriesReducer(mockCountries, setCountries([]));
        expect(result).toEqual([]);
      });

      it('should ignore unknown actions', () => {
        const result = countriesReducer(mockCountries, { type: 'UNKNOWN_ACTION' });
        expect(result).toEqual(mockCountries);
      });
    });

    describe('Form Reducer', () => {
      const initialFormState = {
        newSubmissionId: null,
        submissions: [],
      };

      it('should return initial state', () => {
        const result = formReducer(undefined, { type: '@@INIT' });
        expect(result).toEqual(initialFormState);
      });

      it('should handle addSubmission action', () => {
        const result = formReducer(initialFormState, addSubmission(mockValidFormData));

        expect(result.submissions).toHaveLength(1);
        expect(result.submissions[0]).toEqual(mockValidFormData);
        expect(result.newSubmissionId).toBe(mockValidFormData.id);
      });

      it('should handle multiple addSubmission actions', () => {
        const secondFormData = { ...mockValidFormData, id: 'test-id-456', name: 'Jane Doe' };

        let state = formReducer(initialFormState, addSubmission(mockValidFormData));
        state = formReducer(state, addSubmission(secondFormData));

        expect(state.submissions).toHaveLength(2);
        expect(state.submissions[0]).toEqual(mockValidFormData);
        expect(state.submissions[1]).toEqual(secondFormData);
        expect(state.newSubmissionId).toBe(secondFormData.id);
      });

      it('should handle clearNewSubmission action', () => {
        const stateWithSubmission = {
          newSubmissionId: 'test-id-123',
          submissions: [mockValidFormData],
        };

        const result = formReducer(stateWithSubmission, clearNewSubmission());

        expect(result.newSubmissionId).toBeNull();
        expect(result.submissions).toEqual([mockValidFormData]);
      });

      it('should handle clearSubmissions action', () => {
        const stateWithSubmissions = {
          newSubmissionId: 'test-id-123',
          submissions: [mockValidFormData],
        };

        const result = formReducer(stateWithSubmissions, clearSubmissions());

        expect(result.submissions).toEqual([]);
        expect(result.newSubmissionId).toBe('test-id-123');
      });

      it('should ignore unknown actions', () => {
        const result = formReducer(initialFormState, { type: 'UNKNOWN_ACTION' });
        expect(result).toEqual(initialFormState);
      });
    });
  });

  describe('Selectors', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
      store = configureStore({
        reducer: {
          countries: countriesReducer,
          form: formReducer,
        },
      });
    });

    it('should select countries from state', () => {
      const state = store.getState() as RootState;
      expect(state.countries).toEqual(mockCountries);
      expect(Array.isArray(state.countries)).toBe(true);
      expect(state.countries.length).toBeGreaterThan(0);
    });

    it('should select form state', () => {
      const state = store.getState() as RootState;
      expect(state.form).toEqual({
        newSubmissionId: null,
        submissions: [],
      });
    });

    it('should select form submissions', () => {
      store.dispatch(addSubmission(mockValidFormData));
      const state = store.getState() as RootState;

      expect(state.form.submissions).toHaveLength(1);
      expect(state.form.submissions[0]).toEqual(mockValidFormData);
    });

    it('should select new submission ID', () => {
      store.dispatch(addSubmission(mockValidFormData));
      const state = store.getState() as RootState;

      expect(state.form.newSubmissionId).toBe(mockValidFormData.id);
    });
  });

  describe('Store Integration and State Updates', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
      store = configureStore({
        reducer: {
          countries: countriesReducer,
          form: formReducer,
        },
      });
    });

    it('should handle complete form submission workflow', () => {
      let state = store.getState() as RootState;
      expect(state.form.submissions).toHaveLength(0);
      expect(state.form.newSubmissionId).toBeNull();

      store.dispatch(addSubmission(mockValidFormData));
      state = store.getState() as RootState;

      expect(state.form.submissions).toHaveLength(1);
      expect(state.form.newSubmissionId).toBe(mockValidFormData.id);

      store.dispatch(clearNewSubmission());
      state = store.getState() as RootState;

      expect(state.form.newSubmissionId).toBeNull();
      expect(state.form.submissions).toHaveLength(1);

      const secondFormData = { ...mockValidFormData, id: 'test-id-456', name: 'Jane Doe' };
      store.dispatch(addSubmission(secondFormData));
      state = store.getState() as RootState;

      expect(state.form.submissions).toHaveLength(2);
      expect(state.form.newSubmissionId).toBe(secondFormData.id);
    });

    it('should handle countries state updates', () => {
      const newCountries: Country[] = [
        { code: 'FR', name: 'France' },
        { code: 'DE', name: 'Germany' },
      ];

      let state = store.getState() as RootState;
      expect(state.countries).toEqual(mockCountries);

      store.dispatch(setCountries(newCountries));
      state = store.getState() as RootState;

      expect(state.countries).toEqual(newCountries);
      expect(state.countries).toHaveLength(2);
    });

    it('should handle form reset workflow', () => {
      store.dispatch(addSubmission(mockValidFormData));
      const secondFormData = { ...mockValidFormData, id: 'test-id-456', name: 'Jane Doe' };
      store.dispatch(addSubmission(secondFormData));

      let state = store.getState() as RootState;
      expect(state.form.submissions).toHaveLength(2);
      expect(state.form.newSubmissionId).toBe(secondFormData.id);

      store.dispatch(clearSubmissions());
      state = store.getState() as RootState;

      expect(state.form.submissions).toHaveLength(0);
      expect(state.form.newSubmissionId).toBe(secondFormData.id);
    });

    it('should maintain countries state when form actions are dispatched', () => {
      const newCountries: Country[] = [{ code: 'FR', name: 'France' }];
      store.dispatch(setCountries(newCountries));

      store.dispatch(addSubmission(mockValidFormData));
      store.dispatch(clearNewSubmission());

      const state = store.getState() as RootState;

      expect(state.countries).toEqual(newCountries);

      expect(state.form.submissions).toHaveLength(1);
      expect(state.form.newSubmissionId).toBeNull();
    });

    it('should maintain form state when countries actions are dispatched', () => {
      store.dispatch(addSubmission(mockValidFormData));

      const newCountries: Country[] = [{ code: 'FR', name: 'France' }];
      store.dispatch(setCountries(newCountries));

      const state = store.getState() as RootState;

      expect(state.form.submissions).toHaveLength(1);
      expect(state.form.newSubmissionId).toBe(mockValidFormData.id);

      expect(state.countries).toEqual(newCountries);
    });
  });
});
