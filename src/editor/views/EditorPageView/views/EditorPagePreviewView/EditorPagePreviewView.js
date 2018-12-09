// @flow
import React from 'react';
import { editorPreviewIframeTypes } from 'editor/components/EditorPreviewIframe/EditorPreviewIframe.js';
import EditorPreviewIframe, {
  editorPreviewIframeSizes,
} from '../../../../components/EditorPreviewIframe/EditorPreviewIframe';
import styles from './styles';

const EditorPagePreviewView = () => (
  <div className={styles.containerClass}>
    <EditorPreviewIframe
      size={editorPreviewIframeSizes.full}
      type={editorPreviewIframeTypes.page}
    />
  </div>
);

export default EditorPagePreviewView;
