// @flow

import type { BlockModelPropsConfig } from '../../blocks/models';
import { getBlockFromDataBlock } from '../../blocks/blocks';
import type { BlockStyles, MappedStyleModel } from '../styles/models';
import { getMappedBlockStyles } from '../styles/state';
import { getMappedDataModule } from '../modules/state';
import type { DataModules, MappedDataModule } from '../modules/models';
import { getBlockLabel } from './state';
import type { MixinsModel } from '../mixins/models';
import { blockTypes } from '../../blocks/config';
import { blockPropsConfigTypes } from '../../blocks/props';

export type DataBlockMixinModel = {
  key: string,
  disabledModifiers: {},
};

export type DataBlockMixinStylesModel = Array<DataBlockMixinModel>;

export type DataBlockMappedMixinModel = {
  key: string,
  groupKey: string,
  name: string,
};

export type DataBlockMappedMixinsModel = Array<DataBlockMappedMixinModel>;

export type DataBlockPropsConfigModel = {
  [string]: BlockModelPropsConfig,
};

export type DataBlockPropsModel = {
  [string]: string,
};

export type DataBlockModel = {
  key: string,
  groupKey: string,
  blockKey: string,
  blockType: string,
  label: string,
  props: DataBlockPropsModel,
  propsConfig: DataBlockPropsConfigModel,
  blockChildrenKeys: Array<string>,
  isParentModule: boolean,
  moduleKey?: string,
  linkedModuleKey?: string,
  styleKey?: string,
  rawStyles: BlockStyles,
  mixinStyles?: DataBlockMixinStylesModel,
};

export type MappedDataBlockModel = DataBlockModel & {
  blockChildren?: Array<MappedDataBlockModel>,
  module?: MappedDataModule,
  moduleKey?: string,
  blockLabel: string,
  styles: MappedStyleModel,
  childrenAllowed: boolean,
};

export type MappedDataBlocks = Array<MappedDataBlockModel>;

export type SitePageDataBlocks = {
  [string]: DataBlockModel,
};

export function getDataBlockFromBlocks(blocks: SitePageDataBlocks, key: string): DataBlockModel {
  const block = blocks[key];
  if (!block) {
    throw new Error(`Block "${key}" not found within blocks.`);
  }
  return block;
}

function mapDataBlockModule(dataBlock: DataBlockModel, modules: DataModules, mixins: MixinsModel) {
  if (dataBlock.moduleKey) {
    return getMappedDataModule(dataBlock.moduleKey, modules, mixins);
  }
  return null;
}

export function mapDataBlockModuleKey(dataBlock: DataBlockModel): string {
  if (dataBlock.moduleKey) {
    return dataBlock.moduleKey;
  }
  return '';
}

export function mapDataBlock(
  blockKey: string,
  blocks: SitePageDataBlocks,
  mapModule: boolean,
  modules: DataModules,
  mixins: MixinsModel
): MappedDataBlockModel {
  const dataBlock = getDataBlockFromBlocks(blocks, blockKey);
  const block = getBlockFromDataBlock(dataBlock);
  return {
    ...dataBlock,
    blockChildren: dataBlock.blockChildrenKeys.map((childBlockKey: string) =>
      mapDataBlock(childBlockKey, blocks, mapModule, modules, mixins)
    ),
    module: mapModule ? mapDataBlockModule(dataBlock, modules, mixins) : null,
    moduleKey: mapDataBlockModuleKey(dataBlock),
    styles: getMappedBlockStyles(dataBlock, mixins),
    childrenAllowed: block.childrenAllowed,
    blockLabel: getBlockLabel(dataBlock, modules),
  };
}

export function getMappedDataBlocks(
  rootBlock: string,
  blocks: SitePageDataBlocks,
  mapModule: boolean,
  modules: DataModules,
  mixins: MixinsModel
): MappedDataBlocks {
  return [mapDataBlock(rootBlock, blocks, mapModule, modules, mixins)];
}

export function getDataBlockGroupKey(data: DataBlockModel): string {
  return data.groupKey;
}

export function getDataBlockBlockKey(data: DataBlockModel): string {
  if (data.blockType === blockTypes.html) {
    if (data.props.element) {
      return `<${data.props.element}>`;
    }
  }
  return data.blockKey;
}

export function getDataBlockType(data: DataBlockModel): string {
  return `${getDataBlockGroupKey(data)}.${getDataBlockBlockKey(data)}`;
}

export function getDataBlockLabel(data: DataBlockModel): string {
  return data.label;
}

export function getBlockPropLabel(propKey: string, propConfig: BlockModelPropsConfig): string {
  return propConfig && propConfig.label ? propConfig.label : propKey;
}

export function getBlockPropType(propConfig: BlockModelPropsConfig): string {
  return propConfig && propConfig.type ? propConfig.type : blockPropsConfigTypes.string;
}
