// @flow
import React from 'react';
import styles from './styles';
import EditorSidebar from '../../components/EditorSidebar/EditorSidebar';
import EditorBlockView from '../EditorBlockView/EditorBlockView';
import { DUMMY_PAGE_DATA } from '../../../data/blocks/dummy';

const data = DUMMY_PAGE_DATA;

const EditorView = () => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>header..</header>
    <main className={styles.mainClass}>
      <div className={styles.editorClass}>
        <EditorSidebar blocks={data.blocks} />
      </div>
      <div className={styles.previewClass}>
        <EditorBlockView />
      </div>
    </main>
  </div>
);

export default EditorView;
