import type { Country } from '@/types/form';

export const filterCountries = (countries: Country[], query: string): Country[] => {
  if (!query.trim()) {
    return countries;
  }

  const lowerQuery = query.toLowerCase().trim();
  return countries.filter((country) => {
    const nameMatch = country.name.toLowerCase().includes(lowerQuery);
    const codeMatch = country.code.toLowerCase() === lowerQuery;
    return nameMatch || codeMatch;
  });
};

export const findCountry = (countries: Country[], query: string): Country | undefined => {
  if (!query.trim()) {
    return undefined;
  }

  const lowerQuery = query.toLowerCase();
  return countries.find(
    (country) => country.name.toLowerCase() === lowerQuery || country.code.toLowerCase() === lowerQuery,
  );
};

export const getCountrySuggestions = (countries: Country[], query: string, limit = 10): Country[] => {
  const filtered = filterCountries(countries, query);
  return filtered.slice(0, limit);
};
