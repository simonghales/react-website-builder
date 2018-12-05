// @flow
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { MdDelete, MdCreateNewFolder } from 'react-icons/md';
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
import {
  createNewModuleFromSelectedBlock,
  removeBlockFromModule,
} from '../../../state/redux/editor/reducer';
import IconButton from '../../../components/IconButton/IconButton';
import { getCurrentModuleKey, getSelectedBlock } from '../../../state/redux/editor/selector';

type Props = {
  selectedBlock: DataBlockModel,
  createModule: (blockKey: string) => void,
  removeBlock: (blockKey: string) => void,
};

class EditorBlockView extends Component<Props> {
  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    const { createModule, selectedBlock, removeBlock } = this.props;
    return (
      <div className={styles.containerClass}>
        <header className={styles.headerClass}>
          <div className={styles.titleWrapperClass}>
            <MediumLargeHeading>{`${getDataBlockLabel(selectedBlock)}`}</MediumLargeHeading>
          </div>
          <div className={styles.detailsClass}>
            {!selectedBlock.isParentModule && (
              <IconButton
                className={styles.buttonClass}
                tooltip="Delete block"
                icon={<MdDelete size={17} />}
                onClick={() => removeBlock(selectedBlock.key)}
              />
            )}
            {!selectedBlock.isParentModule && (
              <IconButton
                className={styles.buttonClass}
                tooltip="Save as module"
                icon={<MdCreateNewFolder size={17} />}
                onClick={() => createModule(selectedBlock.key)}
              />
            )}
            <SmallHeading>{`${getDataBlockGroupKey(selectedBlock)}.${getDataBlockBlockKey(
              selectedBlock
            )}`}</SmallHeading>
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
  }
}

const mapStateToProps = (state: ReduxState) => ({
  selectedBlock: getSelectedBlock(state),
  moduleKey: getCurrentModuleKey(state),
});

const mapDispatchToProps = {
  dispatchCreateModule: (blockKey: string, moduleKey: string) =>
    createNewModuleFromSelectedBlock(moduleKey, blockKey),
  dispatchRemoveBlock: (blockKey: string, moduleKey: string) =>
    removeBlockFromModule(blockKey, moduleKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  createModule: (blockKey: string) =>
    dispatchProps.dispatchCreateModule(blockKey, stateProps.moduleKey),
  removeBlock: (blockKey: string) =>
    dispatchProps.dispatchRemoveBlock(blockKey, stateProps.moduleKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorBlockView);
