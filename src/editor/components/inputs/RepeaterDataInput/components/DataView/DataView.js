// @flow
import React, { Component } from 'react';
import { get } from 'lodash';
import { MdDelete, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import styles from './styles';
import type { BlockModelPropsConfig } from '../../../../../../blocks/models';
import { isValueDefined } from '../../../../../../utils/validation';
import TextInput from '../../../TextInput/TextInput';
import IconButton from '../../../../../../components/IconButton/IconButton';
import type {
  RepeaterDataItems,
  RepeaterDataValue,
} from '../../../../../../blocks/groups/functional/Repeater/state';
import {
  getRepeaterDataItems,
  getSortedRepeaterDataItems,
} from '../../../../../../blocks/groups/functional/Repeater/state';
import Button from '../../../../../../components/Button/Button';

export type DataField = {
  key: string,
  label: string,
  value: string,
};

function getDataValuePropLabel(dataValueKey: string, propConfig: BlockModelPropsConfig): string {
  const { repeaterDataModel = {} } = propConfig;
  const label = get(repeaterDataModel, `${dataValueKey}.label`, undefined);
  if (!isValueDefined(label)) {
    console.error(`Label couldn't be matched for "${dataValueKey}"`);
    return '';
  }
  return label;
}

function getDataFields(
  dataValue: RepeaterDataValue,
  propConfig: BlockModelPropsConfig
): Array<DataField> {
  const { repeaterDataModel = {} } = propConfig;
  const allFields = Object.keys(repeaterDataModel);
  return allFields.map(dataValueKey => {
    const label = getDataValuePropLabel(dataValueKey, propConfig);
    const value = dataValue.fields[dataValueKey] ? dataValue.fields[dataValueKey] : '';
    return {
      key: dataValueKey,
      label,
      value,
    };
  });
}

export function getRepeaterDataItemsArray(items: RepeaterDataItems): Array<RepeaterDataValue> {
  return getSortedRepeaterDataItems(items).map(itemKey => items[itemKey]);
}

const AddData = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.addItemContainerClass}>
    <Button onClick={onClick}>Add item</Button>
  </div>
);

type Props = {
  data: Array<RepeaterDataValue>,
  propConfig: BlockModelPropsConfig,
  handleUpdate: (itemKey: string, propKey: string, propValue: string) => void,
  handleDelete: (itemKey: string) => void,
  handleUpdateOrder: (itemKey: string, newIndex: number) => void,
  handleAddNew: (index: number) => void,
};

class DataView extends Component<Props> {
  render() {
    const {
      data,
      propConfig,
      handleUpdate,
      handleDelete,
      handleUpdateOrder,
      handleAddNew,
    } = this.props;
    return (
      <div className={styles.dataContainerClass}>
        <AddData
          onClick={() => {
            handleAddNew(0);
          }}
        />
        {getRepeaterDataItemsArray(getRepeaterDataItems(data)).map(
          (dataValue: RepeaterDataValue, index: number) => {
            // eslint-disable-next-line no-underscore-dangle
            const dataValueKey = dataValue.key;
            return (
              <React.Fragment key={dataValueKey}>
                <div className={styles.dataValueContainerClass} key={dataValueKey}>
                  {getDataFields(dataValue, propConfig).map((field: DataField) => (
                    <div className={styles.dataValueFieldClass} key={field.key}>
                      <div className={styles.dataValueFieldLabelClass}>{field.label}</div>
                      <div>
                        <TextInput
                          onChange={(updatedValue: string) => {
                            handleUpdate(dataValueKey, field.key, updatedValue);
                          }}
                          value={field.value}
                          valueControlled
                          inheritedValue=""
                        />
                      </div>
                    </div>
                  ))}
                  <div className={styles.dataValueOptionsClass}>
                    <div className={styles.dataValueOptionsDirectionsClass}>
                      <div className={styles.dataValueOptionsButtonClass}>
                        <IconButton
                          icon={<MdArrowUpward size={17} />}
                          onClick={() => {
                            handleUpdateOrder(dataValueKey, index - 1);
                          }}
                        />
                      </div>
                      <div className={styles.dataValueOptionsButtonClass}>
                        <IconButton
                          icon={<MdArrowDownward size={17} />}
                          onClick={() => {
                            handleUpdateOrder(dataValueKey, index + 1);
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.dataValueOptionsButtonClass}>
                      <IconButton
                        icon={<MdDelete size={17} />}
                        onClick={() => {
                          handleDelete(dataValueKey);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <AddData
                  onClick={() => {
                    handleAddNew(index + 1);
                  }}
                />
              </React.Fragment>
            );
          }
        )}
      </div>
    );
  }
}

export default DataView;
