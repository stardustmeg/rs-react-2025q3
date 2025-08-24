import type { JSX } from 'react';

import clsx from 'clsx';

import styles from '@/styles/OpenModalButton.module.css';

interface OpenModalButtonProps {
  label: string;
  openModal: () => void;
}

export function OpenModalButton({ label, openModal }: OpenModalButtonProps): JSX.Element {
  return (
    <div>
      <button className={clsx(styles.cButton, styles.cButtonGooey)} onClick={openModal} type="button">
        {label}
        <div className={styles.cButtonBlobs}>
          <div />
          <div />
          <div />
        </div>
      </button>
      <svg style={{ display: 'block', height: 0, width: 0 }} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={10} />
            <feColorMatrix in="blur" mode="matrix" result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
