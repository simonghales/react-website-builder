// @flow

import type { MappedStyleModel } from '../../../../data/styles/models';
import { blockPropsConfigTypes } from '../../../props';
import { blockPropsDisplaySections } from '../../../props';

export type ContainerProps = {
  element: string,
  children: any,
  customStyles: MappedStyleModel,
};

export const containerDefaultProps = {
  element: 'div',
  children: undefined,
};

export const containerPropsConfig = {
  element: {
    label: 'Element',
    type: blockPropsConfigTypes.html,
    displaySection: blockPropsDisplaySections.html,
  },
  children: {
    hidden: true,
    type: blockPropsConfigTypes.blocks,
  },
};
