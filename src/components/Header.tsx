import type { JSX } from 'react';

import styles from '@/styles/Header.module.css';

export function Header(): JSX.Element {
  return (
    <header className={styles.appHeader}>
      <h1>React Forms Application</h1>
    </header>
  );
}
