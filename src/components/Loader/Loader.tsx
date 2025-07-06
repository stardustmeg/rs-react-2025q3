import React, { type JSX } from 'react';

import styles from '@/components/Loader/Loader.module.css';

const Loader = (): JSX.Element => (
  <div className={styles.loaderWrapper}>
    <div
      aria-label="Orange and tan hamster running in a metal wheel"
      className={styles.wheelAndHamster}
      data-testid="loader-spinner"
    >
      <div className={styles.wheel} />
      <div className={styles.hamster}>
        <div className={styles.hamsterBody}>
          <div className={styles.hamsterHead}>
            <div className={styles.hamsterEar} />
            <div className={styles.hamsterEye} />
            <div className={styles.hamsterNose} />
          </div>
          <div className={`${styles.hamsterLimb} ${styles.hamsterLimbFr}`} />
          <div className={`${styles.hamsterLimb} ${styles.hamsterLimbFl}`} />
          <div className={`${styles.hamsterLimb} ${styles.hamsterLimbBr}`} />
          <div className={`${styles.hamsterLimb} ${styles.hamsterLimbBl}`} />
          <div className={styles.hamsterTail} />
        </div>
      </div>
      <div className={styles.spoke} />
    </div>
  </div>
);

export default React.memo(Loader);
