// @flow
import React from 'react';
import EditorPreviewIframe from '../../components/EditorPreviewIframe/EditorPreviewIframe';
import styles from './styles';
import EditorContent from '../../components/EditorContent/EditorContent';

const EditorBlockView = () => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>
      <div>Basic.Text</div>
      <div>Site Title</div>
    </header>
    <div className={styles.mainClass}>
      <div className={styles.editorClass}>
        <EditorContent />
      </div>
      <div className={styles.previewClass}>
        <EditorPreviewIframe />
      </div>
    </div>
  </div>
);

export default EditorBlockView;
