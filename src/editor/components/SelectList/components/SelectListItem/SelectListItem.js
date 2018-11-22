// @flow
import React from 'react';
import { cx } from 'emotion';
import { MdTitle } from 'react-icons/md';
import styles from './styles';

type Props = {
  disabled: boolean,
  name: string,
  onClick: () => void,
};

const SelectListItem = ({ disabled, name, onClick }: Props) => (
  <div
    className={cx(styles.itemClass, styles.classNames.item, {
      [styles.disabledItemClass]: disabled,
    })}
    onClick={onClick}
  >
    <div className={styles.iconClass}>
      <MdTitle />
    </div>
    <div className={styles.labelClass}>{name}</div>
  </div>
);

export default SelectListItem;
