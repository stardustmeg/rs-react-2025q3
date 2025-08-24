import type { JSX } from 'react';

import clsx from 'clsx';

import type { UniversalErrors } from '@/types/form';

import { getErrorMessage } from '@/components/form/helpers';
import { genders } from '@/constants';
import styles from '@/styles/Form.module.css';
import { capitalize } from '@/utils';

interface GenderSelectProps {
  errors: UniversalErrors;
}

export function GenderSelect({ errors }: GenderSelectProps): JSX.Element {
  const errorMessage = getErrorMessage(errors.gender);

  return (
    <select className={clsx(errorMessage && styles.error)} id="gender" name="gender">
      {genders.map((gender) => (
        <option key={gender} value={gender}>
          {capitalize(gender)}
        </option>
      ))}
    </select>
  );
}
