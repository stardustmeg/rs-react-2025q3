import { LS_SEARCH_KEY } from '@/services/constants';

class LocalStorageService {
  private static readonly LS_PREFIX = 'stardustmeg_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

  public get(key: string): null | string {
    if (!this.isAvailable()) {
      return null;
    }
    return localStorage.getItem(this.getFullKey(key));
  }

  public remove(key: string): void {
    if (!this.isAvailable()) {
      return;
    }
    localStorage.removeItem(this.getFullKey(key));
  }

  public save(key: string, value: string): void {
    if (!this.isAvailable()) {
      return;
    }
    localStorage.setItem(this.getFullKey(key), value);
  }

  private getFullKey(key: string): string {
    return `${LocalStorageService.LS_PREFIX}_${key}`;
  }

  private isAvailable(): boolean {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

const localStorageService = new LocalStorageService();

export const getTrimmedSearchQuery = (): string => {
  return localStorageService.get(LS_SEARCH_KEY)?.trim() ?? '';
};

export const saveSearchQuery = (query: string): void => {
  localStorageService.save(LS_SEARCH_KEY, query);
};
