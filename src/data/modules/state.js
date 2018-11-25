// @flow

import type { DataModule, DataModules, MappedDataModule } from './models';
import type { DataBlockModel, SitePageDataBlocks } from '../blocks/models';
import { getMappedDataBlocks } from '../blocks/models';
import type { ModuleTemplates } from '../moduleTemplates/models';
import type { MixinsModel } from '../mixins/models';
import { blockGroups, blockTypes } from '../../blocks/config';
import { isDataBlockAModuleTemplate } from '../blocks/state';
import {
  getModuleTemplateFromModuleTemplates,
  getModuleTemplateModuleKey,
} from '../moduleTemplates/state';

export function getModuleRootBlockKey(module: DataModule): string {
  const { rootBlock } = module;
  return rootBlock;
}

export function getSelectedBlockKeyFromModule(module: DataModule): string {
  const { selectedBlock } = module;
  return selectedBlock;
}

export function getModuleRootBlock(module: DataModule): DataBlockModel {
  const { rootBlock } = module;
  return module[rootBlock];
}

export function getModuleBlocks(module: DataModule): SitePageDataBlocks {
  const { blocks } = module;
  return blocks;
}

export function getBlockFromModuleBlocks(blockKey: string, module: DataModule): DataBlockModel {
  const blocks = getModuleBlocks(module);
  const block = blocks[blockKey];
  if (!block) {
    throw new Error(`Block ${blockKey} couldn't be matched to module's blocks.`);
  }
  return block;
}

export function getSelectedBlockFromModule(module: DataModule): DataBlockModel {
  const { selectedBlock } = module;
  return getBlockFromModuleBlocks(selectedBlock, module);
}

export function getModuleFromModules(moduleKey: string, modules: DataModules): DataModule {
  const module = modules[moduleKey];
  if (!module) {
    throw new Error(`Couldn't match ${moduleKey} in modules.`);
  }
  return module;
}

export function getMappedDataModule(
  moduleKey: string,
  modules: DataModules,
  moduleTemplates: ModuleTemplates,
  mixins: MixinsModel
): MappedDataModule {
  const module = getModuleFromModules(moduleKey, modules);
  const rootBlockKey = getModuleRootBlockKey(module);
  const blocks = getModuleBlocks(module);
  return {
    key: module.key,
    rootBlock: rootBlockKey,
    blocks: getMappedDataBlocks(rootBlockKey, blocks, true, modules, moduleTemplates, mixins),
  };
}

function addModuleKeyToKeys(
  moduleKey: string,
  moduleKeys: { [string]: number },
  amount: number
): { [string]: number } {
  const updatedModuleKeys = {
    ...moduleKeys,
  };
  if (updatedModuleKeys[moduleKey]) {
    updatedModuleKeys[moduleKey] = updatedModuleKeys[moduleKey] + amount;
  } else {
    updatedModuleKeys[moduleKey] = amount;
  }
  return updatedModuleKeys;
}

export function recursivelyGetAllModuleChildModules(
  module: DataModule,
  modules: DataModules,
  moduleTemplates: ModuleTemplates
) {
  let childModulesKeys = {};

  const rootBlockKey = getModuleRootBlockKey(module);
  const { blocks } = module;

  Object.keys(blocks).forEach(blockKey => {
    const block = blocks[blockKey];

    if (isDataBlockAModuleTemplate(block) && blockKey !== rootBlockKey) {
      let moduleKey = '';

      if (block.moduleKey) {
        // eslint-disable-next-line prefer-destructuring
        moduleKey = block.moduleKey;
      } else if (block.linkedModuleKey) {
        const moduleTemplate = getModuleTemplateFromModuleTemplates(
          block.linkedModuleKey,
          moduleTemplates
        );
        moduleKey = getModuleTemplateModuleKey(moduleTemplate);
      } else {
        throw new Error(`Block is missing both moduleKey and linkedModuleKey`);
      }
      childModulesKeys = addModuleKeyToKeys(moduleKey, childModulesKeys, 1);
      const blockModule = getModuleFromModules(moduleKey, modules);
      const blockModuleChildModuleKeys = recursivelyGetAllModuleChildModules(
        blockModule,
        modules,
        moduleTemplates
      );
      Object.keys(blockModuleChildModuleKeys).forEach(childModuleKey => {
        childModulesKeys = addModuleKeyToKeys(
          childModuleKey,
          childModulesKeys,
          blockModuleChildModuleKeys[childModuleKey]
        );
      });
    }
  });

  return childModulesKeys;
}

export function doesModuleChildrenContainModule(
  moduleKeyToCheck: string,
  module: DataModule,
  modules: DataModules,
  moduleTemplates: ModuleTemplates
): boolean {
  const allChildModules = recursivelyGetAllModuleChildModules(module, modules, moduleTemplates);
  return !!allChildModules[moduleKeyToCheck];
}

export function moduleKeyIsChildOfModule(moduleKeyToCheck: string, module: DataModule): boolean {
  let isChild = false;
  Object.keys(module.blocks).forEach(blockKey => {
    const block = module.blocks[blockKey];
    if (block.moduleKey && block.moduleKey === moduleKeyToCheck) {
      isChild = true;
    }
  });
  return isChild;
}

export function getModuleKeyFromModule(module: DataModule): string {
  return module.key;
}

export function getModuleParentModules(
  moduleKeyToMatch: string,
  modules: DataModules
): Array<DataModule> {
  const parentModules = [];
  Object.keys(modules).forEach(moduleKey => {
    const module = modules[moduleKey];
    if (moduleKeyIsChildOfModule(moduleKeyToMatch, module)) {
      parentModules.push(module);
    }
  });
  return parentModules;
}
