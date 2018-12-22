// @flow
import React, { Component } from 'react';
import { get } from 'lodash';
import { MdDelete, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import styles from './styles';
import type { BlockModelPropsConfig } from '../../../../../../blocks/models';
import { isValueDefined } from '../../../../../../utils/validation';
import TextInput from '../../../TextInput/TextInput';
import IconButton from '../../../../../../components/IconButton/IconButton';

export type DataValue = {
  [string]: string,
};

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

function getDataFields(dataValue: DataValue, propConfig: BlockModelPropsConfig): Array<DataField> {
  const { repeaterDataModel = {} } = propConfig;
  const allFields = Object.keys(repeaterDataModel);
  return allFields.map(dataValueKey => {
    const label = getDataValuePropLabel(dataValueKey, propConfig);
    const value = dataValue[dataValueKey] ? dataValue[dataValueKey] : '';
    return {
      key: dataValueKey,
      label,
      value,
    };
  });
}

export function getRepeaterDataItemsArray(data: {}): Array<{ [string]: any }> {
  return Object.keys(data)
    .sort((itemKeyA, itemKeyB) => {
      const itemA = data[itemKeyA];
      const itemB = data[itemKeyB];
      // eslint-disable-next-line no-underscore-dangle
      return itemA._order - itemB._order;
    })
    .map(itemKey => data[itemKey]);
}

type Props = {
  data: Array<DataValue>,
  propConfig: BlockModelPropsConfig,
};

class DataView extends Component<Props> {
  render() {
    const { data, propConfig } = this.props;
    return (
      <div className={styles.dataContainerClass}>
        {getRepeaterDataItemsArray(data.items).map((dataValue: DataValue, index) => (
          <div className={styles.dataValueContainerClass} key={index.toString()}>
            {getDataFields(dataValue, propConfig).map((field: DataField) => (
              <div className={styles.dataValueFieldClass} key={field.key}>
                <div className={styles.dataValueFieldLabelClass}>{field.label}</div>
                <div>
                  <TextInput
                    onChange={() => {}}
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
                  <IconButton icon={<MdArrowUpward size={17} />} onClick={() => {}} />
                </div>
                <div className={styles.dataValueOptionsButtonClass}>
                  <IconButton icon={<MdArrowDownward size={17} />} onClick={() => {}} />
                </div>
              </div>
              <div className={styles.dataValueOptionsButtonClass}>
                <IconButton icon={<MdDelete size={17} />} onClick={() => {}} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default DataView;
