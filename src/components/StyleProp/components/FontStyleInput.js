// @flow
import React from 'react';
import SelectInput from './SelectInput/SelectInput';

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

const FontStyleInput = () => <SelectInput isMulti={false} isCreatable options={options} />;

export default FontStyleInput;
