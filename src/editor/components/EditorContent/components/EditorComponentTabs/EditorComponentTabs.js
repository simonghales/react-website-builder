// @flow
import React from 'react';
import { MdBrush, MdCode } from 'react-icons/md';
import { cx } from 'emotion';
import styles from './styles';

const EditorComponentTabs = () => (
  <nav className={styles.containerClass}>
    <div className={cx(styles.tabClass, styles.activeTabClass)}>
      <MdCode />
      <span>Props</span>
    </div>
    <div className={styles.tabClass}>
      <MdBrush />
      <span>Styles</span>
    </div>
  </nav>
);

export default EditorComponentTabs;
