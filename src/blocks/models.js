// @flow

import type { DataBlockModel } from '../data/blocks/models';
import type {BlockPropsConfigTypes} from './props';

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
  childrenAllowed: boolean,
  stylesEnabled: boolean,
  dataBlock: ({ [string]: any }) => DataBlockModel,
};

export type BlockGroupModel = {
  blocks: {
    [string]: BlockModel,
  },
  key: string,
};

export type AddBlockModel = {
  key: string,
  label: string,
  icon: string,
  isModule: boolean,
};

export type AddBlockGroupModel = {
  key: string,
  label: string,
  blocks: {
    [string]: AddBlockModel,
  },
};

export type AddableBlockGroups = {
  [string]: AddBlockGroupModel,
};
