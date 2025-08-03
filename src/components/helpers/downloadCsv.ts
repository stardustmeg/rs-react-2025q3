import type { TransformedCharacter } from '@/types';

const convertToCSV = (characters: TransformedCharacter[]): string => {
  const headers = ['ID', 'Name', 'Status', 'Species', 'Gender', 'Origin'];
  const rows = characters.map((char) => [char.id, char.name, char.status, char.species, char.gender, char.origin]);

  const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(',')).join('\n');

  return csvContent;
};

export const downloadCSV = (
  characters: TransformedCharacter[],
  linkReference: React.RefObject<HTMLAnchorElement | null>,
): void => {
  const csv = convertToCSV(characters);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  if (linkReference.current) {
    const url = URL.createObjectURL(blob);
    linkReference.current.href = url;
    linkReference.current.download = `${characters.length}-characters.csv`;
    linkReference.current.click();
    URL.revokeObjectURL(url);
  }
};
