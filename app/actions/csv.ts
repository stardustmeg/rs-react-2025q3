'use server';

import type { Character } from '@/types/index';

export async function downloadCSVAction(characters: Character[]): Promise<{
  csv: string;
  filename: string;
  mimeType: string;
}> {
  const csv = await generateCSV(characters);
  const filename = `${characters.length}-characters.csv`;

  return { csv, filename, mimeType: 'text/csv;charset=utf-8;' };
}

export async function generateCSV(characters: Character[]): Promise<string> {
  const headers = ['ID', 'Name', 'Status', 'Species', 'Gender', 'Origin'];
  const rows = characters.map((char) => [char.id, char.name, char.status, char.species, char.gender, char.origin.name]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.map((field) => `"${field}"`).join(','))].join('\n');

  return csvContent;
}
