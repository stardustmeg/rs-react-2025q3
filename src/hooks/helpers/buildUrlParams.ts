export const buildUrlParams = (page: number, query: string): Record<string, string> => {
  const params: Record<string, string> = { page: String(page) };
  if (query.trim()) {
    params.search = query.trim();
  }
  return params;
};
