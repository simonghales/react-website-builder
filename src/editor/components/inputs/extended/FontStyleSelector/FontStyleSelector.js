// @flow
import React, { Component } from 'react';
import SelectInput from '../../SelectInput/SelectInput';
import type { SelectOption } from '../../SelectInput/SelectInput';
import type { FieldProps } from '../../../EditorContent/components/EditorFields/components/EditorField/EditorField';

const options: Array<SelectOption> = [
  {
    value: 'normal',
    label: 'normal',
  },
  {
    value: 'italic',
    label: 'italic',
  },
];

type Props = FieldProps;

class FontStyleSelector extends Component<Props> {
  render() {
    const { value, inheritedValue, onChange } = this.props;
    return (
      <SelectInput
        isMulti={false}
        isCreatable
        options={options}
        styleValue={value}
        inheritedValue={inheritedValue}
        updateStyle={onChange}
      />
    );
  }
}

export default FontStyleSelector;
