// @flow

import { blockPropsConfigTypes } from '../../../props';

export type ModuleImportProps = {
  children: any,
  module: any,
};

export const moduleImportDefaultProps = {
  children: null,
  module: null,
};

export const moduleImportPropsConfig = {
  children: {
    hidden: true,
    type: blockPropsConfigTypes.blocks,
  },
  module: {
    hidden: true,
    type: blockPropsConfigTypes.module,
  },
};
