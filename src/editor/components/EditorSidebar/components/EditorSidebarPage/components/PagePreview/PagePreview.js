// @flow
import React from 'react';
import { cx } from 'emotion';
import { MdModeEdit } from 'react-icons/md';
import styles from './styles';
import type { PageDataModel } from '../../../../../../../data/pages/models';

type Props = {
  page: PageDataModel,
  selected: boolean,
  select: () => void,
  onEdit: () => void,
};

const PagePreview = ({ page, selected, select, onEdit }: Props) => (
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
      <div className={styles.iconClass} onClick={onEdit}>
        <MdModeEdit />
      </div>
    </div>
  </div>
);

export default PagePreview;
