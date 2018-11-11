// @flow
import React from 'react';
import SelectInput from './SelectInput/SelectInput';

const options = [
  {
    value: '700',
    label: '700',
  },
];

const FontWeightInput = () => (
  <SelectInput
    isCreatable
    isMulti={false}
    noOptionsMessage="Type to add custom value."
    options={options}
  />
);

export default FontWeightInput;
