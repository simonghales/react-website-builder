// @flow

import type { DataBlockMappedMixinsModel, DataBlockModel } from './models';
import { getBlockFromDataBlock } from '../../blocks/blocks';
import type { BlockModel } from '../../blocks/models';
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
import {blockGroups} from '../../blocks/config';

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
