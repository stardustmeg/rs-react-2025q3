import { describe, expect, it } from 'vitest';

import type { FormData } from '@/types/form';

import { mockValidFormData } from '@/__mocks__/mockValidFormData';
import formReducer, { addSubmission, clearNewSubmission, clearSubmissions, formSlice } from '@/store/slices/formSlice';

describe('formSlice', () => {
  const initialState = { newSubmissionId: null, submissions: [] };

  const mockSubmission: FormData = { ...mockValidFormData, id: 'test-id-1' };
  const mockSubmission2: FormData = { ...mockValidFormData, id: 'test-id-2' };

  describe('initial state', () => {
    it('has correct initial state', () => {
      expect(formSlice.getInitialState()).toEqual(initialState);
    });

    it('has empty submissions array', () => {
      expect(formSlice.getInitialState().submissions).toEqual([]);
    });

    it('has null newSubmissionId', () => {
      expect(formSlice.getInitialState().newSubmissionId).toBeNull();
    });
  });

  describe('addSubmission action', () => {
    it('adds submission to the array', () => {
      const result = formReducer(initialState, addSubmission(mockSubmission));

      expect(result.submissions).toHaveLength(1);
      expect(result.submissions[0]).toEqual(mockSubmission);
    });

    it('sets newSubmissionId to the added submission id', () => {
      const result = formReducer(initialState, addSubmission(mockSubmission));

      expect(result.newSubmissionId).toBe('test-id-1');
    });

    it('adds multiple submissions correctly', () => {
      let state = formReducer(initialState, addSubmission(mockSubmission));
      state = formReducer(state, addSubmission(mockSubmission2));

      expect(state.submissions).toHaveLength(2);
      expect(state.submissions[0]).toEqual(mockSubmission);
      expect(state.submissions[1]).toEqual(mockSubmission2);
      expect(state.newSubmissionId).toBe('test-id-2');
    });

    it('overwrites newSubmissionId with each new submission', () => {
      let state = formReducer(initialState, addSubmission(mockSubmission));
      expect(state.newSubmissionId).toBe('test-id-1');

      state = formReducer(state, addSubmission(mockSubmission2));
      expect(state.newSubmissionId).toBe('test-id-2');
    });
  });

  describe('clearNewSubmission action', () => {
    it('sets newSubmissionId to null', () => {
      const stateWithSubmission = formReducer(initialState, addSubmission(mockSubmission));
      expect(stateWithSubmission.newSubmissionId).toBe('test-id-1');

      const result = formReducer(stateWithSubmission, clearNewSubmission());

      expect(result.newSubmissionId).toBeNull();
    });

    it('does not affect submissions array', () => {
      const stateWithSubmission = formReducer(initialState, addSubmission(mockSubmission));
      const result = formReducer(stateWithSubmission, clearNewSubmission());

      expect(result.submissions).toHaveLength(1);
      expect(result.submissions[0]).toEqual(mockSubmission);
    });

    it('can be called on initial state without issues', () => {
      const result = formReducer(initialState, clearNewSubmission());

      expect(result).toEqual(initialState);
    });
  });

  describe('clearSubmissions action', () => {
    it('clears all submissions', () => {
      let state = formReducer(initialState, addSubmission(mockSubmission));
      state = formReducer(state, addSubmission(mockSubmission2));
      expect(state.submissions).toHaveLength(2);

      const result = formReducer(state, clearSubmissions());

      expect(result.submissions).toEqual([]);
      expect(result.submissions).toHaveLength(0);
    });

    it('does not affect newSubmissionId', () => {
      const state = formReducer(initialState, addSubmission(mockSubmission));
      expect(state.newSubmissionId).toBe('test-id-1');

      const result = formReducer(state, clearSubmissions());

      expect(result.newSubmissionId).toBe('test-id-1');
      expect(result.submissions).toEqual([]);
    });

    it('can be called on initial state without issues', () => {
      const result = formReducer(initialState, clearSubmissions());

      expect(result).toEqual(initialState);
    });
  });

  describe('slice configuration', () => {
    it('has correct name', () => {
      expect(formSlice.name).toBe('form');
    });

    it('exports all actions', () => {
      expect(addSubmission).toBeDefined();
      expect(clearNewSubmission).toBeDefined();
      expect(clearSubmissions).toBeDefined();

      expect(typeof addSubmission).toBe('function');
      expect(typeof clearNewSubmission).toBe('function');
      expect(typeof clearSubmissions).toBe('function');
    });

    it('exports the reducer as default', () => {
      expect(formReducer).toBeDefined();
      expect(typeof formReducer).toBe('function');
    });
  });

  describe('complex scenarios', () => {
    it('handles full workflow: add -> clear highlight -> add more -> clear all', () => {
      let state = formReducer(initialState, addSubmission(mockSubmission));
      expect(state.submissions).toHaveLength(1);
      expect(state.newSubmissionId).toBe('test-id-1');

      state = formReducer(state, clearNewSubmission());
      expect(state.submissions).toHaveLength(1);
      expect(state.newSubmissionId).toBeNull();

      state = formReducer(state, addSubmission(mockSubmission2));
      expect(state.submissions).toHaveLength(2);
      expect(state.newSubmissionId).toBe('test-id-2');

      state = formReducer(state, clearSubmissions());
      expect(state.submissions).toHaveLength(0);
      expect(state.newSubmissionId).toBe('test-id-2');
    });

    it('maintains submission order', () => {
      let state = formReducer(initialState, addSubmission(mockSubmission));
      state = formReducer(state, addSubmission(mockSubmission2));

      expect(state.submissions[0].id).toBe('test-id-1');
      expect(state.submissions[1].id).toBe('test-id-2');
    });
  });
});
