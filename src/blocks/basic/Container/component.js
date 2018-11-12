// @flow
import React from 'react';
import { css } from 'emotion';
import type { ContainerProps } from './props';

const ContainerComponent = ({ children, customStyles }: ContainerProps) => (
  <div className={css(customStyles)}>{children}</div>
);

export default ContainerComponent;
