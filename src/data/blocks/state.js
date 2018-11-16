// @flow

import type { DataBlockModel } from './models';
import { blockGroups, getBlockFromDataBlock } from '../../blocks/blocks';
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

export function doesBlockAllowStyles(dataBlock: DataBlockModel): boolean {
  const block = getBlockFromDataBlock(dataBlock);
  return block.stylesEnabled;
}

export function getBlockLabel(
  dataBlock: DataBlockModel,
  modules: DataModules,
  moduleTemplates: ModuleTemplates
): string {
  console.log('dataBlock', dataBlock);
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
