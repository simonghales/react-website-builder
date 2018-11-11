// @flow
import React from 'react';
import SelectInput from './SelectInput/SelectInput';

const options = [
  {
    value: 'Arial',
    label: 'Arial',
  },
];

const FontFamilyInput = () => (
  <SelectInput
    isCreatable
    isMulti
    noOptionsMessage="No more global fonts. Type to add custom value."
    options={options}
  />
);

export default FontFamilyInput;
