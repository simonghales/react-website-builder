// @flow

import type { MappedStyleModel } from '../../../data/styles/models';

export type ContainerProps = {
  children: any,
  customStyles: MappedStyleModel,
};

export const containerDefaultProps = {
  children: undefined,
};

export const containerPropsConfig = {
  children: {
    hidden: true,
  },
};
