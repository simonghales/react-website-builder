// @flow
import React from 'react';
import styles from './styles';
import EditorPreviewIframe from '../../components/EditorPreviewIframe/EditorPreviewIframe';

const EditorView = () => (
  <div className={styles.containerClass}>
    <div className={styles.editorClass}>SIDE EDIT STUFF</div>
    <div className={styles.previewClass}>
      <EditorPreviewIframe />
    </div>
  </div>
);

export default EditorView;
