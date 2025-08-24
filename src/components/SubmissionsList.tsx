import type { JSX } from 'react';

import type { FormData } from '@/types/form';

import { SubmissionCard } from '@/components/SubmissionCard';
import styles from '@/styles/SubmissionsList.module.css';

interface SubmissionsListProps {
  highlightedId: null | string;
  submissions: FormData[];
}

export function SubmissionsList({ highlightedId, submissions }: SubmissionsListProps): JSX.Element {
  return (
    <section className={styles.submissions}>
      <h2>Form Submissions ({submissions.length})</h2>
      {submissions.length === 0 ? (
        <p className={styles.noSubmissions}>No submissions yet. Fill out a form to see your data here!</p>
      ) : (
        <div className={styles.submissionsGrid}>
          {submissions.map((submission) => (
            <SubmissionCard highlightedId={highlightedId} key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </section>
  );
}
