// @flow
import React, { Component } from 'react';
import SelectInput from '../../SelectInput/SelectInput';
import type { SelectOption } from '../../SelectInput/SelectInput';
import type { FieldProps } from '../../../EditorContent/components/EditorFields/components/EditorField/EditorField';

const options: Array<SelectOption> = [
  {
    value: 'Arial',
    label: 'Arial',
  },
];

type Props = FieldProps;

class FontFamilySelector extends Component<Props> {
  render() {
    const { value, inheritedValue, onChange } = this.props;
    return (
      <SelectInput
        isCreatable
        isMulti
        noOptionsMessage="No more global fonts. Type to add custom value."
        options={options}
        styleValue={value}
        inheritedValue={inheritedValue}
        updateStyle={onChange}
      />
    );
  }
}

export default FontFamilySelector;
