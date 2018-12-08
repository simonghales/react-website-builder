// @flow
import React from 'react';
import styles from './styles';

const PageSelector = () => (
  <div className={styles.containerClass}>
    <div className={styles.iconClass} />
    <div>
      <div className={styles.nameClass}>Home</div>
      <div className={styles.pathClass}>/</div>
    </div>
  </div>
);

export default PageSelector;
