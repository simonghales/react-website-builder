// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  content: any,
  selected: boolean,
  title: string,
  onSelect: () => void,
};

const SelectableOption = ({ content, selected, title, onSelect }: Props) => (
  <div
    className={cx(styles.containerClass, {
      [styles.notSelectedClass]: !selected,
      [styles.selectedClass]: selected,
    })}
    title={title}
    onClick={onSelect}
  >
    {content}
  </div>
);

export default SelectableOption;
