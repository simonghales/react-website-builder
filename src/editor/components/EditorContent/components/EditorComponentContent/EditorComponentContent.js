// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorLayout from '../EditorLayout/EditorLayout';
import EditorLayoutColumn from '../EditorLayout/components/EditorLayoutColumn';
import type { ReduxState } from '../../../../../state/redux/store';
import {
  getCurrentModuleKey,
  getSelectedBlockBlock,
  getSelectedBlockModulePropsConfig,
} from '../../../../../state/redux/editor/selector';
import type { BlockModel } from '../../../../../blocks/models';
import { getContentPropsFields, getModuleImportContentPropsFields } from '../EditorFields/state';
import type { DataBlockModel, DataBlockPropsConfigModel } from '../../../../../data/blocks/models';
import EditorFieldGroupFields from '../EditorFields/components/EditorFieldGroupFields/EditorFieldGroupFields';
import EditorFieldGroup from '../EditorFields/components/EditorFieldGroup/EditorFieldGroup';
import { setBlockPropValue } from '../../../../../state/redux/editor/reducer';
import { isBlockModuleImportBlock } from '../../../../../blocks/state';
import Button from '../../../../../components/Button/Button';
import styles from './styles';

type Props = {
  block: BlockModel,
  moduleBlockPropsConfig: DataBlockPropsConfigModel,
  isModuleImportBlock: boolean,
  // eslint-disable-next-line react/no-unused-prop-types
  dataBlock: DataBlockModel,
  updateProp: (blockKey: string, propKey: string, value: string) => void,
};

class EditorComponentContent extends Component<Props> {
  updateProp = (propKey: string, value: string) => {
    const { dataBlock } = this.props;
    const { updateProp } = this.props;
    return updateProp(dataBlock.key, propKey, value);
  };

  getContentPropsFields() {
    const { block, dataBlock, isModuleImportBlock, moduleBlockPropsConfig } = this.props;

    if (isModuleImportBlock) {
      return getModuleImportContentPropsFields(moduleBlockPropsConfig, dataBlock, this.updateProp);
    }

    return getContentPropsFields(block, dataBlock, this.updateProp);
  }

  render() {
    const { block, dataBlock } = this.props;
    const contentPropsFields = this.getContentPropsFields();
    return (
      <div className={styles.containerClass}>
        <div className={styles.addPropContainerClass}>
          <Button>Add Prop</Button>
        </div>
        <div className={styles.fieldsContainerClass}>
          <EditorLayout>
            <EditorLayoutColumn columns={14}>
              <EditorFieldGroup>
                <EditorFieldGroupFields
                  fields={contentPropsFields}
                  block={block}
                  blockKey={dataBlock.key}
                  isContent
                />
              </EditorFieldGroup>
            </EditorLayoutColumn>
          </EditorLayout>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const block = getSelectedBlockBlock(state);
  const moduleBlockPropsConfig = getSelectedBlockModulePropsConfig(state);
  const isModuleImportBlock = isBlockModuleImportBlock(block);
  return {
    block,
    moduleBlockPropsConfig,
    isModuleImportBlock,
    moduleKey: getCurrentModuleKey(state),
  };
};

const mapDispatchToProps = {
  dispatchUpdateProp: (blockKey: string, propKey: string, value: string, moduleKey: string) =>
    setBlockPropValue(blockKey, propKey, value, moduleKey),
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateProp: (blockKey: string, propKey: string, value: string) =>
    dispatchProps.dispatchUpdateProp(blockKey, propKey, value, stateProps.moduleKey),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditorComponentContent);
