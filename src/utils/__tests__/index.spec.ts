import { describe, expect, it } from 'vitest';

import { getErrorMessage } from '..';

describe('getErrorMessage', () => {
  it('returns the error message when passed an Error', () => {
    const error = new Error('Something went wrong');
    expect(getErrorMessage(error)).toBe('Something went wrong');
  });

  it('returns "Unknown error" when passed a string', () => {
    expect(getErrorMessage('fail')).toBe('Unknown error');
  });

  it('returns "Unknown error" when passed a number', () => {
    const NUMBER_VALUE = 123;
    expect(getErrorMessage(NUMBER_VALUE)).toBe('Unknown error');
  });

  it('returns "Unknown error" when passed an object', () => {
    expect(getErrorMessage({ message: 'oops' })).toBe('Unknown error');
  });

  it('returns "Unknown error" when passed undefined', () => {
    expect(getErrorMessage(undefined)).toBe('Unknown error');
  });
});
