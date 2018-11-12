// @flow
import React from 'react';
import Input, { inputStyleTypes } from '../../Input/Input';
import type { StylePropInputProps } from './models';

const TextInput = ({ styleValue, updateStyle }: StylePropInputProps) => (
  <Input styleType={inputStyleTypes.dark} value={styleValue} onChange={updateStyle} />
);

export default TextInput;
