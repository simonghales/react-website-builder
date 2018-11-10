// @flow
import React from 'react';
import type { ElementProps } from './props';

const ElementComponent = (props: ElementProps) => {
  const { element, ...otherProps } = props;
  return <props.element {...otherProps} />;
};

export default ElementComponent;
