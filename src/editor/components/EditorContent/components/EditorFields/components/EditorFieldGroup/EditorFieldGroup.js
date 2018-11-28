// @flow
import React from 'react';
import { cx } from 'emotion';
import styles from './styles';

type Props = {
  label: string,
  children: any,
  grid?: boolean,
  headerIcon?: any,
};

const EditorFieldGroup = ({ label, children, grid, headerIcon }: Props) => (
  <div className={styles.fieldGroupClass}>
    {label && (
      <header className={styles.labelClass}>
        <div>{label}</div>
        {headerIcon && <div>{headerIcon}</div>}
      </header>
    )}
    <div
      className={cx(styles.bodyClass, {
        [styles.gridClass]: grid,
      })}
    >
      {children}
    </div>
  </div>
);

EditorFieldGroup.defaultProps = {
  grid: false,
  headerIcon: undefined,
};

export default EditorFieldGroup;
