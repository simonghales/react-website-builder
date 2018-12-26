// @flow

import type { MappedStyleModel } from '../../../../data/styles/models';
import { blockPropsConfigTypes, blockPropsDisplaySections } from '../../../props';

export type ElementProps = {
  element: string,
  children: any,
  content: any,
  customStyles: MappedStyleModel,
  [string]: any,
};

export const elementDefaultProps = {
  element: 'div',
  children: null,
};

export const elementPropsConfig = {
  element: {
    label: 'Element',
    type: blockPropsConfigTypes.html,
    displaySection: blockPropsDisplaySections.html,
  },
  content: {
    label: 'Content',
    type: blockPropsConfigTypes.string,
  },
  children: {
    hidden: true,
    type: blockPropsConfigTypes.blocks,
  },
};
