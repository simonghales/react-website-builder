// @flow
import React from 'react';
import { css } from 'emotion';
import type { ElementProps } from './props';

const ElementComponent = (props: ElementProps) => {
  const { element, customStyles, ...otherProps } = props;
  return <props.element className={css(customStyles)} {...otherProps} />;
};

export default ElementComponent;
