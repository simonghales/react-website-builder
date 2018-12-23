// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import EditorLayoutColumn from '../../EditorContent/components/EditorLayout/components/EditorLayoutColumn';
import ModelView from './components/ModelView/ModelView';
import DataView from './components/DataView/DataView';
import type { ReduxState } from '../../../../state/redux/store';
import type { FieldProps } from '../../EditorContent/components/EditorFields/components/EditorField/EditorField';
import { getSelectedBlock } from '../../../../state/redux/editor/selector';
import {
  getDataBlockCombinedPropsConfig,
  getPropConfigFromDataBlockCombinedPropsConfig,
} from '../../EditorContent/components/EditorFields/state';
import type { BlockModelPropsConfig } from '../../../../blocks/models';
import {
  addNewItemToRepeaterData,
  changeItemOrderInRepeaterData,
  removeItemFromRepeaterData,
  updateRepeaterDataItemValue,
} from '../../../../blocks/groups/functional/Repeater/state';

type Props = FieldProps & {
  propConfig: BlockModelPropsConfig,
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

  render() {
    const { propConfig, value } = this.props;
    console.log('this.props', this.props);
    return (
      <div className={styles.containerClass}>
        <EditorLayoutColumn columns={7}>
          <div className={styles.labelClass}>Model</div>
          <ModelView propConfig={propConfig} />
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
  };
};

export default connect(mapStateToProps)(RepeaterDataInput);
