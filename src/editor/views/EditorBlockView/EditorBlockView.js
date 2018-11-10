// @flow
import React from 'react';
import EditorPreviewIframe from '../../components/EditorPreviewIframe/EditorPreviewIframe';
import styles from './styles';
import EditorContent from '../../components/EditorContent/EditorContent';
import SmallHeading from '../../../elements/SmallHeading';
import MediumLargeHeading from '../../../elements/MediumLargeHeading';
import { DUMMY_PAGE_DATA } from '../../../data/blocks/dummy';
import {
  getDataBlockBlockKey,
  getDataBlockGroupKey,
  getDataBlockLabel,
} from '../../../data/blocks/models';

const selectedBlock = DUMMY_PAGE_DATA.blocks[0];

const EditorBlockView = () => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>
      <SmallHeading>{`${getDataBlockGroupKey(selectedBlock)}.${getDataBlockBlockKey(
        selectedBlock
      )}`}</SmallHeading>
      <MediumLargeHeading>{`${getDataBlockLabel(selectedBlock)}`}</MediumLargeHeading>
    </header>
    <div className={styles.mainClass}>
      <div className={styles.editorClass}>
        <EditorContent selectedBlock={selectedBlock} />
      </div>
      <div className={styles.previewClass}>
        <EditorPreviewIframe />
      </div>
    </div>
  </div>
);

export default EditorBlockView;
