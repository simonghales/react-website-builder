// @flow

import type { MappedStyleModel } from '../../../data/styles/models';

export type ElementProps = {
  element: string,
  children: any,
  content: any,
  customStyles: MappedStyleModel,
  [string]: any,
};

export const elementDefaultProps = {
  element: 'div',
  children: undefined,
};

export const elementPropsConfig = {
  content: {
    label: 'Content',
    type: 'string',
  },
  children: {
    hidden: true,
    type: 'blocks',
  },
};
