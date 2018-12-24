// @flow
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { MdDelete, MdCreateNewFolder, MdRepeat } from 'react-icons/md';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editorPreviewIframeTypes } from 'editor/components/EditorPreviewIframe/EditorPreviewIframe.js';
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
import IconButton from '../../../components/IconButton/IconButton';
import {
  getCurrentModule,
  getCurrentModuleKey,
  getSelectedBlock,
} from '../../../state/redux/editor/selector';
import type { DataModule } from '../../../data/modules/models';
import {
  dispatchCreateNewModuleFromSelectedBlock,
  dispatchRemoveBlockFromModule,
  dispatchWrapSelectedBlockWithRepeaterBlock,
} from '../../../state/redux/shared/dispatch';
import { setAddingBlock } from '../../../state/redux/ui/reducer';

type Props = {
  selectedBlock: DataBlockModel,
  selectedModule: DataModule,
  createModule: (blockKey: string) => void,
  removeBlock: (blockKey: string) => void,
  wrapBlockWithRepeater: (blockKey: string) => void,
};

type State = {};

class EditorBlockView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  handleWrapWithRepeater = () => {
    const { wrapBlockWithRepeater, selectedBlock } = this.props;
    wrapBlockWithRepeater(selectedBlock.key);
  };

  render() {
    const { createModule, selectedBlock, removeBlock } = this.props;
    return (
      <div className={styles.containerClass}>
        <header className={styles.headerClass}>
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
            {!selectedBlock.isParentModule && (
              <IconButton
                className={styles.buttonClass}
                tooltip="Repeat"
                icon={<MdRepeat size={17} />}
                onClick={this.handleWrapWithRepeater}
              />
            )}
            <SmallHeading>{`${getDataBlockGroupKey(selectedBlock)}.${getDataBlockBlockKey(
              selectedBlock
            )}`}</SmallHeading>
          </div>
          <div className={styles.titleWrapperClass}>
            <MediumLargeHeading>{`${getDataBlockLabel(selectedBlock)}`}</MediumLargeHeading>
          </div>
        </header>
        <div className={styles.mainClass}>
          <div className={styles.editorClass}>
            <EditorContent selectedBlock={selectedBlock} />
          </div>
          <div className={styles.previewClass}>
            <EditorPreviewIframe type={editorPreviewIframeTypes.module} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  selectedBlock: getSelectedBlock(state),
  moduleKey: getCurrentModuleKey(state),
  selectedModule: getCurrentModule(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchCreateModule: (blockKey: string, moduleKey: string, selectedModule: DataModule) =>
    dispatchCreateNewModuleFromSelectedBlock(moduleKey, blockKey, selectedModule, dispatch),
  dispatchRemoveBlock: (blockKey: string, moduleKey: string, selectedModule: DataModule) =>
    dispatchRemoveBlockFromModule(blockKey, moduleKey, selectedModule, dispatch),
  completeAddingBlock: () => dispatch(setAddingBlock(false)),
  dispatchWrapBlockWithRepeater: (blockKey: string, moduleKey: string) =>
    dispatchWrapSelectedBlockWithRepeaterBlock(blockKey, moduleKey, dispatch),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  createModule: (blockKey: string) =>
    dispatchProps.dispatchCreateModule(blockKey, stateProps.moduleKey, stateProps.selectedModule),
  removeBlock: (blockKey: string) =>
    dispatchProps.dispatchRemoveBlock(blockKey, stateProps.moduleKey, stateProps.selectedModule),
  wrapBlockWithRepeater: (blockKey: string) =>
    dispatchProps.dispatchWrapBlockWithRepeater(blockKey, stateProps.moduleKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorBlockView);
