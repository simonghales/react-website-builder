// @flow
import React from 'react';
import PageSelector from './components/PageSelector/PageSelector';
import styles from './styles';

const EditorHeader = () => (
  <div className={styles.containerClass}>
    <PageSelector />
  </div>
);

export default EditorHeader;
