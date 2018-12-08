// @flow
import React from 'react';
import { cx } from 'emotion';
import { MdModeEdit } from 'react-icons/md';
import styles from './styles';

type Props = {
  selected: boolean,
};

const PagePreview = ({ selected }: Props) => (
  <div
    className={cx(styles.containerClass, {
      [styles.notSelectedClass]: !selected,
      [styles.selectedClass]: selected,
    })}
  >
    <div className={styles.infoClass}>
      <div className={styles.labelClass}>/</div>
      <div className={styles.titleClass}>Home</div>
    </div>
    <div className={styles.iconWrapperClass}>
      <div className={styles.iconClass}>
        <MdModeEdit />
      </div>
    </div>
  </div>
);

export default PagePreview;
