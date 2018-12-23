// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import EditorLayoutColumn from '../../EditorContent/components/EditorLayout/components/EditorLayoutColumn';
import ModelView from './components/ModelView/ModelView';
import DataView from './components/DataView/DataView';
import type { ReduxState } from '../../../../state/redux/store';
import type { FieldProps } from '../../EditorContent/components/EditorFields/components/EditorField/EditorField';
import {
  getCurrentModuleKey,
  getSelectedBlock,
  getSelectedBlockKey,
} from '../../../../state/redux/editor/selector';
import {
  getDataBlockCombinedPropsConfig,
  getPropConfigFromDataBlockCombinedPropsConfig,
} from '../../EditorContent/components/EditorFields/state';
import type { BlockModelPropsConfig } from '../../../../blocks/models';
import {
  addNewFieldToRepeaterDataModel,
  addNewItemToRepeaterData,
  changeItemOrderInRepeaterData,
  getRepeaterDataModelFromPropConfig,
  removeFieldDataFromRepeaterData,
  removeFieldFromRepeaterDataModel,
  removeItemFromRepeaterData,
  updateFieldInRepeaterDataModel,
  updateRepeaterDataItemValue,
} from '../../../../blocks/groups/functional/Repeater/state';
import { updateBlockPropConfig } from '../../../../state/redux/editor/reducer';

type Props = FieldProps & {
  propConfig: BlockModelPropsConfig,
  updatePropConfig: (propConfig: BlockModelPropsConfig) => void,
};

class RepeaterDataInput extends Component<Props> {
  handleUpdateDataItem = (itemKey: string, propKey: string, propValue: string) => {
    const { value, onChange } = this.props;
    onChange(updateRepeaterDataItemValue(itemKey, propKey, propValue, value));
  };

  handleDeleteDataItem = (itemKey: string) => {
    const { value, onChange } = this.props;
    onChange(removeItemFromRepeaterData(itemKey, value));
  };

  handleUpdateDataItemOrder = (itemKey: string, newIndex: number) => {
    const { value, onChange } = this.props;
    onChange(changeItemOrderInRepeaterData(itemKey, newIndex, value));
  };

  handleAddNewDataItem = (index: number) => {
    const { propConfig, value, onChange } = this.props;
    onChange(addNewItemToRepeaterData(index, value, propConfig));
  };

  handleRemoveField = (fieldKey: string) => {
    const { propConfig, updatePropConfig, onChange, value } = this.props;
    const repeaterDataModel = getRepeaterDataModelFromPropConfig(propConfig);
    const updatedRepeaterDataModel = removeFieldFromRepeaterDataModel(repeaterDataModel, fieldKey);
    updatePropConfig({
      ...propConfig,
      repeaterDataModel: updatedRepeaterDataModel,
    });
    onChange(removeFieldDataFromRepeaterData(value, fieldKey));
  };

  handleUpdateField = (fieldKey: string, fieldLabel: string) => {
    const { propConfig, updatePropConfig } = this.props;
    const repeaterDataModel = getRepeaterDataModelFromPropConfig(propConfig);
    const updatedRepeaterDataModel = updateFieldInRepeaterDataModel(
      repeaterDataModel,
      fieldKey,
      fieldLabel
    );
    updatePropConfig({
      ...propConfig,
      repeaterDataModel: updatedRepeaterDataModel,
    });
  };

  handleAddField = () => {
    const { propConfig, updatePropConfig } = this.props;
    const repeaterDataModel = getRepeaterDataModelFromPropConfig(propConfig);
    const updatedRepeaterDataModel = addNewFieldToRepeaterDataModel(repeaterDataModel);
    updatePropConfig({
      ...propConfig,
      repeaterDataModel: updatedRepeaterDataModel,
    });
  };

  render() {
    const { propConfig, value } = this.props;
    return (
      <div className={styles.containerClass}>
        <EditorLayoutColumn columns={7}>
          <div className={styles.labelClass}>Model</div>
          <ModelView
            propConfig={propConfig}
            handleRemoveField={this.handleRemoveField}
            handleUpdateField={this.handleUpdateField}
            handleAddField={this.handleAddField}
          />
        </EditorLayoutColumn>
        <EditorLayoutColumn columns={7}>
          <div className={styles.labelClass}>Data</div>
          <DataView
            data={value}
            propConfig={propConfig}
            handleUpdate={this.handleUpdateDataItem}
            handleDelete={this.handleDeleteDataItem}
            handleUpdateOrder={this.handleUpdateDataItemOrder}
            handleAddNew={this.handleAddNewDataItem}
          />
        </EditorLayoutColumn>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, { propKey }: Props) => {
  const dataBlock = getSelectedBlock(state);
  const combinedPropsConfig = getDataBlockCombinedPropsConfig(dataBlock);
  const propConfig = getPropConfigFromDataBlockCombinedPropsConfig(combinedPropsConfig, propKey);
  return {
    propConfig,
    selectedBlockKey: dataBlock.key,
    moduleKey: getCurrentModuleKey(state),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchUpdatePropConfig: (
    propKey: string,
    propConfig: BlockModelPropsConfig,
    moduleKey: string,
    blockKey: string
  ) => dispatch(updateBlockPropConfig(propKey, propConfig, moduleKey, blockKey)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updatePropConfig: (propConfig: BlockModelPropsConfig) =>
    dispatchProps.dispatchUpdatePropConfig(
      ownProps.propKey,
      propConfig,
      stateProps.moduleKey,
      stateProps.selectedBlockKey
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RepeaterDataInput);
