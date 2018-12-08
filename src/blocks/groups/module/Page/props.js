// @flow

import { blockPropsConfigTypes } from '../../../props';

export type PageProps = {
  children: any,
};

export const pageDefaultProps = {
  children: undefined,
};

export const pagePropsConfig = {
  children: {
    hidden: true,
    type: blockPropsConfigTypes.blocks,
  },
};
