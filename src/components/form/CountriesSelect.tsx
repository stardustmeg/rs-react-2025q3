import type { JSX } from 'react';

import clsx from 'clsx';

import type { UniversalErrors } from '@/types/form';

import { getErrorMessage } from '@/components/form/helpers';
import { useAppSelector } from '@/hooks/redux';
import styles from '@/styles/Form.module.css';

interface CountriesSelectProps {
  errors: UniversalErrors;
}

export function CountriesSelect({ errors }: CountriesSelectProps): JSX.Element {
  const countries = useAppSelector((state) => state.countries);

  const errorMessage = getErrorMessage(errors.country);

  return (
    <>
      <input
        className={clsx(errorMessage && styles.error)}
        id="country"
        list="countries-list"
        name="country"
        type="text"
      />
      <datalist data-testid="countries-list" id="countries-list">
        {countries.map((country) => (
          <option key={country.code} value={country.name} />
        ))}
      </datalist>
    </>
  );
}
