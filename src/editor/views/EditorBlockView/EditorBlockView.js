// @flow
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { MdDelete, MdCreateNewFolder } from 'react-icons/md';
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
} from '../../../state/redux/shared/dispatch';
import {
  setAddingBlock,
  setInitialSelectedModuleHistory,
  setSelectedModuleKey,
} from '../../../state/redux/ui/reducer';

type Props = {
  selectedBlock: DataBlockModel,
  selectedModule: DataModule,
  createModule: (blockKey: string) => void,
  removeBlock: (blockKey: string) => void,
  setInitialHistory: (moduleKey: string, previousModuleKey: string) => void,
  setModule: (moduleKey: string, previousModuleKey: string) => void,
  match: {
    params: {
      moduleKey?: string,
      previousModuleKey?: string,
    },
  },
};

const getParamModuleKey = (props: Props): string => {
  const { match } = props;
  const { params } = match;
  const { moduleKey = '' } = params;
  return moduleKey;
};

const getParamPreviousModuleKey = (props: Props): string => {
  const { match } = props;
  const { params } = match;
  const { previousModuleKey = '' } = params;
  return previousModuleKey;
};

class EditorBlockView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.checkUrlParams(props);
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  checkUrlParams(props: Props = this.props) {
    const { match } = props;
    const { params } = match;
    const { previousModuleKey = '' } = params;
    const moduleKey = getParamModuleKey(props);
    if (moduleKey) {
      const { setInitialHistory } = this.props;
      setInitialHistory(moduleKey, previousModuleKey);
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    this.checkUpdatedUrlParams(nextProps);
  }

  checkUpdatedUrlParams(nextProps: Props) {
    const moduleKey = getParamModuleKey(nextProps);
    const previousModuleKey = getParamModuleKey(this.props);
    const newPreviousModuleKey = getParamPreviousModuleKey(nextProps);
    if (moduleKey !== previousModuleKey) {
      const { setModule } = this.props;
      setModule(moduleKey, newPreviousModuleKey);
    }
  }

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
  setInitialHistory: (moduleKey: string, previousModuleKey: string) =>
    dispatch(setInitialSelectedModuleHistory(moduleKey, previousModuleKey)), // todo - verify moduleKey is valid
  completeAddingBlock: () => dispatch(setAddingBlock(false)),
  setModule: (moduleKey: string, previousModuleKey: string) =>
    dispatch(setSelectedModuleKey(moduleKey, previousModuleKey)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  createModule: (blockKey: string) =>
    dispatchProps.dispatchCreateModule(blockKey, stateProps.moduleKey, stateProps.selectedModule),
  removeBlock: (blockKey: string) =>
    dispatchProps.dispatchRemoveBlock(blockKey, stateProps.moduleKey, stateProps.selectedModule),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(EditorBlockView)
);
