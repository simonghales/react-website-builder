// @flow

import type { BlockPropsConfigTypes } from '../data/blocks/models';

export type BlockModelPropsConfig = {
  label?: string,
  type?: BlockPropsConfigTypes,
  hidden?: boolean,
};

export type BlockModel = {
  component: any,
  key: string,
  defaultProps: {
    [string]: any,
  },
  propsConfig: BlockModelPropsConfig,
};

export type BlockGroupModel = {
  blocks: {
    [string]: BlockModel,
  },
  key: string,
};
