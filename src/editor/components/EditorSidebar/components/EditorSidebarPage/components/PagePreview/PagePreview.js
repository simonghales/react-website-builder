// @flow
import React from 'react';
import { cx } from 'emotion';
import { MdModeEdit, MdRemoveRedEye } from 'react-icons/md';
import styles from './styles';
import type { PageDataModel } from '../../../../../../../data/pages/models';

type Props = {
  page: PageDataModel,
  selected: boolean,
  showEditIcon: boolean,
  select: () => void,
  toggleMode: () => void,
};

const PagePreview = ({ page, selected, select, toggleMode, showEditIcon }: Props) => (
  <div
    className={cx(styles.containerClass, {
      [styles.notSelectedClass]: !selected,
      [styles.selectedClass]: selected,
    })}
    onClick={select}
  >
    <div className={styles.infoClass}>
      <div className={styles.labelClass}>/{page.slug}</div>
      <div className={styles.titleClass}>{page.name}</div>
    </div>
    <div className={styles.iconWrapperClass}>
      <div className={styles.iconClass} onClick={toggleMode}>
        {showEditIcon ? <MdModeEdit /> : <MdRemoveRedEye />}
      </div>
    </div>
  </div>
);

export default PagePreview;
