// @flow
import React, { Component } from 'react';
import SelectInput from '../../SelectInput/SelectInput';
import type { SelectOption } from '../../SelectInput/SelectInput';
import type { FieldProps } from '../../../EditorContent/components/EditorFields/components/EditorField/EditorField';

const options: Array<SelectOption> = [
  {
    value: '700',
    label: '700',
  },
];

type Props = FieldProps;

class FontWeightSelector extends Component<Props> {
  render() {
    const { value, inheritedValue, onChange } = this.props;
    return (
      <SelectInput
        isCreatable
        isMulti={false}
        noOptionsMessage="Type to add custom value."
        options={options}
        styleValue={value}
        inheritedValue={inheritedValue}
        updateStyle={onChange}
      />
    );
  }
}

export default FontWeightSelector;
