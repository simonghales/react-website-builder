// @flow

import type { MappedStyleModel } from '../../../../data/styles/models';
import { blockPropsConfigTypes } from '../../../props';

export type HeadingProps = {
  text: string,
  customStyles: MappedStyleModel,
};

export const headingDefaultProps = {
  text: '',
};

export const headingPropsConfig = {
  text: {
    type: blockPropsConfigTypes.string,
  },
};
