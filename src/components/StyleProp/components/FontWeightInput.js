// @flow
import React from 'react';
import SelectInput from './SelectInput/SelectInput';
import type { StylePropInputProps } from './models';

const options = [
  {
    value: '700',
    label: '700',
  },
];

const FontWeightInput = ({ styleValue, updateStyle }: StylePropInputProps) => (
  <SelectInput
    isCreatable
    isMulti={false}
    noOptionsMessage="Type to add custom value."
    options={options}
    styleValue={styleValue}
    updateStyle={updateStyle}
  />
);

export default FontWeightInput;
