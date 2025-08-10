export const queryKeys = {
  characters: {
    all: ['characters'] as const,
    detail: (id: string) => [...queryKeys.characters.details(), id] as const,
    details: () => [...queryKeys.characters.all, 'detail'] as const,
    list: (filters: { name?: string; page?: number }) => [...queryKeys.characters.lists(), filters] as const,
    lists: () => [...queryKeys.characters.all, 'list'] as const,
  },
} as const;
