import type { JSX } from 'react';

import clsx from 'clsx';

import type { FormData } from '@/types/form';

import { getFieldConfigs } from '@/components/helpers';
import styles from '@/styles/SubmissionCard.module.css';

interface SubmissionCardProps {
  highlightedId: null | string;
  submission: FormData;
}

export function SubmissionCard({ highlightedId, submission }: SubmissionCardProps): JSX.Element {
  return (
    <div
      className={clsx(styles.submissionCard, highlightedId === submission.id && styles.highlighted)}
      data-testid={`submission-card-${submission.id}`}
    >
      <span
        className={clsx(styles.formTypeBadge, submission.formType, {
          [styles.reactHookForm]: submission.formType === 'react-hook-form',
          [styles.uncontrolled]: submission.formType === 'uncontrolled',
        })}
        data-testid="form-type-badge"
      >
        {submission.formType === 'uncontrolled' ? 'Uncontrolled' : 'React Hook Form'}
      </span>
      <div className={styles.submissionHeader}>
        <h3>{submission.name}</h3>
        {submission.picture && (
          <div className={styles.submissionField}>
            <img alt="User uploaded picture" className={styles.submissionPicture} src={submission.picture} />
          </div>
        )}
      </div>

      <div className={styles.submissionContent}>
        {getFieldConfigs(submission).map(({ label, value }) => (
          <div className={styles.submissionField} key={label}>
            <strong>{label}</strong> {value}
          </div>
        ))}
      </div>
    </div>
  );
}
