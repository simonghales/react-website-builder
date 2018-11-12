// @flow

import type { MappedStyleModel } from '../../../data/styles/models';

export type ElementProps = {
  element: string,
  children: any,
  customStyles: MappedStyleModel,
  [string]: any,
};

export const elementDefaultProps = {
  element: 'div',
  children: undefined,
};

export const elementPropsConfig = {
  children: {
    label: 'Content',
    type: 'string',
  },
};
