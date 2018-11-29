// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  label: string,
  children: any,
  grid?: boolean,
  marginOffset?: boolean,
  headerIcon?: any,
};

const EditorFieldGroup = ({ label, children, grid, marginOffset, headerIcon }: Props) => (
  <div className={styles.fieldGroupClass}>
    {label && (
      <header className={styles.labelClass}>
        <div>{label}</div>
        {headerIcon && <div>{headerIcon}</div>}
      </header>
    )}
    <div
      className={cx(styles.bodyClass, {
        [styles.marginOffsetClass]: marginOffset,
        [styles.gridClass]: grid,
      })}
    >
      {children}
    </div>
  </div>
);

EditorFieldGroup.defaultProps = {
  grid: false,
  marginOffset: true,
  headerIcon: undefined,
};

export default EditorFieldGroup;
