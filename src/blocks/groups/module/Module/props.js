// @flow

import { blockPropsConfigTypes } from '../../../props';

export type ModuleProps = {
  children: any,
};

export const moduleDefaultProps = {
  children: null,
};

export const modulePropsConfig = {
  children: {
    hidden: true,
    type: blockPropsConfigTypes.blocks,
  },
};
