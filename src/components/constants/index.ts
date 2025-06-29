export const LOADER_SIZE = { LG: 'lg', MD: 'md', SM: 'sm' } as const;

export type LoaderSize = (typeof LOADER_SIZE)[keyof typeof LOADER_SIZE];
