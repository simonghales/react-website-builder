// @flow

import type { MappedStyleModel } from '../../../data/styles/models';

export type HeadingProps = {
  text: string,
  customStyles: MappedStyleModel,
};

export const headingDefaultProps = {
  text: '',
};
