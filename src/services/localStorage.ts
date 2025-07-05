const LS_SEARCH_KEY = 'search';

class LocalStorageService {
  private static readonly LS_PREFIX = 'stardustmeg_8c0a1a24-b273-4b98-91c6-c7d623fc53f1';

  public get(key: string): null | string {
    return localStorage.getItem(this.getFullKey(key));
  }

  public save(key: string, value: string): void {
    localStorage.setItem(this.getFullKey(key), value);
  }

  private getFullKey(key: string): string {
    return `${LocalStorageService.LS_PREFIX}_${key}`;
  }
}

const localStorageService = new LocalStorageService();

export const getTrimmedSearchQuery = (): string => {
  return localStorageService.get(LS_SEARCH_KEY)?.trim() ?? '';
};

export const saveSearchQuery = (query: string): void => {
  localStorageService.save(LS_SEARCH_KEY, query);
};
