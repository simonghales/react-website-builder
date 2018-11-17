// @flow
import React from 'react';
import Input, { inputStyleTypes } from '../../Input/Input';
import type { StylePropInputProps } from './models';

const TextInput = ({ styleValue, inheritedValue, updateStyle }: StylePropInputProps) => (
  <Input
    styleType={inputStyleTypes.dark}
    value={styleValue}
    inheritedValue={inheritedValue}
    onChange={updateStyle}
  />
);

export default TextInput;
