import { describe, expect, it, vi } from 'vitest';

import { fileToBase64 } from '@/utils/fileUtils';

describe('File to Base64 Conversion', () => {
  it('should convert file to base64 string', async () => {
    const testContent = 'Hello, World!';
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });

    const result = await fileToBase64(testFile);

    expect(typeof result).toBe('string');
    expect(result).toContain('data:text/plain;base64,');
  });

  it('should handle different file types', async () => {
    const testFile = new File(['test'], 'test.png', { type: 'image/png' });
    const result = await fileToBase64(testFile);

    expect(typeof result).toBe('string');
    expect(result).toContain('data:image/png;base64,');
  });

  it('should handle empty files', async () => {
    const emptyFile = new File([], 'empty.txt', { type: 'text/plain' });
    const result = await fileToBase64(emptyFile);

    expect(typeof result).toBe('string');
    expect(result).toContain('data:text/plain;base64,');
  });

  it('should handle files with special characters', async () => {
    const specialContent = 'Hello, 世界! 🌟';
    const specialFile = new File([specialContent], 'special.txt', { type: 'text/plain' });
    const result = await fileToBase64(specialFile);

    expect(typeof result).toBe('string');
    expect(result).toContain('data:text/plain;base64,');
    expect(result.length).toBeGreaterThan('data:text/plain;base64,'.length);
  });

  it('should reject with error when FileReader fails', async () => {
    const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });

    const originalFileReader = global.FileReader;
    const mockFileReader = {
      addEventListener: vi.fn((event: string, handler: () => void) => {
        if (event === 'error') {
          setTimeout(() => {
            handler();
          }, 0);
        }
      }),
      DONE: 2,
      EMPTY: 0,
      LOADING: 1,
      readAsDataURL: vi.fn(),
      result: null,
    };

    const MockFileReader = vi.fn(() => mockFileReader);

    global.FileReader = MockFileReader as unknown as typeof FileReader;

    await expect(fileToBase64(testFile)).rejects.toThrow('Failed to read file');

    global.FileReader = originalFileReader;
  });
});
