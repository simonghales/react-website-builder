// @flow
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
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
import { getSelectedModuleSelectedBlock } from '../../../state/redux/editor/state';
import { removeBlockFromModule } from '../../../state/redux/editor/reducer';

type Props = {
  selectedBlock: DataBlockModel,
  removeBlock: (blockKey: string) => void,
};

const EditorBlockView = ({ selectedBlock, removeBlock }: Props) => (
  <div className={styles.containerClass}>
    <header className={styles.headerClass}>
      <SmallHeading>{`${getDataBlockGroupKey(selectedBlock)}.${getDataBlockBlockKey(
        selectedBlock
      )}`}</SmallHeading>
      <div className={styles.titleWrapperClass}>
        {!selectedBlock.isParentModule && (
          <div
            className={styles.removeButtonClass}
            onClick={() => {
              removeBlock(selectedBlock.key);
            }}
          >
            <MdDelete />
          </div>
        )}
        <MediumLargeHeading>{`${getDataBlockLabel(selectedBlock)}`}</MediumLargeHeading>
      </div>
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

const mapStateToProps = (state: ReduxState) => ({
  selectedBlock: getSelectedModuleSelectedBlock(state.editor),
});

const mapDispatchToProps = {
  removeBlock: (blockKey: string) => removeBlockFromModule(blockKey),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorBlockView);
