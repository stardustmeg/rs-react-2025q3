import type { TransformedCharacter } from '@/types';

const convertToCSV = (characters: TransformedCharacter[]): string => {
  const headers = ['ID', 'Name', 'Status', 'Species', 'Gender', 'Origin'];
  const rows = characters.map((char) => [char.id, char.name, char.status, char.species, char.gender, char.origin]);

  const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(',')).join('\n');

  return csvContent;
};

export const downloadCSV = (characters: TransformedCharacter[]): void => {
  const csv = convertToCSV(characters);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `${characters.length}-characters.csv`;
  link.style.visibility = 'hidden';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
