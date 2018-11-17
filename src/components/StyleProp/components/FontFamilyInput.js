// @flow
import React from 'react';
import SelectInput from './SelectInput/SelectInput';
import type { StylePropInputProps } from './models';

const options = [
  {
    value: 'Arial',
    label: 'Arial',
  },
];

const FontFamilyInput = ({ styleValue, inheritedValue, updateStyle }: StylePropInputProps) => (
  <SelectInput
    isCreatable
    isMulti
    noOptionsMessage="No more global fonts. Type to add custom value."
    options={options}
    styleValue={styleValue}
    inheritedValue={inheritedValue}
    updateStyle={updateStyle}
  />
);

export default FontFamilyInput;
