// @flow
import React from 'react';
import styles from './styles';
import EditorComponentTabs from './components/EditorComponentTabs/EditorComponentTabs';

const EditorContent = () => (
  <div className={styles.containerClass}>
    <EditorComponentTabs />
  </div>
);

export default EditorContent;
