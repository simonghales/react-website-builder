// @flow

import type { DataBlockModel } from '../data/blocks/models';
import type { BlockPropsConfigTypes, BlockPropsDisplaySections } from './props';

export type RepeaterDataModelField = {
  label: string,
  type: BlockPropsConfigTypes,
};

export type BlockModelPropsConfig = {
  label?: string,
  type?: BlockPropsConfigTypes,
  hidden?: boolean,
  displaySection?: BlockPropsDisplaySections,
  custom?: boolean,
  propReference?: boolean,
  repeaterReference?: boolean,
  repeaterReferenceKey?: string,
  repeaterDataModel?: {
    [string]: RepeaterDataModelField,
  },
};

export type BlockPropsConfigModel = {
  [string]: BlockModelPropsConfig,
};

export type BlockModel = {
  key: string,
  groupKey: string,
  component: any,
  defaultProps: {
    [string]: any,
  },
  propsConfig: BlockPropsConfigModel,
  childrenAllowed: boolean,
  propsEnabled: boolean,
  stylesEnabled: boolean,
  htmlEnabled: boolean,
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
