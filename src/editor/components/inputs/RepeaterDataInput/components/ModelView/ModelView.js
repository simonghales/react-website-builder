// @flow
import React, { Component } from 'react';
import { MdPlaylistAddCheck, MdDelete } from 'react-icons/md';
import { cx } from 'emotion';
import type {
  BlockModelPropsConfig,
  RepeaterDataModelField,
} from '../../../../../../blocks/models';
import Button from '../../../../../../components/Button/Button';
import styles from './styles';
import TextInput from '../../../TextInput/TextInput';
import SelectInput from '../../../SelectInput/SelectInput';
import {
  defaultPropType,
  propTypeSelectInputOptions,
} from '../../../../EditorContent/components/EditorComponentContent/components/EditorComponentAddProp/EditorComponentAddProp';
import { iconButtonStyleTypes } from '../../../../../../components/IconButton/IconButton';
import IconButton from '../../../../../../components/IconButton/IconButton';

type Field = RepeaterDataModelField & {
  key: string,
};

function getModelFields(propConfig: BlockModelPropsConfig): Array<any> {
  const { repeaterDataModel = {} } = propConfig;
  return Object.keys(repeaterDataModel).map(fieldKey => ({
    key: fieldKey,
    ...repeaterDataModel[fieldKey],
  }));
}

type Props = {
  propConfig: BlockModelPropsConfig,
  handleRemoveField: (fieldKey: string) => void,
  handleUpdateField: (fieldKey: string, fieldLabel: string) => void,
  handleAddField: () => void,
};

class ModelView extends Component<Props> {
  render() {
    const { propConfig, handleRemoveField, handleUpdateField, handleAddField } = this.props;
    return (
      <div className={styles.containerClass}>
        <div className={styles.fieldsContainerClass}>
          {getModelFields(propConfig).map((field: Field, index) => (
            <div className={styles.fieldClass} key={index.toString()}>
              <div className={cx(styles.fieldInputClass, styles.fieldColumnClass)}>
                <TextInput
                  onChange={(newValue: string) => {
                    handleUpdateField(field.key, newValue);
                  }}
                  value={field.label}
                  valueControlled
                  inheritedValue=""
                />
              </div>
              <div className={cx(styles.fieldInputClass, styles.fieldColumnClass)}>
                <SelectInput
                  options={propTypeSelectInputOptions}
                  updateStyle={() => {}}
                  styleValue={field.type}
                  isMulti={false}
                  isCreatable={false}
                  inheritedValue={defaultPropType}
                />
              </div>
              <div className={styles.fieldColumnClass}>
                <IconButton
                  icon={<MdDelete size={18} />}
                  onClick={() => {
                    handleRemoveField(field.key);
                  }}
                  styleType={iconButtonStyleTypes.large}
                  highlighted={false}
                  disabled={false}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button onClick={handleAddField}>Add field</Button>
        </div>
      </div>
    );
  }
}

export default ModelView;
