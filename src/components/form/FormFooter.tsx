import type { JSX } from 'react';

import styles from '@/styles/Form.module.css';

interface FormFooterProps {
  isSubmitting: boolean;
  isValid?: boolean;
  onCancel: () => void;
}

export function FormFooter({ isSubmitting, isValid, onCancel }: FormFooterProps): JSX.Element {
  const isSubmitDisabled = isSubmitting || (isValid !== undefined && !isValid);

  return (
    <footer className={styles.formActions}>
      <button className="buttonSecondary" onClick={onCancel} type="button">
        Cancel
      </button>
      <button className="buttonPrimary" disabled={isSubmitDisabled} type="submit">
        Submit
      </button>
    </footer>
  );
}
