// @flow

import type { MappedStyleModel } from '../../../../data/styles/models';
import { blockPropsConfigTypes } from '../../../props';
import { blockPropsDisplaySections } from '../../../props';

export type HeadingProps = {
  element: string,
  text: string,
  customStyles: MappedStyleModel,
};

export const headingDefaultProps = {
  element: 'h3',
  text: '',
};

export const headingPropsConfig = {
  element: {
    label: 'Element',
    type: blockPropsConfigTypes.html,
    displaySection: blockPropsDisplaySections.html,
  },
  text: {
    type: blockPropsConfigTypes.string,
  },
};
