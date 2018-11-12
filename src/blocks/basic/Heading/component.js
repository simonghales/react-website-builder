// @flow
import React from 'react';
import { css } from 'emotion';
import type { HeadingProps } from './props';

const HeadingComponent = ({ text, customStyles }: HeadingProps) => (
  <h3 className={css(customStyles)}>{text}</h3>
);

export default HeadingComponent;
