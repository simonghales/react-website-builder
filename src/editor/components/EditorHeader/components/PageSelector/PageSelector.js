// @flow
import React from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import styles from './styles';
import type { PageDataModel } from '../../../../../data/pages/models';

type Props = {
  page: PageDataModel | null,
};

const PageSelector = ({ page }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.iconClass}>
      <MdRemoveRedEye size={18} />
    </div>
    <div>
      <div className={styles.pathClass}>/{page.slug}</div>
      <div className={styles.nameClass}>{page.name}</div>
    </div>
  </div>
);

export default PageSelector;
