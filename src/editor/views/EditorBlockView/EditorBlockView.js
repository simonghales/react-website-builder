// @flow
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import EditorPreviewIframe from '../../components/EditorPreviewIframe/EditorPreviewIframe';
import styles from './styles';
import EditorContent from '../../components/EditorContent/EditorContent';
import SmallHeading from '../../../elements/SmallHeading';
import MediumLargeHeading from '../../../elements/MediumLargeHeading';
import {
  getDataBlockBlockKey,
  getDataBlockGroupKey,
  getDataBlockLabel,
} from '../../../data/blocks/models';
import type { DataBlockModel } from '../../../data/blocks/models';
import type { ReduxState } from '../../../state/redux/store';
import { getSelectedBlock, getSelectedBlockStyle } from '../../../state/redux/editor/state';
import type { BlockStyles } from '../../../data/styles/models';

type Props = {
  selectedBlock: DataBlockModel,
  selectedBlockStyle: BlockStyles,
};

const EditorBlockView = ({ selectedBlock, selectedBlockStyle }: Props) => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>
      <SmallHeading>{`${getDataBlockGroupKey(selectedBlock)}.${getDataBlockBlockKey(
        selectedBlock
      )}`}</SmallHeading>
      <MediumLargeHeading>{`${getDataBlockLabel(selectedBlock)}`}</MediumLargeHeading>
    </header>
    <div className={styles.mainClass}>
      <div className={styles.editorClass}>
        <EditorContent selectedBlock={selectedBlock} selectedBlockStyle={selectedBlockStyle} />
      </div>
      <div className={styles.previewClass}>
        <EditorPreviewIframe />
      </div>
    </div>
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  selectedBlock: getSelectedBlock(state.editor),
  selectedBlockStyle: getSelectedBlockStyle(state.editor),
});

export default connect(mapStateToProps)(EditorBlockView);
