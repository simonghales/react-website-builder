// @flow
import React from 'react';
import SelectListItem from '../SelectListItem/SelectListItem';
import styles from './styles';
import type { SelectListItemModel } from '../../models';

type Props = {
  name: string,
  items: Array<SelectListItemModel>,
};

const SelectListGroup = ({ name, items }: Props) => (
  <div className={styles.containerClass}>
    <div className={styles.headingClass}>{name}</div>
    <div>
      {items.map(item => (
        <SelectListItem
          key={item.key}
          disabled={item.disabled}
          name={item.name}
          onClick={item.onClick}
        />
      ))}
    </div>
  </div>
);

export default SelectListGroup;
