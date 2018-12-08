// @flow
import React from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import styles from './styles';

const PageSelector = () => (
  <div className={styles.containerClass}>
    <div className={styles.iconClass}>
      <MdRemoveRedEye size={18} />
    </div>
    <div>
      <div className={styles.pathClass}>/</div>
      <div className={styles.nameClass}>Home</div>
    </div>
  </div>
);

export default PageSelector;
