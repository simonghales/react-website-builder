// @flow
import React from 'react';
import SelectInput from './SelectInput/SelectInput';
import type { StylePropInputProps } from './models';

const options = [
  {
    value: 'normal',
    label: 'normal',
  },
  {
    value: 'italic',
    label: 'italic',
  },
];

const FontStyleInput = ({ styleValue, inheritedValue, updateStyle }: StylePropInputProps) => (
  <SelectInput
    isMulti={false}
    isCreatable
    options={options}
    styleValue={styleValue}
    inheritedValue={inheritedValue}
    updateStyle={updateStyle}
  />
);

export default FontStyleInput;
