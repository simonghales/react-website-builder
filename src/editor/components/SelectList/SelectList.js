// @flow
import React from 'react';
import SelectListGroup from './components/SelectListGroup/SelectListGroup';
import styles from './styles';
import type { SelectListGroupModel } from './models';

type Props = {
  heading: string,
  groups: Array<SelectListGroupModel>,
};

const SelectList = ({ heading, groups }: Props) => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>{heading}</header>
    <div className={styles.listClass}>
      {groups.map(group => (
        <SelectListGroup key={group.key} name={group.name} items={group.items} />
      ))}
    </div>
  </div>
);

export default SelectList;
