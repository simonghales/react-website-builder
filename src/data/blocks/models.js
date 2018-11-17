// @flow

import type { BlockModelPropsConfig } from '../../blocks/models';
import { blockTypes, getBlockFromDataBlock } from '../../blocks/blocks';
import type { BlockStyles, MappedStyleModel } from '../styles/models';
import { getMappedBlockStyles } from '../styles/state';
import { getMappedDataModule } from '../modules/state';
import type { DataModules, MappedDataModule } from '../modules/models';
import { getMappedDataLinkedModule, getMappedLinkedModuleKey } from '../moduleTemplates/state';
import type { ModuleTemplates } from '../moduleTemplates/models';
import { getBlockLabel } from './state';
import type { MixinsModel } from '../mixins/models';

export const blockPropsConfigTypes = {
  module: 'module',
  blocks: 'blocks',
  string: 'string',
};

export type BlockPropsConfigTypes = $Keys<typeof blockPropsConfigTypes>;

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

export type DataBlockModel = {
  key: string,
  groupKey: string,
  blockKey: string,
  blockType: string,
  label: string,
  props: {
    [string]: any,
  },
  propsConfig: {
    [string]: BlockModelPropsConfig,
  },
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

export function getBlockFromBlocks(blocks: SitePageDataBlocks, key: string): DataBlockModel {
  const block = blocks[key];
  if (!block) {
    throw new Error(`Block "${key}" not found within blocks.`);
  }
  return block;
}

function mapDataBlockModule(
  dataBlock: DataBlockModel,
  modules: DataModules,
  moduleTemplates: ModuleTemplates,
  mixins: MixinsModel
) {
  if (dataBlock.linkedModuleKey) {
    return getMappedDataLinkedModule(dataBlock.linkedModuleKey, modules, moduleTemplates, mixins);
  }
  if (dataBlock.moduleKey) {
    return getMappedDataModule(dataBlock.moduleKey, modules, moduleTemplates, mixins);
  }
  return undefined;
}

function mapDataBlockModuleKey(
  dataBlock: DataBlockModel,
  modules: DataModules,
  moduleTemplates: ModuleTemplates
): string {
  if (dataBlock.linkedModuleKey) {
    return getMappedLinkedModuleKey(dataBlock.linkedModuleKey, modules, moduleTemplates);
  }
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
  moduleTemplates: ModuleTemplates,
  mixins: MixinsModel
): MappedDataBlockModel {
  const dataBlock = getBlockFromBlocks(blocks, blockKey);
  const block = getBlockFromDataBlock(dataBlock);
  return {
    ...dataBlock,
    blockChildren: dataBlock.blockChildrenKeys.map((childBlockKey: string) =>
      mapDataBlock(childBlockKey, blocks, mapModule, modules, moduleTemplates, mixins)
    ),
    module: mapModule ? mapDataBlockModule(dataBlock, modules, moduleTemplates, mixins) : undefined,
    moduleKey: mapDataBlockModuleKey(dataBlock, modules, moduleTemplates),
    styles: getMappedBlockStyles(dataBlock, mixins),
    childrenAllowed: block.childrenAllowed,
    blockLabel: getBlockLabel(dataBlock, modules, moduleTemplates),
  };
}

export function getMappedDataBlocks(
  rootBlock: string,
  blocks: SitePageDataBlocks,
  mapModule: boolean,
  modules: DataModules,
  moduleTemplates: ModuleTemplates,
  mixins: MixinsModel
): MappedDataBlocks {
  return [mapDataBlock(rootBlock, blocks, mapModule, modules, moduleTemplates, mixins)];
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
