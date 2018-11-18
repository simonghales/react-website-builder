// @flow

import type { DataBlockMappedMixinsModel, DataBlockModel, SitePageDataBlocks } from './models';
import { getBlockFromDataBlock } from '../../blocks/blocks';
import { getDataBlockType } from './models';
import ModuleImport from '../../blocks/module/ModuleImport/ModuleImport';
import type { ModuleTemplates } from '../moduleTemplates/models';
import {
  getModuleTemplateFromModuleTemplates,
  getModuleTemplateModuleKey,
} from '../moduleTemplates/state';
import type { DataModules } from '../modules/models';
import { getModuleFromModules } from '../modules/state';
import type { MixinModel, MixinsModel } from '../mixins/models';
import { getMixinFromMixins } from '../mixins/state';
import { blockGroups } from '../../blocks/config';

export function doesBlockAllowStyles(dataBlock: DataBlockModel): boolean {
  const block = getBlockFromDataBlock(dataBlock);
  return block.stylesEnabled;
}

export function getBlockLabel(
  dataBlock: DataBlockModel,
  modules: DataModules,
  moduleTemplates: ModuleTemplates
): string {
  if (dataBlock.groupKey === blockGroups.Module && dataBlock.blockKey === ModuleImport.key) {
    if (dataBlock.linkedModuleKey) {
      const moduleTemplate = getModuleTemplateFromModuleTemplates(
        dataBlock.linkedModuleKey,
        moduleTemplates
      );
      const moduleKey = getModuleTemplateModuleKey(moduleTemplate);
      const module = getModuleFromModules(moduleKey, modules);
      return `${module.groupKey}.${module.name}`;
    }
    return `Custom Module`;
  }
  return getDataBlockType(dataBlock);
}

export function isBlockModuleBlock(dataBlock: DataBlockModel): boolean {
  return (
    dataBlock.groupKey === blockGroups.Module &&
    (!!dataBlock.moduleKey || !!dataBlock.linkedModuleKey)
  );
}

export function getDataBlockMappedMixins(
  dataBlock: DataBlockModel,
  mixins: MixinsModel
): DataBlockMappedMixinsModel {
  const { mixinStyles } = dataBlock;
  if (!mixinStyles) return [];
  return mixinStyles.map(blockMixin => {
    const mixin = getMixinFromMixins(blockMixin.key, mixins);
    return {
      key: blockMixin.key,
      name: mixin.name,
      groupKey: mixin.groupKey,
    };
  });
}

export function getDataBlockMixins(
  dataBlock: DataBlockModel,
  mixins: MixinsModel
): Array<MixinModel> {
  const { mixinStyles } = dataBlock;
  if (!mixinStyles) return [];
  return mixinStyles.map(blockMixin => {
    const mixin = getMixinFromMixins(blockMixin.key, mixins);
    return mixin;
  });
}

export function doesBlockChildrenContainBlockKey(
  dataBlock: DataBlockModel,
  blockKey: string
): boolean {
  const { blockChildrenKeys = [] } = dataBlock;
  return blockChildrenKeys.includes(blockKey);
}

export function getBlockParentKey(blockToMatchKey: string, blocks: SitePageDataBlocks): string {
  let parentKey = '';
  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];
    if (doesBlockChildrenContainBlockKey(block, blockToMatchKey)) {
      parentKey = block.key;
    }
  });
  return parentKey;
}

export function removeBlockKeyFromBlockChildrenKeys(
  blockKey: string,
  blockChildrenKeys: Array<string>
): Array<string> {
  const blockIndex = blockChildrenKeys.indexOf(blockKey);
  const updatedBlockChildrenKeys = blockChildrenKeys.slice();
  updatedBlockChildrenKeys.splice(blockIndex, 1);
  return updatedBlockChildrenKeys;
}
